// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import "./Election.sol";

contract DEVote {
    mapping(address => Election) elections;

    // For viewing the elections that user has participated
    // mapping(address => address[]) addressElections;

    /*
     * This method initializes and creates a new election with the Election smart contract
     * @param candidates Array of the proposed candidates for the election
     */
    function createElection(string[] memory candidates) public {
        elections[msg.sender] = new Election(msg.sender, candidates);
    }

    /*
     * This method verifies if a user has an on going election
     * @return boolean True if it still on going and false if not
     */
    function hasElectionGoing() public view returns (bool) {
        address owner = elections[msg.sender].getOwner();

        if (owner != msg.sender) {
            return true;
        }

        bool status = elections[msg.sender].getElectionStatus();
        return !status;
    }

    /*
     * This method gets the election results in a tuple. The index
     * for each array matches. The number of votes for a candidate is
     * represented as candidates[1] -> votes[1].
     * @return string[] Array with the name of the candidates
     * @return uint256[] Array with the votes for each candidate
     */
    function getElections()
        public
        view
        returns (string[] memory, uint256[] memory)
    {
        return (elections[msg.sender].getVoteCount());
    }
}
