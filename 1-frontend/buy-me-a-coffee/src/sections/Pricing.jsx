import { Element } from "react-scroll";
import { useState, useEffect, useCallback } from "react";
import clsx from "clsx";
import CountUp from "react-countup";
import { plans } from "../constants/index.jsx";
import Button from "../components/Button.jsx";
import {
    useAccount,
    useConnect,
    useChainId,
    useWriteContract,
    useWaitForTransactionReceipt,
    useReadContract,
} from 'wagmi';
import { metaMask } from 'wagmi/connectors';
import { parseEther, parseGwei } from 'viem';
import {
    CONTRACT_CONFIG,
    LINK_TOKEN_CONFIG,
    LINK_PRICE_FEED_CONFIG,
    ZKSYNC_SEPOLIA_TESTNET,
    ETH_PRICE_FEED_CONFIG,
    switchToZkSync
} from '../utils/contractConfig';
import TransactionModal from "../components/TransactionModal.jsx";


const PricingButtonLabel = ({ planId, isETH }) => {
    const currency = isETH ? 'ETH' : 'LINK';
    const price = isETH ? plans[parseInt(planId)].PriceETH : plans[parseInt(planId)].PriceLINK;
    return (
        <span>
            Pay ${price} in {currency}
        </span>
    );
};

const AnimatedPrice = ({ planId, isETH }) => {
    const currency = isETH ? 'ETH' : 'LINK';

    return (
        <span>
            Pay $
            <CountUp
                start={!isETH ? plans[parseInt(planId)].PriceETH : plans[parseInt(planId)].PriceLINK}
                end={isETH ? plans[parseInt(planId)].PriceETH : plans[parseInt(planId)].PriceLINK}
                duration={0.4}
                useEasing={false}
                preserveValue
            />
            {` in ${currency}`}
        </span>
    );
};

