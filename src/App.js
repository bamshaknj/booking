import { useState, useEffect } from "react";

import "./App.css";
import Header from "./components/Header";
import Section from "./components/Section";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Admin from "./components/Admin";
import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";

import booker from "./contracts/booker.abi.json";
import ierc from "./contracts/ierc.abi.json";

const ERC20_DECIMALS = 18;

const contractAddress = "0x8E16DEc920bb427010D80fC11A16CAdaAeFe53f2";
const cUSDContractAddress = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";

function App() {
  const [contract, setcontract] = useState(null);
  const [address, setAddress] = useState(null);
  const [kit, setKit] = useState(null);
  const [cUSDBalance, setcUSDBalance] = useState(0);
  const [pass, setPass] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    connectToWallet();
  }, []);

  useEffect(() => {
    if (kit && address) {
      getBalance();
    } else {
      console.log("no kit");
    }
  }, [kit, address]);

  const connectToWallet = async () => {
    if (window.celo) {
      try {
        await window.celo.enable();
        const web3 = new Web3(window.celo);
        let kit = newKitFromWeb3(web3);

        const accounts = await kit.web3.eth.getAccounts();
        const user_address = accounts[0];

        kit.defaultAccount = user_address;

        await setAddress(user_address);
        await setKit(kit);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Not connected");
    }
  };

  useEffect(() => {
    if (contract) {
      getPasses();
      isUserAdmin(address);
    }
  }, [contract]);

  const getBalance = async () => {
    try {
      const balance = await kit.getTotalBalance(address);
      const USDBalance = balance.cUSD.shiftedBy(-ERC20_DECIMALS).toFixed(2);

      const contract = new kit.web3.eth.Contract(booker, contractAddress);
      setcontract(contract);
      setcUSDBalance(USDBalance);
    } catch (error) {
      console.log(error);
    }
  };

  const getPasses = async () => {
    const passLength = await contract.methods.getPassLength().call();
    const _passes = [];

    for (let index = 0; index < passLength; index++) {
      let _pass = new Promise(async (resolve, reject) => {
        let p = await contract.methods.getPass(index).call();
        resolve({
          index: index,
          owner: p[0],
          eventName: p[1],
          table: p[2],
          amount: p[3],
          imageURL: p[4],
          quantity:p[5]
        });
      });
      _passes.push(_pass);
    }
    const passes = await Promise.all(_passes);
    console.log(passes);
    setPass(passes);
  };
  const bookPass = async (_index) => {
    const cUSDContract = new kit.web3.eth.Contract(ierc, cUSDContractAddress);
    try {
      await cUSDContract.methods
        .approve(contractAddress, pass[_index].amount)
        .send({ from: address });
      await contract.methods.buyPass(_index).send({ from: address });
      getBalance();
      getPasses();
    } catch (error) {
      console.log(error);
    }
  };
  const addPass = async (_eventName, _table, _image) => {
    try {
      await contract.methods
        .addPass(_eventName, _table, _image)
        .send({ from: address });
    } catch (error) {
      console.log(error);
    }
    getPasses();
  };
  const isUserAdmin = async (address) => {
    try {
      const _isAdmin = await contract.methods.isUserAdmin(address).call();
      setIsAdmin(_isAdmin);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Router>
      <Header balance={cUSDBalance} isAdmin={isAdmin} />
      <Switch>
        <Route exact path="/">
          <Section passes={pass} bookPass={bookPass} />
        </Route>
        <Route exact path="/admin">
          <Admin addPass={addPass} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
