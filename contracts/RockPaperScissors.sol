// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract RockPaperScissors {
    enum Move { None, Rock, Paper, Scissors }
    enum State { WaitingForPlayers, Committed, Revealed, Finished }

    struct Player {
        address addr;
        bytes32 commitHash;
        Move move;
        bool revealed;
    }

    Player[2] public players;
    State public gameState;
    uint public commitCount;

    constructor() {
        gameState = State.WaitingForPlayers;
    }

    modifier onlyPlayer() {
        require(msg.sender == players[0].addr || msg.sender == players[1].addr, "Not a player");
        _;
    }

    function joinGame() external {
        require(gameState == State.WaitingForPlayers, "Game full");
        if (players[0].addr == address(0)) {
            players[0].addr = msg.sender;
        } else if (players[1].addr == address(0)) {
            players[1].addr = msg.sender;
            gameState = State.Committed;
        }
    }

    function commitMove(bytes32 _commitHash) external onlyPlayer {
        for (uint i = 0; i < 2; i++) {
            if (players[i].addr == msg.sender) {
                require(players[i].commitHash == 0, "Already committed");
                players[i].commitHash = _commitHash;
                commitCount++;
                break;
            }
        }
    }

    function revealMove(Move _move, string memory _secret) external onlyPlayer {
        require(commitCount == 2, "Both players must commit first");
        bytes32 hash = keccak256(abi.encodePacked(_move, _secret));

        for (uint i = 0; i < 2; i++) {
            if (players[i].addr == msg.sender) {
                require(players[i].commitHash == hash, "Hash mismatch");
                players[i].move = _move;
                players[i].revealed = true;
            }
        }

        if (players[0].revealed && players[1].revealed) {
            resolveGame();
        }
    }

    function resolveGame() private {
        gameState = State.Finished;

        Move a = players[0].move;
        Move b = players[1].move;

        // Determine winner (optional event can be emitted here)
    }

    function getHash(Move _move, string memory _secret) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(_move, _secret));
    }

    function resetGame() external {
        require(gameState == State.Finished, "Game not over yet");
        delete players;
        commitCount = 0;
        gameState = State.WaitingForPlayers;
    }
}
