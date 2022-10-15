import Link from "next/link"
import { useAccount, useConnect } from "wagmi"
import { InjectedConnector } from "wagmi/connectors/injected"

interface HeaderProps {}

export const Header = (props: HeaderProps) => {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })

  const handleConnectClick = () => {
    connect()
  }

  return (
    <nav className="p-5 border-b-2 flex flex-row justify-between items-center">
      <h1 className="py-4 px-4 font-bold text-3xl">NFT Marketplace</h1>
      <div className="flex flex-row items-center">
        <Link href="/">
          <a className="mr-4 p-6">NFT Marketplace</a>
        </Link>
        <Link href="/sell-nft">
          <a className="mr-4 p-6">NFT Marketplace</a>
        </Link>
        {isConnected ? "connected" : <button onClick={handleConnectClick}>Connect</button>}
      </div>
    </nav>
  )
}