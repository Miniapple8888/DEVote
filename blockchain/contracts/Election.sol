// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

/*
 * Contract for creating an election to be used in the DEVote Contract
 *
 */
contract Election {
    address owner;
    uint256 timestamp;
    string[] candidates;
    address[] voters;
    mapping(string => uint256) candidateVotes;
    mapping(address => string) addressVotes;
    bool hasEnded;

    /*
     * This constructor initializes the Election
     * @param _owner Address of the owner of the election
     * @param _candidates Array with the proposed name of the candidates
     */
    constructor(address _owner, string[] memory _candidates) {
        owner = _owner;
        timestamp = block.timestamp;
        candidates = _candidates;
        hasEnded = false;

        for (uint256 i = 0; i < candidates.length; i++) {
            candidateVotes[candidates[i]] = 0;
        }
    }

    /*
     * This method returns whether the election has ended or not
     * @return hasEnded Boolean true if it's ended and false if not
     */

    function getElectionStatus() public view returns (bool) {
        return hasEnded;
    }

    /*
     * This method returns the names of all the candidates
     * @return candidates Array with the name of the candidates
     */

    function getCandidates() public view returns (string[] memory) {
        return candidates;
    }

    /*
     * This method returns the candidates and the number of votes for each candidate
     * @return (candidateNames, numVotes) Tuple with the candidate names and the votes
     */
    function getVoteCount()
        public
        view
        returns (string[] memory candidateNames, uint256[] memory numVotes)
    {
        uint256[] memory _numVotes = new uint256[](candidates.length);

        for (uint256 i = 0; i < candidates.length; i++) {
            _numVotes[i] = candidateVotes[candidates[i]];
        }

        return (candidates, _numVotes);
    }

    /*
     * This method gets the owner of the contract
     * @return owner The address of the owner of the election
     */

    function getOwner() public view returns (address) {
        return owner;
    }

    /*
     * This method ends the election
     */
    function endElection() public {
        hasEnded = true;
    }
}
