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
