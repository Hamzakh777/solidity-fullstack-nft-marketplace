import { ethers } from "hardhat"
import { NFT_PRICE } from "../helper-hardhat-config"
import { BasicNft, NftMarketplace } from "../typechain"

async function mintAndList(): Promise<void> {
  const nftMarketPlace: NftMarketplace = await ethers.getContract("NftMarketplace")
  const basicNft: BasicNft = await ethers.getContract("BasicNft")
  console.log("Minting....")
  const mintTx = await basicNft.mintNft()
  const mintTxReceipt = await mintTx.wait(1)
  const tokenId = (mintTxReceipt?.events as any)[0].args.tokenId
  console.log("Approving NFT....")
  const approvalTx = await basicNft.approve(nftMarketPlace.address, tokenId)
  await approvalTx.wait(1)
  console.log("Listing NFT....")
  const tx = await nftMarketPlace.listItem(basicNft.address, tokenId, NFT_PRICE)
  await tx.wait(1)
  console.log("Listed")
}

mintAndList()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
