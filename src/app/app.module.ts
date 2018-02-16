import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { ReserveComponent } from './reserve/reserve.component';
import { OfferComponent } from './offer/offer.component';
import { MessagesComponent } from './messages/messages.component';
import { ClosechannelComponent } from './closechannel/closechannel.component';
import { ClosechannelcustComponent } from './closechannelcust/closechannelcust.component';
import { OpenchannelComponent } from './openchannel/openchannel.component';
import { VerifyComponent } from './verify/verify.component';
import { VerifyallowanceComponent } from './verifyallowance/verifyallowance.component';
import { MyserviceService} from "./services/myservice.service"


const appRoutes: Routes = [
  { path: 'reserve', component: ReserveComponent }
];


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    ReserveComponent,
    OfferComponent,
    MessagesComponent,
    ClosechannelComponent,
    ClosechannelcustComponent,
    OpenchannelComponent,
    VerifyComponent,
    VerifyallowanceComponent
  ],
  providers: [ MyserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
