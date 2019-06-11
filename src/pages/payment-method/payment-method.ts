import { LogServiceProvider } from '../../providers/data-service/log-service';
import { PaymentServiceProvider } from '../../providers/payment-service/payment-service';
import { PaymentFailAckPage, PaymentSucessfulRoyaltyPage } from '../pages';
import { ModalServiceProvider } from '../../providers/modal-service/modal-service';
import { Component, OnInit, Injector } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { ScbHeaderInputs } from '../../components/scb-header/scb-header';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PayslipPage } from '../pages';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { PaymentDetails, PolicyDetails } from '../../common/models/payment-details.class';
import { IServiceResponse } from '../../common/service-models/iServiceResponse';
import { BaseApp } from '../../app/base';
import { IDialogButton } from '../../components/generic-view/iDialog-action';
import { ITooltipView } from '../../components/tooltip-overlay/ITooltip-view';
import { TooltipServiceProvider } from '../../providers/tooltip-service/tooltip-service';
import { FirebaseAnalyticsService } from '../../providers/firebase-service/firebase-analytics-service';
import { TranslateService } from 'ng2-translate';
/**
   * @author Banti Sutar.
   * @description Page to Showing payment method for policy due.
   */

@IonicPage()
@Component({
  selector: 'page-payment-method',
  templateUrl: 'payment-method.html',
})
export class PaymentMethodPage extends BaseApp implements OnInit {

  elementType: 'url' | 'canvas' | 'img' = 'url';
  card1: boolean = true;
  card2: boolean = false;
  card3: boolean = false;
  headerInput: ScbHeaderInputs = new ScbHeaderInputs();
  paymenttype = 'card';
  toppings: any;
  isCCChecked: boolean;
  isEasyChecked: boolean;
  alt: boolean;
  sum: number;
  digits: any[] = [];
  curDigit: number;
  maxExpiryDate: number = 5;
  res: boolean;
  paymentCardForm: FormGroup;

  payment_type = [
    {
      "type": "Credit Card",
      "icon": "scbl-policy-details",
      "class": "card"
    },
    {
      "type": "Or Code",
      "icon": "scbl-change-payment",
      "class": "qr"
    },
    {
      "type": "SCB Easy",
      "icon": "scbl-change-payment",
      "class": "easy"
    }
  ];
  createdCode:string;
  scannedCode = null;
  result: any;
  paymentStatus: string;
  urlNet: string;
  paymentData = {}
  policyData: any;

  totalAmount:number = 0;
  isPolicyLoan:boolean=false;

  paymentDetails: PaymentDetails = new PaymentDetails();
  acknowledgeRes: { "referenceNumber": any; "paymentStatus": any; };

  cta: IDialogButton<any>;
  toolData: ITooltipView<any>;
  constructor(public logger: LogServiceProvider, public navCtrl: NavController,
    public navParams: NavParams,
    private barcodeScanner: BarcodeScanner,
    private fba: FirebaseAnalyticsService,
    public modal: ModalServiceProvider,
    public formBuilder: FormBuilder,
    public iab: InAppBrowser,
    public paymentService: PaymentServiceProvider,
    public platform: Platform,
    public toolTipService:TooltipServiceProvider,
    public translate: TranslateService,
    public injector?: Injector) {
    super(injector);
    
    this.headerInput.isBackButton = true;
    this.headerInput.nav = navCtrl;

    if(this.navParams.get('data')){
    this.policyData = this.navParams.get('data');
    this.getPaymentDetails(this.policyData);
    }

    if(this.navParams.get('policyLoan')){
    this.isPolicyLoan = true ;
    this.paymentDetails = this.navParams.get('policyLoan');
    }

  }
  ionViewDidLoad() {
    this.paymentDashToolTip();
    this.logger.log('ionViewDidLoad PaymentMethodPage');
  }


  ngOnInit() {

  }

  payQRResponse = <IServiceResponse<any>>{
    success: (data) => {
      console.log('qr code res -', data.result);
      this.createdCode = data.result.qr_raw_data;
    },
    fail: (err) => {
      console.log('qr code res -', err);
    },
    systemFailure: (sysfail) => {
      console.log('system fail', sysfail)
    },
    progress: (isprogress) => {
      this.isLoading(isprogress);
    }
  }

  payByQRCode() {
    // this.paymentDetails.paymentMethod = 'qr';
    console.log('payment QR details -', this.paymentDetails);
    this.paymentService.payWithQrCode(this.payQRResponse,this.paymentDetails);
  }

  payCCResponse = <IServiceResponse<any>>{
    success: (data) => {
      console.log('payEasyResponse res -', data.result.encryptedData);
      this.goToPaymentGateway(data.result);
    },
    fail: (err) => {
      console.log('payEasyResponse res -', err);
    },
    systemFailure: (sysfail) => {
      console.log('payEasyResponse system fail', sysfail)
    },
    progress: (isprogress) => {
      this.isLoading(isprogress);
    }
  }
  payByCC() {
    this.fba.logEvent("payment_method_confirm_credit","Confirm credit card payment");    

    this.paymentDetails.paymentMethod = 'CC';
    this.paymentService.payWithCC(this.payCCResponse,this.paymentDetails)
  }

  payEasyResponse = <IServiceResponse<any>>{
    success: (data) => {
      console.log('payEasyResponse res -', data.result);
      this.goToPaymentGateway(data.result);
    },
    fail: (err) => {
      console.log('payEasyResponse res -', err);
    },
    systemFailure: (sysfail) => {
      console.log('payEasyResponse system fail', sysfail)
    },
    progress: (isprogress) => {
      this.isLoading(isprogress);
    }
  }

