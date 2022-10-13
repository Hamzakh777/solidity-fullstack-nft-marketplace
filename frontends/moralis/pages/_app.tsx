import "../styles/globals.css"
import type { AppProps } from "next/app"
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { createClient, configureChains, defaultChains, WagmiConfig, chain } from 'wagmi';

const { chains, provider, webSocketProvider } = configureChains(
  [chain.hardhat],
  [jsonRpcProvider({
    rpc: (chain) => ({
      http: 'http://127.0.0.1:8545/'
    })
  })]
)

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <Component {...pageProps} />
    </WagmiConfig>
  )
}

export default MyApp
