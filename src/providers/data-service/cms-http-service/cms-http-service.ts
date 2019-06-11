import { LoadingServiceProvider } from "./../../ion-service/loading-service";
import { ModalServiceProvider } from "./../../modal-service/modal-service";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NetworkServiceProvider } from "../network-service";
import { NoInternetPage } from "../../../pages/pages";

/**
 * @author Sandesh Uttarwar
 * @description All the Api calls will done from here
 */
@Injectable()
export class CmsHttpServiceProvider {
  baseUrl = "https://api-uat.scblife.co.th/";

  //Headers for SSL security
  private httpOptions;

  constructor(
    private http: HttpClient,
    private networkService: NetworkServiceProvider,
    private modalService: ModalServiceProvider,
    private loadingService: LoadingServiceProvider
  ) { }

  /**
   * @param endPoint {string} - api endPoint
   * @description This method will call HttpClient's Get method to fetch data from API
   * @returns Promise
   */

  httpGet(endPoint) {
    return new Promise((resolve, reject) => {
      console.log('URL is', this.baseUrl + endPoint);
      //this if condition will check if network connectivity is available and then make http calls.
      //   if (this.networkService.checkNetwork()) {
      this.loadingService.presentLoading();
      this.http.get(this.baseUrl + endPoint).subscribe(
        res => {
          this.loadingService.dismissLoading();
          console.log('success');
          console.log(res);
          resolve(res);
        },
        err => {
          this.loadingService.dismissLoading();
          console.log("error in get - ", err);
          reject(err);
        }
      );
      //   } else {
      //     reject({ message: "Network not Available" });
      //     this.modalService.presentModal(NoInternetPage);
      //   }
    });
  }

  /**
   *
   * @param endPoint {string}
   * @param body {any}
   * @description This method will call HttpClient's Post method to post data to backend
   * @returns Promise
   */
  httpPost(endpoint: string, body: any): Promise<any> {
    console.log("httpPost called");

    return new Promise((resolve, reject) => {
      if (this.networkService.checkNetwork()) {
        this.loadingService.presentLoading();
        this.http
          .post(this.baseUrl + endpoint, body, this.httpOptions)
          .subscribe(
            res => {
              this.loadingService.dismissLoading();
              resolve(res);
              console.log("res", res);
            },
            (err: HttpResponse<any>) => {
              this.loadingService.dismissLoading();
              reject(err);
            }
          );
      } else {
        console.log("internet is not available");
        this.modalService.presentModal(NoInternetPage);
        reject({ message: "Network not Available" });
      }
    });
  }

  /**
   *
   * @param endPoint {string}
   * @param body {any}
   * @description This method will call HttpClient's Put method to update data to backend
   * @returns Promise
   */
  httpPut(endPoint: string, body: any) {
    console.log("httpPut called");

    return new Promise((resolve, reject) => {
      if (this.networkService.checkNetwork()) {
        this.loadingService.presentLoading();
        this.http
          .put(this.baseUrl + endPoint, { observe: "response" })
          .subscribe(
            (res: HttpResponse<any>) => {
              this.loadingService.dismissLoading();
              resolve(res);
            },
            (err: HttpResponse<any>) => {
              console.log("In reject", err);
              this.loadingService.dismissLoading();
              reject(err);
            }
          );
      } else {
        reject({ message: "Network not Available" });
        this.modalService.presentModal(NoInternetPage);
      }
    });
  }

  /**
   *
   * @param endPoint {string}
   * @description This method will call HttpClient's Delete method to update data to backend
   * @returns Promise
   */
  httpDelete(endPoint) {
    console.log("httpDelete called");

    return new Promise((resolve, reject) => {
      if (this.networkService.checkNetwork()) {
        this.loadingService.presentLoading();
        this.http
          .delete(this.baseUrl + endPoint, { observe: "response" })
          .subscribe(
            (res: HttpResponse<any>) => {
              this.loadingService.dismissLoading();
              resolve(res);
            },
            (err: HttpResponse<any>) => {
              console.log("In reject", err);
              this.loadingService.dismissLoading();
              reject(err);
            }
          );
      } else {
        reject({ message: "Network not Available" });
        this.modalService.presentModal(NoInternetPage);
      }
    });
  }
}
