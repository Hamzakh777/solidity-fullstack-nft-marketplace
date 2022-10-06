// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

error NftMarketplace__PriceMustBeAboveZero();
error NftMarketplace__NotApprovedForMarketplace();
error NftMarketplace__AlreadyListed(address nftAddress, uint256 tokenId);
error NftMarketplace__NotOwner();
error NftMarketplace__OwnerCannotBuyHisOwnNft();
error NftMarketplace__NftNotListed(address nftAddress, uint256 tokenId);
error NftMarketplace__PriceNotMet(address nftAddress, uint256 tokenId, uint256 price);

contract NftMarketplace is ReentrancyGuard {
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

  event ItemBough(
    address indexed buyer,
    address indexed nftAddress,
    uint256 indexed tokenid,
    uint256 price
  );

  event ListingDeleted(
    address indexed seller,
    address indexed nftAddress,
    uint256 indexed tokenid
  );

  // NFT contract address => nft token id => listing
  mapping(address => mapping(uint256 => Listing)) s_listings;
  // Seller Address => Amount earned
  mapping(address => uint256) s_proceeds;

  ///////////////
  // Modifiers //
  ///////////////
  modifier isListed(address nftAddres, uint256 tokenId) {
    Listing memory listing = s_listings[nftAddres][tokenId];
    if (listing.price <= 0) {
      revert NftMarketplace__NftNotListed(nftAddres, tokenId);
    }
    _;
  }

  modifier isNotListed(address nftAddress, uint256 tokenId) {
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

  modifier isNotOwner(
    address nftAddress,
    uint256 tokenId,
    address spender
  ) {
    IERC721 nft = IERC721(nftAddress);
    address owner = nft.ownerOf(tokenId);
    if (owner != spender) {
      revert NftMarketplace__OwnerCannotBuyHisOwnNft();
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
  )
    external
    // Challenge: Have this contract accept payment in a subset of token as well
    // Hint: use Chainlink Price Feeds to convert the price of the token between each other
    isNotListed(nftAddress, tokenId)
    isOwner(nftAddress, tokenId, msg.sender)
  {
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

  /**
   * @notice This functions lets the user buy an NFT
   * @param nftAddress: Address of the NFT
   * @param tokenId: The Token ID of the NFT
   */
  function buyItem(address nftAddress, uint256 tokenId)
    external
    payable
    nonReentrant
    isListed(nftAddress, tokenId)
    isNotOwner(nftAddress, tokenId, msg.sender)
  {
    Listing memory listingItem = s_listings[nftAddress][tokenId];
    if (msg.value <= listingItem.price) {
      revert NftMarketplace__PriceNotMet(nftAddress, tokenId, listingItem.price);
    }
    // pull over push - solidity best practice = instead of sending
    // the money directly, we want them to withdraw the money
    s_proceeds[listingItem.seller] += msg.value;
    delete (s_listings[nftAddress][tokenId]);
    IERC721 nft = IERC721(nftAddress);
    nft.safeTransferFrom(listingItem.seller, msg.sender, tokenId);
    emit ItemBough(msg.sender, nftAddress, tokenId, listingItem.price);
  }

  /**
   * @notice Lets the users deletes listed NFTs
   * @param nftAddress: Address of the NFT
   * @param tokenId: The Token ID of the NFT
   */
  function cancelListing(address nftAddress, uint256 tokenId)
    external
    isListed(nftAddress, tokenId)
    isOwner(nftAddress, tokenId, msg.sender)
  {
    delete (s_listings[nftAddress][tokenId]);
    emit ListingDeleted(msg.sender, nftAddress, tokenId);
  }
}
