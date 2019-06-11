import { Component, ViewChild, OnInit, Injector } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Content
} from "ionic-angular";
import { ScbHeaderInputs } from "../../components/scb-header/scb-header";
import { BaseApp } from '../../app/base';

@IonicPage()
@Component({
  selector: "product-detail-more",
  templateUrl: "product-detail-more.html"
})
export class ProductDetailMorePage extends BaseApp implements OnInit {


  @ViewChild(Content) content: Content;
  headerInput: ScbHeaderInputs = new ScbHeaderInputs();
  spinnerFlag: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public injector?: Injector
  ) {
    //initiate Base App
    super(injector);
    this.headerInput.nav = navCtrl;
    this.headerInput.isBackButton = true;
    this.headerInput.daynightFlag = 'false';
    this.headerInput.title = "แบบประกันอุ่นใจ 10/5";
  }

  ngOnInit() {

  }
}
