import { Injectable } from "@angular/core";
import { LoadingController } from "ionic-angular";

/**
 * @author Sandesh Uttarwar
 * @description All methods related to Loading will be added here.
 */
@Injectable()
export class LoadingServiceProvider {
  loading: any;
  count: number;
  loadingOption:any

  constructor(private loadingCtrl: LoadingController) {
    this.count = 0;
  }

  /**
   * @description this will present the simple loader.
   */
  presentLoading() {
    console.log("presentLoading called - LoadingServiceProvider");
    if (this.count == 0) {
      this.loading = this.loadingCtrl.create({
        content: "โปรดรอ",
        enableBackdropDismiss: false
      });
      this.loading.present();
    }
      this.count++;
  }

  /**
   * @description This will dismiss the loader.
   */
  dismissLoading() {
    console.log("dismissLoading called - LoadingServiceProvider");
    this.count--;    
    if(this.count ==0){
      this.loading.dismiss();
    }
  }

  isLoading(flag){
    if(flag){
      this.loadingOption = this.loadingCtrl.create({
        content: "โปรดรอ",
        enableBackdropDismiss: false
      });
      this.loadingOption.present();
    }else{
      this.loadingOption.dismiss();
    }

  }
}
