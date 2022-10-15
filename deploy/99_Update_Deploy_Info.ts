import {
  FRONT_END_CONTRACT_FILE,
  FRONT_END_CONTRACT_FILE_2,
  FRONT_END_ABI_LOCATION,
  FRONT_END_ABI_LOCATION_2,
} from "../helper-hardhat-config"
import "dotenv/config"
import fs from "fs"
import { network, ethers } from "hardhat"
import {DeployFunction} from "hardhat-deploy/types"
import {HardhatRuntimeEnvironment} from "hardhat/types"

const updateFrontEnd: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  if (process.env.UPDATE_FRONT_END) {
      console.log("Writing to front end...")
      await updateContractAddresses()
      await updateAbi()
      console.log("Front end written!")
  }
}

async function updateAbi() {
  const nftMarketplace = await ethers.getContract("NftMarketplace")
  fs.writeFileSync(
      `${FRONT_END_ABI_LOCATION}NftMarketplace.json`,
      nftMarketplace.interface.format(ethers.utils.FormatTypes.json).toString()
  )
  fs.writeFileSync(
      `${FRONT_END_ABI_LOCATION_2}NftMarketplace.json`,
      nftMarketplace.interface.format(ethers.utils.FormatTypes.json).toString()
  )

  const basicNft = await ethers.getContract("BasicNft")
  fs.writeFileSync(
      `${FRONT_END_ABI_LOCATION}BasicNft.json`,
      basicNft.interface.format(ethers.utils.FormatTypes.json).toString()
  )
  fs.writeFileSync(
      `${FRONT_END_ABI_LOCATION_2}BasicNft.json`,
      basicNft.interface.format(ethers.utils.FormatTypes.json).toString()
  )
}

async function updateContractAddresses() {
  const chainId = network.config.chainId!.toString()
  const nftMarketplace = await ethers.getContract("NftMarketplace")
  const contractAddresses = JSON.parse(fs.readFileSync(FRONT_END_CONTRACT_FILE, "utf8"))
  if (chainId in contractAddresses) {
      if (!contractAddresses[chainId]["NftMarketplace"].includes(nftMarketplace.address)) {
          contractAddresses[chainId]["NftMarketplace"].push(nftMarketplace.address)
      }
  } else {
      contractAddresses[chainId] = { NftMarketplace: [nftMarketplace.address] }
  }
  fs.writeFileSync(FRONT_END_CONTRACT_FILE, JSON.stringify(contractAddresses))
  fs.writeFileSync(FRONT_END_CONTRACT_FILE_2, JSON.stringify(contractAddresses))
}
export default updateFrontEnd
updateFrontEnd.tags = ["all", "frontend"]