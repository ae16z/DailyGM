// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract DailyGM {
    mapping(address => uint256) public lastGM;
    event GMed(address indexed user, uint256 timestamp);

    function gm() external {
        require(
            block.timestamp > lastGM[msg.sender] + 1 days,
            "Already GM today!"
        );
        lastGM[msg.sender] = block.timestamp;
        emit GMed(msg.sender, block.timestamp);
    }
}
