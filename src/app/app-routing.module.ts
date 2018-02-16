import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReserveComponent} from './reserve/reserve.component';
import { OfferComponent} from "./offer/offer.component";
import { MessagesComponent} from "./messages/messages.component";
import { ClosechannelComponent} from "./closechannel/closechannel.component";
import { ClosechannelcustComponent} from "./closechannelcust/closechannelcust.component";
import { OpenchannelComponent} from "./openchannel/openchannel.component";
import { VerifyallowanceComponent} from "./verifyallowance/verifyallowance.component"


const routes: Routes = [
  { path: '', redirectTo: '/offer', pathMatch: 'full' },
  { path: 'reserve', component: ReserveComponent },
  { path: 'offer', component: OfferComponent },
  { path: 'messages', component: MessagesComponent },
  { path: 'closechannel', component: ClosechannelComponent },
  { path: 'closechannelcust', component: ClosechannelcustComponent },
  { path: 'openchannel', component: OpenchannelComponent },
  { path: 'verifyallowance', component: VerifyallowanceComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
