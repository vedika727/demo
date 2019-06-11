import { ScbHeaderInputs } from "./../../components/scb-header/scb-header";
import { IonicPage, NavController, Platform } from "ionic-angular";
import { Component, NgZone, OnInit } from "@angular/core";
import { Geolocation } from "@ionic-native/geolocation";
import {
  LaunchNavigator,
  LaunchNavigatorOptions
} from "@ionic-native/launch-navigator";
import { LoadingServiceProvider } from "../../providers/ion-service/loading-service";
//import {} from "@types/googlemaps";
import { LogServiceProvider } from "../../providers/data-service/log-service";
import { CmsServiceProvider } from "../../providers/cms-service/cms-service";
import { IDialogButton } from "../../components/generic-view/iDialog-action";
import { ITooltipView } from "../../components/tooltip-overlay/ITooltip-view";
import { TooltipServiceProvider } from "../../providers/tooltip-service/tooltip-service";
import { FirebaseAnalyticsService } from "../../providers/firebase-service/firebase-analytics-service";
import { TranslateService } from "ng2-translate";

/**
 * @author Abhishek Raina
 * @description show map of nearby hospitals
 */

let infowindow: any;
let map: any;
let that: any;
@IonicPage()
@Component({
  selector: "page-find-location",
  templateUrl: "find-location.html"
})
export class FindLocationPage implements OnInit {
  items: any;
  filterSearch: any;
  searchTerm: string = "";
  terms: any;
  myPosition: any;
  hospitalList: any = new Array<any>();
  map: any;
  markers: any = new Array<any>();
  nearbyMarkers: any;
  autocomplete: any;
  GoogleAutocomplete: any;
  GooglePlaces: any;
  geocoder: any;
  autocompleteItems: any;
  nearbyItems: any = new Array<any>();
  place: any = new Array<any>();
  headerInput: ScbHeaderInputs = new ScbHeaderInputs();
  cta: IDialogButton<any>;
  toolData: ITooltipView<any>;

  constructor(
    public navCtrl: NavController,
    public geolocation: Geolocation,
    public zone: NgZone,
    public launchNavigator: LaunchNavigator,
    public toolTipService: TooltipServiceProvider,
    private fba: FirebaseAnalyticsService,
    private loadingService: LoadingServiceProvider,
    private platform: Platform,
    public logger: LogServiceProvider,
    public cmsService: CmsServiceProvider,
    public translate: TranslateService
  ) {
    this.findLocatortooltip();
    this.geocoder = new google.maps.Geocoder();
    //for autocomplete in search bar
    this.autocomplete == false;
    let elem = document.createElement("div");

    this.platform.ready().then(() => {
      //find geocoder for search places and nearby place
      this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
      this.GooglePlaces = new google.maps.places.PlacesService(elem);
      infowindow = new google.maps.InfoWindow();
      this.autocompleteItems = [];
    });
    this.headerInput.isBackButton = true;
    this.headerInput.nav = navCtrl;
  }

  ionViewDidEnter() {
    this.fba.setCurrentScreen("location_hospital");
    this.fba.logEvent("menu_location", "Click to search location");
  }

  ngOnInit() {
    //to get current location and show nearby hospitals it in map markers
    that = this;
    this.getLocationAndHospitals();
  }

  getLocationAndHospitals() {
    this.geolocation
      .getCurrentPosition()
      .then(resp => {
        this.myPosition = resp.coords;
        this.map = new google.maps.Map(document.getElementById("map"), {
          center: new google.maps.LatLng(
            this.myPosition.latitude,
            this.myPosition.longitude
          ),
          zoom: 13
        });

        this.cmsService.getHospitallist().then(
          (res: any[]) => {
            this.terms = res;
            this.logger.log("response", this.terms);
            for (let i = 0; i < this.terms.length; i++) {
              this.getDistance(
                parseFloat(this.terms[i].field_lat),
                parseFloat(this.terms[i].field_long),
                this.terms[i]
              );
            }
          });
      })
      .catch(error => {
        console.log("Error getting location", error);
      });
  }

  /**
   * @param {Object} details of nearby Hospitals
   * @description create markers for nearby hospitals
   */

  createMarker(place) {
    var marker = new google.maps.Marker({
      map: this.map,
      position: new google.maps.LatLng(
        parseFloat(place.field_lat),
        parseFloat(place.field_long)
      )
    });
    google.maps.event.addListener(marker, "click", function() {
      infowindow = new google.maps.InfoWindow({
        content:
          "<div><div style='font-weight:bold'>" +
          place.field_hospitalname +
          "<br></div><span>" +
          place.field_regionname +
          "</span><li id='myButton' style='margin-left:10px' class='fa'>&#xf5eb;</li></div>"
      });
      // infowindow.setContent(infoContent);
      // <li class='fa'>&#xf5eb;</li>
      infowindow.open(map, this);

      infowindow.addListener("domready", () => {
        document.getElementById("myButton").addEventListener("click", () => {
          that.navigateTO(place);
        });
      });
    });
  }

  navigateTO(place) {
    //Load Apple Maps for
    var appString = this.launchNavigator.APP.GOOGLE_MAPS;
    if (this.platform.is("ios"))
      appString = this.launchNavigator.APP.APPLE_MAPS;

    let options: LaunchNavigatorOptions = {
      app: appString,
      start: ""+ this.myPosition.latitude +", " +this.myPosition.longitude
    };
    this.launchNavigator.navigate([place.field_lat, place.field_long], options);
  }

