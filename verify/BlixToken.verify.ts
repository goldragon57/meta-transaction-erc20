import { run } from "hardhat";

import { tokenContractAddress } from "../config/contracts";

async function main() {
  await run("verify:verify", {
    address: tokenContractAddress,
    constructorArguments: [],
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
