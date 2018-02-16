import { Component } from '@angular/core';
import { HostListener, NgZone } from '@angular/core';
const Web3 = require('web3');
const contract = require('truffle-contract');
const channelArtifacts = require('../../../build/contracts/Channel.json');
// import { canBeNumber } from '../util/validation';
import { MyserviceService} from '../services/myservice.service';

declare var window: any;

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent {
 Channel = contract(channelArtifacts);

  account: any;
  accounts: any;
  web3: any;

  balance: number;
  rentValue: number;
  periodrent: number;
  maxpeople: number;
    service: any;

    myChannel: any;


  constructor(private _ngZone: NgZone, cs: MyserviceService) {
    console.log("1********************")
    this.service = cs;
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
      this._ngZone.run(() =>
        this.refreshBalance()
      );
    });
  };

  refreshBalance = () => {
    this.web3.eth.getBalance(this.web3.eth.accounts[0], (err, res) => {
      console.log("-----------", this.account)
      this.balance = this.web3.fromWei(res,'ether');
    });
  };

  postOffer = () => {

    let res;
    console.log("****************rentValue", this.rentValue);
    console.log("****************period", this.periodrent);
    console.log("****************max", this.maxpeople);

    this.Channel
      .deployed()
      .then(instance => {
        res = instance;
        console.log('reees', res)
        return res;
      })
      .then(function () {

      })

  }
    //
  //   //
  //   // const contract1 = new Web3.eth.Contract(channelArtifacts.abi, { from: this.account });
  //   //
  //   // const createdContract =  contract1.deploy({
  //   //   data: channelArtifacts.bytecode,
  //   // }).send();
  //   //
  //   // const instance = contract.at(createdContract.options.address);
  // };
}
