// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import "./Election.sol";

contract DEVote {
    Election[] elections = new Election[](0);
    // For viewing the currently ongoing election of a user
    mapping(address => uint256) ongoingElections;

    // For viewing the elections that a user has participated in
    mapping(address => uint256[]) addressElections;

    /*
     * This modifier ensures that an election exists and is ongoing
     * Throws error otherwise
     * @param id The id of the election
     */
    modifier electionIsValid(uint256 id) {
        require(
            id < elections.length &&
                id >= 0 &&
                !elections[id].getElectionStatus(),
            "election is not valid"
        );
        _;
    }

    /*
     * This modifier checks if an election has ended
     * @param id The id of the election
     */
    modifier electionEnded(uint256 id) {
        require(
            elections[id].getElectionStatus() == true,
            "Election is still ongoing"
        );
        _;
    }

    /*
     * This method initializes and creates a new election with the Election smart contract
     * @param candidates Array of the proposed candidates for the election
     * @returns uint ID of created election
     */
    function createElection(string[] memory candidates)
        public
        returns (uint256)
    {
        elections.push(new Election(msg.sender, candidates));
        uint256 id = elections.length - 1;
        ongoingElections[msg.sender] = id;
        return id;
    }

    /*
     * This method returns the ID of the user's ongoing election
     * @return int ID of ongoing election, -1 if no ongoing election
     */
    function getOngoingElectionID() public view returns (int) {
        if (elections.length == 0) {
            return -1;
        }
        Election target = elections[ongoingElections[msg.sender]];
        if (target.getOwner() != msg.sender || target.getElectionStatus()) {
            return -1;
        }
        // only works if we have < 10^77 elections
        return int(ongoingElections[msg.sender]);
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
        returns (uint256[] memory electionIDs, bool[] memory electionStatuses)
    {
        uint256[] memory _electionIDs = addressElections[msg.sender];
        bool[] memory statuses = new bool[](
            addressElections[msg.sender].length
        );
        for (uint256 i = 0; i < _electionIDs.length; i++) {
            statuses[i] = elections[_electionIDs[i]].getElectionStatus();
        }
        return (_electionIDs, statuses);
    }

    /*
     * This method ends the election of a user
     * @return bool True if this function call ended the election, False otherwise
     */
    function endElection() public returns (bool) {
        if (
            elections.length == 0 ||
            elections[ongoingElections[msg.sender]].getOwner() != msg.sender
        ) {
            return false;
        }
        bool retVal = !elections[ongoingElections[msg.sender]]
            .getElectionStatus();
        elections[ongoingElections[msg.sender]].endElection();
        return retVal;
    }

    /*
     * This method retrieves election timestamp and candidates if
     * election associated to id exists and is ongoing. Otherwise, throw error.
     * @return uint256 timestamp
     * @return string[] Array with the name of the candidates
     */
    function getElection(uint256 id)
        public
        view
        electionIsValid(id)
        returns (uint256, string[] memory)
    {
        Election election = elections[id];
        return (election.getTimestamp(), election.getCandidates());
    }

    /*
     * This method casts a vote on an election if election
     * election associated to id exists and is ongoing. Otherwise, throw error.
     * Also throws an error if casting of the vote fails (invalid vote).
     */
    function castVoteOnElection(uint256 id, string memory _vote)
        public
        electionIsValid(id)
    {
        Election election = elections[id];
        election.castVote(msg.sender, _vote);
        if (addressElections[msg.sender].length <= 0) {
            addressElections[msg.sender] = new uint256[](0);
        }
        addressElections[msg.sender].push(id);
    }

    /*
     * This function gets the election results as a tuple matching arrays.
     * @param id The id of the election
     * @return timestamp Time of creation of the election
     * @return candidates Array with the names of the candidates
     * @return candidateVotes[] Array with the number of votes for each candidate
     * @return hasEnded Boolean to know if the election has ended

     */
    function getElectionResults(uint256 id)
        public
        view
        electionEnded(id)
        returns (
            uint256 timestamp,
            string[] memory candidates,
            uint256[] memory candidateVotes,
            bool hasEnded
        )
    {
        require(id < elections.length && id >= 0, "Election does not exist");
        Election election = elections[id];
        uint256 _timestamp = election.getTimestamp();
        bool _hasEnded = election.getElectionStatus();
        string[] memory candidateNames;
        uint256[] memory numVotes;
        (candidateNames, numVotes) = election.getVoteCount();

        return (_timestamp, candidateNames, numVotes, _hasEnded);
    }
}
