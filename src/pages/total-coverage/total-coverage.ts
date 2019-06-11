import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ModalServiceProvider} from "../../providers/modal-service/modal-service";

/**
 * Generated class for the TotalCoveragePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-total-coverage',
  templateUrl: 'total-coverage.html',
})
export class TotalCoveragePage implements OnInit{
  coverageItemInputs:any = [];
  coverageFilterData:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public modalService:ModalServiceProvider) {
  this.coverageItemInputs = navParams.get("totalcoverage");
  console.log(this.coverageItemInputs);
  }
   
  ngOnInit(){
    let i=0;
    this.coverageItemInputs.forEach((obj)=>{
      console.log(" in total cov 1", obj.coverageAmount);
      // obj.coverageAmount = new Intl.NumberFormat('en-th').format(obj.coverageAmount);
      if(obj.coverageAmount != 0){
        this.coverageFilterData[i] = this.coverageItemInputs[i];
      }
      i++;
      // obj.coverageAmount = obj.coverageAmount.toString().replace(/\B(?=(\d{3})+\.)/g, '$&,');
      obj.coverageAmount= obj.coverageAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
      console.log(" in total cov 2", obj.coverageAmount);
    })
    console.log("filter data in total coverage  ",this.coverageFilterData);
    console.log(" data in total coverage  ",this.coverageItemInputs);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TotalCoveragePage');
    console.log("Amount change in data in total coverage  ",this.coverageItemInputs);
    
  }

  /**
   * This method is used to dismiss the modal
   */
  dismissModal(){
    this.modalService.dismissModal();

}

}
