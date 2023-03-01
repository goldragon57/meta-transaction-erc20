import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "@typechain/hardhat";
import * as dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const { POLYGONSCAN_API_KEY, PRIVATE_KEY } = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  defaultNetwork: "mumbai_testnet",
  networks: {
    hardhat: {},
    mumbai_testnet: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [PRIVATE_KEY as string],
    },
    polygon_mainnet: {
      url: "https://polygon-rpc.com",
      accounts: [PRIVATE_KEY as string],
    },
  },
  etherscan: {
    apiKey: POLYGONSCAN_API_KEY,
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 40000,
  },
};

export default config;
