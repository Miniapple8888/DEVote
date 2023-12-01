// @ts-ignore
import contractAbi from "./abi.json";
import Web3 from "web3";

// @ts-ignore
// CONTRACT CONFIGURATION
const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;
const web3 = new Web3(window.ethereum);
const smartContract = new web3.eth.Contract(contractAbi, CONTRACT_ADDRESS);

/**
 * This method connects to the smart contract to start a new election
 * @param candidates[] Array with the name of the candidates
 */
export const startElection = async (candidates) => {
  const accounts = await web3.eth.getAccounts();
  await smartContract.methods.createElection(candidates).send({
    from: accounts[0],
  });
};

/**
 * This method connects to the smart contract to start a new election
 * @returns bool True if user has an ongoing election, false otherwise
 */
export const hasElectionGoing = async () => {
  const accounts = await web3.eth.getAccounts();
  return await smartContract.methods.hasElectionGoing().send({
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
 * @returns int[], bool[] Array of election IDs, Array of election statuses (corresponds to the IDs)
 */
export const getElectionsForUser = async () => {
  const accounts = await web3.eth.getAccounts();
  return await smartContract.methods.getElectionsForUser().send({
    from: accounts[0],
  });
}
