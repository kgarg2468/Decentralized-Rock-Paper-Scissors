const hre = require("hardhat");

async function main() {
  const RPS = await hre.ethers.getContractFactory("RockPaperScissors");
  const rps = await RPS.deploy();
  await rps.waitForDeployment();

  const address = await rps.getAddress(); // Correct way to get address
  console.log("RPS deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
