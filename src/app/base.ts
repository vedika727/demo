import { LoadingController } from 'ionic-angular';
import { IDialogButton } from 'components/generic-view/iDialog-action';
import * as APP_CONSTANT from './../common/constants/config';
import { IGenericView } from 'components/generic-view/iGeneric-view';
import { Injector } from '@angular/core';
import { ModalServiceProvider } from '../providers/modal-service/modal-service';
import { ToolTipPage } from '../pages/pages';
import { TooltipServiceProvider } from '../providers/tooltip-service/tooltip-service';
import { TranslateService } from "ng2-translate";

/**
 *  Base class to use all common funtionality
 */
export class BaseApp {

    protected CONSTANT: any;
    protected showGenericView: boolean;
    private loading: any;
    public translate: TranslateService;
    private loadingCtrl: LoadingController;
    loadingOption: any;
    constructor(
    injector?: Injector) {
        this.CONSTANT = APP_CONSTANT;
        if (injector)
            this.loadingCtrl = injector.get(LoadingController);
            // this.toolTipService = injector.get(TooltipServiceProvider);
    }

    public genericDialog: IGenericView;

    protected getInternetConnectionGenericInterface(button1?: IDialogButton<any>, button2?: IDialogButton<any>, button3?: IDialogButton<any>) {
        this.genericDialog = <IGenericView>{
            icon: "no-internet",
            title: this.translate.instant('errors.errorTitles.noInternet'),
            message: this.translate.instant('errors.errorMessages.noInternet'),
            positiveButton: button1,
            negativeButton: button2,
            neutralButton: button3
        };

        return this.genericDialog;
    }

    protected getGenericError(iconn?: string, titlee?: string, msg?: string, button1?: IDialogButton<any>, button2?: IDialogButton<any>, button3?: IDialogButton<any>): IGenericView {
        this.genericDialog = <IGenericView>{
            icon: iconn,
            title: titlee,
            message: msg,
            positiveButton: button1,
            negativeButton: button2,
            neutralButton: button3
        };

        return this.genericDialog;
    }

    protected getGenericLoading(): IGenericView {
        this.genericDialog = <IGenericView>{
            ionSpinner: true
        };

        return this.genericDialog;
    }

    protected getspinner(ionSpinner?: boolean): IGenericView {
        this.genericDialog = <IGenericView>{
            ionSpinner: ionSpinner,

        };

        return this.genericDialog;
    }

    public showLoading(msg?: any): any {
         
        console.log("Loading Controller:  ", this.loadingCtrl)
        if (this.loadingCtrl) {
            this.loading = this.loadingCtrl.create({
                content: msg
            });
            this.loading.present();
        }
    }
    public hideLoading() {
        if (this.loading) {
            this.loading.dismiss();
        }
    }

    public isLoading(flag) {
        if (flag) {
            this.loadingOption = this.loadingCtrl.create({
                content: "โปรดรอ",
                enableBackdropDismiss: false
            });
            this.loadingOption.present();
        } else {
            this.loadingOption.dismiss();
        }
    }
    protected emailVerifyPopUp(iconn?: string, titlee?: string, msg?: string, button1?: IDialogButton<any>, button2?: IDialogButton<any>, button3?: IDialogButton<any>): IGenericView {
        this.genericDialog = <IGenericView>{
            icon: iconn,
            title: titlee,
            message: msg,
            positiveButton: button1,
        };

        return this.genericDialog;
    }


    // public tooltipActive(toolTipData: any) {
    //     // condition check 

    //     // if (!this.modalService.toolTipVerify[toolTipData.toolTipKey]) {
    //     //     this.modalService.toolTipVerify[toolTipData.toolTipKey]=true;
    //     //     this.
    //     //     this.modalService.presentModal(ToolTipPage, { "data": toolTipData });

    //     // }
    //     this.toolTipService.activateToolTip(toolTipData);

    // }


}