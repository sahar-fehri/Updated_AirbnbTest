import { Injectable } from '@angular/core';

import * as Web3 from 'web3';

import { HostListener, NgZone } from '@angular/core';
const Web3 = require('web3');
const contract = require('truffle-contract');
const channelArtifacts = require('../../../build/contracts/Channel.json');
// import { canBeNumber } from '../util/validation';

//declare var window: any;

declare let require: any;

@Injectable()
export class MyserviceService {

  Channel = contract(channelArtifacts);

  account: any;
  accounts: any;
  web3: any;

  balance: number;

  constructor(private _ngZone: NgZone) {

  }

  checkAndInstantiateWeb3 = ( window ) => {
    console.log('insiiide chack ')
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof window.web3 !== 'undefined') {
      console.warn(
        'Using web3 detected from external source. If you find that your accounts don\'t appear or you have 0 MetaCoin, ensure you\'ve configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask'
      );
      // Use Mist/MetaMask's provider
      this.web3 = new Web3(window.web3.currentProvider);
    } else {
      console.warn(
        'No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it\'s inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask'
      );
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      this.web3 = new Web3(
        new Web3.providers.HttpProvider('http://localhost:8545')
      );
    }

    return this.web3;
  };

  onReady = (web3) => {
    // Bootstrap the MetaCoin abstraction for Use.
    this.Channel.setProvider(web3.currentProvider);
  console.log(this.Channel,"chaaaaaaaaaanel")
    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts((err, accs) => {
      if (err != null) {
        alert('There was an error fetching your accounts.');
        return;
      }

      if (accs.length === 0) {
        alert(
          'Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.'
        );
        return;
      }
      this.accounts = accs;
      this.account = this.accounts[0];
      console.log(this.account,"s,dfsfsffdsdfsd")

      // This is run from window:load and ZoneJS is not aware of it we
      // need to use _ngZone.run() so that the UI updates on promise resolution
    });

    return this.accounts;
  };




}
