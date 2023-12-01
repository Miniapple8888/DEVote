// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import "./Election.sol";

contract DEVote {
    Election[] elections;
    // For viewing the currently ongoing election of a user
    mapping(address => uint) ongoingElections;

    // For viewing the elections that a user has participated in
    mapping(address => uint[]) addressElections;

    /*
     * This method initializes and creates a new election with the Election smart contract
     * @param candidates Array of the proposed candidates for the election
     * @returns uint ID of created election
     */
    function createElection(string[] memory candidates) public returns (uint) {
        elections.push(new Election(msg.sender, candidates));
        uint id = elections.length - 1;
        ongoingElections[msg.sender] = id;
        return id;
    }

    /*
     * This method verifies if a user has an on going election
     * @return boolean True if it still on going and false if not
     */
    function hasElectionGoing() public view returns (bool) {
        address owner = elections[ongoingElections[msg.sender]].getOwner();

        if (owner != msg.sender) {
            return true;
        }

        bool status = elections[ongoingElections[msg.sender]]
            .getElectionStatus();
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
        return (elections[ongoingElections[msg.sender]].getVoteCount());
    }

    /*
     * This method gets all the elections that a user has participated in
     * @return address[] Array with all participated elections
     * @return bool[] Array with status of all participated elections
     */
    function getElectionsForUser()
        public
        view
        returns (uint[] memory, bool[] memory)
    {
        uint[] memory electionIDs = addressElections[msg.sender];
        bool[] memory statuses = new bool[](
            addressElections[msg.sender].length
        );
        for (uint i = 0; i < electionIDs.length; i++) {
            statuses[i] = elections[electionIDs[i]].getElectionStatus();
        }
        return (electionIDs, statuses);
    }

    /*
     * This method ends the election of a user
     * @return bool True if election ended, False if election was already ended
     */
    function endElection() public returns (bool) {
        Election target = elections[ongoingElections[msg.sender]];
        bool retVal = !target.getElectionStatus();
        target.endElection();
        return retVal;
    }

    /*
    * This method returns ensures election exists and is ongoing
    * Throws error otherwise
    */

    function electionIsValid(uint _targetAddr) public view {
        require(_targetAddr < elections.length && _targetAddr >= 0 && !elections[_targetAddr].getElectionStatus(), "election is not valid");
    }

    /*
    * This method retrieves election timestamp and candidates if
    * election associated to _targetAddr exists and is ongoing. Otherwise, throw error.
    * @return uint256 timestamp
    * @return string[] Array with the name of the candidates
    */

    function getElection(uint _targetAddr) public view returns(uint256, string[] memory) {
        electionIsValid(_targetAddr);
        Election election = elections[_targetAddr];
        return (election.getTimestamp(), election.getCandidates());
    }

    /*
    * This method casts a vote on an election if election
    * election associated to _targetAddr exists and is ongoing. Otherwise, throw error.
    * Also throws an error if casting of the vote fails (invalid vote).
    */

    function castVoteOnElection(uint _targetAddr, string memory _vote) public {
        electionIsValid(_targetAddr);
        Election election = elections[_targetAddr];
        election.castVote(msg.sender, _vote);
        if (addressElections[msg.sender].length <= 0) {
            addressElections[msg.sender] = new uint[](0);
        }
        addressElections[msg.sender].push(_targetAddr);
    }
}
