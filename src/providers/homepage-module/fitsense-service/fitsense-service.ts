import { HttpServiceProvider } from './../../data-service/http-service';
import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { NetworkServiceProvider } from '../../data-service/network-service';
import { ModalServiceProvider } from '../../modal-service/modal-service';
import { NoInternetPage } from '../../../pages/pages';
import { LoadingServiceProvider } from '../../ion-service/loading-service';
import { Device } from '../../../../node_modules/@ionic-native/device';
import { Platform } from 'ionic-angular';
import { routes } from '../../../common/constants/http-routes/routes.const';
import { CacheServiceProvider } from '../../ion-service/cache-service';
import { DeviceInfoServiceProvider } from '../../deviceInfo-service/deviceInfo-service';
import { BaseApp } from '../../../app/base';
/*
  Generated class for the FitsenseServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

declare var cordova: any;

/**
 * @author Manish Khedekar
 * @description All the modals will be created and dismissed from here
 */
@Injectable()
export class FitsenseServiceProvider extends BaseApp {

    public fitsense: Fitsense;

    // public httpOptions = new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Credentials': 'true',
    //     'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    //     'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
    //     'Api-Key': 'DhQx3jccwIaPknDJSPAYJ9MBUEy74Xma8LLq9fnY',
    //     'user_id': '2222',
    // });


    public httpOptions: any;
    obj: any;
    fitsenseData: any;
    deviceId: any;
    initialReactScreenCalled : any = false;
    isChallengeScreenCalled : any = false;
    isFitStatusScreenCalled : any = false;
    isChallengeScreenOpen : any = false;

    constructor(
        private http: HttpClient,
        private networkService: NetworkServiceProvider,
        //public loginService: LoginServivceProvider,
        private modalService: ModalServiceProvider,
        private loadingService: LoadingServiceProvider,
        private device: Device,
        private platform: Platform,
        private httpService: HttpServiceProvider,
        private cacheService: CacheServiceProvider,
        private deviceInfoService: DeviceInfoServiceProvider

    ) {
        super();
    
        this.initializeURMId();
    }


    initializeURMId() {
        console.log('urm id ', this.CONSTANT.URM_ID);
        if (this.platform.platforms().indexOf("cordova") >= 0) {

            // this.cacheService.getCache(this.CONSTANT.KEY_URM_ID).then((res) => {
            //     this.deviceId =  res;
            //     console.log('urmid in fitsense API',this.deviceId);
            // },(err)=>{
            //   console.log('DIDNT GET urmid in fitsense API',err);
            // })
            this.deviceId = this.CONSTANT.URM_ID;
            console.log("URMID Id in Fitsense Service" + this.CONSTANT.URM_ID);
        } else {
            console.log("In browser");
            this.deviceId = '';
        }
    }


    httpGet(endPoint, header?) {

        return new Promise((resolve, reject) => {
            //this if condition will check if network connectivity is available and then make http calls.
            if (this.networkService.checkNetwork()) {
                this.loadingService.presentLoading();
                let url = endPoint;
                this.http.get(url, { headers: this.httpOptions, observe: 'response' }).subscribe((res: HttpResponse<any>) => {
                    // // 
                    resolve(res);
                    this.loadingService.dismissLoading();

                }, (err: HttpResponse<any>) => {
                    // // 
                    reject(err);
                    this.loadingService.dismissLoading();
                });

            } else {
                reject({ message: 'Network not Available' });
                this.modalService.presentModal(NoInternetPage);
            }
        });
    }

    getFitsenseData() {
        console.log('In Fitsense service getFitsenseData');
        let header = {};
        header["Api-version"] = "0.1";
        header["User-ID"] = this.CONSTANT.URM_ID;

        return new Promise((resolve, reject) => {
            this.httpService.httpGet(routes.fitsenseUserStatus.url, header).then((data: any) => {
                console.log('In Fitsense service getFitsenseData');
                resolve(data);

                //this.loadingService.dismissLoading();
            }, error => {
                console.log('In Fitsense service getFitsenseData');
                reject(error);
                //this.loadingService.dismissLoading();
            })
        })
    }

    startFitsenseScreen(screenID, height) {

        var userID = this.CONSTANT.URM_ID;

        if(!this.initialReactScreenCalled)
        {
            this.initialReactScreenCalled=true;
            cordova.plugins.ReactNative.startReact(screenID, userID, height, (result) => {
                console.log(result);
            }, (error) => {
                console.log(error);
            });
        }
        else{
            cordova.plugins.ReactNative.switchReact(screenID, userID, height, (result) => {
                console.log(result);
            }, (error) => {
                console.log(error);
            });
        }
    }

    endFitsenseScreen() {
        //console.log('>>> menuTabBar '+screenID)
        this.initialReactScreenCalled=false;
        cordova.plugins.ReactNative.endReact((res) => {
            console.log(res);
        }, (err) => {
            console.log(err);
        });
    }
}

export class Fitsense {
    public isLoggedIn: boolean;
    public rewards: any;
    public numberOfChallenges: any;
    public activityToday: any
    public activityScoreGoal: any;
    public numberOfConnectedDataSources: any;
    public statusLevel: any;
    public challegesCompleted: any;
    public runningDuration: number;

    constructor(_isLoggedIn?: boolean, _rewards?: any, _numberOfChallenges?: any, _activityToday?: any, _activityScoreGoal?: any, _numberOfConnectedDataSources?: any, _statusLevel?: any, _challegesCompleted?: any) {
        this.isLoggedIn = _isLoggedIn;
        this.rewards = _rewards;
        this.numberOfChallenges = _numberOfChallenges;
        this.activityToday = _activityToday;
        this.activityScoreGoal = _activityScoreGoal;
        this.numberOfConnectedDataSources = _numberOfConnectedDataSources;
        this.statusLevel = _statusLevel;
        this.challegesCompleted = _challegesCompleted;

    }
}





