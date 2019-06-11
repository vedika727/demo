import { LogServiceProvider } from '../../providers/data-service/log-service';
import { PaymentChangebookSuccessPage } from '../pages';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AlertController } from 'ionic-angular';
import { ScbHeaderInputs } from '../../components/scb-header/scb-header';
 /**
   * @author Rajul Dixit
   * @description Page for Showing policy insurance card.
   */
@IonicPage()
@Component({
  selector: 'page-payment-change-book',
  templateUrl: 'payment-change-book.html',
})
export class PaymentChangeBookPage {
  navigationData: any;
  public showHideContent: boolean;
  public paymentBook = {
    bank : '',
    accountHolder : '',
    accountNumber : '',
    bankAccountPic :''
  }
  public banks = [
    {name :"Siam Commercial Bank SCB"},
    {name :"Bangkok Bank BBL"},
    {name :"Kasikorn Bank KBANK"},
    {name :"Krungsri Bank BAY"},
    {name :"Thai Military Bank TMB"},
    {name :"CIMB"},
    {name :"Tanachart Bank TBANK"},
    {name :"Krungthai Bank KTB"},
    {name :"United Overseas Bank UOB"},
    {name :"TISCO"}
  ]
  dp: string;
  headerInput:ScbHeaderInputs = new ScbHeaderInputs();
 constructor(public navCtrl: NavController, public navParams: NavParams,
    public camera: Camera,public alertCtrl: AlertController, public logger : LogServiceProvider) {
    this.showHideContent = false;
    this.headerInput.isBackButton = true;
    this.headerInput.nav = navCtrl;
  }

  ionViewDidLoad() {
    this.logger.log('ionViewDidLoad PaymentChangeBookPage');
    this.navigationData = this.navParams.get("navigationData");
    // navigationData
  }

  /**
   * This method is used to save the newly added card details
   */
  changeBook(){
    this.logger.log("Change book saved :", this.paymentBook);
    this.navCtrl.push(PaymentChangebookSuccessPage,{navigationData:this.navigationData});
  }

  /**
   * This method is used to show other details on click event
   */
  showOtherDetails(){
    this.showHideContent = true;
  }
  ngOnInit(){
    this.dp='assets/imgs/pic.png'
  }
   /**
   * @author Rajul Dixit
   * @description PMethod for get picture from camera or gallery for change book access.
   */
  getPicture() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Choose Option');
    alert.addButton({
      text: 'Take Photo',
      handler: data => {
        this.logger.log('Checkbox data:', data);
        this.fromCamera();
      }
    });
    alert.addButton({
      text: 'Choose Photo',
      handler: data => {
        this.logger.log('Checkbox data:', data);
        this.fromGallery();
      }
    });
    alert.present().then(() => {
      
    });
  }
 /**
   * @author Rajul Dixit
   * @description PMethod for get picture from camera or gallery for change book access.
   */
  fromGallery(){
    this.logger.log("function called")
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      destinationType: this.camera.DestinationType.DATA_URL
     }).then((imageData) => {
       this.logger.log(imageData)
       this.dp = 'data:image/jpeg;base64,'+imageData;
      }, (err) => {
       this.logger.log(err);
     });
  }
   /**
   * @author Rajul Dixit
   * @description PMethod for get picture from camera or gallery for change book access.
   */
  fromCamera(){
   this.logger.log("function called")
   const options: CameraOptions = {
     quality: 70,
     destinationType: this.camera.DestinationType.DATA_URL,
     encodingType: this.camera.EncodingType.JPEG,
     correctOrientation:true,
     mediaType: this.camera.MediaType.PICTURE
   }
   
   this.camera.getPicture(options).then((imageData) => {
    this.dp = 'data:image/jpeg;base64,' + imageData;
   }, (err) => {
   });
  }
  
}
