import { AddChangeCreditCardPage, PaymentChangeBookPage, PayslipPage } from '../pages';
import { Component, Injector } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScbHeaderInputs } from '../../components/scb-header/scb-header';
import { IDialogButton } from '../../components/generic-view/iDialog-action';
import { ITooltipView } from '../../components/tooltip-overlay/ITooltip-view';
import { TooltipServiceProvider } from '../../providers/tooltip-service/tooltip-service';
import { IServiceResponse } from '../../common/service-models/iServiceResponse';
import { BaseApp } from '../../app/base';
import { PaymentServiceProvider } from '../../providers/payment-service/payment-service';
import { TranslateService } from 'ng2-translate';

@IonicPage()
@Component({
  selector: 'page-payment-information',
  templateUrl: 'payment-information.html',
})
export class PaymentInformationPage extends BaseApp {
  PolicyTitle = "Payment Information";
  public policyDetails:any ;
  public PaymentDueData:any;
  public switchStatus: boolean = true;
  public JsonData: any;
  public navPolicyId: any;
  public navPolicyName: any;
  public dueDate: any;
  public ILautoDeduction: any;
  public CR: boolean = false;
  public AC: boolean = false;
  public NS: boolean = false;
  Cheaque: boolean = true;

  str: string;
  headerInput: ScbHeaderInputs = new ScbHeaderInputs();
  cta: IDialogButton<any>;
  toolData: ITooltipView<any>;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public toolTipService: TooltipServiceProvider,
    public paymentService: PaymentServiceProvider, 
    public translate: TranslateService,
    public injector: Injector
  ) {
    super(injector);
    this.paymentDashToolTip();
    this.policyDetails = this.navParams.get("data");

    //data cehcke
    console.log("the upcoming data from page is ", this.policyDetails)
    this.navPolicyId = "ABC123456789";
    this.navPolicyName = "Treasure plus 25/12";
    this.headerInput.isBackButton = true;
    this.headerInput.nav = navCtrl;

    this.ILautoDeduction = "cr";

    this.JsonData = {
      "payments":
      {
        "paymentId": 1,
        "paymentAmount": 50000,
        "remarks": "premium",
        "qrCode": "RSEWAD3234653432",
        "dueDate": "25 มิถุนายน 61",
        "lastPaidAmount": 5000,
        "lastPaidDate": "18 May 2018",
        "paymentDetails": {
          "paymentDetailsId": 1323,
          "cardNumber": "XXXX-XXXX-XXXX-3333",
          "accountNumber": "XXX-X-XX123-4",
          "expirationDate": "03/35",
          "isReplaceCurrentCard": "false",
          "bankName": "SCB",
          "accountHolderName": "John",
          "cardHolderName": "John Doe",
          "bookletCopy": "https://scblife.co.th/api/blob/5226571730043f8b22dadc20/",
          "paymentMode": "annual",
          "paymentType": "credit card"
        }
      }

    }
    this.MaskNumber();
    this.getPolicy();
  }

  getPaymentDueByPolicyNumber = <IServiceResponse<any>>{
    success: (data: any) => {
      console.log('getPaymentDueByPolicyNumber success is - ', data);


    },
    fail: (err: any) => {
      console.log('getPaymentDueByPolicyNumber fail is - ', err);
    },
    systemFailure: (systemFail: any) => {
      console.log('getPaymentDueByPolicyNumber system fail is - ', systemFail);
    },
    progress: (isProgress) => {
      this.isLoading(isProgress);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentInformationPage');
    console.log(this.dueDate);

    if (this.ILautoDeduction == "cr") {
      this.CR = true;
    } else if (this.ILautoDeduction == "ac") {
      this.AC = true

    } else {
      this.NS = true;
    }

    console.log("hi    ", this.CR);


  }

  getPolicy() {
    this.paymentService.getPaymentDueByPolicyNum(this.getPaymentDueByPolicyNumber, this.policyDetails.policyNumberIL)
  }
  /**
   * @author Ankit Tiwari
   * This method is used to set Switch Status (Active)
   */
  setActive() {
    this.switchStatus = true;

  }
  MaskNumber() {
    this.str = this.JsonData.payments.paymentDetails.cardNumber;
    var substr = this.str.substring(15, 19);
    console.log(" string ", substr);
  }
  /**
   * @author Ankit Tiwari
   * This method is used to set Switch Status (Inactive)
   */
  setActive1() {
    this.switchStatus = false;

  }


  /**
     * @author Rajul Dixit.
     * @description function navigate payment change book page.
     */
  paymentChangeBook() {
    this.navCtrl.push(PaymentChangeBookPage);
  }
  paymentChangeCreditCard() {
    this.navCtrl.push(AddChangeCreditCardPage);
  }
  // payslip(){
  //   this.navCtrl.push(PayslipPage);
  // }

  alert() {
    console.log();
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
      //toolTipData: [{ image: "https://pbs.twimg.com/media/DSkz7UWVMAAivei.png", imageDesc: "สามารถกู้เงินได้งาย ๆ เพียง 2 ขั้นตอน <ืนยันหรือเพิ่มบัญชีในการรับเงิน" },
      //{ image: "https://i.stack.imgur.com/rJeXI.png", imageDesc: "สามารถกู้เงินได้ง ขั้นตอน <ืนยันหรือเพิ่มบัญชีในการรับเงิน" }],
      toolTipData: [{ image: "../assets/imgs/TT05-PaymentInformation-Payin.jpg", imageDesc: "สามารถกู้เงินได้งาย ๆ เพียง 2 ขั้นตอน <ืนยันหรือเพิ่มบัญชีในการรับเงิน" }],
      toolTipKey: "changePayment",
      actionCTA: this.cta
    };
    this.toolTipService.activateToolTip(this.toolData);
  }
}
