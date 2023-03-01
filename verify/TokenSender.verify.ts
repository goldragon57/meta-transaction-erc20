import { run } from "hardhat";

import { senderContractAddress } from "../config/contracts";

async function main() {
  await run("verify:verify", {
    address: senderContractAddress,
    constructorArguments: [],
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
