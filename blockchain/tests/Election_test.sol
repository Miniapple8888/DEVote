// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.4.22 <0.9.0;

// This import is automatically injected by Remix
import "remix_tests.sol";

// This import is required to use custom transaction context
// Although it may fail compilation in 'Solidity Compiler' plugin
// But it will work fine in 'Solidity Unit Testing' plugin
import "remix_accounts.sol";
import "../contracts/Election.sol";

// File name has to end with '_test.sol', this file can contain more than one testSuite contracts
contract testSuite {
    Election election;
    string[] testCandidates;

    constructor() {
        testCandidates = new string[](3);
        testCandidates[0] = "mike";
        testCandidates[1] = "mark";
        testCandidates[2] = "james";
    }

    // sets up a test election
    function beforeEach() public {
        election = new Election(address(0), testCandidates);
    }

    function checkCastVote() public {
        (string[] memory candidates, uint256[] memory votes) = election
            .getVoteCount();
        Assert.ok(
            keccak256(abi.encode(candidates)) ==
                keccak256(abi.encode(testCandidates)),
            "candidates are correct"
        );
        Assert.ok(votes[0] == uint(0), "no votes yet");
        Assert.ok(votes[1] == uint(0), "no votes yet");
        Assert.ok(votes[2] == uint(0), "no votes yet");
        election.castVote(address(1), "mark");
        election.castVote(address(2), "james");
        election.castVote(address(3), "james");
        (, uint256[] memory votes2) = election.getVoteCount();
        Assert.ok(votes2[0] == uint(0), "votes are correct");
        Assert.ok(votes2[1] == uint(1), "votes are correct");
        Assert.ok(votes2[2] == uint(2), "votes are correct");
    }

    function checkEndElection() public {
        Assert.ok(!election.getElectionStatus(), "election should be ongoing");
        election.endElection();
        Assert.ok(election.getElectionStatus(), "election should be finished");
    }
}
