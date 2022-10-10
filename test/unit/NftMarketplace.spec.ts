import { assert, expect } from "chai"
import { BigNumber, Signer } from "ethers"
import { deployments, ethers, getNamedAccounts, network } from "hardhat"
import { Address } from "hardhat-deploy/types"
import { developmentChains } from "../../helper-hardhat-config"
import { BasicNft, NftMarketplace } from "../../typechain"

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("NftMarketplace", () => {
      let nftMarketplace: NftMarketplace
      let nftMarketPlaceWithnftBuyer: NftMarketplace
      let basicNft: BasicNft
      let nftBuyer: Address
      let deployer: Address
      const NFT_Price = ethers.utils.parseEther("0.01")

      beforeEach(async () => {
        await deployments.fixture(["all"])
        const namedAccounts = await getNamedAccounts()
        nftBuyer = namedAccounts.nftBuyer
        deployer = namedAccounts.deployer
        nftMarketplace = await ethers.getContract("NftMarketplace")
        basicNft = await ethers.getContract("BasicNft")
        // mint some NFTs
        const mintNftTx = await basicNft.mintNft()
        await mintNftTx.wait(1)
        // approve the marketplace
        const setApprovalForAllTx = await basicNft.approve(nftMarketplace.address, 0)
        setApprovalForAllTx.wait(1)
        // non nft owner nftMarketPlace
        const nftBuyerSigner = await ethers.getSigner(nftBuyer)
        nftMarketPlaceWithnftBuyer = nftMarketplace.connect(nftBuyerSigner)
      })

      describe("listItem", () => {
        it("Should revert if is not owner", async () => {
          const tx = nftMarketPlaceWithnftBuyer.listItem(basicNft.address, 0, NFT_Price)
          await expect(tx).to.be.revertedWithCustomError(
            nftMarketPlaceWithnftBuyer,
            "NftMarketplace__NotOwner"
          )
        })
        it("Should revert if the NFT is already listed", async () => {
          await nftMarketplace.listItem(basicNft.address, 0, NFT_Price)
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

      describe.only("buyItem", () => {
        beforeEach(async () => {
          await nftMarketplace.listItem(basicNft.address, 0, NFT_Price)
        })

        it("Should revert if the NFT price is not met", async () => {
          const tx = nftMarketPlaceWithnftBuyer.buyItem(basicNft.address, 0)
          await expect(tx).to.be.revertedWithCustomError(
            nftMarketplace,
            "NftMarketplace__PriceNotMet"
          )
        })

        it("Shouldn't allow the NFT owner to buy his own NFT", async () => {
          const tx = nftMarketplace.buyItem(basicNft.address, 0, {
            value: NFT_Price,
          })
          await expect(tx).to.be.revertedWithCustomError(
            nftMarketplace,
            "NftMarketplace__OwnerCannotBuyHisOwnNft"
          )
        })

        it("Should revert if the NFT is not listed", async () => {
          const tx = nftMarketplace.buyItem(basicNft.address, 1, {
            value: NFT_Price,
          })
          await expect(tx).to.be.revertedWithCustomError(
            nftMarketplace,
            "NftMarketplace__NftNotListed"
          )
        })

        it("Should allow a non owner to buy a listed NFT", async () => {
          const tx = nftMarketPlaceWithnftBuyer.buyItem(basicNft.address, 0, {
            value: NFT_Price,
          })
          await expect(tx)
            .to.emit(nftMarketPlaceWithnftBuyer, "ItemBough")
            .withArgs(nftBuyer, basicNft.address, 0, NFT_Price)
          const proceeds = await nftMarketPlaceWithnftBuyer.getProceeds(deployer)
          const newNftOwner = await basicNft.ownerOf(0)
          const listing = await nftMarketPlaceWithnftBuyer.getListing(basicNft.address, 0)
          assert.equal(listing.price.toString(), ethers.constants.Zero.toString()) 
          assert.equal(listing.seller, ethers.constants.AddressZero) 
          assert.equal(proceeds.toString(), NFT_Price.toString())
          assert.equal(newNftOwner, nftBuyer)
        })
      })

      describe("cancelListing", () => {})

      describe("updateListing", () => {})

      describe("withdrawProceeds", () => {})
    })
