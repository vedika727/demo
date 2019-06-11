import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ViewController, Slides } from 'ionic-angular';
import { ModalServiceProvider } from '../../providers/modal-service/modal-service';

/**
 * Generated class for the TooltipOverlayComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'tooltip-overlay',
  templateUrl: 'tooltip-overlay.html'
})
export class TooltipOverlayComponent implements OnInit{
  @ViewChild(Slides) slides: Slides;
  
  text: string;
  @Input("in") inputData;
  tooltipModal:boolean;
  imagesLength: number =0;
  constructor(public modalService:ModalServiceProvider) {
    console.log('Hello TooltipOverlayComponent Component');
    this.text = 'Hello World';
    this.tooltipModal = true;
    

  }
  // closecomponent(){
  //   this.tooltipModal = false;
  // }
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  console.log('tooltip data - ',this.inputData);
  // this.imagesLength = this.inputData.toolTipData.length;
}

// hideModal(){
//   console.log('dissmiss called view');
//   this.modalService.dismissModal();
// }

}
