// @ts-ignore
import contractAbi from "./abi.json";
import Web3 from "web3";

// @ts-ignore
// CONTRACT CONFIGURATION
const CONTRACT_ADDRESS = "0x7adc978D61947ba24D0D876F8f0474d285b6a836";
const web3 = new Web3(window.ethereum);
const smartContract = new web3.eth.Contract(contractAbi, CONTRACT_ADDRESS);

/**
 * This method connects to the smart contract to start a new election
 * @param candidates[] Array with the name of the candidates
 * @returns int ID of created election
 */
export const startElection = async (candidates) => {
  const accounts = await web3.eth.getAccounts();
  return await smartContract.methods.createElection(candidates).send({
    from: accounts[0],
  });
};

/**
 * This method gets the ongoing election ID of the user
 * @returns bigint Ongoing election ID, -1 if none exists
 */
export const getOngoingElectionID = async () => {
  const accounts = await web3.eth.getAccounts();
  return await smartContract.methods.getOngoingElectionID().call({
    from: accounts[0],
  });
};

/**
 * This method connects to the smart contract to end an election
 * @returns bool True if election was just ended, false otherwise
 */
export const endElection = async () => {
  const accounts = await web3.eth.getAccounts();
  return await smartContract.methods.endElection().send({
    from: accounts[0],
  });
};

/**
 * This method gets the list of elections a user has participated in
 * @returns [int[], bool[]] Array of election IDs, Array of election statuses (corresponds to the IDs)
 */
export const getElectionsForUser = async () => {
  const accounts = await web3.eth.getAccounts();
  return await smartContract.methods.getElectionsForUser().call({
    from: accounts[0],
  });
}

/**
 * This method connects to the smart contract to get a specific election
 * @param electionId integer addres of the election
 * @returns [int timestamp, candidates[] array of candidates]
 */
 export const getElection = async (electionId) => {
  const accounts = await web3.eth.getAccounts();
  return await smartContract.methods.getElection(electionId).call({
    from: accounts[0],
  });
}

/**
 * This method connects to the smart contract to cast a vote
 * @param electionId integer address of the election
 * @param vote string of the candidate
 */
 export const castVoteOnElection = async (electionId, vote) => {
  const accounts = await web3.eth.getAccounts();
  return await smartContract.methods.castVoteOnElection(electionId, vote).send({
    from: accounts[0],
  });
};

/**
 * @param id Id of the election  
 * @returns (candidates, votes) A tuple with the arrays of the candidates and their results
 */
export const getElectionResults = async (id) => {
  const accounts = await web3.eth.getAccounts();
  return await smartContract.methods.getElectionResults(id).call({
    from: accounts[0],
  });
};
