import { Component, ViewChild, Input } from "@angular/core";
import { App } from "ionic-angular";
import { ProductDetailPage } from '../../pages/pages';

@Component({
  selector: "dashboard-sales-card",
  templateUrl: "dashboard-sales-card.html"
})
export class DashboardSalesCardComponent{

  @Input("in") recommendedProducts: any;

  constructor(public navApp: App) { 
  }

  navigateToIonicPage(product) {
    this.navApp.getRootNav().push(ProductDetailPage, { productId: product });
  }
}
