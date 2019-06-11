import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { ScbHeaderInputs } from "../../components/scb-header/scb-header";
import { FirebaseAnalyticsService } from "../../providers/firebase-service/firebase-analytics-service";
/**
 * @author Ayush Vyas
 * @description CallMeBack
 */
@IonicPage()
@Component({
  selector: "page-call-me-back",
  templateUrl: "call-me-back.html"
})
export class CallMeBackPage {
  //declarations
  public date: any;
  public interval: any;
  public minTime: any;
  headerInput: ScbHeaderInputs = new ScbHeaderInputs();
  constructor(public navCtrl: NavController,
    private fba: FirebaseAnalyticsService) {
    this.headerInput.isBackButton = true;
    this.headerInput.nav = navCtrl;
    this.date = this.getThaiDate();  // bind current value
    this.minTime = this.getThaiDate(); //set min time validation
  }

  ionViewDidEnter() {
    this.fba.setCurrentScreen('contact_schedule');
    // update min time after every 10 sec
    this.interval = setInterval(() => {
      let currentTime = this.getThaiDate();
      if (new Date(this.date) < new Date(currentTime)) {
        this.minTime = this.getThaiDate(); //reset current time
        this.date = this.getThaiDate(); //bind current value
      } else {
        console.log("this date is valid");
      }
    }, 2000);
  }
  // logic to get thai date and time from calendar
  getThaiDate() {
    // console.log("thai");
    let today: any = new Date();
    let offset = today.getTimezoneOffset();
    let thaiDate = today.toISOString();
    let datetime = thaiDate.split("T");
    let dateStringArray = datetime[0].split("-");
    let dateYear = parseInt(dateStringArray[0]);
    let dateMonth = parseInt(dateStringArray[1]);
    let dateDay = parseInt(dateStringArray[2]);
    let timeStringArray = datetime[1].split(":");
    let timeHours: any = parseInt(timeStringArray[0]);
    let timeMinutes: any = parseInt(timeStringArray[1]);
    if (offset % 60 == 0) {
      let addedhours = -(offset / 60);
      timeHours += addedhours;
      if (timeHours == 24) {
        timeHours = 0;
      }
      if (timeHours > 24) {
        timeHours -= 24;
      }
    } else {
      let minutes = -(offset % 60);
      let addedhours = (-offset - minutes) / 60;
      timeHours += addedhours;
      timeMinutes += minutes;
      if (timeMinutes == 60) {
        timeMinutes = 0;
        timeHours++;
      } else if (timeMinutes > 60) {
        timeMinutes -= 60;
        timeHours++;
      }
    }
    if (timeMinutes.toString().length == 1) {
      timeMinutes = "0" + timeMinutes.toString();
    }
    if (timeHours.toString().length == 1) {
      timeHours = "0" + timeHours.toString();
    }
    dateYear = dateYear + 543;
    let d =
      dateYear.toString() +
      thaiDate.substr(4, 7) +
      timeHours.toString() +
      thaiDate.substr(13, 1) +
      timeMinutes.toString() +
      thaiDate.substr(16, thaiDate.length);
    return d;
  }

  ionViewDidLeave() {
    console.log('interval stopped');
    clearInterval(this.interval);
  }
  callMeLater() {
    this.fba.logEvent('contact_schedule_nodate', 'Confirm call me back without date');
  }
}
