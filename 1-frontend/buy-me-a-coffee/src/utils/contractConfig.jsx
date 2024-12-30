import { erc20Abi } from 'viem'

export const ZKSYNC_SEPOLIA_TESTNET = {
    id: 300,
    name: 'zkSync Sepolia',
    network: 'zksync-sepolia',
    nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18
    },
    rpcUrls: {
        alchemy: { // Add this
            http: ['https://zksync-sepolia.g.alchemy.com/v2/89b-horFzmDQ4qvIFa7Z7uWys2VKfZhk'],
            webSocket: [`wss://zksync-sepolia.g.alchemy.com/v2/89b-horFzmDQ4qvIFa7Z7uWys2VKfZhk`]
        },
        default: {
            http: ['https://zksync-sepolia.g.alchemy.com/v2/89b-horFzmDQ4qvIFa7Z7uWys2VKfZhk']
        },
        public: {
            http: ['https://zksync-sepolia.g.alchemy.com/v2/89b-horFzmDQ4qvIFa7Z7uWys2VKfZhk']
        }
    },
    blockExplorers: {
        default: {
            name: 'zkSync Explorer',
            url: 'https://explorer.sepolia.era.zksync.dev'
        }
    },
    testnet: true
};

export const CONTRACT_CONFIG = {
    address: '0xbf07162188cC8D2D78A240D8f7F4941457fd4a9e',
    abi: [
        {
            "stateMutability": "payable",
            "type": "function",
            "name": "fund_five_ineth",
            "inputs": [],
            "outputs": []
        },
        {
            "stateMutability": "payable",
            "type": "function",
            "name": "fund_ten_ineth",
            "inputs": [],
            "outputs": []
        },
        {
            "stateMutability": "payable",
            "type": "function",
            "name": "fund_fifteen_ineth",
            "inputs": [],
            "outputs": []
        },
        {
            "stateMutability": "nonpayable",
            "type": "function",
            "name": "fund_three_inlink",
            "inputs": [
                {
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "outputs": []
        },
        {
            "stateMutability": "nonpayable",
            "type": "function",
            "name": "fund_seven_inlink",
            "inputs": [
                {
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "outputs": []
        },
        {
            "stateMutability": "nonpayable",
            "type": "function",
            "name": "fund_twelve_inlink",
            "inputs": [
                {
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "outputs": []
        },
        {
            "stateMutability": "nonpayable",
            "type": "function",
            "name": "withdraw_eth",
            "inputs": [],
            "outputs": []
        },
        {
            "stateMutability": "nonpayable",
            "type": "function",
            "name": "withdraw_link",
            "inputs": [],
            "outputs": []
        },
        {
            "stateMutability": "nonpayable",
            "type": "function",
            "name": "withdraw_all",
            "inputs": [],
            "outputs": []
        },
        {
            "stateMutability": "view",
            "type": "function",
            "name": "get_eth_to_usd_rate",
            "inputs": [
                {
                    "name": "eth_amount",
                    "type": "uint256"
                }
            ],
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ]
        },
        {
            "stateMutability": "view",
            "type": "function",
            "name": "get_link_to_usd_rate",
            "inputs": [
                {
                    "name": "link_amount",
                    "type": "uint256"
                }
            ],
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ]
        },
        {
            "stateMutability": "payable",
            "type": "fallback"
        },
        {
            "stateMutability": "view",
            "type": "function",
            "name": "MINIMUM_THREE_USD",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ]
        },
        {
            "stateMutability": "view",
            "type": "function",
            "name": "MINIMUM_FIVE_USD",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ]
        },
        {
            "stateMutability": "view",
            "type": "function",
            "name": "MINIMUM_SEVEN_USD",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ]
        },
        {
            "stateMutability": "view",
            "type": "function",
            "name": "MINIMUM_TEN_USD",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ]
        },
        {
            "stateMutability": "view",
            "type": "function",
            "name": "MINIMUM_TWELVE_USD",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ]
        },
        {
            "stateMutability": "view",
            "type": "function",
            "name": "MINIMUM_FIFTEEN_USD",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ]
        },
        {
            "stateMutability": "view",
            "type": "function",
            "name": "LINK_TOKEN",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ]
        },
        {
            "stateMutability": "view",
            "type": "function",
            "name": "ETH_PRICE_FEED",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ]
        },
        {
            "stateMutability": "view",
            "type": "function",
            "name": "LINK_PRICE_FEED",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ]
        },
        {
            "stateMutability": "view",
            "type": "function",
            "name": "OWNER",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ]
        },
        {
            "stateMutability": "view",
            "type": "function",
            "name": "eth_funders",
            "inputs": [
                {
                    "name": "arg0",
                    "type": "uint256"
                }
            ],
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ]
        },
        {
            "stateMutability": "view",
            "type": "function",
            "name": "link_funders",
            "inputs": [
                {
                    "name": "arg0",
                    "type": "uint256"
                }
            ],
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ]
        },
        {
            "stateMutability": "view",
            "type": "function",
            "name": "funder_to_amount_funded_ineth",
            "inputs": [
                {
                    "name": "arg0",
                    "type": "address"
                }
            ],
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ]
        },
        {
            "stateMutability": "view",
            "type": "function",
            "name": "funder_to_amount_funded_inlink",
            "inputs": [
                {
                    "name": "arg0",
                    "type": "address"
                }
            ],
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ]
        },
        {
            "stateMutability": "view",
            "type": "function",
            "name": "funder_to_coffees",
            "inputs": [
                {
                    "name": "arg0",
                    "type": "address"
                }
            ],
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ]
        },
        {
            "stateMutability": "nonpayable",
            "type": "constructor",
            "inputs": [
                {
                    "name": "eth_price_feed",
                    "type": "address"
                },
                {
                    "name": "link_price_feed",
                    "type": "address"
                },
                {
                    "name": "link_token",
                    "type": "address"
                }
            ],
            "outputs": []
        }
    ]
};

