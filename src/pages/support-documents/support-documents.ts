import { ModalServiceProvider } from './../../providers/modal-service/modal-service';
import { PolicyDashboardServiceProvider } from './../../providers/policy-dashboard-service/policy-dashboard-service';
import { BaseApp } from './../../app/base';
import { NavParams } from 'ionic-angular';
import { ToastServiceProvider } from './../../providers/ion-service/toast-service';
import { LoadingServiceProvider } from './../../providers/ion-service/loading-service';
import { EnterOtpPage } from './../enter-otp/enter-otp';
import { LoginServivceProvider } from './../../providers/login-module/login-service/login-service';
import { DocumentSentConfirmationPage, EmailVerifyPromptPage, NoDocumentDownloadPage } from './../pages';
import { CacheServiceProvider } from '../../providers/ion-service/cache-service';
import { HttpServiceProvider } from '../../providers/data-service/http-service';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ScbHeaderInputs } from '../../components/scb-header/scb-header';
import { LogServiceProvider } from '../../providers/data-service/log-service';
import { IServiceResponse } from 'common/service-models/iServiceResponse';
import { DeepLinkObject } from 'common/models/deep-Link.class';
import { HomePdServiceProvider } from '../../providers/homepage-module/home-pd-service/home-pd-service';

/**
 * @author Sumit Lokhande
 */

@IonicPage()
@Component({
  selector: 'page-support-documents',
  templateUrl: 'support-documents.html',
})
export class SupportDocumentsPage extends BaseApp implements OnInit {


  headerInput: ScbHeaderInputs = new ScbHeaderInputs();

  public policyNumber: any;
  public documentName: any;
  public documentObject: Array<object>;
  data: any;
  dyLinkOBJ: DeepLinkObject;

  constructor( private modalService: ModalServiceProvider,private pdService: PolicyDashboardServiceProvider, private navParams: NavParams, public toastService: ToastServiceProvider, private loadingService: LoadingServiceProvider, public loginService: LoginServivceProvider, public logger: LogServiceProvider, public navCtrl: NavController,
    public http: HttpServiceProvider,private homePdService: HomePdServiceProvider, public cacheService: CacheServiceProvider) {
    super();
    this.headerInput.isBackButton = true;
    this.headerInput.nav = navCtrl;
    // Release 1
    this.headerInput.title = "หนังสือรับรองการชำระค่าเบี้ยประกันภัย";
    this.headerInput.daynightFlag = "false";
    // end of Release 1

    // TODO - Removed from Release 1
    // this.data = navParams.get('data');
    // this.dyLinkOBJ = navParams.get(this.CONSTANT.DY_LINK_OBJ);

    // if(this.data){
    //   this.policyNumber = this.data.policyNumber;
    // }else if(this.dyLinkOBJ){
    //   debugger;
    //   this.policyNumber=this.dyLinkOBJ.policyNumber;
    // }
    // console.log(this.data, "data from all policy detail tabs");

    //  this.documentObject = [
    //   {
    //     "หนังสือแจ้งกำหนดชำระเบี้ยประกัน":{"Invoice":'IPNOT'}
        	
    //   },
    //   {
    //     "ใบเสร็จรับเงิน":{'Receipt':'IPMOR'}
    //   },
    //   {
    //    "ใบเสร็จรับเงิน": {'Annual Statement':'IANNI'}
    //   },
    //   {
    //   "หนังสือรับรองการชำระเบี้ย":{'Tax certificate':'IPMRC'}
    //   }
    // ]

    
    // TODO - Removed from Release 1
    // this.documentName = [
    //   { name: 'กรมธรรม์อิเล็กทรอนิกส์' },                   //electronic policy
    //   { name: 'ใบแจ้งกำหนดชำระค่าเบี้ยประกันภัย' },         // Statement of premium payment
    //   { name: 'ใบเสร็จรับเงิน' },                       //Receipt
    //   { name: 'หนังสือรับรองการชำระค่าเบี้ยประกันภัย' }     //Certificate of premium payment
    // ];
  }

  ionViewDidLoad() {
    this.logger.log('ionViewDidLoad SupportDocumentCreditlifePage');

  }
  ngOnInit(): void {
    // TODO - Removed from Release 1
    // this.prepareDocList();
    this.homePdService.getallPolicies().then(
      data => {
        console.log(data);
        this.documentName = data;
      },
      err => {
        console.log(err);
      }
    )
  }

  /**
   * @description - this method prepares doc. list based on policycoverage either to shows only one element (annaual stmt)
   * or  the whole list (like .. annual stmt, billing, tax and Premium Receipt)
   */
  // TODO - Removed from Release 1
  // prepareDocList() {
  //   //checking for policy coverage
  //   var isCreditLife: boolean = false;
  //   this.cacheService.getCache("PiechartData").then((res: any) => {
  //     console.log('data from cache....:', res);
  //     debugger;
  //     if (res) {
  //       if (res.policyCoverage) {
  //         isCreditLife = true;
  //         debugger
  //         this.documentName=this.documentName.splice(2,1);
  //         console.log("isCreditLife is true");
  //       }
  //     }
  //   }, (err) => {
  //     console.log('DIDNT GET isregesiterd', err);
  //   })
  // }

  /**
   * This method is used to open the respective document
   * @param evt 
   */
  // OpenDocument(evt){

  // let supportDoc = {
  //   key:evt,
  //   policyNumber:""
  // }

  // this.cache.getCache('emailId').then((result)=>{
  //   if(result == true){
  //         this.http.httpPost("",supportDoc,"").then((res) =>{
  //           if(res == 'success'){
  //             this.navCtrl.push(DocumentSentConfirmationPage);
  //           }
  //           else{    
  //             this.logger.log("service is not getting called");
  //             this.navCtrl.push(DocumentPopupPage);
  //           }          
  //         })
  //       }
  //     },(err)=>{
  //       this.logger.log("Email_Id not verified ");
  //       this.navCtrl.push(DocumentPopupPage);
  //   });


  // }


  downloadDocumentResponse = <IServiceResponse<any>>{
    success: (data: any) => {
      // console.log(data instanceof Customer ? "Response is in Customer Format" : "Response is NOT in Customer Format");
      console.log("downloadDocument Response obj. : ", data);
      this.toastService.presentToast("Document Sent To Your Email Address Saved");
      this.navCtrl.push(DocumentSentConfirmationPage);
    },
    fail: (errorService) => {
      console.log("downloadDocument Error - ", errorService);
      if(errorService.errorCode === "2") { 
        this.modalService.presentModal(NoDocumentDownloadPage);
      }
    },
    systemFailure: (errorService) => {

      console.log("downloadDocument Error system ", errorService)
    },

    progress: (isProgress) => {
      this.loadingService.isLoading(isProgress);
    }
  }

  downloadDocument(documentName, policyNumber) {
    
    if (this.loginService.customerInfo.isEmailVerify) {
      console.log(this.loginService.customerInfo,"this.loginService.customerInfo.emailVerify")
      console.log(documentName, "document-Name");
      const data = {

        "policyNumber": policyNumber,
        // TODO - For Release 1 changed from IPNOT to IPRMC
        "letterCode": "IPRMC",
        "email": this.loginService.customerInfo.email
  
      }      
      console.log(data, "passing data to doc. download api")
      this.pdService.downloadDocument(this.downloadDocumentResponse, data)
    }
    else {
     
        this.modalService.presentModal(EmailVerifyPromptPage);
      console.log("to EnterOtpPage");
    }
    console.log(documentName, "document-Name");
  }

}
