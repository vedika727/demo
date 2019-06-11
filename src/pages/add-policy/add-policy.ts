import { ConfirmDeleteAckPage, DashboardFullViewAccidentPage } from '../pages';
import { FormGroup } from '@angular/forms';
import { EventEmitter,Output } from '@angular/core';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SharedataProvider } from '../../providers/sharedata/sharedata'
import { ModalServiceProvider } from '../../providers/modal-service/modal-service';
import { ScbHeaderInputs } from '../../components/scb-header/scb-header';

/**
   * @author Rajul Dixit.
   * @description Add policy Page where user can add other policy.
   */

@IonicPage()
@Component({
  selector: 'page-add-policy',
  templateUrl: 'add-policy.html',
})
export class AddPolicyPage {

  public cashBack : any = [];
  public healthbenefit : any = [];
  public k = 0;
  public j = 0;
  public companiesArray = [
    {name:'AIA'},
    {name:'Allianz'}
  ];
  public paymentMode = [
    {type:'cash'},
    {type:'credit/debit card'}
  ];
  public newPolicy = {
    companyName : '',
    policyNumber :'',
    startDate:'',
    expirationDate:'',
    premiumAmount:'',
    paymentmode:'',
    lastPaymentDate:'',
    cashback:[],
    healthBenefit:[]
  };

  public cashbackArray = [
  {cashbackType:'cashcoupon', label:'Cashcoupon Annually'},
  {cashbackType:'lumsum', label:'Lumsum'},
  {cashbackType:'death_benefit', label:'Death benefit'},
  {cashbackType:'retirement', label:'Retirements'},
  {cashbackType:'inheritance', label:'Inheritance'},
  {cashbackType:'birthday_benefits', label:'Birthday benefits'}
  ];
  public healthArray =[
    {name:'OPD'},
    {name:'Critical'},
    {name:'HB'},
    {name:'Accidental'}
  ]
  @Output() newPolicyData = new EventEmitter();
  headerInput:ScbHeaderInputs = new ScbHeaderInputs();
  constructor(public navCtrl: NavController, private share:SharedataProvider, public modalCTRL : ModalServiceProvider) {
    this.headerInput.isBackButton = true;
    this.headerInput.nav = navCtrl;
    this.cashBack.push({cashType:'',cashReturn:''});
    this.healthbenefit.push({type:'',amount:''});
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPolicyPage');
  }
/**
   * @author Rajul Dixit.
   * @description this method is used to add more rows to the cashback & health benefits
   */
 
  addMore(val){
    if(val == 'healthArray'){
      this.healthbenefit.push({type:'',amount:''});
      this.j = this.j + 1;
    }
    else if(val == 'cashBack'){
      this.cashBack.push({cashType:'',cashReturn:''}); 
      this.k = this.k + 1;     
    }
    else{
      console.log("value not matched");
    }
   
  }
/**
   * @author Rajul Dixit.
   * @description  This method is used for saving and sending new added policy to the allpolicy-details-tab component
   */
  newPolicyForm(){
    this.newPolicy.cashback[this.k] = this.cashBack;
    this.newPolicy.healthBenefit[this.j] = this.healthbenefit;
    
    this.share.changeMessage(this.newPolicy);
    this.navCtrl.pop();
  }
  /**
   * @author Rajul Dixit.
   * @description  This method is used to delete Selected Policy 
   */
 
  deletePolicy(){
    this.modalCTRL.presentModal(ConfirmDeleteAckPage);
  }
}
