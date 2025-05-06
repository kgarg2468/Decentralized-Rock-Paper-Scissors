import { useState } from "react";
import { ethers } from "ethers";
import RPSABI from "./contracts/RPSABI.json";

// ⛳ Replace with your actual deployed contract address
const CONTRACT_ADDRESS = "YOUR_DEPLOYED_ADDRESS_HERE";

function App() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [move, setMove] = useState(1);
  const [secret, setSecret] = useState("abc");

  const styles = {
    outerContainer: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#e5e5ea", // Light Apple gray
      fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    },
    card: {
      background: "#fff",
      padding: "3rem",
      borderRadius: "16px",
      boxShadow: "0 0 30px rgba(0, 0, 0, 0.05)",
      width: "100%",
      maxWidth: "400px",
      textAlign: "center",
    },
    heading: {
      fontSize: "2.5rem",
      fontWeight: 600,
      marginBottom: "2rem",
      color: "#000",
    },
    text: {
      fontSize: "1rem",
      marginBottom: "2rem",
      color: "#555",
    },
    inputGroup: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      marginBottom: "2rem",
      width: "100%",
    },
    label: {
      marginBottom: "0.5rem",
      fontSize: "0.95rem",
      fontWeight: 500,
    },
    input: {
      padding: "0.75rem",
      fontSize: "1rem",
      borderRadius: "8px",
      border: "1px solid #ccc",
      width: "100%",
      boxSizing: "border-box",
    },
    buttonGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      marginTop: "1rem",
    },
    button: {
      padding: "0.85rem",
      fontSize: "1rem",
      backgroundColor: "#0071e3",
      color: "#fff",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      fontWeight: 500,
      transition: "all 0.2s ease-in-out",
    },
  };

  async function connectWallet() {
    if (!window.ethereum) {
      return alert("Please install MetaMask");
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    setAccount(address);

    const instance = new ethers.Contract(CONTRACT_ADDRESS, RPSABI, signer);
    setContract(instance);
  }

  async function joinGame() {
    if (!contract) return alert("Contract not loaded");
    await contract.joinGame();
  }

  async function commitMove() {
    if (!contract) return alert("Contract not loaded");
    const hash = await contract.getHash(move, secret);
    await contract.commitMove(hash);
  }

  async function revealMove() {
    if (!contract) return alert("Contract not loaded");
    await contract.revealMove(move, secret);
  }

  return (
    <div style={styles.outerContainer}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Rock Paper Scissors</h1>

        {!account && (
          <button style={styles.button} onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
        {account && <p style={styles.text}>Connected as: {account}</p>}

        <div style={styles.inputGroup}>
          <label style={styles.label}>Move (1 = Rock, 2 = Paper, 3 = Scissors):</label>
          <input
            style={styles.input}
            type="number"
            value={move}
            onChange={(e) => setMove(Number(e.target.value))}
            min="1"
            max="3"
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Secret:</label>
          <input
            style={styles.input}
            type="text"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
          />
        </div>

        <div style={styles.buttonGroup}>
          <button style={styles.button} onClick={joinGame}>
            Join Game
          </button>
          <button style={styles.button} onClick={commitMove}>
            Commit Move
          </button>
          <button style={styles.button} onClick={revealMove}>
            Reveal Move
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
