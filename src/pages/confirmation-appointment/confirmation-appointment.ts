import { Component, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  Content,
} from "ionic-angular";
import { TabsPage } from '../pages';

@IonicPage()
@Component({
  selector: "confirmation-appointment",
  templateUrl: "confirmation-appointment.html"
})
export class ConfirmationAppointmentPage{
  
  @ViewChild(Content) content: Content;
  
  constructor(public navCtrl: NavController) { 
  }

  navigateToHomePage() {
    this.navCtrl.setRoot(TabsPage);
  }
}