  /**
   * @param {Object} details of place searched
   * @description create marker for place searched and clear previous markers
   */
  selectSearchResult(item) {
    console.log('seleceted', item);
    this.loadingService.presentLoading();
    this.clearMarkers();

    this.searchTerm = item.field_hospitalname;
    
    for (var i = 0; i < this.terms.length; i++) {
      this.clearNearbyMarker(this.terms[i]);
    }

    this.map = new google.maps.Map(document.getElementById("map"), {
      center: new google.maps.LatLng(
        parseFloat(item.field_lat),
        parseFloat(item.field_long)
      ),
      zoom: 13
    });
    this.autocomplete = false;
    this.loadingService.dismissLoading();

    var marker = new google.maps.Marker({
      map: this.map,
      position: new google.maps.LatLng(
        parseFloat(item.field_lat),
        parseFloat(item.field_long)
      )
    });
    google.maps.event.addListener(marker, "click", function() {
      infowindow = new google.maps.InfoWindow({
        content:
          "<div><div class='hospital-name-bold'>" +
          item.field_hospitalname +
          "<br></div><span>" +
          item.field_regionname +
          "</span><li id='myButton' class='fa direction-icon'>&#xf5eb;</li></div>"
      });

      infowindow.open(map, this);

      infowindow.addListener("domready", () => {
        document.getElementById("myButton").addEventListener("click", () => {
          that.navigateTO(item);
        });
      });
    });
  }

  /**
   * @description clear markers of the places searched
   */

  clearMarkers() {
    for (var i = 0; i < this.markers.length; i++) {
      this.logger.log(this.markers[i]);
      this.markers[i].setMap(null);
    }
    this.markers = [];
  }

  /**
   * @param {Object} details of nearby Hospitals
   * @description clear markers of the nearby Hospitals
   */
  clearNearbyMarker(place) {
    this.createMarker(place);
    for (var i = 0; i < this.place.length; i++) {
      this.place[i].setMap(null);
    }
    this.nearbyMarkers = [];
  }

  /**
   * @description clear searchbar
   */

  clearSearchBar() {
    this.autocomplete = false;
    this.searchTerm = "";
  }

  /**
   * @description push to nearbylocationlist page
   */
  goToPlacesList() {
    this.navCtrl.push("NearbyLocationListPage", { terms: this.terms });
  }

  /**
   * @description get radian
   */
  radian(x) {
    return (x * Math.PI) / 180;
  }

  /**
   * @description get distance
   */
  getDistance(p1, p2, p3) {
    let r =this.calculateDistance(p1,p2,this.myPosition.latitude, this.myPosition.longitude,'K');
    console.log('distance is ', r);
    if (r <= 3) {
      this.createMarker(p3);
    }
  }

  calculateDistance(lat1, lon1, lat2, lon2, unit){    

    var radlat1 = Math.PI * lat1/180;
    var radlat2 = Math.PI * lat2/180;
    var radlon1 = Math.PI * lon1/180
    var radlon2 = Math.PI * lon2/180
    var theta = radlon1-radlon2
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(theta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    if (unit=="K") { dist = dist * 1.609344 }
    if (unit=="N") { dist = dist * 0.8684 }
    return dist
    }

  /**
   * @description show nearby hospital markers on clearing searchbar
   */

  showNearbyMarkers() {
    this.autocomplete = false;
    this.getLocationAndHospitals();
  }

  /**
   * @description filter hospital list
   */

  setFilteredItems() {
    if (this.searchTerm == "") {
      this.autocomplete = false;
    } else {
      this.autocomplete = true;
    }
    this.items = this.filterItems(this.searchTerm);
  }
  /**
   * @param  user search{string}
   * @description filter hospital list
   */

  filterItems(searchTerm) {
    return this.terms.filter(item => {
      return (
        item.field_hospitalname
          .toLowerCase()
          .indexOf(searchTerm.toLowerCase()) > -1
      );
    });
  }
  alert() {
    console.log();
    this.toolTipService.dissmisstoolTipModal();
  }
  findLocatortooltip() {
    console.log("in tooltip modal claim");
    this.cta = <IDialogButton<any>>{
      name: this.translate.instant('errors.errorButtons.next'),
      click: (data?) => {
        this.alert();
      }
    };
    this.toolData = <ITooltipView<any>>{
      //toolTipData: [{ image: "https://pbs.twimg.com/media/DSkz7UWVMAAivei.png", imageDesc: "สามารถกู้เงินได้งาย ๆ เพียง 2 ขั้นตอน <ืนยันหรือเพิ่มบัญชีในการรับเงิน" }, { image: "https://i.stack.imgur.com/rJeXI.png", imageDesc: "สามารถกู้เงินได้ง ขั้นตอน <ืนยันหรือเพิ่มบัญชีในการรับเงิน" }],
      toolTipData: [
        {
          image: "../assets/imgs/TT08-hospital.jpg",
          imageDesc:
            "สามารถกู้เงินได้งาย ๆ เพียง 2 ขั้นตอน <ืนยันหรือเพิ่มบัญชีในการรับเงิน"
        }
      ],
      toolTipKey: "findLoaction",
      actionCTA: this.cta
    };
    this.toolTipService.activateToolTip(this.toolData);
  }
}
