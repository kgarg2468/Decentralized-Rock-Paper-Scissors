# Decentralized Rock Paper Scissors

A fully decentralized implementation of the classic Rock Paper Scissors game, built on the Ethereum blockchain. Players commit and reveal their moves using cryptographic hashes, ensuring fairness without the need for a trusted third party.

## Purpose

This project demonstrates how blockchain technology and smart contracts can enforce fairness in multiplayer games. It uses a commit-reveal scheme, smart contract logic in Solidity, and a React frontend with MetaMask integration.

## How to Run Locally

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/decentralized-rps.git
cd decentralized-rps
```
### 2. Install Dependencies
```bash
npm install         # for frontend
cd contracts
npm install         # for Hardhat and contract dependencies
```
### 3. Start Local Blockchain (Hardhat)
```bash
cd contracts
npx hardhat node
```
### 4. Deploy Smart Contract
```bash
cd contracts
npx hardhat run scripts/deploy.js --network localhost
```
### 5. Run the Frontend
```bash
npm start
```
### 6. Connect MetaMask
Open MetaMask and switch the network to localhost:8545
Import one of the Hardhat accounts using its private key (displayed when running npx hardhat node)

## Tech Stack
Solidity – Smart contract logic

Hardhat – Ethereum development framework

React.js – Frontend interface

Ethers.js – Frontend-blockchain interaction

MetaMask – Wallet integration

## Notes
Make sure you have Node.js and MetaMask installed before starting.

Use separate browser tabs or profiles to simulate Player 1 and Player 2 interactions.