export const ETH_PRICE_FEED_CONFIG = {
    address: '0xfEefF7c3fB57d18C5C6Cdd71e45D2D0b4F9377bF',
    abi: [{ "inputs": [{ "internalType": "address", "name": "_aggregator", "type": "address" }, { "internalType": "address", "name": "_accessController", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "int256", "name": "current", "type": "int256" }, { "indexed": true, "internalType": "uint256", "name": "roundId", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "updatedAt", "type": "uint256" }], "name": "AnswerUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "roundId", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "startedBy", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "startedAt", "type": "uint256" }], "name": "NewRound", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }], "name": "OwnershipTransferRequested", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "inputs": [], "name": "acceptOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "accessController", "outputs": [{ "internalType": "contract AccessControllerInterface", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "aggregator", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_aggregator", "type": "address" }], "name": "confirmAggregator", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "description", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_roundId", "type": "uint256" }], "name": "getAnswer", "outputs": [{ "internalType": "int256", "name": "", "type": "int256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint80", "name": "_roundId", "type": "uint80" }], "name": "getRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_roundId", "type": "uint256" }], "name": "getTimestamp", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "latestAnswer", "outputs": [{ "internalType": "int256", "name": "", "type": "int256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "latestRound", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "latestRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "latestTimestamp", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint16", "name": "", "type": "uint16" }], "name": "phaseAggregators", "outputs": [{ "internalType": "contract AggregatorV2V3Interface", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "phaseId", "outputs": [{ "internalType": "uint16", "name": "", "type": "uint16" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_aggregator", "type": "address" }], "name": "proposeAggregator", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "proposedAggregator", "outputs": [{ "internalType": "contract AggregatorV2V3Interface", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint80", "name": "_roundId", "type": "uint80" }], "name": "proposedGetRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "proposedLatestRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_accessController", "type": "address" }], "name": "setController", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_to", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "version", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }]
};

export const LINK_PRICE_FEED_CONFIG = {
    address: '0x894423C43cD7230Cd22a47B329E96097e6355292',
    abi: [{ "inputs": [{ "internalType": "address", "name": "_aggregator", "type": "address" }, { "internalType": "address", "name": "_accessController", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "int256", "name": "current", "type": "int256" }, { "indexed": true, "internalType": "uint256", "name": "roundId", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "updatedAt", "type": "uint256" }], "name": "AnswerUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "roundId", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "startedBy", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "startedAt", "type": "uint256" }], "name": "NewRound", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }], "name": "OwnershipTransferRequested", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "inputs": [], "name": "acceptOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "accessController", "outputs": [{ "internalType": "contract AccessControllerInterface", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "aggregator", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_aggregator", "type": "address" }], "name": "confirmAggregator", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "description", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_roundId", "type": "uint256" }], "name": "getAnswer", "outputs": [{ "internalType": "int256", "name": "", "type": "int256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint80", "name": "_roundId", "type": "uint80" }], "name": "getRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_roundId", "type": "uint256" }], "name": "getTimestamp", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "latestAnswer", "outputs": [{ "internalType": "int256", "name": "", "type": "int256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "latestRound", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "latestRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "latestTimestamp", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint16", "name": "", "type": "uint16" }], "name": "phaseAggregators", "outputs": [{ "internalType": "contract AggregatorV2V3Interface", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "phaseId", "outputs": [{ "internalType": "uint16", "name": "", "type": "uint16" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_aggregator", "type": "address" }], "name": "proposeAggregator", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "proposedAggregator", "outputs": [{ "internalType": "contract AggregatorV2V3Interface", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint80", "name": "_roundId", "type": "uint80" }], "name": "proposedGetRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "proposedLatestRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_accessController", "type": "address" }], "name": "setController", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_to", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "version", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }]
};

export const LINK_TOKEN_CONFIG = {
    address: '0x23A1aFD896c8c8876AF46aDc38521f4432658d1e',
    abi: erc20Abi
};

// Helper function for switching networks
export const switchToZkSync = async () => {
    if (!window.ethereum) throw new Error('No wallet found');

    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: `0x${ZKSYNC_SEPOLIA_TESTNET.id.toString(16)}` }]
        });
    } catch (error) {
        if (error.code === 4902) {
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{
                        chainId: `0x${ZKSYNC_SEPOLIA_TESTNET.id.toString(16)}`,
                        chainName: ZKSYNC_SEPOLIA_TESTNET.name,
                        nativeCurrency: ZKSYNC_SEPOLIA_TESTNET.nativeCurrency,
                        rpcUrls: [ZKSYNC_SEPOLIA_TESTNET.rpcUrls.default.http[0]],
                        blockExplorerUrls: [ZKSYNC_SEPOLIA_TESTNET.blockExplorers.default.url]
                    }]
                });
            } catch (addError) {
                throw new Error('Failed to add network');
            }
        }
        throw error;
    }
};