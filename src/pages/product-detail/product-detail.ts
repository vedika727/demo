import { Component, ViewChild, OnInit, Injector, HostListener } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Content,
} from "ionic-angular";
import { ScbHeaderInputs } from "../../components/scb-header/scb-header";
import { BaseApp } from '../../app/base';
import { ProductDetailServiceProvider } from '../../providers/product-details/product-detail-service';
import { ProductDetail } from "../../common/models/product-detail.class";



@IonicPage()
@Component({
  selector: "product-detail",
  templateUrl: "product-detail.html"
})
export class ProductDetailPage extends BaseApp implements OnInit {

  productDetail: ProductDetail;
  productId: string;
  @ViewChild(Content) content: Content;
  headerInput: ScbHeaderInputs = new ScbHeaderInputs();
  spinnerFlag: boolean;
  calculationResult: string;
  calculationTable: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private productDetailService: ProductDetailServiceProvider,
    public injector?: Injector,
  ) {
    //initiate Base App
    super(injector);
    this.headerInput.nav = navCtrl;
    this.headerInput.isBackButton = true;
    this.headerInput.daynightFlag = 'false';
    this.productId = this.navParams.get('productId');

    this.calculationTable = {
      taxSavings: {
        title: ['policyYear', 'taxBase', 'taxDeductionTable'],
        tableValues: ['1 - 5', '15%', 'ปีละ 7,500.00', 'รวม 5 ปี', '15%', '37,500.00']
      },
      cashBenefits: {
        title: ['policyYear', 'contractRefund', 'contractRefundBath'],
        tableValues: ['1 - 10','5%','ปีละ 2,500.00','10 ปี','500%','250,000.00','รวม 10 ปี','550%','275,000.00']
      },
      coverage: {
        title: ['policyYear', 'lifeProtection', 'lifeCover'],
        tableValues: ['1','105%','52,500.00','2','210%','105,000.00','3','315%','157,500.00','4','420%','210,000.00','5 - 10','525%','262,500.00']
      }
    }
  }


  ngOnInit() {
    this.calculationResult = "taxSavings";
    this.productDetailService.getProductDetail(this.productId).subscribe(
      data => (this.productDetail = data),
      err => (console.log(err))
    )
  }

  ngOnDestroy() {
    
}

  segmentChanged(data) {
    
  }

  navigateToIonicPage(pageName) {
    this.navCtrl.push(pageName, { productId: "BE57" });
  }

  onScroll(e){
    if (e.scrollTop > 10) { 
          let element = document.getElementById('navbar');
           element.classList.add('sticky');
         } else {
          let element = document.getElementById('navbar');
            element.classList.remove('sticky'); 
         }
  }  
}
