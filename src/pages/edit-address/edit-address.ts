import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ScbHeaderInputs } from "../../components/scb-header/scb-header";

/**
 * Generated class for the EditAddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-address',
  templateUrl: 'edit-address.html',
})
export class EditAddressPage {
  editAddressForm:FormGroup;
  public editAddress={};
  headerInputs = new ScbHeaderInputs();
  constructor(public navCtrl: NavController, private fb: FormBuilder) {
    this.headerInputs.nav = navCtrl;
    this.headerInputs.isBackButton = true;
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditAddressPage');
  }
 
   /**
   * @author Abhishek Raina
   * @param 
   * @description adding validations
   */
  ngOnInit() { 
    this.editAddressForm = this.fb.group({
      selectpolicy:['',  Validators.required],
      homeaddress:['',  Validators.required],
      building:['',  Validators.required],
      road:['',  Validators.required],
      village:['',  Validators.required],
      district:['',  Validators.required],
      subdistrict:['',  Validators.required],
      postcode:['',  Validators.required],
      province:['',  Validators.required],
      country:['',  Validators.required],

    });
  }
}
