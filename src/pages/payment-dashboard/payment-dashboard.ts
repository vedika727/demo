import { Component, Injector } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScbHeaderInputs } from '../../components/scb-header/scb-header';
import { PaymentMethodPage } from '../pages';
import { PaymentServiceProvider } from '../../providers/payment-service/payment-service';
import { PaymentDueDetails } from '../../common/models/payment-due-details.class';
import { IServiceResponse } from '../../common/service-models/iServiceResponse';
import { BaseApp } from '../../app/base';
import { ToastServiceProvider } from '../../providers/ion-service/toast-service';
import { ITooltipView } from '../../components/tooltip-overlay/ITooltip-view';
import { IDialogButton } from '../../components/generic-view/iDialog-action';
import { TooltipServiceProvider } from '../../providers/tooltip-service/tooltip-service';
import { FirebaseAnalyticsService } from "../../providers/firebase-service/firebase-analytics-service";
import { DeepLinkObject } from 'common/models/deep-Link.class';
import { TranslateService } from 'ng2-translate';

/**
 * Generated class for the PaymentDashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-payment-dashboard',
    templateUrl: 'payment-dashboard.html',
})

export class PaymentDashboardPage extends BaseApp {
    headerInput: ScbHeaderInputs = new ScbHeaderInputs();
    //@ViewChild(Content) Content: Content;
    policyPaymentDetails: PaymentDueDetails = new PaymentDueDetails();
    paymentDues: any;
    policyData: any;
    totalAmount: number;
    policyPaymentArray: any[] = [];
    cta: IDialogButton<any>;
    toolData: ITooltipView<any>;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private fba: FirebaseAnalyticsService,
        public paymentService: PaymentServiceProvider,
        public toastService: ToastServiceProvider,
        public toolTipService: TooltipServiceProvider,
        public translate: TranslateService,
        public injector?: Injector,
    ) {
        super(injector);
        this.fba.logEvent("payment_start","Start payment screen (Need to setup property - Payment flag)");
        this.paymentDashToolTip();
        this.headerInput.isBackButton = true;
        this.headerInput.nav = navCtrl;
        this.paymentService.getPaymentDuesByPolicyNumber(this.multiplePaymentDueResponse);
    }

    multiplePaymentDueResponse = <IServiceResponse<any>>{
        success: (data: any) => {
            console.log('multiplePaymentDueResponse success is - ', data);
            this.policyPaymentDetails = data.result;
            if (!this.policyPaymentDetails) {
                this.toastService.presentToast('error in payment dues service');
            }
            this.getPaymentData();
            this.genreratePaymentArray();

        },
        fail: (err: any) => {
            console.log('multiplePaymentDueResponse fail is - ', err);
            this.toastService.presentToast('error in payment dues service');

        },
        systemFailure: (systemFail: any) => {
            console.log('multiplePaymentDueResponse system fail is - ', systemFail);
            this.toastService.presentToast('error in payment dues service');
        },
        progress: (isProgress) => {
            this.isLoading(isProgress);
        }
    }

    /**
   * @author Manish Khedekar
   * @description This method hits the payment gateway with card details.
   */

    getPaymentData() {
        this.paymentDues = this.policyPaymentDetails.paymentDueList;
    }

    paymentDueSuccess = (data) => {
        console.log('payment -', data);
    }

    paymentDueFail = (fail) => {
        console.log('payment -', fail);
    }

    /**
   * @author Manish Khedekar
   * @description This method hits the payment gateway with card details.
   */

    genreratePaymentArray() {
        let tempObj = {};
        let isSame = false;
        tempObj = {
            "policyNumber": this.paymentDues[0].policyNumber,
            "payments": [this.paymentDues[0].payments],
            "paymentDetails": this.paymentDues[0].paymentDetails
        };
        this.policyPaymentArray.push(tempObj);

        for (let i = 1; i < this.paymentDues.length; i++) {
            for (let policyPayment of this.policyPaymentArray) {
                if (policyPayment.policyNumber === this.paymentDues[i].policyNumber) {
                    isSame = true;
                    policyPayment.payments.push(this.paymentDues[i].payments);
                }
            };
            if (!isSame) {
                tempObj = {
                    "policyNumber": this.paymentDues[i].policyNumber,
                    "payments": [this.paymentDues[i].payments],
                    "paymentDetails": this.paymentDues[i].paymentDetails
                };
                isSame = false;
                this.policyPaymentArray.push(tempObj);
            }
        };

        this.checkForDyLinkOBJ();

    }

    ionViewDidLoad() {
    }

    paynow() {
        this.navCtrl.push(PaymentMethodPage, { "data": this.policyData });
    }

    alert() {
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
            toolTipKey: "paymentPopUp1",
            actionCTA: this.cta
        };
        this.toolTipService.activateToolTip(this.toolData);
    }

    /**
     * @description -this method checks if policy number comes through dynamic link or push notification,in-app
     * then show that poilcy details first in the array
     */
    checkForDyLinkOBJ() {
        var dyLinkOBJ: DeepLinkObject = this.navParams.get(this.CONSTANT.DY_LINK_OBJ);
        if (dyLinkOBJ && dyLinkOBJ.policyNumber) {
            this.policyPaymentArray.forEach((element) => {
                if (element.policyNumber === dyLinkOBJ.policyNumber) {
                    this.policyPaymentArray.splice(this.policyPaymentArray.indexOf(element), 1);
                    this.policyPaymentArray.unshift(element);
                }
            })
        }
    }
}
