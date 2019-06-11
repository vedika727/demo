
import { BaseApp } from './../../app/base';

import { Injectable } from "@angular/core";
import { Push, PushObject, PushOptions } from "@ionic-native/push";
import { Events } from "ionic-angular";
// import { ENV } from  '@app/env';
import { ENV } from "../../environments/environment";
import { DeepLinkObject } from "../../common/models/deep-Link.class";
import { dyLinkOBJConst } from "../../common/constants/cta-const";
import { CacheServiceProvider } from "../ion-service/cache-service";
import { RegisterDeviceProvider } from "../register-device/register-device";

declare var cordova: any;

/**
 * @description - this providers is used in  push notification
 */
@Injectable()
export class PushNotificationService extends BaseApp{
  private senderID = ENV.firebaseSenderID;
  private mode = ENV.mode;
  private pushMsg = "pushMsg";
  private cta = "cta";
  private defaultPage = "home";

  /**
   * @description- holds data received through notification
   */
  deepLinkObject: DeepLinkObject = new DeepLinkObject();

  /**
   * @description - Generated device token upon registartion
   */
  public pushToken: string ="";

  /**
   * @param push  is used to initalize push object
   */
  constructor(
    private push: Push,
    private events: Events,
    private cacheService: CacheServiceProvider
  ) {
    super();
  }

  /**
   * @description- this method initalizes Push Object and then register a device with firebase; to be called when platform ready
   */
  initPush() {
    console.log("adding SENDER_ID  to push options");
    const options: PushOptions = {
      android: {
        senderID: this.senderID
      },
      ios: {
        alert: "true",
        badge: true,
        sound: "false"
      }
    };

    console.log("senderID:=" + this.senderID);

    //creating pushObject
    const pushObject: PushObject = this.push.init(options);

    //upon intialization regiter device with firebase
    this.registerDevice(pushObject);

    //to receive message
    this.onMessageRecevied(pushObject);

    //If error
    pushObject
      .on("error")
      .subscribe(error => console.error(" Error with Push plugin:=" + error));
  }

  /**
   * @description- To register device for receiving notification; to be called after initPush()
   * @param pushObject - PushObject on method registers device
   */
  private registerDevice(pushObject: PushObject) {
    console.log('deviceToken called', pushObject);
    pushObject.on("registration").subscribe((data: any) => {
      if (data) {
        //get device token
         ;
        this.pushToken += data.registrationId;

        //print device token
        console.log("FCM device token:=" + this.pushToken);
        this.CONSTANT.PUSH_ID= this.pushToken;
        this.cacheService.setCache(this.CONSTANT.KEY_PUSH_TOKEN, this.pushToken);
      } else {
        this.pushToken = "Device token not found";
      }
    },err=>{
      console.log("error is -", err);
    });
  }

  /**
   *
   * @param pushObject
   */
  private subscribeTopic(pushObject: PushObject) {
    let topic = "/topics/" + "topic1"; // e.g.: "testtopic";

    pushObject
      .subscribe(topic)
      .then(res => {})
      .catch(err => {
        console.log("error while subscribing to topic: " + err);
      });
  }

  /**
   * @description - This method listen for app notifications send by firebase and AWS
   * @param pushObject
   */
  private onMessageRecevied(pushObject) {
    pushObject.on("notification").subscribe(
      (data: any) => {
        console.log("Notification data:=" + JSON.stringify(data));

        this.formatPushNotificationData(data.additionalData);
        //to pass the data back to the place where it is susbscribed
        //this.events.publish("notificationReceived", this.deepLinkObject);
      },
      err => {
        console.log("error=:=" + err);
      }
    );
  }

  /**
   * @description - adds notification message recevied into deepLInkObject when app resume(i.e. from background) or app starts
   * this method is only for android platform
   */
  receivedNotificationMessage() {
    cordova.plugins.CheckPushMessage.payload(
      result => {
        console.log("message received", result);

        this.formatPushNotificationData(result);
      },
      error => {
        alert(JSON.stringify(error, undefined, 2));
      }
    );
  }

  /**
   * @description - this method formats the Notification Data and stores in DeepLink Object
   */
  formatPushNotificationData(data) {
    //this condition is added to check if data object has an obaject pushMsg which is not empty then we send pushMsg data
    // if (data && data.hasOwnProperty(this.pushMsg)) {
    //   if (data[this.pushMsg]) {
    //     data = JSON.parse(data[this.pushMsg]);
    //   }
    // }
    // console.log(cta.hasOwnProperty(data[this.cta]),"====" + cta[data[this.cta]]);
    // if (!data[this.cta] || !cta.hasOwnProperty(data[this.cta])) {
    //   console.log(cta.hasOwnProperty(data[this.cta]));
    //   this.deepLinkObject.cta = cta[this.defaultPage];
    // }else {
    //   this.deepLinkObject.cta = cta[data[this.cta]];
    // }
    // this.deepLinkObject.customerId = data["customerId"];
    // this.deepLinkObject.groupId = data["groupId"];
    // this.deepLinkObject.policyNumber = data["policyNumber"];
    // this.deepLinkObject.premiumDueDate = data["premiumDueDate"];
    // this.deepLinkObject.paymentDate = data["paymentDate"];
    // this.deepLinkObject.claim_id = data["claim_id"];
    // this.deepLinkObject.status_date = data["status_date"];
    // this.deepLinkObject.status = data["status"];
    // this.deepLinkObject.type = data["type"];
    // this.deepLinkObject.fitsenseScreenPath = data["fitsenseScreenPath"];
    // console.log(
    //   "formatPushNotificationData " + JSON.stringify(this.deepLinkObject)
    // );
  }

  getPushId(){
    return this.pushToken;
  }
}
