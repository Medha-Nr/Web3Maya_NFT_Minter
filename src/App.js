import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Web3 from "web3";
import axios from "axios";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";

const ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_mintAmount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "_state",
        type: "bool",
      },
    ],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_newBaseExtension",
        type: "string",
      },
    ],
    name: "setBaseExtension",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_newBaseURI",
        type: "string",
      },
    ],
    name: "setBaseURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_newmaxMintAmount",
        type: "uint256",
      },
    ],
    name: "setmaxMintAmount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseExtension",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "cost",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxMintAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    name: "walletOfOwner",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

var account = null;
var contract = null;

const nftjpg =
  "https:/ipfs.io/ipfs/QmVBzDCxYy5heyRzQky3o2cMupWZvyD9X7aBomtPDFLnzg/";

const ADDRESS = "0xE3ed764F8E4c4Fa52334b988De2D207E349dCCB4";
const apikey = "EWM3UF6W1U6ATNT7W2NS2JCSQXATG5RB51";
const endpoint = "https://api-testnet.polygonscan.com/api";
const providerOptions = {
  binancechainwallet: {
    package: true,
  },
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "4f8f46b28b884408b3c898cce5ed8080",
    },
  },
  walletlink: {
    package: WalletLink,
    options: {
      appName: "NFT Minter",
      infuraId: "4f8f46b28b884408b3c898cce5ed8080",
      rpc: "",
      chainId: 80001,
      appLogoUrl: null,
      darkmode: true,
    },
  },
};

const web3Modal = new Web3Modal({
  network: "rinkeby",
  theme: "dark",
  cacheProvider: true,
  providerOptions,
});

const Web3Alc = createAlchemyWeb3(
  "https://polygon-mumbai.g.alchemy.com/v2/lrNiRI8GTwDaGih3yBTNNr9OwaNY_I4g"
);

//function connecting our wallet to the website to mint NFTs - using web3.js
async function connectWallet() {
  var provider = await web3Modal.connect();
  var web3 = new Web3(provider);
  await window.ethereum.send("eth_requestAccounts");
  var accounts = await web3.eth.getAccounts();
  account = accounts[0];
  document.getElementById("wallet-address").textContent = accounts;

  contract = new web3.eth.Contract(ABI, ADDRESS);
}

