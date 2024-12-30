# Buy Me A Coffee Full Stack Application

<p align="center">
  <img src="1-frontend/buy-me-a-coffee/public/images/buymeacoffee.svg" alt="Buy Me A Coffee Logo" width="300"/>
</p>

A Web3 application that allows supporters to buy virtual coffees using ETH or LINK tokens on the zkSync Sepolia testnet. Built with Vyper smart contracts and React/Tailwind CSS frontend.

🌐 **Live Site**: [buymeacoffee.store](https://buymeacoffee.store/)

## Tech Stack

### Backend
- **Smart Contract**: Vyper 0.4.0
  - Python Deployment
  - Moccasin smart contract testing and development framework
- **Network**: zkSync Sepolia Testnet
- **Features**:
  - ETH and LINK token payments
  - Chainlink Price Feeds integration
  - Dynamic pricing based on current token values
  - Secure withdrawal system

### Frontend
- **Framework**: Vite - React & JavaScript
- **Styling**: Tailwind CSS
- **Web3 Integration**: wagmi
- **Key Features**:
  - Metamask wallet integration
  - Real-time price updates
  - Responsive design
  - Transaction status tracking

## Core Features

### 1. Multiple Payment Options
- Pay with ETH ($5, $10, or $15)
- Pay with LINK ($3, $7, or $12)

### 2. Real-Time Price Conversion
- Uses Chainlink Price Feeds
- Automatically adjusts token amounts based on current prices

### 3. User Experience
- Seamless wallet connection
- Transaction status notifications
- Network switching support
- Mobile responsive design

## Smart Contract Features

- Token approval system for LINK payments
- Dynamic USD price conversion
- Secure fund withdrawal mechanisms
- Event tracking for transactions
- Multi-token support (ETH & LINK)

## Getting Started

1. Connect your MetaMask wallet
2. Switch to zkSync Sepolia testnet
3. Choose your preferred payment method (ETH/LINK)
4. Select coffee size
5. Confirm transaction

## Security Features

- CEI (Checks-Effects-Interactions) pattern implementation
- Access control for withdrawals
- Safe token transfer handling
- Price feed validation

## Contract Deployment

🔍 **View on zkSync Sepolia Explorer**: [0xbf07162188cC8D2D78A240D8f7F4941457fd4a9e](https://sepolia.explorer.zksync.io/address/0xbf07162188cC8D2D78A240D8f7F4941457fd4a9e)

## License

MIT