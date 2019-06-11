
import { BaseApp } from './../../app/base';
import { Injectable } from "@angular/core";
import { Push, PushObject, PushOptions } from "@ionic-native/push";
// import { ENV } from  '@app/env';
import { ENV } from "../../environments/environment";
import { DeepLinkObject } from "../../common/models/deep-Link.class";
import { dyLinkOBJConst } from "../../common/constants/cta-const";
import { CacheServiceProvider } from "../ion-service/cache-service";
import { FirebaseDynamicLinks } from '@ionic-native/firebase-dynamic-links';

declare var cordova: any;

/**
 * @description - this providers is used in  push notification and Dynamic link
 */
@Injectable()
export class PushNotificationDynamicLinkService extends BaseApp {
    private senderID = ENV.firebaseSenderID;

    private PUSH_MSG = "pushMsg";
    private CTA = "call2action";
    private DEFAULT_PAGE = "home";

    /**
     * @description- holds data received through notification
     */
    public deepLinkObject: DeepLinkObject = new DeepLinkObject();

    /**
     * @description - Generated device token upon registartion
     */
    public deviceToken: string = "";

    /**
     * @description - this will hold the page name parsed from dynamic link
     */
    private ctaFromDynamicLink: string;


    constructor(private push: Push,
        private cacheService: CacheServiceProvider,
        private firebaseDynamicLink: FirebaseDynamicLinks) {
        super();
    }

    /**
     * @description- this method initalizes Push Object and then register a device with firebase; to be called when platform ready
     */
    public initPushNotification() {
        console.log("adding SENDER_ID  to push options");
        const options: PushOptions = {
            android: {
                senderID: this.senderID,
                icon: "notify_icon"
            },
            ios: {
                alert: "true",
                badge: true,
                sound: "false"
            }
        };

        console.log("=:senderID:=" + this.senderID);

        //creating pushObject
        const pushObject: PushObject = this.push.init(options);

        //upon intialization regiter device with firebase
        this.registerDevice(pushObject);

        //to receive message
        this.onMessageRecevied(pushObject);

        //If error
        pushObject
            .on("error")
            .subscribe(error => console.error("=:Error with Push plugin:=" + error));
    }

    /**
     * @description- To register device for receiving notification; to be called after initPush()
     * @param pushObject - PushObject on method registers device
     */
    private registerDevice(pushObject: PushObject) {
        pushObject.on("registration").subscribe((data: any) => {
            if (data) {
                //get device token
                this.deviceToken += data.registrationId;

                //print device token
                console.log("=:FCM device token:=" + this.deviceToken);
                this.CONSTANT.PUSH_ID = this.deviceToken;
                this.cacheService.setCache(this.CONSTANT.KEY_PUSH_TOKEN, this.deviceToken);
            } else {
                this.deviceToken = "Device token not found";
            }
        });
    }

    /**
     * @desc - to allow users to subscribe for a topic  
     * @param pushObject
     */
    private subscribeTopic(pushObject: PushObject) {
        let topic = "/topics/" + "topic1"; // e.g.: "testtopic";
        pushObject
            .subscribe(topic)
            .then(res => { })
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
                console.log("=:Notification data:=" + JSON.stringify(data));

                this.formatpNotificationDLinkData(data.additionalData);
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
    public receivedNotificationMessage() {
        cordova.plugins.CheckPushMessage.payload(
            result => {
                console.log("=:message received:=", result);
                this.formatpNotificationDLinkData(result);
            },
            error => {
                console.log("=:error received:=", error);
            }
        );
    }

    /**
     * @description - this method formats the Push Notification and Dynamic Link  Data and stores in DeepLink Object
     */
    private formatpNotificationDLinkData(data) {
        //this condition is added to check if data object has an obaject pushMsg which is not empty then we send pushMsg data
        if (data && data.hasOwnProperty(this.PUSH_MSG)) {
            if (data[this.PUSH_MSG]) {
                data = this.parseIfRequried(data[this.PUSH_MSG]);
            }
        }
        console.log(dyLinkOBJConst.cta.hasOwnProperty(data[this.CTA]), "====" + dyLinkOBJConst.cta[data[this.CTA]]);

        if (!data[this.CTA] || !dyLinkOBJConst.cta.hasOwnProperty(data[this.CTA])) {
            console.log(dyLinkOBJConst.cta.hasOwnProperty(data[this.CTA]));
            this.deepLinkObject.call2action = dyLinkOBJConst.cta[this.DEFAULT_PAGE];
        } else {
            this.deepLinkObject.call2action = dyLinkOBJConst.cta[data[this.CTA]];
        }
        this.deepLinkObject.customerId = data["customerId"];
        this.deepLinkObject.messageGroupId = data["messageGroupId"];
        this.deepLinkObject.policyNumber = data["policyNumber"];
        this.deepLinkObject.premiumDueDate = data["premiumDueDate"];
        this.deepLinkObject.paymentDate = data["paymentDate"];
        this.deepLinkObject.claimId = data["claimId"];
        this.deepLinkObject.statusDate = data["statusDate"];
        this.deepLinkObject.status = data["status"];
        this.deepLinkObject.messageType = data["messageType"];
        this.deepLinkObject.fitsenseScreenPath = this.parseIfRequried(data["fitsenseScreenPath"]);
        console.log("=:formatPushNotificationData:=" + JSON.stringify(this.deepLinkObject));
    }

    public getPushId() {
        return this.deviceToken;
    }

    /**
    * @description- checks if the app is opened through dynamic links;
    * if so, saves which page to be opened (i.e. CTA) provided in dynamic links  
    */
    public initDynamicLink() {
        this.firebaseDynamicLink.onDynamicLink().subscribe(result => {
            console.log('=:firebase dynamiclink:=' + result.deepLink)

            //string to URL
            let strURL = new URL(result.deepLink);

            //get which page to navigate 
            var deepLinkObject = strURL.searchParams.get("deepLinkObject");

            console.log('=:deepLinkObject in dynamic link:=' + deepLinkObject)

            if (deepLinkObject) {
                this.formatpNotificationDLinkData(this.parseIfRequried(deepLinkObject));
            } else {
                console.log("=:In Dynamic Link no deep link object found:=");
            }
        }, error => {
            console.log('=:firebase dynamiclink error:=' + error);
        });
    }

    /**
     * @description - to parse dynamic link and pull the page name which needs to be opened
     */
    private getCTAFromDynamicLink() {
        if (this.ctaFromDynamicLink) {
            return this.ctaFromDynamicLink;
        } else {
            return this.CONSTANT.NO_PAGE;
        }
    }

    /**
     * @description - to clear deep link object values once page is visited so upon back no repetative action is perfomed
     */
    public clearDeepLinkObject() {
        this.deepLinkObject = new DeepLinkObject();
    }

    /**
     * 
     * @param data- any kind of data type
     *  @description - if data is json object parse it else return the same data
     */
    private parseIfRequried(data) {
        try {
            return JSON.parse(data);
        } catch (e) {
            return data;
        }
    }
}
