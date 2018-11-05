// Dependencies
import React, { Component } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Web3 from 'web3';
import EthereumQRPlugin from 'ethereum-qr-code';
import QRCode from 'qrcode.react';

// Styles
import './App.css';

// Contract
import leaderboard from './leaderboard';

const qr = new EthereumQRPlugin()
const web3 = new Web3(window.web3.currentProvider);

class App extends Component {
  state = {
    name: "",
    nameHexcode: "",
    players: []
  };

  async componentDidMount() {
    const playerTwo = await leaderboard.methods.players(1).call();
    const numPlayers = await leaderboard.methods.totalNumPlayers().call();
    console.log('p2', playerTwo);
    console.log('# players', numPlayers)
    for (let i=0; i < numPlayers; i++) {
      const player = await leaderboard.methods.players(i).call();
      this.setState({
        players: [...this.state.players, player]
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.name != prevState.name) {
      const nameHexcode = web3.eth.abi.encodeFunctionCall({
        name: "addPlayerToLeaderboard",
        type: "function",
        inputs: [{
          type: 'string',
          name: 'name'
        }]
      },[this.state.name]);

      this.setState({ nameHexcode })
    }

    if(this.state.players != prevState.players) {

    }

    console.log('players', this.state.players);
  }
  render() {
    return (
      <div className="App container">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12">
            <h2>Ping Pong Tester</h2>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12">
            {this.state.players.length && 
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Address</th>
                    <th scope="col">Wins</th>
                    <th scope="col">Ties</th>
                    <th scope="col">Disputed</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.players.map( (player, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{index}</th>
                        <th scope="col">{player.name}</th>
                        <th scope="col">{player.playerAddress}</th>
                        <th scope="col">{player.wins}</th>
                        <th scope="col">{player.losses}</th>
                        <th scope="col">{player.numDisputedGames}</th>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            }
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12">
            <div className="form-group">
              <label>Enter Leaderboard:</label>
              <input className="form-control" onChange={(event) => {
                this.setState({ name: event.target.value })
              }}
              value={this.state.name} />
            </div>
          </div>
        </div>
        <div>
          <CopyToClipboard text={this.state.nameHexcode}
            onCopy={() => this.setState({copied: true})}>
            <button className="btn btn-primary">Copy Leaderboard Hexcode</button>
          </CopyToClipboard>
        </div>
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