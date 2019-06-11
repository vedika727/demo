import { Component, Input, OnInit } from "@angular/core";
import {
  NavController,
} from "ionic-angular";
import { ProductDetailServiceProvider } from '../../providers/product-details/product-detail-service';

@Component({
  selector: "dashboard-sales",
  templateUrl: "dashboard-sales.html"
})
export class DashboardSalesComponent implements OnInit{

  @Input("in") tabSwitcher: string;
  recommendedProducts: any;

  constructor(
    public navCtrl: NavController,
    private salesService: ProductDetailServiceProvider
    ) {}

  ngOnInit(): void {
    this.salesService.getRecommendedProducts().subscribe(
      data => {
        this.recommendedProducts = data;
      },
      err => {
        console.log(err);
      }
    )    
  }

  navigateToIonicPage(navigateToPage) {
    this.navCtrl.push(navigateToPage);
  }
}
