import { Component, OnInit } from '@angular/core';

import { MyserviceService} from "../services/myservice.service"
import { HostListener, NgZone } from '@angular/core';
const Web3 = require('web3');
const contract = require('truffle-contract');
const channelArtifacts = require('../../../build/contracts/Channel.json');


declare var window: any;
@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReserveComponent  {
  Channel = contract(channelArtifacts);

  account: any;
  accounts: any;
  web3: any;
 balance: number;

   address: string;
   secrethash: string;
   myChannel: any;
   service: any;
  constructor(private _ngZone: NgZone) {
  }

  @HostListener('window:load')
  windowLoaded() {
    this.checkAndInstantiateWeb3();
    this.onReady();
  }

  checkAndInstantiateWeb3 = () => {
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
  };

  onReady = () => {
    // Bootstrap the MetaCoin abstraction for Use.
    this.Channel.setProvider(this.web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    this.web3.eth.getAccounts((err, accs) => {
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

      // This is run from window:load and ZoneJS is not aware of it we
      // need to use _ngZone.run() so that the UI updates on promise resolution
      // this._ngZone.run(() => {
      //   this.refreshBalance()
      // });
    });
  };



  reserve = () => {
    console.log("****************rentValue", this.address);
    console.log("------------------", this.Channel)

    let myaddress = this.address;
    console.log('this is ', myaddress)
    let mysecrethash;
    let res;


    this.Channel
      .deployed()
      .then(instance => {
        res = instance;
        console.log(res,'reeeeeeeeeeees')
        mysecrethash = this.web3.sha3(res.address, myaddress)
        console.log('reees', mysecrethash)
        return res.reserve(myaddress, mysecrethash, {from: this.account})

      }).then(()=>{
      console.log("transaction complete")
      return res.allowance.call(myaddress)
    }).then((allowed)=>{
      console.log(allowed)
      return allowed;
    }).catch(tx => {
        console.log(tx)
        return tx;
    })

  };
}