async function mint() {
  var _mintAmount = Number(document.querySelector("[name=amount]").value);
  var mintRate = Number(await contract.methods.cost().call());
  var totalAmount = mintRate * _mintAmount;
  await Web3Alc.eth.getMaxPriorityFeeFromGas().then((tip) => {
    Web3Alc.eth.getBlock("pending").then((block) => {
      var baseFee = Number(block.baseFeePerGas);
      var maxPriority = Number(tip);
      var maxFee = baseFee + maxPriority;
      contract.methods.mint(account, _mintAmount).send({
        from: account,
        value: String(totalAmount),
        maxFeePerGas: maxFee,
        maxPriorityFeePerGas: maxPriority,
      });
    });
  });
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      balance: [],
      nftdata: [],
    };
  }

  async componentDidMount() {
    await axios
      .get(
        endpoint +
          `?module=stats&action=tokensupply&contractaddress=${ADDRESS}&apikey=${apikey}`
      )
      .then((outputa) => {
        this.setState({
          balance: outputa.data,
        });
        console.log(outputa.data);
      });

    await axios
      .get(
        endpoint +
          `?module=account&action=tokennfttx&contractaddress=${ADDRESS}&page=1&offset=100&tag=latest&apikey=${apikey}`
      )
      .then((outputb) => {
        const { result } = outputb.data;
        this.setState({
          nftdata: result,
        });
        console.log(outputb.data);
      });
  }
  render() {
    const { balance } = this.state;
    const { nftdata } = this.state;

    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <h1 className="hdg1" style={{ marginTop: "50px" }}>
              The Web3 Maya Collection
            </h1>
            <h3 className="hdg3">
              Celebrating The Beauty & Diversity Of Women Around The World
            </h3>
            <form
              class="col-lg-5 gradient "
              style={{
                borderRadius: "25px",
                boxShadow: "5px 8px 15px #55cdf6",
                marginTop: "50px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <h4 style={{ color: "#d8d3d3", marginTop: "10px" }}>
                NFT Minter: Web3Maya Collection{" "}
              </h4>
              <h6 style={{ color: "#c2c1c3", marginBottom: "30px" }}>
                Connect Your Wallet & Mint Your NFT Now !!❤️
              </h6>
              <Button
                style={{
                  marginBottom: "10px",
                  color: "#4a4946",
                  backgroundColor: "#f4b814",
                  border: "none",
                  borderRadius: "6px",
                  fontWeight: "bold",
                }}
                onClick={connectWallet}
              >
                Connect Wallet
              </Button>
              <div
                className="card"
                id="wallet-address"
                style={{ marginTop: "6px", boxShadow: "1px, 2px, 4px #000000" }}
              >
                <label
                  style={{
                    color: "#ffff",

                    backgroundColor: "#490a6b",
                  }}
                  for="floatingInput"
                >
                  Wallet Address
                </label>
              </div>

              <div
                className="card"
                id="wallet-address"
                style={{ marginTop: "6px", boxShadow: "1px, 2px, 4px #000000" }}
              >
                <input
                  type="number"
                  name="amount"
                  defaultValue="1"
                  min="1"
                  max="5"
                ></input>
                <label style={{ color: "#490a6b", fontFamily: "sans-serif" }}>
                  Please select the number of NFTs you'd like to mint
                </label>
                <Button
                  style={{
                    color: "#4a4946",
                    backgroundColor: "#f4b814",
                    fontWeight: "bold",
                  }}
                  onClick={mint}
                >
                  MINT
                </Button>
              </div>

              <label
                style={{
                  color: "#d3d1d1d2",
                  marginBottom: "10px",
                  marginTop: "5px",
                }}
              >
                Price for each NFT minted is 0.005 MATIC
              </label>
              <h5 style={{ color: "#f4f4f4", textShadow: "1px 1px 3px #000" }}>
                Tokens minted so far = {balance.result}/1000
              </h5>
            </form>

            <div className="row items" style={{ marginTop: "80px" }}>
              <div
                className="ml-3 mr-3"
                style={{
                  display: "inline-grid",
                  gridTemplateColumns: "repeat(3, 5fr)",
                  columnGap: "20px",
                  rowGap: "40px",
                }}
              >
                {nftdata?.map((result) => {
                  console.log(nftdata);
                  return (
                    <div
                      className="card"
                      style={{
                        backgroundColor: "#190d45",
                        boxShadow: "1px 1px 5px #fff",
                      }}
                    >
                      <div className="image-over  ">
                        <img
                          className="card-img-top effect"
                          src={nftjpg + result.tokenID + ".jpg"}
                          alt="nft"
                        />
                      </div>
                      <div className="card-caption col-12 p-0">
                        <div className="card-body">
                          <h5 className="mb-0" style={{ color: "#f1d02a" }}>
                            Web3Maya Collection NFT #{result.tokenID}
                          </h5>
                          <h5 className="mb-0 mt-2">
                            Owner Wallet:{" "}
                            <p
                              style={{
                                color: "#da6ce6",
                                fontWeight: "bold",
                                textShadow: "1px 1px o.85px #dfa9eb",
                              }}
                            >
                              {result.to}
                            </p>
                          </h5>
                          <div className="card-bottom d-flex justify-content-between">
                            <Button
                              className="btn btn-bordered-white btn-smaller mt-3"
                              style={{
                                color: "#4a4946",
                                backgroundColor: "#f4b814",
                                fontWeight: "bold",
                                display: "block",
                                textAlign: "center",
                              }}
                            >
                              <i className="mr-2" />
                              MINT
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
