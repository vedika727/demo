import { LogServiceProvider } from './../../providers/data-service/log-service';
import { CmsServiceProvider } from "../../providers/cms-service/cms-service";
import { AlertServiceProvider } from "../../providers/ion-service/alert-service";
import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from "@angular/core";
import { ModalServiceProvider } from "../../providers/modal-service/modal-service";
import {
  IonicPage,
  NavController,
  AlertButton,
  Slides
} from "ionic-angular";
import { HttpServiceProvider } from "../../providers/data-service/http-service";
// import { ENV } from "@app/env";
import { ENV } from "../../environments/environment";
// import { BatteryStatus } from "@ionic-native/battery-status";
import { TestServiceProvider } from "../../providers/test-module/test-service/test-service";
import { ScbHeaderInputs } from "../../components/scb-header/scb-header";
import { GenericMessagePage, ToolTipPage } from '../../pages/pages';
import { IDialogButton } from '../../components/generic-view/iDialog-action';
import { IGenericView } from '../../components/generic-view/iGeneric-view';
import { BaseApp } from '../../app/base';
import { ITooltipView } from '../../components/tooltip-overlay/ITooltip-view';
import { TooltipServiceProvider } from '../../providers/tooltip-service/tooltip-service';

/**
 * Generated class for the TestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-test",
  templateUrl: "test.html"
})
export class TestPage extends BaseApp implements OnInit {
  @ViewChild("fnaDobDays") slidesDays: Slides;
  @ViewChild("fnaDobMonths") slidesMonth: Slides;
  @ViewChild("fnaDobYears") slidesYear: Slides;

  @Input() title: string;
  @Input() hidden: boolean = false;
  @Input() isValid: boolean = true;
  @Input() showNext: boolean = true;
  @Input() showPrev: boolean = true;


  selectedYear = 5;
  selectedMonth;
  selectedDay;

  private _isActive: boolean = false;
  isDisabled: boolean = true;
  step: number;
  stepCondition: boolean;



  @Input('isActive')
  set isActive(isActive: boolean) {
    this._isActive = isActive;
    this.isDisabled = false;
  }

  get isActive(): boolean {
    return this._isActive;
  }
 
  inputData: any;
  data: any;
  env = ENV.mode;
  privacy: string;
  claimDataObject: any;
  alertButtons: AlertButton[] = [{}, {}];
  headerInputs = new ScbHeaderInputs();


  genericActionRetry = <IDialogButton<any>>{
    name: "ลองอีกครั้ง",
    click: (data?) => {
      this.logger.debug("callback from retry");
      this.showGenericView = true;
      this.postCall();
    }
  }
  cta: IDialogButton<any>;
  toolData: ITooltipView<any>;
  sliders: number[];
  day: number[];
  month: string[];
  year: number[];


  constructor(
    public navCtrl: NavController,
    private modalService: ModalServiceProvider,
    private testService: TestServiceProvider,
    private alertService: AlertServiceProvider,
    private httpService: HttpServiceProvider,
    private cmsService: CmsServiceProvider,
    private logger: LogServiceProvider,
    public toolTipService:TooltipServiceProvider
  ) {
    super();
    this.day = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
    this.month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
    this.year = this.years (1900);
   
    this.present();
    this.showGenericView = false;
    this.getGenericError("home", "OOps!!", "Something went wrong", this.genericActionRetry)
    //this.getInternetConnectionGenericInterface(this.genericActionRetry, this.genericActionRetry, this.genericActionRetry);
    this.privacy = "";
    this.headerInputs.isProfile = true;
    this.headerInputs.isNotification = true;
    this.headerInputs.nav = navCtrl;
    this.claimDataObject = [
      {
        ProductName: 'เพื่อหลักประกันดูแลครอบครัว',
        PolicyNumber: 12855367,
        ClaimItems: [
          {
            planCode: null,
            claimNo: 7777,
            claimType: "qwe",
            issueDate: '25/12/2017',
            accidentDate: '04/03/2017',
            hbDate: '11/01/2014',
            status: 'Approved',
            approvalAmount: 25000,
            paymentChannel: 'cash',
            approvalDate: '04/03/2022',
            stage: 2
          }
        ],
        ClaimHistories: [
          {
            planCode: null,
            claimNo: 1111,
            claimType: "abc1",
            issueDate: '25/12/2017',
            accidentDate: '04/03/2017',
            hbDate: '11/01/2014',
            status: 'Approved',
            approvalAmount: 25000,
            paymentChannel: 'cash',
            approvalDate: '04/03/2022',
            stage: 2
          },
          {
            planCode: null,
            claimNo: 2222,
            claimType: "abc2",
            issueDate: '25/12/2017',
            accidentDate: '04/03/2017',
            hbDate: '11/01/2014',
            status: 'Approved',
            approvalAmount: 25000,
            paymentChannel: 'cash',
            approvalDate: '04/03/2022',
            stage: 2
          },
          {
            planCode: null,
            claimNo: 3333,
            claimType: "abc3",
            issueDate: '25/12/2017',
            accidentDate: '04/03/2017',
            hbDate: '11/01/2014',
            status: 'Approved',
            approvalAmount: 25000,
            paymentChannel: 'cash',
            approvalDate: '04/03/2022',
            stage: 2
          }
        ]
      }
    ]
  }

  ngOnInit() {
    // this.cmsService.getPrivacyPolicy().then((res: any) => {
    //   this.privacy = res.body;
    // });
    
  }
  
    ngAfterViewInit() {
      this.slidesDays.freeMode = true;
      this.slidesDays.freeModeSticky = true;
      this.slidesMonth.freeMode = true;
      this.slidesMonth.freeModeSticky = true;
      this.slidesYear.freeMode = true;
      this.slidesYear.freeModeSticky = true;
   
    
   this.step = 1;
   this.stepCondition = true;
  }
  years (startYear) {
    var currentYear = new Date().getFullYear(), years = [];
    startYear = startYear || 1980;

    while ( startYear <= currentYear ) {
            years.push(startYear++);
    } 

    return years;
  }

  ionViewDidLoad() {
    this.logger.log("ionViewDidLoad TestPage");
    this.inputData = {
      title: "Input Title",
      message: "Input message",
      messageType: "Component",
      button1Text: "Button1 Text",
      button2Text: "Button2 Text",
      callback: this.testFunction,
      context: this
    }
  }
  dismissModal() {
    this.modalService.dismissModal();
  }
  httpCall() {
    this.testService.login().then(
      res => {
        // success and get login response
      },
      err => {
        // get error msg
      }
    );
  }

  getCall() {
    this.testService.getOtp("0885557777").then(
      res => {
        this.logger.log("opt res", res);
      },
      err => {
        this.logger.log("err otp", err);
      }
    );
  }

  postCall() {
    console.log("Post called retry");
    // this.getGenericLoading();
    // this.showGenericView = ! this.showGenericView;
    this.cmsService.getPaymentTermsAndCondition();
    this.cmsService.getEmailTermsAndCondition();
  }

  alertCall() {
    this.alertButtons[0].text = "Call";
    this.alertButtons[0].handler = this.call;
    this.alertButtons[1].text = "cancle";
    this.alertButtons[1].role = "cancle";

    this.alertService.presentDynamicAlert(
      "dynamic alert",
      "works",
      this.alertButtons
    );
  }

  call() {
    this.logger.log("call called");
    let body = {
      loginModuleId: "E2EEPIN"
    };


    this.httpService
      .httpPost(
        "https://api-sit.sdn.scblife.co.th/public/api/auth/pre-authentication/v1",
        body
      )
      .then(res => {
        this.alertService.presentSimpleAlert(
          "Response",
          "" + res.amProcessingTimeMillis
        );
      });

    this.httpService
      .httpGet(
        "https://api-sit.scblife.co.th/public/mobile-easy/cms/v1/hospitallist?_format=json"
      )
      .then(res => {
        this.logger.log(res);
        this.alertService.presentSimpleAlert("Response", "" + res);
      });
  }
  cancle() {
    this.logger.log("cancle called");
  }

  getCms() {
    this.cmsService.getAboutus();
  }

  changeEmail() {
    this.testService.changeEmail("kdjag@gmail.com").then(
      res => {
        this.logger.log(res);
      },
      err => {
        this.logger.log(err);
      }
    );
  }

  btnPositive = <IDialogButton<any>>{
    name: "OK",
    click: (data?) => {
      console.log("OK");
    }
  }
  btnNegative = <IDialogButton<any>>{
    name: "Cancel",
    click: (data?) => {
      console.log("Cancel");
    }
  }
  btnNeutral = <IDialogButton<any>>{
    name: "Bye",
    click: (data?) => {
      console.log("Bye");
    }
  }

  iGen = <IGenericView>{
    icon: "scbl-accident-grey",
    title: "OOPS!!!",
    message: "Something Went Wrong :(",
    positiveButton: this.btnPositive,
    negativeButton: this.btnNeutral,
    displayType: "Page"
  }



  getCustomerData() {
    this.testService.getCustomerData().then((res) => {
      this.logger.log('customer data res', res);
      debugger;
    }, err => {
      this.logger.log('customer data err', err);
    })
  }
  genericMessage() {

    this.navCtrl.push(GenericMessagePage, {
      data: this.iGen
    });
  }
  testFunction() {
    console.log("Generic message test function");
  }

  getRewards() {
    this.cmsService.getRewards();
    this.cmsService.getChallenges();
    this.cmsService.getWeeklyContent();
    this.cmsService.getPromotions();
    this.cmsService.getStories();
  }

  alert(){
    console.log('alert called');
    this.modalService.dismissModal();
    // this.cta = <IDialogButton<any>>{
    //   name: "hello world",
    //   click: (data?) => {
    //     this.alert();
    //   }
    // }
    // this.toolData = <ITooltipView<any>>{
    //   // toolTipData: [{ image: "https://pbs.twimg.com/media/DSkz7UWVMAAivei.png", imageDesc: "สามารถกู้เงินได้งาย ๆ เพียง 2 ขั้นตอน <ืนยันหรือเพิ่มบัญชีในการรับเงิน" }, { image: "https://i.stack.imgur.com/rJeXI.png", imageDesc: "สามารถกู้เงินได้ง ขั้นตอน <ืนยันหรือเพิ่มบัญชีในการรับเงิน" }],
    //   toolTipData: [{ image: "https://pbs.twimg.com/media/DSkz7UWVMAAivei.png", imageDesc: "สามารถกู้เงินได้งาย ๆ เพียง 2 ขั้นตอน <ืนยันหรือเพิ่มบัญชีในการรับเงิน" }],
    //   toolTipKey: "homePagePolicy",
    //   actionCTA:this.cta
    // };
    // this.toolTipService.activateToolTip(this.toolData);

  }
  present() {
    this.cta = <IDialogButton<any>>{
      name: "homePageFitsense",
      click: (data?) => {
        this.alert();
      }
    }
    this.toolData = <ITooltipView<any>>{
      toolTipData: [{ image: "https://pbs.twimg.com/media/DSkz7UWVMAAivei.png", imageDesc: "สามารถกู้เงินได้งาย ๆ เพียง 2 ขั้นตอน <ืนยันหรือเพิ่มบัญชีในการรับเงิน" }, { image: "https://i.stack.imgur.com/rJeXI.png", imageDesc: "สามารถกู้เงินได้ง ขั้นตอน <ืนยันหรือเพิ่มบัญชีในการรับเงิน" }],
      // toolTipData: [{ image: "https://cdn.pttrns.com/298/7792_w250.jpg", imageDesc: "สามารถกู้เงินได้งาย ๆ เพียง 2 ขั้นตอน <ืนยันหรือเพิ่มบัญชีในการรับเงิน" }],
      toolTipKey: "homePagePolicy",
      actionCTA:this.cta
    };
    this.toolTipService.activateToolTip(this.toolData);
  }


  slideChanged(){

      let day =this.checkDateNull(this.slidesDays.getActiveIndex());
      let month =this.checkDateNull(this.slidesMonth.getActiveIndex());
      let year =this.checkDateNull(this.slidesYear.getActiveIndex());

        console.log("Date", day+"/"+month+"/"+year);
    
   
  }

  private checkDateNull(data){
    return data? data : 0;
  }

  dateSelected(type, index){
 
    console.log("Date Selected", type, index);
 
    switch(type){
      case "Day":{
        this.selectedDay = index;
      }
      break;
      case "Month":{
        this.selectedMonth = index;
      }
      break;
      case "Year":{
        console.log("Date Year", type, index);
        this.selectedYear = index;
      }
      break;
    }
  }
 
}
