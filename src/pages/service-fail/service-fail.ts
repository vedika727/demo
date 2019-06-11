import { Component, ViewChild, OnInit, Injector } from "@angular/core";
import {
  IonicPage,
  NavController,
  Content,
  NavParams,
} from "ionic-angular";
import { TabsPage, ConfirmationAppointmentPage } from '../pages';
import { BaseApp } from '../../app/base';
import { ProductDetailServiceProvider } from '../../providers/product-details/product-detail-service'

@IonicPage()
@Component({
  selector: "service-fail",
  templateUrl: "service-fail.html"
})
export class ServiceFailPage extends BaseApp implements OnInit{
  
  @ViewChild(Content) content: Content;
  postData: any;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private salesService: ProductDetailServiceProvider,
    public injector?: Injector
    ) { 
    super(injector);
  }

  ngOnInit () { 
    this.postData = this.navParams.get('postData');
  }

  navigateToHomePage() {
    this.navCtrl.setRoot(TabsPage);
  }

  retryPost() { 
    this.showLoading('โปรดรอ');
    this.salesService.postContactUs(this.postData).subscribe(
      () => {
        this.hideLoading();
        this.navCtrl.setRoot(ConfirmationAppointmentPage);
      },
      err => {
        this.hideLoading();
      }
    )
  }
}
