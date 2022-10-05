// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

error NftMarketplace__PriceMustBeAboveZero();
error NftMarketplace__NotApprovedForMarketplace();
error NftMarketplace__AlreadyListed(address nftAddress, uint256 tokenid);
error NftMarketplace__NotOwner();

contract NftMarketplace {
  struct Listing {
    uint256 price;
    address seller;
  }

  event ItemList(
    address indexed seller,
    address indexed nftAddress,
    uint256 indexed tokenId,
    uint256 price
  );

  // NFT contract address => nft token id => listing
  mapping(address => mapping(uint256 => Listing)) s_listings;

  ///////////////
  // Modifiers //
  ///////////////
  modifier notListed(
    address nftAddress,
    uint256 tokenId,
    address owner
  ) {
    Listing memory listing = s_listings[nftAddress][tokenId];
    if (listing.price > 0) {
      revert NftMarketplace__AlreadyListed(nftAddress, tokenId);
    }
    _;
  }

  modifier isOwner(
    address nftAddress,
    uint256 tokenId,
    address spender
  ) {
    IERC721 nft = IERC721(nftAddress);
    address owner = nft.ownerOf(tokenId);
    if (owner != spender) {
      revert NftMarketplace__NotOwner();
    }
    _;
  }

  ////////////////////
  // Main Functions //
  ////////////////////

  /**
   * @notice This function gives the marketplace approval to sell the NFT
   * for the owner while he still holds his NFT.
   * @param nftAddress: Address of the NFT
   * @param tokenId: The Token ID of the NFT
   * @param price: sale price of the listed NFT
   * @dev Technically, we could have the contract be the escrow for the NFTs
   * but this way people can still hold their NFTs when listed.
   */
  function listItem(
    address nftAddress,
    uint256 tokenId,
    uint256 price
  ) external notListed(nftAddress, tokenId, msg.sender) isOwner(nftAddress, tokenId, msg.sender) {
    if (price <= 0) {
      revert NftMarketplace__PriceMustBeAboveZero();
    }
    IERC721 nft = IERC721(nftAddress);
    if (nft.getApproved(tokenId) != address(this)) {
      revert NftMarketplace__NotApprovedForMarketplace();
    }
    s_listings[nftAddress][tokenId] = Listing(price, msg.sender);
    emit ItemList(msg.sender, nftAddress, tokenId, price);
  }
}
