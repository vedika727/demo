import { Component, Injector } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BaseApp } from '../../app/base';
import { ViewController } from 'ionic-angular';
import { ModalServiceProvider } from '../../providers/modal-service/modal-service';

/**
 * Generated class for the ToolTipPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tool-tip',
  templateUrl: 'tool-tip.html',
})
export class ToolTipPage extends BaseApp{

  compData: any;
  arrayLength: number;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viweController:ViewController,public modalViewCntrl:ModalServiceProvider,
     public injector?: Injector  ) {
    super(injector);
    this.compData = this.navParams.get("data");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ToolTipPage', this.compData);
    this.arrayLength = this.compData.toolTipData.length;
  }
  closeModal(){
    this.modalViewCntrl.dismissModal();
  }
  // hideModal(){
  //   console.log('dissmiss called view');
  //   this.viweController.dismiss();
  // }

  


}
