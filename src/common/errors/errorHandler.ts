import { ErrorHandler, Injectable } from '@angular/core';
import { ToastServiceProvider } from '../../providers/ion-service/toast-service';


/** 
 * @author - Sandesh Uttarwar
 * @description This is to handle Global errors 
*/
@Injectable()

export class AppErrorHandler implements ErrorHandler {

    constructor(private toastService: ToastServiceProvider){

    }

    /**
     * @description This will handle error which is not handled 
     * @param error 
     */
    handleError(error) {
        console.log("Global error handler",error);
        // this.toastService.presentToast('Error occured ... ', 'bottom', 3000);
    }
}