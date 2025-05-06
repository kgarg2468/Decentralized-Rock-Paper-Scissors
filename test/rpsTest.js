const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RockPaperScissors", function () {
  it("should allow two players to join, commit, and reveal", async () => {
    const [p1, p2] = await ethers.getSigners();
    const RPS = await ethers.getContractFactory("RockPaperScissors");
    const rps = await RPS.deploy();

    await rps.connect(p1).joinGame();
    await rps.connect(p2).joinGame();

    const move1 = 1; // Rock
    const move2 = 2; // Paper
    const secret1 = "abc";
    const secret2 = "xyz";

    const hash1 = await rps.getHash(move1, secret1);
    const hash2 = await rps.getHash(move2, secret2);

    await rps.connect(p1).commitMove(hash1);
    await rps.connect(p2).commitMove(hash2);

    await rps.connect(p1).revealMove(move1, secret1);
    await rps.connect(p2).revealMove(move2, secret2);

    expect(await rps.gameState()).to.equal(3); // State.Finished
  });
});
