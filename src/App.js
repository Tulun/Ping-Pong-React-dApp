import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';

import EthereumQRPlugin from 'ethereum-qr-code';
import QRCode from 'qrcode.react';

import leaderboard from './leaderboard';
const qr = new EthereumQRPlugin()
const web3 = new Web3(window.web3.currentProvider);

class App extends Component {
  state = {
    value: ""
  };
  async componentDidMount() {
    console.log('web3', web3);
    console.log('lb', leaderboard);
    console.log(web3.eth.abi.encodeFunctionCall({
      name: "addPlayerToLeaderboard",
      type: "function",
      inputs: [{
        type: 'string',
        name: 'name'
      }]
    },["Jason"]));

    console.log(await leaderboard.methods.players(0).call())
  }
  render() {
    return (
      <div className="App">
        <h2>Ping Pong Tester</h2>
        <QRCode id="qrcode" value={this.state.value} />
      </div>
    );
  }
}

export default App;

    // const qrCode = qr.toCanvas({
    //   to: "0x9adB410a0Dc71B790dd4e1959658E33e291A714E",
    //   // from: "0x1d0E501E76Fd7c92fb388053A7424a3ae50e74EC",
    //   // value: 0, 
    //   // gas: 55000,
    //   mode: "contract_function",
    //   "functionSignature": {
    //   "name": "addPlayerToLeaderboard",
    //   "payable": false,
    //   "args": [
    //     {
    //       name: "name",
    //       type: "string"
    //     }
    //   ],
    // },
    // "argsDefaults": [
    //   {
    //     "name": "name",
    //     "value": "Jason"
    //   }
    // ]
    // }, {
    //   selector: "#qrcode"
    // });

    // qrCode.then(code => {
    //   console.log('QR code', code, code.value);
    //   this.setState({ value: code.value })
    // });

  //   //      "from": "0x1d0E501E76Fd7c92fb388053A7424a3ae50e74EC",
  //   // ethereum:<address>[?from=<sender_address>][?value=<ethamount>][?gas=<suggestedGas>]

  // const qrString = "ethereum:0x57a0F1cD33d513BdEB47B2C0c1439Bb875135dfD[?from=0x1d0E501E76Fd7c92fb388053A7424a3ae50e74EC][?gas=55000][?args=['Jason']]";
  //   const testString = `
  //   {
  //     "to": "0x57a0F1cD33d513BdEB47B2C0c1439Bb875135dfD",
  //     "value": 0,
  //     "gas": 100000,
  //     "mode": "contract_function",
  //     "functionSignature": {
  //       "name": "addPlayerToLeaderboard",
  //       "payable": false,
  //       "args": ["Jason"]
  //     },
  //   }
  //   `