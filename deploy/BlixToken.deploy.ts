import { ethers } from "hardhat";
import writeConfig from "../utils/write-config";

async function main() {
  const BlixTokenFactory = await ethers.getContractFactory("BlixToken");
  const blixTokenContract = await BlixTokenFactory.deploy();
  await blixTokenContract.deployed();

  writeConfig("tokenContractAddress", blixTokenContract.address);

  console.log("BlixToken deployed to:", blixTokenContract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
