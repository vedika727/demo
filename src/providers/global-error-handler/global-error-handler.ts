import { Injectable } from "@angular/core";
import { BaseApiService } from '../base-api-integration/baseapi.service';
import { HttpClient } from '@angular/common/http';
import { HttpErrorHandler } from '../base-api-integration/http-error-handler.service';
import { ToastServiceProvider } from '../ion-service/toast-service';
import { ModalServiceProvider } from '../modal-service/modal-service';
import { ScbForgotPinWarningPopupPage, CallSupportPage } from "../../pages/pages";
import { FirebaseAnalyticsService } from '../firebase-service/firebase-analytics-service';
import { CacheServiceProvider } from '../ion-service/cache-service';

/**
 * @author Kundan Patil
 * @description This service is used to perform operations on date
 */

@Injectable()
export class GlobalErrorProvider extends BaseApiService {


  constructor(http: HttpClient, httpErrorHandler: HttpErrorHandler,
    public modalService: ModalServiceProvider,
    public toastService: ToastServiceProvider,
    public cacheService: CacheServiceProvider,
    private fba: FirebaseAnalyticsService,
  ) {
    super(http, httpErrorHandler);
  }

  handleError(errorService?: any) {
    return new Promise((resolve, reject) => {
      if (errorService) {
        if (errorService.hasOwnProperty("errorCode")) {
          switch (errorService.errorCode) {
            case this.CONSTANT.CODE_E_BLOCKED_THAI_ID:
              this.modalService.presentModal(CallSupportPage);
              this.lockUser();
              break;
            case this.CONSTANT.CODE_E_INVALID_THAI_ID:
            this.toastService.presentToast(errorService.resonseErrorMessage);
              // this.modalService.presentModal(ScbForgotPinWarningPopupPage);
              break;
            default:
              break;
          }
        }
      }
    });
  }
  private lockUser() {
    this.fba.logEvent("fallback_register_id", "After 2 failed entry (email/id card) by customer");
    this.modalService.presentModal(ScbForgotPinWarningPopupPage);
  }
}
