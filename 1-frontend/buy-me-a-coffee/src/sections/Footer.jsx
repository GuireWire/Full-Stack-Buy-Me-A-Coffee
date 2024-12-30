import React from "react";
import Button from "../components/Button.jsx";

const Footer = () => {
    return (
        <footer className="relative pb-16 pt-16 max-md:py-10">
            <div className="container">
                <div className="flex items-center justify-center gap-12 max-md:flex-wrap">
                    {/* ZKSync Logo */}
                    <a
                        href="https://zksync.io/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-opacity duration-500 hover:opacity-70"
                    >
                        <img
                            src="/images/logos/zksync.svg"
                            alt="ZKSync"
                            className="h-12 w-auto object-contain"
                        />
                    </a>

                    {/* MetaMask Logo */}
                    <a
                        href="https://metamask.io/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-opacity duration-500 hover:opacity-70"
                    >
                        <img
                            src="/images/logos/metamask.svg"
                            alt="MetaMask"
                            className="h-12 w-auto object-contain"
                        />
                    </a>

                    {/* Buy Me A Coffee Logo */}
                    <a
                        href="https://www.buymeacoffee.store/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-opacity duration-500 hover:opacity-70"
                    >
                        <img
                            src="/images/buymeacoffee.svg"
                            alt="Buy Me A Coffee"
                            className="h-16 object-contain"
                        />
                    </a>

                    {/* Powered by Guire Button */}
                    <Button
                        href="https://x.com/GuireWire"
                        containerClassName="text-center z-10 relative"
                    >
                        Powered by Guire
                    </Button>

                    {/* Social Media Icons */}
                    <div className="flex items-center gap-6">
                        {/* X (formerly Twitter) */}
                        <a
                            href="https://x.com/GuireWire"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full border border-gray-500 p-3 hover:opacity-70"
                        >
                            <img
                                src="/images/socials/x.svg"
                                alt="X (formerly Twitter)"
                                className="h-6 w-6 object-contain"
                            />
                        </a>

                        {/* GitHub */}
                        <a
                            href="https://github.com/GuireWire"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full border border-gray-500 p-3 hover:opacity-70"
                        >
                            <img
                                src="/images/socials/github.svg"
                                alt="GitHub"
                                className="h-6 w-6 object-contain"
                            />
                        </a>

                        {/* Discord */}
                        <a
                            href="https://discordapp.com/users/1233905621250605206"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full border border-gray-500 p-3 hover:opacity-70"
                        >
                            <img
                                src="/images/socials/discord.svg"
                                alt="Discord"
                                className="h-6 w-6 object-contain"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
