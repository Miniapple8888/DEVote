// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

contract Test {
    string public template;

    function changeString(string memory newString) public {
        template = newString;
    }

    function getString() public view returns(string memory) {
        return template;
    }
}