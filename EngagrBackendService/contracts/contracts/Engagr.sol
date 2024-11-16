// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract Engagr is UUPSUpgradeable, OwnableUpgradeable {
    using ECDSA for bytes32;

    struct Marketer {
        string id;
        address accountAddress;
    }

    struct Promoter {
        string id;
        string twitterUsername;
        address accountAddress;
        uint256 claimableBalanceNative; // Balance for native tokens
        mapping(address => uint256) claimableBalanceERC20; // Balance for ERC20 tokens
    }

    struct Ad {
        string id;
        string description;
        uint256 amountAllocated;
        address tokenAddress; // ERC20 token or address(0) for native token
        uint256 endTimestamp;
        uint256 requiredFollowers;
        uint256 lockedAmount;
        address marketerAddress;
    }

    uint256 private marketerCounter;
    uint256 private promoterCounter;

    mapping(string => Marketer) public idToMarketers;
    mapping(string => Promoter) public idToPromoters;
    mapping(string => Ad) public idToAds;

    mapping(address => Marketer) public addressToMarketers;
    mapping(address => Promoter) public addressToPromoters;

    event MarketerRegistered(string id, address accountAddress);
    event PromoterRegistered(string id, string twitterUsername, address accountAddress);
    event AdSubmitted(string id, string description, uint256 amountAllocated, address tokenAddress);
    event AdPayout(string adId, string promoterId, uint256 payoutAmount);
    event BalanceClaimed(address promoterAddress, address tokenAddress, uint256 amount);


    function initialize() public initializer {
        __Ownable_init();
    }

    /// @dev Authorizes upgrades (only owner can upgrade)
    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}

    // Register a marketer
    function registerMarketer(string calldata id, address accountAddress, string calldata email) public {
        idToMarketers[id] = Marketer(id, accountAddress);
        addressToMarketers[accountAddress] = Marketer(id, accountAddress);
        marketerCounter++;
        emit MarketerRegistered(id, accountAddress);
    }

    // Register a promoter
    function registerPromoter(
        string calldata id,
        string calldata twitterUsername,
        address accountAddress
    ) external {
        Promoter storage promoter = idToPromoters[id];
        promoter.id = id;
        promoter.twitterUsername = twitterUsername;
        promoter.accountAddress = accountAddress;
        addressToPromoters[accountAddress].id = promoter.id;
        addressToPromoters[accountAddress].twitterUsername = promoter.twitterUsername;
        addressToPromoters[accountAddress].accountAddress = promoter.accountAddress;
        addressToPromoters[accountAddress].claimableBalanceNative = promoter.claimableBalanceNative;
        // Note: Nested mappings cannot be directly copied, so we leave claimableBalanceERC20 as is.
        promoterCounter++;
        emit PromoterRegistered(id, twitterUsername, accountAddress);
    }

    // Submit an ad and lock funds
    function submitAd(
        string calldata adId,
        string calldata description,
        uint256 amountAllocated,
        address tokenAddress,
        uint256 endTimestamp,
        uint256 requiredFollowers
    ) external payable {
        require(endTimestamp > block.timestamp, "End timestamp must be in the future");
        require(
            tokenAddress == address(0) ? msg.value == amountAllocated : msg.value == 0,
            "Mismatch in token and native amount"
        );

        idToAds[adId] = Ad({
            id: adId,
            description: description,
            amountAllocated: amountAllocated,
            tokenAddress: tokenAddress,
            endTimestamp: endTimestamp,
            requiredFollowers: requiredFollowers,
            lockedAmount: amountAllocated,
            marketerAddress: msg.sender
        });

        if (tokenAddress != address(0)) {
            IERC20Upgradeable(tokenAddress).transferFrom(msg.sender, address(this), amountAllocated);
        }

        emit AdSubmitted(adId, description, amountAllocated, tokenAddress);
    }

    // Payout to promoter (update claimable balance)
    function adPayout(
        string calldata adId,
        string calldata promoterId,
        uint256 payoutAmount,
        bytes calldata attestationData
    ) public {
        Ad storage ad = idToAds[adId];
        require(ad.lockedAmount >= payoutAmount, "Insufficient locked amount");

        // Verify attestation data
        address signer = keccak256(abi.encode(adId, promoterId, payoutAmount)).toEthSignedMessageHash().recover(attestationData);
        require(signer == ad.marketerAddress, "Invalid attestation");

        Promoter storage promoter = idToPromoters[promoterId];
        require(promoter.accountAddress != address(0), "Invalid promoter");

        ad.lockedAmount -= payoutAmount;

        if (ad.tokenAddress == address(0)) {
            promoter.claimableBalanceNative += payoutAmount;
        } else {
            promoter.claimableBalanceERC20[ad.tokenAddress] += payoutAmount;
        }

        emit AdPayout(adId, promoterId, payoutAmount);
    }

    // Promoter claims their balance
    function claimBalance(address tokenAddress) public {
        Promoter storage promoter = addressToPromoters[msg.sender];
        require(promoter.accountAddress == msg.sender, "Caller is not a registered promoter");

        uint256 amount;
        if (tokenAddress == address(0)) {
            amount = promoter.claimableBalanceNative;
            require(amount > 0, "No claimable native balance");
            promoter.claimableBalanceNative = 0;
            payable(msg.sender).transfer(amount);
        } else {
            amount = promoter.claimableBalanceERC20[tokenAddress];
            require(amount > 0, "No claimable token balance");
            promoter.claimableBalanceERC20[tokenAddress] = 0;
            IERC20Upgradeable(tokenAddress).transfer(msg.sender, amount);
        }

        emit BalanceClaimed(msg.sender, tokenAddress, amount);
    }

    // Fallback and receive functions to accept native tokens
    receive() external payable {}
}
