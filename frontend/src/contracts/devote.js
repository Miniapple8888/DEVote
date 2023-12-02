// @ts-ignore
import contractAbi from "./abi.json";
import Web3 from "web3";

// @ts-ignore
// CONTRACT CONFIGURATION
const CONTRACT_ADDRESS = "0xA7884237f5F1DD73f762da30b125f5D2355C4394";
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
}

/**
 * This method connects to the smart contract to end an election
 * @returns bool True if election was just ended, false otherwise
 */
export const endElection = async () => {
  const accounts = await web3.eth.getAccounts();
  return await smartContract.methods.endElection().send({
    from: accounts[0],
  });
}

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
