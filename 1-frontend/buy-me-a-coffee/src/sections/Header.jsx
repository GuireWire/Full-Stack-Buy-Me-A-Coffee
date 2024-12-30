import { Link as LinkScroll } from 'react-scroll';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useAccount, useConnect, useDisconnect, useChainId } from 'wagmi';
import { metaMask } from 'wagmi/connectors';
import '../index.css';

const ZKSYNC_SEPOLIA_TESTNET = {
    chainId: `0x12c`, // 300 in hex
    chainName: 'zkSync Sepolia Testnet',
    nativeCurrency: {
        name: 'Ethereum',
        symbol: 'ETH',
        decimals: 18
    },
    rpcUrls: ['https://zksync-sepolia.g.alchemy.com/v2/89b-horFzmDQ4qvIFa7Z7uWys2VKfZhk'],
    blockExplorerUrls: ['https://explorer.sepolia.era.zksync.dev']
};

const Header = () => {
    const [hasScrolled, setHasScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isSwitchingNetwork, setIsSwitchingNetwork] = useState(false);
    const [isDisconnecting, setIsDisconnecting] = useState(false);
    const { address, isConnected } = useAccount();
    const { connect } = useConnect();
    const { disconnect } = useDisconnect();
    const chainId = useChainId();

    useEffect(() => {
        const handleScroll = () => {
            setHasScrolled(window.scrollY > 32);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Add network change listener
    useEffect(() => {
        if (window.ethereum) {
            const handleChainChanged = () => {
                setIsSwitchingNetwork(true);
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            };

            window.ethereum.on('chainChanged', handleChainChanged);
            return () => {
                window.ethereum.removeListener('chainChanged', handleChainChanged);
            };
        }
    }, []);

    // Add disconnect completion listener
    useEffect(() => {
        if (!isConnected && isDisconnecting) {
            setIsDisconnecting(false);
        }
    }, [isConnected, isDisconnecting]);

    const addZkSyncNetwork = async () => {
        try {
            await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [ZKSYNC_SEPOLIA_TESTNET]
            });
        } catch (error) {
            console.error('Error adding zkSync network:', error);
        }
    };

    const switchToZkSync = async () => {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: ZKSYNC_SEPOLIA_TESTNET.chainId }]
            });
        } catch (error) {
            if (error.code === 4902) {
                await addZkSyncNetwork();
            } else {
                console.error('Error switching to zkSync:', error);
            }
        }
    };

    // Check network on connection
    useEffect(() => {
        if (isConnected) {
            const checkAndSwitchNetwork = async () => {
                try {
                    const currentChainId = await window.ethereum.request({
                        method: 'eth_chainId'
                    });
                    if (currentChainId !== ZKSYNC_SEPOLIA_TESTNET.chainId) {
                        await switchToZkSync();
                    }
                } catch (error) {
                    console.error('Error checking/switching network:', error);
                }
            };
            checkAndSwitchNetwork();
        }
    }, [isConnected]);

    const handleWalletClick = async () => {
        if (isConnected) {
            if (chainId !== parseInt(ZKSYNC_SEPOLIA_TESTNET.chainId, 16)) {
                await switchToZkSync();
            } else {
                if (!isDisconnecting) {  // Prevent multiple disconnect attempts
                    setIsDisconnecting(true);
                    try {
                        // Create a promise that resolves after 3 seconds
                        await new Promise(resolve => setTimeout(resolve, 3000));
                        await disconnect();  // Wait for disconnect to complete
                    } catch (error) {
                        console.error('Error disconnecting:', error);
                    } finally {
                        setIsDisconnecting(false);
                    }
                }
            }
        } else {
            try {
                await connect({ connector: metaMask() });
                await switchToZkSync();
            } catch (error) {
                console.error('Connection error:', error);
            }
        }
    };

    const NavLink = ({ title }) => (
        <LinkScroll
            onClick={() => setIsOpen(false)}
            to={title}
            offset={-100}
            spy
            smooth
            activeClass="nav-active"
            className="base-bold text-p4 uppercase transition-colors duration-500 cursor-pointer hover:text-p1 max-lg:my-4 max-lg:h5"
        >
            {title}
        </LinkScroll>
    );

    const WalletButton = () => {
        const getButtonText = () => {
            if (isDisconnecting) return 'Disconnecting...';
            if (!isConnected) return 'Connect MetaMask';
            if (isSwitchingNetwork) return 'Switching Network...';

            const currentChainId = typeof chainId === 'string'
                ? parseInt(chainId, 16)
                : chainId;
            const targetChainId = parseInt(ZKSYNC_SEPOLIA_TESTNET.chainId, 16);

            if (currentChainId !== targetChainId) {
                return 'Switch Network';
            }
            return `${address?.substring(0, 6)}...${address?.substring(38)}`;
        };

        return (
            <button
                onClick={handleWalletClick}
                disabled={isSwitchingNetwork || isDisconnecting}
                className={clsx(
                    "relative flex items-center min-h-[60px] px-4 g4 rounded-2xl inner-before group-hover:before:opacity-100 overflow-hidden",
                    (isSwitchingNetwork || isDisconnecting) && "cursor-not-allowed opacity-70"
                )}
            >
                {(isSwitchingNetwork || isDisconnecting) ? (
                    <div className="w-6 h-6 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                    <img
                        src="/images/wallet/metamasklogo.svg"
                        alt="MetaMask"
                        className="w-6 h-6 mr-2"
                    />
                )}
                <span className="relative z-2 font-poppins base-bold text-p4 uppercase">
                    {getButtonText()}
                </span>
            </button>
        );
    };

    return (
        <header
            className={clsx(
                "fixed top-0 left-0 z-50 w-full py-10 transition-all duration-500 max-lg:py-4",
                hasScrolled && "py-2 bg-[#1F1B18] backdrop-blur-[8px]"
            )}
        >
            <div className="container flex h-14 items-center max-lg:px-5">
                <a className="lg:hidden flex-1 cursor-pointer z-2">
                    <img src="/images/buymeacoffee.svg" width={115} height={55} alt="logo" />
                </a>

                <div
                    className={clsx(
                        "w-full max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:w-full max-lg:bg-s2 max-lg:opacity-0",
                        isOpen ? "max-lg:opacity-100" : "max-lg:pointer-events-none"
                    )}
                >
                    <div className="max-lg:relative max-lg:flex max-lg:flex-col max-lg:min-h-screen max-lg:p-6 max-lg:overflow-hidden sidebar-before max-md:px-4">
                        <nav className="max-lg:relative max-lg:z-2 max-lg:my-auto">
                            <ul className="flex max-lg:block max-lg:px-12">
                                <li className="nav-li">
                                    <NavLink title="features" />
                                    <div className="dot" />
                                    <NavLink title="pricing" />
                                    <div className="dot" />
                                </li>

                                <li className="nav-logo">
                                    <LinkScroll
                                        to="hero"
                                        offset={-250}
                                        spy
                                        smooth
                                        className={clsx(
                                            "max-lg:hidden transition-transform duration-500 cursor-pointer"
                                        )}
                                    >
                                        <img
                                            src="/images/buymeacoffee.svg"
                                            width={160}
                                            height={55}
                                            alt="logo"
                                        />
                                    </LinkScroll>
                                </li>

                                <li className="nav-li">
                                    <NavLink title="articles" />
                                    <div className="relative p-0.5 g5 rounded-2xl shadow-500 group">
                                        <WalletButton />
                                    </div>
                                </li>
                            </ul>
                        </nav>

                        <div className="lg:hidden block absolute top-1/2 left-0 w-[960px] h-[380px] translate-x-[-290px] -translate-y-1/2 rotate-90">
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
                                className="absolute inset-0 mix-blend-soft-light opacity-5"
                            />
                        </div>
                    </div>
                </div>

                <button
                    className="lg:hidden z-2 size-10 border-2 border-s4/25 rounded-full flex justify-center items-center"
                    onClick={() => setIsOpen((prevState) => !prevState)}
                >
                    <img
                        src={`/images/${isOpen ? "close" : "magic"}.svg`}
                        alt="magic"
                        className="size-1/2 object-contain"
                    />
                </button>
            </div>
        </header>
    );
};

export default Header;