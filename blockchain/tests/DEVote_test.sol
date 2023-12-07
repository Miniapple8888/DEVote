// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.4.22 <0.9.0;

// This import is automatically injected by Remix
import "remix_tests.sol";

// This import is required to use custom transaction context
// Although it may fail compilation in 'Solidity Compiler' plugin
// But it will work fine in 'Solidity Unit Testing' plugin
import "../contracts/DEVote.sol";

contract testSuite {
    DEVote devote;
    string[] testCandidates = new string[](3);

    function beforeEach() public {
        devote = new DEVote();
        testCandidates[0] = "mike";
        testCandidates[1] = "mark";
        testCandidates[2] = "james";
        devote.createElection(testCandidates);
    }

    function checkCreateElection() public {
        (, string[] memory candidates) = devote.getElection(0);
        Assert.ok(
            keccak256(abi.encode(candidates)) ==
                keccak256(abi.encode(testCandidates)),
            "election created correctly"
        );
    }

    function checkGetOngoingElectionID() public {
        Assert.ok(
            devote.getOngoingElectionID() == 0,
            "ongoing election ID is 0"
        );
    }

    function checkElectionResults() public {
        devote.castVoteOnElection(0, "mike");
        devote.endElection();
        (, , uint256[] memory numVotes, ) = devote.getElectionResults(0);
        Assert.ok(numVotes[0] == 1, "mike wins");
        Assert.ok(numVotes[1] == 0, "mike wins");
        Assert.ok(numVotes[2] == 0, "mike wins");
    }

    function checkGetElectionsForUser() public {
        devote.castVoteOnElection(0, "mike");
        (uint256[] memory electionIDs, bool[] memory statuses) = devote
            .getElectionsForUser();
        Assert.ok(electionIDs.length == 1, "1 election voted in");
        Assert.ok(electionIDs[0] == 0, "election ID is 0");
        Assert.ok(!statuses[0], "election is ongoing");
    }
}
