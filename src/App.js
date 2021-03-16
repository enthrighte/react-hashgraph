import React, { Component } from "react";
import "./App.css";
import { HashgraphApi, createNewAccount } from "./api";
import Header from './components/Header/Header';

class App extends Component {
  constructor(props) {
    super(props);
    console.log("Testing Hashgraph Connection:");
    let api = new HashgraphApi();
    console.log(api.client)
  }

  async generateNewAccount() {
    let api = new HashgraphApi();
    let newAccount = await createNewAccount(api.client)
    console.log(newAccount.newAccountPublicKey)
  }

  render() {
    return (
      <div className="App">
        <Header />
        <button onClick={this.generateNewAccount}>Generate New Account</button>
      </div>
    );
  }
}

export default App;
