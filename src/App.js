import logo from "./logo.svg";
import "./App.css";

import { useEffect, useState } from "react";
import { Contract, providers } from "ethers";

function App() {
  const [isWalletInstalled, setIsWalletInstalled] = useState(false);
  const [account, setAccount] = useState(null);
  const [date, setDate] = useState("1987-12-31");
  const [zodiacSign, setZodiacSign] = useState(null);
  const [isMinting, setIsMinting] = useState(false);
  const [NFTContract, setNFTContract] = useState(null);

  useEffect(() => {
    calculateZodiactSign(date);
  }, [date]);

  useEffect(() => {
    if (window.ethereum) {
      setIsWalletInstalled(true);
    }
  }, []);

  async function connectWallet() {
    window.ethereum
      .request({
        method: "eth_requestAccounts",
      })
      .then((accounts) => {
        setAccount(accounts[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleDateInput({ target }) {
    setDate(target.value);
  }

  function calculateZodiactSign(date) {
    let dateObject = new Date(date);
    let day = dateObject.getDate();
    let month = dateObject.getMonth();
    if (month == 0) {
      if (day >= 20) {
        setZodiacSign("Aquarius");
      } else {
        setZodiacSign("Capricorn");
      }
    } else if (month == 1) {
      if (day >= 19) {
        setZodiacSign("Pisces");
      } else {
        setZodiacSign("Aquarius");
      }
    } else if (month == 2) {
      if (day >= 21) {
        setZodiacSign("Aries");
      } else {
        setZodiacSign("Pisces");
      }
    } else if (month == 3) {
      if (day >= 21) {
        setZodiacSign("Taurus");
      } else {
        setZodiacSign("Aries");
      }
    } else if (month == 4) {
      if (day >= 21) {
        setZodiacSign("Gemini");
      } else {
        setZodiacSign("Taurus");
      }
    } else if (month == 5) {
      if (day >= 22) {
        setZodiacSign("Cancer");
      } else {
        setZodiacSign("Gemini");
      }
    } else if (month == 6) {
      if (day >= 22) {
        setZodiacSign("Leo");
      } else {
        setZodiacSign("Cancer");
      }
    } else if (month == 7) {
      if (day >= 23) {
        setZodiacSign("Virgo");
      } else {
        setZodiacSign("Leo");
      }
    } else if (month == 8) {
      if (day >= 23) {
        setZodiacSign("Libra");
      } else {
        setZodiacSign("Virgo");
      }
    } else if (month == 9) {
      if (day >= 23) {
        setZodiacSign("Scorpio");
      } else {
        setZodiacSign("Libra");
      }
    } else if (month == 10) {
      if (day >= 23) {
        setZodiacSign("Sagittarius");
      } else {
        setZodiacSign("Scorpio");
      }
    } else if (month == 11) {
      if (day >= 22) {
        setZodiacSign("Capricorn");
      } else {
        setZodiacSign("Sagittarius");
      }
    } 
  }

  if (account === null) {
    return (
      <div className="App">
        <br />
        {isWalletInstalled ? (
          <button onClick={connectWallet}>Connect Wallet</button>
        ) : (
          <p>Install Metamask wallet</p>
        )}
      </div>
    );
  }

  return (
    <div className="App">
      <h1>🔮 Horoscope NFT minting dApp 🔮</h1>
      <p>Connected as: {account}</p>
      <input onChange={handleDateInput} value={date} type="date" id="dob" />
      <br /><br />
      {zodiacSign ? (
        <svg
          width="350"
          height="350"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMinYMin meet"
        >
          <g>
            <rect id="background" fill="black" height="100%" width="100%" />
            <text
              id="word-bg-1"
              font-size="200px"
              font-family="serif"
              fill="#111111"
              text-anchor="middle"
              dominant-baseline="middle"
              class="base"
              y="50%"
              x="50%"
            >
              //////////////////////////
            </text>
            <text
              id="word-bg-2"
              font-size="200px"
              font-family="serif"
              fill="#222222"
              text-anchor="top"
              dominant-baseline="top"
              class="base"
              y="5%"
              x="-20%"
            >
              //////////////////////////
            </text>
            <text
              id="word-bg-3"
              font-size="200px"
              font-family="serif"
              fill="#222222"
              text-anchor="bottom"
              dominant-baseline="bottom"
              class="base"
              y="120%"
              x="-50%"
            >
              //////////////////////////
            </text>
            <text
              id="word"
              font-size="30px"
              font-family="sans"
              font-weight="bold"
              fill="white"
              text-anchor="middle"
              dominant-baseline="middle"
              class="base"
              y="50%"
              x="50%"
            >
              {zodiacSign}
            </text>
          </g>
        </svg>
      ) : null}
      <br /><br />
      <button>Mint</button>
    </div>
  );
}

export default App;