const Pricing = () => {
    const [isETH, setIsETH] = useState(true);
    const [isFetchingPrice, setIsFetchingPrice] = useState(false);
    const [pendingPlanId, setPendingPlanId] = useState(null);
    const [transactionStates, setTransactionStates] = useState({});
    const { address, isConnected } = useAccount();
    const { connect } = useConnect();
    const chainId = useChainId();
    const { data: hash, error, isPending, writeContract } = useWriteContract();
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    });
    const { data: linkPriceData } = useReadContract({
        ...LINK_PRICE_FEED_CONFIG, functionName: 'latestAnswer',
        chainId: ZKSYNC_SEPOLIA_TESTNET.id,
        enabled: isConnected && chainId === ZKSYNC_SEPOLIA_TESTNET.id && !isETH
    });
    const { data: allowanceData } = useReadContract({
        ...LINK_TOKEN_CONFIG,
        functionName: 'allowance',
        args: [address, CONTRACT_CONFIG.address],
        enabled: isConnected && chainId === ZKSYNC_SEPOLIA_TESTNET.id && !isETH
    });
    const {
        data: approvalHash,
        isPending: isApprovalPending,
        writeContract: writeApprovalContract
    } = useWriteContract();

    const {
        isLoading: isApprovalConfirming,
        isSuccess: isApprovalConfirmed
    } = useWaitForTransactionReceipt({
        hash: approvalHash,
    });
    const { data: linkBalance } = useReadContract({
        ...LINK_TOKEN_CONFIG,
        functionName: 'balanceOf',
        args: [address],
        enabled: isConnected && chainId === ZKSYNC_SEPOLIA_TESTNET.id && !isETH
    });
    const [needsApproval, setNeedsApproval] = useState(false);
    const { data: ethPriceData, isError: ethPriceError, error: ethPriceErrorData, isLoading: isLoadingPrice } = useReadContract({
        ...ETH_PRICE_FEED_CONFIG,
        functionName: 'latestAnswer',
        chainId: ZKSYNC_SEPOLIA_TESTNET.id,
        enabled: isConnected && chainId === ZKSYNC_SEPOLIA_TESTNET.id
    });
    const [modalState, setModalState] = useState({
        isOpen: false,
        status: null,
        hash: null
    });
    const [isSwitchingCurrency, setIsSwitchingCurrency] = useState(false);
    const [failedPlanId, setFailedPlanId] = useState(null);
    const [handledError, setHandledError] = useState(false);
    const [handledSuccess, setHandledSuccess] = useState(false);

    const handleModalClose = () => {
        // Always close modal immediately
        setModalState(prev => ({
            ...prev,
            isOpen: false
        }));

        // Only reset everything else if it was an error
        setTimeout(() => {
            writeContract.reset?.();
            setFailedPlanId(null);
            setPendingPlanId(null);
            setTransactionStates({});
            setModalState({
                isOpen: false,
                status: null,
                hash: null,
                errorMessage: null
            });
        }, 2000);
        // For success cases, we do nothing else - keeping the successful state
    };

    const processPendingPayment = useCallback(async () => {
        if (pendingPlanId === null) return;

        if (isConnected && chainId === ZKSYNC_SEPOLIA_TESTNET.id) {
            try {
                setIsFetchingPrice(true);

                if (isETH) {

                    if (!ethPriceData) {
                        console.log('Waiting for price data...');
                        return;
                    }

                    const ethPriceInUsd = Number(ethPriceData) / 1e8;
                    const usdAmount = plans[pendingPlanId].PriceETH;
                    const ethAmount = (usdAmount * 1.05) / ethPriceInUsd;
                    const ethAmountInWei = parseEther(ethAmount.toFixed(18));

                    let functionName;
                    switch (usdAmount) {
                        case 5: functionName = 'fund_five_ineth'; break;
                        case 10: functionName = 'fund_ten_ineth'; break;
                        case 15: functionName = 'fund_fifteen_ineth'; break;
                        default: throw new Error('Invalid ETH amount');
                    }

                    await writeContract({
                        ...CONTRACT_CONFIG,
                        functionName,
                        value: ethAmountInWei,
                        gas: 250000n,
                        maxFeePerGas: parseGwei('0.1'),
                        maxPriorityFeePerGas: parseGwei('0.05'),
                    });
                } else {
                    if (!linkPriceData) {
                        console.log('Waiting for LINK price data...');
                        return;
                    }

                    const linkPriceInUsd = Number(linkPriceData) / 1e8;
                    const usdAmount = plans[pendingPlanId].PriceLINK;
                    const linkAmount = (usdAmount * 1.05) / linkPriceInUsd;
                    const linkAmountInWei = parseEther(linkAmount.toFixed(18));

                    // Add balance check
                    if (!linkBalance || linkBalance < linkAmountInWei) {
                        const error = new Error('Insufficient LINK balance');
                        error.code = 'INSUFFICIENT_BALANCE';
                        setModalState({
                            isOpen: true,
                            status: 'error',
                            errorMessage: 'Insufficient LINK balance. Please add LINK tokens to your wallet.',
                            hash: null
                        });
                        setHandledError(true);
                        setPendingPlanId(null);
                        return; // Exit early
                    }

                    console.log('LINK Transaction Details:', {
                        allowanceData,
                        linkAmountNeeded: linkAmountInWei,
                        needsApproval: allowanceData < linkAmountInWei
                    });

                    // Check if approval is needed
                    if (allowanceData < linkAmountInWei) {
                        try {
                            console.log('Initiating LINK approval...');
                            setNeedsApproval(true);
                            await writeApprovalContract({
                                ...LINK_TOKEN_CONFIG,
                                functionName: 'approve',
                                args: [CONTRACT_CONFIG.address, linkAmountInWei],
                                gas: 250000n, // Add gas estimate
                                maxFeePerGas: parseGwei('0.1'),
                                maxPriorityFeePerGas: parseGwei('0.05'),
                            });
                            console.log('Approval transaction submitted');

                            return;
                        } catch (approvalError) {
                            console.error('Approval failed:', approvalError);
                            throw new Error(`Approval failed: ${approvalError.message}`);
                        }
                    }

                    let functionName;
                    switch (usdAmount) {
                        case 3: functionName = 'fund_three_inlink'; break;
                        case 7: functionName = 'fund_seven_inlink'; break;
                        case 12: functionName = 'fund_twelve_inlink'; break;
                        default: throw new Error('Invalid LINK amount');
                    }

                    await writeContract({
                        ...CONTRACT_CONFIG,
                        functionName,
                        gas: 250000n,
                        maxFeePerGas: parseGwei('0.1'),
                        maxPriorityFeePerGas: parseGwei('0.05'),
                    });
                }
            } finally {
                setIsFetchingPrice(false);
            }
        }
    }, [
        pendingPlanId,
        isConnected,
        chainId,
        isETH,
        ethPriceData,
        linkPriceData,
        allowanceData,
        linkBalance,
        writeContract,
        writeApprovalContract,
        plans]);

    useEffect(() => {
        if (isApprovalPending) {
            console.log('Approval transaction pending...');
            setTransactionStates(prev => ({
                ...prev,
                [pendingPlanId]: {
                    isPending: true,
                    isConfirming: false,
                    isConfirmed: false,
                    error: false,
                    hash: null
                }
            }));
        }
    }, [isApprovalPending, pendingPlanId]);

    useEffect(() => {
        if (isApprovalConfirmed && needsApproval) {
            setNeedsApproval(false);
            processPendingPayment();
        }
    },
        [isApprovalConfirmed, needsApproval, processPendingPayment]);

    useEffect(() => {
        console.log('Connection status:', {
            isConnected,
            chainId,
            expectedChainId: ZKSYNC_SEPOLIA_TESTNET.id,
            enabled: isConnected && chainId === ZKSYNC_SEPOLIA_TESTNET.id
        });

        console.log('ETH Price Feed:', {
            data: ethPriceData,
            error: ethPriceError,
            errorData: ethPriceErrorData,
            isLoading: isLoadingPrice
        });
    }, [isConnected, chainId, ethPriceData, ethPriceError, ethPriceErrorData, isLoadingPrice]);

    useEffect(() => {
        processPendingPayment();
    }, [isConnected, chainId, pendingPlanId, ethPriceData, linkPriceData, writeContract, plans, isETH, address, allowanceData, processPendingPayment]);

    useEffect(() => {
        console.log('Transaction state:', { isConfirming, isConfirmed, error, hash, pendingPlanId, handledError, handledSuccess });

        if (error && pendingPlanId !== null && !handledError) {  // Check handledError instead of modalState
            console.log('Transaction failed:', error);
            const failedId = pendingPlanId;

            setFailedPlanId(failedId);
            setHandledError(true);  // Mark this error as handled
            let errorMessage;
            if (error.code === 'INSUFFICIENT_BALANCE') {
                errorMessage = 'Insufficient LINK balance. Please add LINK tokens to your wallet.';
            } else if (error.code === 'ACTION_REJECTED') {
                errorMessage = 'Transaction was rejected. Please try again.';
            } else {
                errorMessage = 'Transaction failed. Please try again.';
            }
            setTransactionStates(prev => ({
                ...prev,
                [failedId]: {
                    isPending: false,
                    isConfirming: false,
                    isConfirmed: false,
                    error: true,
                    hash: null
                }
            }));

            setModalState({
                isOpen: true,
                status: 'error',
                hash: null,
                failedPlan: failedId,
                errorMessage
            });
            setPendingPlanId(null);
        } else if (isConfirmed && hash && !handledSuccess) {

            console.log('Transaction confirmed:', hash);
            setHandledSuccess(true);
            setTransactionStates(prev => ({
                ...prev,
                [pendingPlanId]: {
                    isPending: false,
                    isConfirming: false,
                    isConfirmed: true,
                    error: false,
                    hash
                }
            }));
            setModalState({
                isOpen: true,
                status: 'success',
                hash
            });
        }
    }, [isConfirming, isConfirmed, error, hash, pendingPlanId, handledError, handledSuccess]);
    const handlePayment = async (planId) => {
        writeContract.reset?.();
        // First, check if we're already in an error state and if so, reset everything
        if (transactionStates[planId]?.error) {
            setTransactionStates({});
            setPendingPlanId(null);
            setFailedPlanId(null);
            setHandledError(false);
            setModalState({
                isOpen: false,
                status: null,
                hash: null
            });
            return; // Return here to prevent the rest of the function from executing
        }

        try {
            if (!isConnected) {
                await connect({ connector: metaMask() });
            }

            if (chainId !== ZKSYNC_SEPOLIA_TESTNET.id) {
                await switchToZkSync();
            }

            // Set pending state only after connection checks
            setPendingPlanId(planId);

        } catch (error) {
            console.error("Setup failed:", error);
            setFailedPlanId(planId);
            setTransactionStates(prev => ({
                ...prev,
                [planId]: {
                    isPending: false,
                    isConfirming: false,
                    isConfirmed: false,
                    error: true,
                    hash: null
                }
            }));
            setModalState({
                isOpen: true,
                status: 'error',
                hash: null
            });
            setPendingPlanId(null);
        }
    };

    return (
        <section>
            <Element name="pricing">
                <div className="container">
                    <div className="max-w-960 pricing-head_before relative mx-auto border-l border-r border-s2 bg-s1/50 pb-40 pt-28 max-xl:max-w-4xl max-lg:border-none max-md:pb-32 max-md:pt-16">
                        <h3 className="h3 max-lg:h4 max-md:h5 z-3 relative mx-auto mb-14 max-w-lg text-center text-p4 max-md:mb-11 max-sm:max-w-sm">
                            Choose Your <br />Coffee Size
                        </h3>

                        <div className="relative z-4 mx-auto flex w-[375px] rounded-3xl border-[3px] border-s4/25 bg-s1/50 p-2 backdrop-blur-[6px] max-md:w-[310px]">
                            <button
                                className={clsx("pricing-head_btn", isETH && "text-p4")}
                                onClick={() => {
                                    setIsSwitchingCurrency(true);
                                    setIsETH(true);
                                    // Reset after animation duration
                                    setTimeout(() => setIsSwitchingCurrency(false), 400);
                                }}
                                disabled={isPending || isConfirming || isFetchingPrice || pendingPlanId !== null}
                            >
                                Pay in ETH
                            </button>
                            <button
                                className={clsx("pricing-head_btn", !isETH && "text-p4")}
                                onClick={() => {
                                    setIsSwitchingCurrency(true);
                                    setIsETH(false);
                                    // Reset after animation duration
                                    setTimeout(() => setIsSwitchingCurrency(false), 400);
                                }}
                                disabled={isPending || isConfirming || isFetchingPrice || pendingPlanId !== null}
                            >
                                Pay in LINK
                            </button>

                            <div
                                className={clsx(
                                    "g4 rounded-14 before:h-100 pricing-head_btn_before absolute left-2 top-2 h-[calc(100%-16px)] w-[calc(50%-8px)] overflow-hidden shadow-400 transition-transform duration-500",
                                    !isETH && "translate-x-full",
                                )}
                            />
                        </div>

                        <div className="pricing-bg">
                            <img
                                src="/images/bg-outlines.svg"
                                width={960}
                                height={380}
                                alt="outline"
                                className="relative z-2"
                            />
                            <img
                                src="/images/bg-outlines-fill.png"
                                width={960}
                                height={380}
                                alt="outline"
                                className="absolute inset-0 opacity-5 mix-blend-soft-light"
                            />
                        </div>
                    </div>

                    <div className="scroll-hide relative z-2 -mt-12 flex items-start max-xl:gap-5 max-xl:overflow-auto max-xl:pt-6">
                        {plans.map((plan, index) => (
                            <div
                                key={plan.id}
                                className="pricing-plan_first pricing-plan_last pricing-plan_odd pricing-plan_even relative border-2 p-7 max-xl:min-w-80 max-lg:rounded-3xl xl:w-[calc(33.33%+2px)]"
                            >
                                {index === 1 && (
                                    <div className="g4 absolute h-330 left-0 right-0 top-0 z-1 rounded-tl-3xl rounded-tr-3xl" />
                                )}

                                <div
                                    className={clsx(
                                        "absolute left-0 right-0 z-2 flex items-center justify-center",
                                        index === 1 ? "-top-6" : "-top-6 xl:-top-11",
                                    )}
                                >
                                    <img
                                        src={plan.logo}
                                        alt={plan.title}
                                        className={clsx(
                                            "object-contain drop-shadow-2xl",
                                            index === 1 ? "size-[120px]" : "size-[88px]",
                                        )}
                                    />
                                </div>

                                <div
                                    className={clsx(
                                        "relative flex flex-col items-center",
                                        index === 1 ? "pt-24" : "pt-12",
                                    )}
                                >
                                    <div
                                        className={clsx(
                                            "small-2 rounded-20 relative z-2 mx-auto mb-6 border-2 px-4 py-1.5 uppercase",
                                            index === 1 ? "border-p3 text-p3" : "border-p1 text-p1",
                                        )}
                                    >
                                        {plan.title}
                                    </div>

                                    <div className="relative z-2 flex items-center justify-center">
                                        <div
                                            className={clsx(
                                                "h-num flex items-start",
                                                index === 1 ? "text-p3" : "text-p4",
                                            )}
                                        >
                                            ${" "}
                                            <CountUp
                                                start={!isETH ? plan.PriceETH : plan.PriceLINK}
                                                end={isETH ? plan.PriceETH : plan.PriceLINK}
                                                duration={0.4}
                                                useEasing={false}
                                                preserveValue
                                            />
                                            <div className="small-1 relative top-3 ml-1 uppercase">
                                                in {isETH ? 'ETH' : 'LINK'}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className={clsx(
                                        "body-1 relative z-2 mb-10 w-full border-b-s2 pb-9 text-center text-p4",
                                        index === 1 && "border-b",
                                    )}
                                >
                                    {plan.caption}
                                </div>

                                <ul className="mx-auto space-y-4 xl:px-7">
                                    {plan.features.map((feature) => (
                                        <li
                                            key={feature}
                                            className="relative flex items-center gap-5"
                                        >
                                            <img
                                                src={"/images/check.png"}
                                                alt="check"
                                                className="size-10 object-contain"
                                            />
                                            <p className="flex-1">{feature}</p>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-10 flex w-full justify-center">
                                    <Button
                                        icon={plan.icon}
                                        onClick={() => handlePayment(plan.id)}
                                        disabled={isPending || isConfirming || isFetchingPrice || pendingPlanId !== null || transactionStates[plan.id]?.error}
                                    >
                                        {console.log('Button state:', {
                                            planId: plan.id,
                                            state: transactionStates[plan.id],
                                            isPending,
                                            isConfirming,
                                            isSwitchingCurrency
                                        })}
                                        {transactionStates[plan.id]?.isPending ? 'Processing...'
                                            : transactionStates[plan.id]?.isConfirming ? 'Confirming...'
                                                : transactionStates[plan.id]?.error ? (
                                                    <span className="flex items-center gap-2">
                                                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                        Payment Failed!
                                                    </span>
                                                )
                                                    : transactionStates[plan.id]?.isConfirmed ? (
                                                        <span className="flex items-center gap-2">
                                                            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                            Payment Success!
                                                        </span>
                                                    )
                                                        : isSwitchingCurrency
                                                            ? <AnimatedPrice planId={plan.id} isETH={isETH} />
                                                            : <PricingButtonLabel planId={plan.id} isETH={isETH} />
                                        }
                                    </Button>
                                </div>

                                {index === 1 && (
                                    <p className="small-compact mt-9 text-center text-p3 before:mx-2.5 before:content-['-'] after:mx-2.5 after:content-['-']">
                                        Most popular choice
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </Element>
            <TransactionModal
                isOpen={modalState.isOpen}
                onClose={handleModalClose}  // Use the new handler instead of the inline function
                status={modalState.status}
                hash={modalState.hash}
                errorMessage={modalState.errorMessage}
            />

        </section>
    );
};

export default Pricing;