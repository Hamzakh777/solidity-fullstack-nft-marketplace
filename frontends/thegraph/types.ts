export type NetworkConfigItem = {
  NftMarketplace: string[]
}

export type NetworkConfigMap = {
  [chainId: string]: NetworkConfigItem
}