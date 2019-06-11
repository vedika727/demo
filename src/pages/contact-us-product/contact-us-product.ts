import { Component, ViewChild, OnInit, Injector } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Content
} from "ionic-angular";
import { ScbHeaderInputs } from "../../components/scb-header/scb-header";
import { BaseApp } from '../../app/base';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { v4 as uuid } from 'uuid';
import { ProductDetailServiceProvider } from '../../providers/product-details/product-detail-service'

@IonicPage()
@Component({
  selector: "contact-us-product",
  templateUrl: "contact-us-product.html"
})
export class ContactUsProductPage extends BaseApp implements OnInit {

  checkboxValid = true;
  submitted = false;
  @ViewChild(Content) content: Content;
  headerInput: ScbHeaderInputs = new ScbHeaderInputs();
  spinnerFlag: boolean;
  contactUs: FormGroup;
  retryServiceCall = 4;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fb: FormBuilder,
    private salesService: ProductDetailServiceProvider,
    public injector?: Injector
  ) {
    //initiate Base App
    super(injector);
    this.headerInput.nav = navCtrl;
    this.headerInput.isBackButton = true;
    this.headerInput.daynightFlag = 'false';
    this.headerInput.title = "contactUsProduct.pageTitle";
  }
  ngOnInit() {
    this.contactUs = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', Validators.pattern],
      Phone: ['', Validators.required],
      Comment__c: [''],
      Time08_12__c: [false],
      Time12_17__c: [false],
      Time17_21__c: [false],
      Holiday_Available__c: [false]
    })
  }

  navigateToIonicPage(pageName) {
    console.log('navigateToIonicPage' + pageName);
    this.navCtrl.setRoot(pageName);
  }

  checkboxValidation() {
    const morning = this.contactUs.controls.Time08_12__c.value;
    const noon = this.contactUs.controls.Time12_17__c.value;
    const evening = this.contactUs.controls.Time17_21__c.value;
    this.checkboxValid = morning || noon || evening ? true : false;
  }

  submit(data) {
    this.showLoading('โปรดรอ');
    this.salesService.postContactUs(data).subscribe(
      () => {
        this.hideLoading();
        this.navCtrl.setRoot('ConfirmationAppointmentPage');
      },
      err => {
        this.hideLoading();
        this.navCtrl.setRoot('ServiceFailPage', {postData: data});
      }
    )
  }

  submitContactUs() {
    this.submitted = true;
    this.checkboxValidation();
    let postData = this.contactUs.value;
    postData.Lead_External_ID__c = uuid();
    postData.Product_Code__c = this.navParams.get('productId');
    postData.Company = "SCB Life Assurance Public Company Limited.";
    postData.LeadSource = "SCBLife App";
    postData.Time_Stamp__c = new Date().toISOString();

    if (this.contactUs.valid && this.checkboxValid) {
      this.submit(postData)
    }
  }
}
