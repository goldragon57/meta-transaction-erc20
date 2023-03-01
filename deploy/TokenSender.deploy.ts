import { ethers } from "hardhat";
import writeConfig from "../utils/write-config";

async function main() {
  const TokenSenderFactory = await ethers.getContractFactory("TokenSender");
  const tokenSenderContract = await TokenSenderFactory.deploy();
  await tokenSenderContract.deployed();

  writeConfig("senderContractAddress", tokenSenderContract.address);

  console.log("TokenSender deployed to:", tokenSenderContract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
