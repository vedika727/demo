import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
/*
  Generated class for the SharedataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
/**
 * @author Banti Sutar
 * @description All data sharing between component done by this service.
 */
@Injectable()
export class SharedataProvider {

  //for sharing data between components
  private messageSource = new BehaviorSubject<any>("");
  currentMessage = this.messageSource.asObservable();

  private messageSourceTabs = new BehaviorSubject<any>("");
  currentTabs = this.messageSourceTabs.asObservable();

  private policyLoanCallBack = new BehaviorSubject<any>("");
  policyLoanConfirmation = this.policyLoanCallBack.asObservable();


  private currentTab = new BehaviorSubject<any>("");
  getCurrentTab = this.currentTab.asObservable();

  private fitsenseStatus = new BehaviorSubject<any>("");
  getfitsenseStatus = this.fitsenseStatus.asObservable();

  private userConsent = new BehaviorSubject<any>("");
  getUserConsent = this.userConsent.asObservable();

  constructor() {
    console.log('Hello SharedataProvider Provider');
  }

  /**
 * 
 * @param message {string}
 * @description This method will call to share data between different components
 * @returns Promise
 */
  changeMessage(message: any) {
    this.messageSource.next(message)
  }

  /**
  * 
  * @param message {string}
  * @description This method will call to share data between different components
  * @returns Promise
  */
  setTab(message: any) {
    this.messageSourceTabs.next(message)
  }

  /**
    * 
    * @param topDetails {object}
    * @description This method will call to share data between different components
    * which gives the otp code and otp ref code to policy loan confiramtion page
    * @returns Promise
    */
  confirmationPolicyLoan(topDetails: any) {
    this.policyLoanCallBack.next(topDetails)
  }

  setCurrentTab(TabName: any) {
    this.currentTab.next(TabName)
  }
  setFitsenseStatus(status:any){
    this.fitsenseStatus.next(status)

  }
  setUserConsent(consent:any){
    this.userConsent.next(consent)
  }
}

