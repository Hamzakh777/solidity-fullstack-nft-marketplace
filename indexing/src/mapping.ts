import { Address, BigInt } from "@graphprotocol/graph-ts"
import {
  ItemBought as ItemBoughtEvent,
  ListingDeleted as ListingDeletedEvent,
  ItemListed as ItemListedEvent,
  ItemListed,
} from "../generated/NftMarketplace/NftMarketplace"
import { ItemList, ActiveItem, ItemBought, ListingDeleted } from "../generated/schema"

export function handleItemBought(event: ItemBoughtEvent): void {
  // save the event in our graph
  // update our activeItems
  // get or create an itemListed object
  // each item needs a unique Id
  let itemBought = ItemBought.load(getIdFromEventParams(event.params.tokenId, event.params.nftAddress))
  const activeItem = ActiveItem.load(getIdFromEventParams(event.params.tokenId, event.params.nftAddress))

  if (!itemBought) {
    itemBought = new ItemBought(getIdFromEventParams(event.params.tokenId, event.params.nftAddress))
    itemBought.nftAddress = event.params.nftAddress
    itemBought.tokenId = event.params.tokenId
    itemBought.price = event.params.price
  }

  itemBought.buyer = event.params.buyer
  // the real address means it has been bought already
  activeItem!.buyer = event.params.buyer

  itemBought.save()
  activeItem!.save()
}

export function handleListingDeleted(event: ListingDeletedEvent): void {
  let listingDeleted = ListingDeleted.load(getIdFromEventParams(event.params.tokenId, event.params.nftAddress))
  let activeItem = ActiveItem.load(getIdFromEventParams(event.params.tokenId, event.params.nftAddress))

  if (!listingDeleted) {
    listingDeleted = new ListingDeleted(getIdFromEventParams(event.params.tokenId, event.params.nftAddress))
  }

  listingDeleted.seller = event.params.seller
  listingDeleted.nftAddress = event.params.nftAddress
  listingDeleted.tokenId = event.params.tokenId

  // if an item has the dead address we'll know if its on the market place or not
  activeItem!.buyer = Address.fromString("0x000000000000000000000000000000000000dEaD")

  listingDeleted.save()
  activeItem!.save()
}

export function handleItemListed(event: ItemListedEvent): void {
  let itemListed = ItemList.load(getIdFromEventParams(event.params.tokenId, event.params.nftAddress))
  let activeItem = ActiveItem.load(getIdFromEventParams(event.params.tokenId, event.params.nftAddress))

  if (!itemListed) {
    itemListed = new ItemList(getIdFromEventParams(event.params.tokenId, event.params.nftAddress))
  }

  if (!activeItem) {
    activeItem = new ActiveItem(getIdFromEventParams(event.params.tokenId, event.params.nftAddress))
  }

  itemListed.tokenId = event.params.tokenId
  itemListed.seller = event.params.seller
  itemListed.price = event.params.price
  itemListed.nftAddress = event.params.nftAddress

  activeItem.tokenId = event.params.tokenId
  activeItem.seller = event.params.seller
  activeItem.price = event.params.price
  activeItem.nftAddress = event.params.nftAddress
  // The Zero address means its on the market place
  activeItem.buyer = Address.fromString("0x0000000000000000000000000000000000000000")

  itemListed.save()
  activeItem.save()
}

function getIdFromEventParams(tokenId: BigInt, nftAddress: Address): string {
  return tokenId.toHexString() + nftAddress.toHexString()
}
