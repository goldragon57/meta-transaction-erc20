// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract BlixToken is ERC20 {
    constructor() ERC20("", "") {}

    function freeMint(uint256 amount) public {
        _mint(msg.sender, amount);
    }
}

contract TokenSender {
    using ECDSA for bytes32;

    mapping(bytes32 => bool) public executed;

    function getHash(
        address sender,
        uint256 amount,
        address recipient,
        address tokenContract,
        uint256 nonce
    ) public pure returns (bytes32) {
        return
            keccak256(
                abi.encodePacked(
                    sender,
                    amount,
                    recipient,
                    tokenContract,
                    nonce
                )
            );
    }

    function tokenTransfer(
        address sender,
        uint256 amount,
        address recipient,
        address tokenContract,
        bytes memory signature,
        uint256 nonce
    ) public {
        bytes32 messageHash = getHash(
            sender,
            amount,
            recipient,
            tokenContract,
            nonce
        );
        bytes32 signedMessageHash = messageHash.toEthSignedMessageHash();

        address signer = signedMessageHash.recover(signature);
        require(signer == sender, "Signature is not from sender");
        executed[messageHash] = true;

        bool sent = ERC20(tokenContract).transferFrom(
            sender,
            recipient,
            amount
        );
        require(sent, "Failed to send the tokens");
    }
}
