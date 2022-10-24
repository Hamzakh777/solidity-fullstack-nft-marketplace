import type { NextPage } from "next"
import { useMoralis, useMoralisQuery } from "react-moralis"
import { useEffect, useState } from "react"
import NFTBox from "../components/NFTBox"
import networkMapping from "../../../constants/networkMapping.json"
import { NetworkConfigMap } from "../types"
import { useQuery } from "@apollo/client"
import GET_ACTIVE_ITEMS from "../constants/subgraphQueries"

const PAGE_SIZE = 9

const Home: NextPage = () => {
    // TODO: Implement paging in UI
    const { chainId, account, isWeb3Enabled } = useMoralis()
    console.log("chainid", chainId)
    const chainString = chainId ? parseInt(chainId).toString() : "31337"
    const marketplaceAddress = (networkMapping as NetworkConfigMap)[chainString].NftMarketplace[0]
    const [page, setPage] = useState(1)

    const { error, loading: fetchingListedNfts, data: listedNfts } = useQuery(GET_ACTIVE_ITEMS)

    return (
        <div className="container mx-auto">
            <h1 className="py-4 px-4 font-bold text-2xl">Recently Listed</h1>
            <div className="flex flex-wrap">
                {isWeb3Enabled ? (
                    fetchingListedNfts || !listedNfts ? (
                        <div>Loading...</div>
                    ) : (
                        listedNfts.activeItems.map((nft /*, index*/) => {
                            console.log(nft.attributes)
                            const { price, nftAddress, tokenId, seller } = nft

                            return (
                                <NFTBox
                                    price={price}
                                    nftAddress={nftAddress}
                                    tokenId={tokenId}
                                    marketplaceAddress={marketplaceAddress}
                                    seller={seller}
                                    key={`${nftAddress}${tokenId}`}
                                />
                            )
                        })
                    )
                ) : (
                    <div>Web3 Currently Not Enabled </div>
                )}
            </div>
        </div>
    )
}
export default Home
