import { Element } from "react-scroll";
import { Marker } from "../components/Marker.jsx";
import { createThirdwebClient } from "thirdweb";
import { ConnectButton } from "thirdweb/react";
import { darkTheme } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";

const Download = () => {
    const client = createThirdwebClient({
        clientId: "YOUR_CLIENT_ID",
    });

    const wallets = [
        createWallet("io.metamask"),
        createWallet("com.coinbase.wallet"),
        createWallet("com.trustwallet.app"),
        createWallet("app.phantom"),
        createWallet("com.brave.wallet"),
    ];

    return (
        <section>
            <Element
                name="connect"
                className="g7 relative pb-32 pt-24 max-lg:pb-24 max-md:py-16"
            >
                <div className="container">
                    <div className="flex items-center">
                        <div className="relative mr-6 flex-540 max-xl:flex-280 max-lg:flex256 max-md:flex-100">
                            <div className="mb-10">
                                <img
                                    src="/images/your-logo.svg"
                                    width={160}
                                    height={55}
                                    alt="Your Logo"
                                />
                            </div>

                            <p className="body-1 mb-10 max-w-md">
                                Connect your wallet to start supporting content creators with crypto.
                                Quick, secure, and decentralized.
                            </p>

                            <div className="connect-wallet-container">
                                <ConnectButton
                                    client={client}
                                    wallets={wallets}
                                    theme={darkTheme({
                                        colors: {
                                            modalBg: "hsl(40, 15%, 16%)",
                                            borderColor: "hsl(43, 13%, 27%)",
                                            accentText: "hsl(35, 72%, 77%)",
                                            primaryText: "hsl(38, 61%, 86%)",
                                            secondaryText: "hsl(33, 47%, 29%)",
                                            selectedTextColor: "hsl(26, 13%, 11%)",
                                            connectedButtonBg: "hsl(26, 13%, 11%)",
                                            connectedButtonBgHover: "hsl(26, 13%, 11%)",
                                            primaryButtonText: "hsl(26, 13%, 11%)",
                                            inputAutofillBg: "hsl(26, 13%, 11%)",
                                            primaryButtonBg: "hsl(26, 13%, 11%)",
                                            tertiaryBg: "hsl(26, 13%, 11%)",
                                        },
                                    })}
                                    connectModal={{ size: "wide" }}
                                />
                            </div>
                        </div>

                        <div className="mb-10 max-md:hidden">
                            <div className="download_preview-before download_preview-after rounded-40 relative w-[955px] border-2 border-s5 p-6">
                                <div className="relative rounded-3xl bg-s1 px-6 pb-6 pt-14">
                                    <span className="download_preview-dot left-6 bg-p2" />
                                    <span className="download_preview-dot left-11 bg-s3" />
                                    <span className="download_preview-dot left-16 bg-p1/15" />

                                    <img
                                        src="/images/wallet-preview.jpg" // Update with your wallet connection preview image
                                        width={855}
                                        height={655}
                                        alt="wallet connection preview"
                                        className="rounded-xl"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Element>
        </section>
    );
};

export default Download;