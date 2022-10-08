import { expect } from "chai"
import { BigNumber, Signer } from "ethers"
import { deployments, ethers, getNamedAccounts, network } from "hardhat"
import { Address } from "hardhat-deploy/types"
import { developmentChains } from "../../helper-hardhat-config"
import { BasicNft, NftMarketplace } from "../../typechain"

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("NftMarketplace", () => {
      let nftMarketplace: NftMarketplace
      let basicNft: BasicNft
      let nonNftOwner: Address
      const NFT_Price = ethers.utils.parseEther("0.01")

      beforeEach(async () => {
        await deployments.fixture(["all"])
        nonNftOwner = (await getNamedAccounts()).nonNftOwner
        nftMarketplace = await ethers.getContract("NftMarketplace")
        basicNft = await ethers.getContract("BasicNft")
        // mint some NFTs
        const mintNftTx = await basicNft.mintNft()
        await mintNftTx.wait(1)
        // approve the marketplace
        const setApprovalForAllTx = await basicNft.approve(nftMarketplace.address, 0)
        setApprovalForAllTx.wait(1)
      })

      describe.only("listItem", () => {
        it("Should revert if is not owner", async () => {
          const signer = await ethers.getSigner(nonNftOwner)
          const nftMarketPlaceWithNonNftOwner = nftMarketplace.connect(signer)
          const tx = nftMarketPlaceWithNonNftOwner.listItem(basicNft.address, 0, NFT_Price)
          await expect(tx).to.be.revertedWithCustomError(
            nftMarketPlaceWithNonNftOwner,
            "NftMarketplace__NotOwner"
          )
        })
        it("Should revert if the NFT is already listed", async () => {
          const listItemTx1 = await nftMarketplace.listItem(basicNft.address, 0, NFT_Price)
          const listItemTx2 = nftMarketplace.listItem(basicNft.address, 0, NFT_Price)
          await expect(listItemTx2).to.be.revertedWithCustomError(
            nftMarketplace,
            "NftMarketplace__AlreadyListed"
          )
        })
        it("Should revert if the marketplace is not approved", async () => {
          await basicNft.approve(ethers.constants.AddressZero, 0)
          const tx = nftMarketplace.listItem(basicNft.address, 0, NFT_Price)
          await expect(tx).to.be.revertedWithCustomError(
            nftMarketplace,
            "NftMarketplace__NotApprovedForMarketplace"
          )
        })
        it("Should revert if the NFT price is 0", async () => {
          const tx = nftMarketplace.listItem(basicNft.address, 0, BigNumber.from("0"))
          await expect(tx).to.be.revertedWithCustomError(
            nftMarketplace,
            "NftMarketplace__PriceMustBeAboveZero"
          )
        })
      })

      describe("buyItem", () => {})

      describe("cancelListing", () => {})

      describe("updateListing", () => {})

      describe("withdrawProceeds", () => {})
    })
