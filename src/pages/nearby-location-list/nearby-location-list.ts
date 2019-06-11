import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Platform } from "ionic-angular";
import {
  LaunchNavigator,
  LaunchNavigatorOptions
} from "@ionic-native/launch-navigator";
import { ScbHeaderInputs } from "./../../components/scb-header/scb-header";
import { Geolocation } from "@ionic-native/geolocation";
import { FirebaseAnalyticsService } from "../../providers/firebase-service/firebase-analytics-service";

/**
 * @author Abhishek Raina
 * @description getting Hospital and Loyalty Store list
 */
@IonicPage()
@Component({
  selector: "page-nearby-location-list",
  templateUrl: "nearby-location-list.html"
})
export class NearbyLocationListPage {
  hospitalList: any;
  headerInput: ScbHeaderInputs = new ScbHeaderInputs();
  myPosition: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private launchNavigator: LaunchNavigator,
    private fba: FirebaseAnalyticsService,
    private platform: Platform,
    private geolocation: Geolocation
  ) {
    this.headerInput.isBackButton = true;
    this.headerInput.nav = navCtrl;
    this.hospitalList = this.navParams.get("terms");
  }

  ngOnInit() {
    this.geolocation.getCurrentPosition().then(resp => {
      this.myPosition = resp.coords;
    });
  }

  /**
   * @param  {string} name of hospitals
   * @description launching google maps
   */

  navigateTo(place) {
    this.fba.setCurrentScreen("location_hospital_direction");
    //Load Apple Maps for iOS
    var appString = this.launchNavigator.APP.GOOGLE_MAPS;
    if (this.platform.is("ios"))
      appString = this.launchNavigator.APP.APPLE_MAPS;

    let options: LaunchNavigatorOptions = {
      app: appString
    };
    this.launchNavigator.navigate([place.field_lat, place.field_long], options);
  }

  ionViewDidEnter() {
    this.fba.setCurrentScreen("location_hospital_listing");
  }

  //hospital details
  //  public marker: marker[] = [
  //   {
  //     name:"กรุงเทพ",
  //     lat:13.748415000000,
  //     lng: 100.583481000000,
  //     draggable: false
  //   },
  //   {
  //    name:"กรุงเทพคริสเตียน",
  //     lat:13.727939000000,
  //     lng: 100.531495000000,
  //     draggable: false
  //   },
  //   {
  //    name:"กล้วยน้ำไท",
  //     lat: 13.714241000000 ,
  //     lng: 100.587621000000 ,
  //     draggable: false
  //   }
  // ]
}

// just an interface for type safety.
// interface marker {
//   name:string;
// 	lat: number;
// 	lng: number;
// 	label?: string;
// 	draggable: boolean;
// }
