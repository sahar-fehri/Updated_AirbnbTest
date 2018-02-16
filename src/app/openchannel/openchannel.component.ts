import { Component, OnInit } from '@angular/core';

import { HostListener, NgZone } from '@angular/core';
const Web3 = require('web3');
const contract = require('truffle-contract');
const channelArtifacts = require('../../../build/contracts/Channel.json');
declare var window: any;
@Component({
  selector: 'app-openchannel',
  templateUrl: './openchannel.component.html',
  styleUrls: ['./openchannel.component.css']
})
export class OpenchannelComponent  {

  Channel = contract(channelArtifacts);

  account: any;
  accounts: any;
  web3: any;
  balance: number;

  address: string;
  secrethash: string;

  value: number;

  constructor(private _ngZone: NgZone) { }

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



  openchannel = () => {
    console.log("****************rentValue", this.value);
    console.log("------------------", this.Channel)
    let mysecrethash;
    let res;
    let sig
    let r
    let s
    let k
    let v
    let test
    let myevent;
    let web32 = new Web3(new Web3.providers.HttpProvider("http://localhost:8549"))
    this.Channel
      .deployed()
      .then(instance => {
        res = instance;
        mysecrethash = this.web3.sha3(res.address, this.account)

        sig = web32.eth.sign(this.account, mysecrethash)

        r = sig.slice(0, 66)
        s = '0x' + sig.slice(66, 130)
        k =  sig.slice(130, 132)
        v = web32.toDecimal(k);
        console.log(v,"ssdfsdfsfdsfsfs")
        v = v +27;

        // myevent = res.exceeded_max_allowed(function (error, result) {
        //               if (!error){
        //                 console.log("-***************************************", result)
        //               }
        //               else{
        //                 console.log("no events", error)
        //               }
        //           });

        return res.open_channel.sendTransaction(mysecrethash,v,r,s,this.value, {from: this.account, value: this.value});

      }).then(()=>{
      console.log("transaction complete")
      return res.allowance.call(this.account)
    }).then((allowed)=>{
      console.log(allowed.toString(),'allowed')
      //console.log(res.maxcalls.call(),'max')
      return res.maxcalls.call()
    }).then(function (_max) {
      console.log('maaaaax', _max.toString());
      console.log(web32.eth.getBalance(res.address).toString())
    }).catch(tx => {
      console.log(tx)
    })

  };


}