  payByEasy() {
    this.fba.logEvent("payment_method_confirm_scbeasy","Click 'เข้าสู่ระบบ' on scbeasy net page");    

    this.paymentDetails.paymentMethod = 'EasyNet';
    this.paymentService.payWithSCBNet(this.payEasyResponse,this.paymentDetails)
  }

  /**
    * @author Banti Sutar.
    * @description Function to change payment method tabs.
    */

  navigate(type) {
    this.paymenttype = type;
    if (type == 'card') {
      this.fba.logEvent("payment_method_credit","Visit payment method 'Credit card'");    

      this.card1 = true;
      this.card2 = false;
      this.card3 = false;
    } else if (type == 'qr') {
      this.fba.logEvent("payment_method_qr","Visit payment method 'QR'");    

      this.card1 = false;
      this.card2 = true;
      this.card3 = false;
      this.payByQRCode();
    }
    else {
      this.fba.logEvent("payment_method_scbeasy","Visit payment method 'SCBEASY.NET'");    

      this.card1 = false;
      this.card2 = false;
      this.card3 = true;
    }
  }
  /**
    * @author Banti Sutar.
    * @description function for scan qr code value.
    */
  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
    }, (err) => {
      this.logger.log('Error: ', err);
    });
  }



  pushToPaymentSuccess() {
    this.navCtrl.push(PaymentSucessfulRoyaltyPage);
  }

  /**
   * @author Manish Khedekar
   * @description This method hits the payment gateway with card details.
   * @param Take RSA encrypted card details as parameters.
   */
  options: InAppBrowserOptions = {
    zoom: 'no',
    toolbar: 'yes',
    location: 'no'
  }
  
  goToPaymentGateway(response: any) {
    let url = response.encryptedData;
    const browser = this.iab.create(url, "_blank", this.options);
    browser.on('loadstop').subscribe(event => {
      let link = event.url;
      console.log("Event  :", event);
      console.log("Event url :", link);
      let href = link.split("?")[0];
      var baseUrl = link.split("?")[1];
      if (href == "http://localhost/test_pay_return.asp") {
        if (baseUrl != undefined) {
           ;
          let keyValueArray: string[] = baseUrl.split("&");
          let keyPairs: any = {};
          keyValueArray.forEach(element => {
            keyPairs[element.split("=")[0]] = element.split("=")[1];
          });
          console.log("Event keyValues :", keyPairs);
          this.paymentStatus = keyPairs.response;
          if(this.paymentStatus == "success"){
            this.acknowledgerefid(response.referenceNumber, "Successful")
          }else{
            this.acknowledgerefid(response.referenceNumber, "Failed")
          }
          browser.close();
        }
      }
    });
    browser.on('exit').subscribe(event => {
      browser.close();
      if(this.paymentStatus && (this.paymentStatus != "success")){
        this.acknowledgerefid(response.referenceNumber, "Failed");
      }
    });
  }

  acknowledgerefid(refId, PaymentStatus) {
   this.acknowledgeRes = {
      "referenceNumber": refId,
      "paymentStatus": PaymentStatus
    };
    this.paymentService.acknowledgementRefId(this.acknowledgeRes, [this.successAcknowledgerefid]);
  }

  successAcknowledgerefid = () => {
    switch (this.paymentStatus) {
      case "success":
        this.fba.logEvent("payment_complete","Visit payment successful royalty page popup");    
      
        this.navCtrl.push(PaymentSucessfulRoyaltyPage, {"data":{"paymentDetails":this.paymentDetails,
                                                        "acknowledgerefId":this.acknowledgeRes.referenceNumber}});
        break;
      case "error":
        this.navCtrl.push(PaymentFailAckPage, {});
        break;
      case "cancel":
        this.navCtrl.push(PaymentFailAckPage, {});
        break;
      default:
        this.navCtrl.push(PaymentFailAckPage, {});
        break;
    }
  }

  getPaymentDetails(policyData) {
    let selectedDues = policyData.payments.filter(res => res.checked == true);

    selectedDues.forEach(policy => {
      let temp: PolicyDetails = new PolicyDetails();
      temp.amountDue = policy.paymentAmount;
      temp.dueDate = policy.dueDate;
      // temp.dueDate = "2018-07-27"
      temp.policyNumber = policyData.policyNumber;
      this.paymentDetails.policyPaymentDetails.push(temp);
      this.totalAmount += policy.paymentAmount;
    });

    this.paymentDetails.amount = "" + this.totalAmount;
    console.log('payment details are - ', this.paymentDetails);

  }


  alert(){
    console.log('alert called');
    this.toolTipService.dissmisstoolTipModal();

  }
paymentDashToolTip() {
    this.cta = <IDialogButton<any>>{
      name: this.translate.instant('errors.errorButtons.next'),
      click: (data?) => {
        this.alert();
      }
    }
    this.toolData = <ITooltipView<any>>{
      toolTipData: [{ image: "../assets/imgs/PM_tooltips_screen_01@3x.png", imageDesc: "สามารถกู้เงินได้งาย ๆ เพียง 2 ขั้นตอน <ืนยันหรือเพิ่มบัญชีในการรับเงิน" },
            { image: "../assets/imgs/PM_tooltips_screen_02@3x.png", imageDesc: "สามารถกู้เงินได้ง ขั้นตอน <ืนยันหรือเพิ่มบัญชีในการรับเงิน" }],
     // toolTipData: [{ image: "https://s3.amazonaws.com/media.nngroup.com/media/editor/2014/02/06/Ness-actualUI.png", imageDesc: "สามารถกู้เงินได้งาย ๆ เพียง 2 ขั้นตอน <ืนยันหรือเพิ่มบัญชีในการรับเงิน" }],
      toolTipKey: "paymentPopUp2",
      actionCTA:this.cta
    };
    this.toolTipService.activateToolTip(this.toolData);
  }

}
