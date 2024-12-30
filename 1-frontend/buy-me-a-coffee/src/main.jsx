import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { metaMask } from 'wagmi/connectors';
import { ZKSYNC_SEPOLIA_TESTNET } from './utils/contractConfig';
import './index.css';
import App from './App.jsx';

// Create Wagmi config with correct chain configuration
const config = createConfig({
  chains: [ZKSYNC_SEPOLIA_TESTNET],
  connectors: [
    metaMask({
      chains: [ZKSYNC_SEPOLIA_TESTNET],
      shimDisconnect: true,
      shimChainChangedNavigate: true,
    }),
  ],
  transports: {
    [ZKSYNC_SEPOLIA_TESTNET.id]: http(ZKSYNC_SEPOLIA_TESTNET.rpcUrls.alchemy.http[0], {
      batch: true,
      fetchOptions: {
        headers: {
          'Content-Type': 'application/json',
        },
      },
      retryCount: 3,
      timeout: 15000,
    }),
  },
});

// Create React Query client with specific configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5000,
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>
);