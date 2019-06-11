import { Component, ViewChild, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { Slides } from "ionic-angular";
import { SharedataProvider } from '../../providers/sharedata/sharedata';
import { Fitsense } from '../../providers/homepage-module/fitsense-service/fitsense-service';
/**
 *@author Banti Sutar
 */
@Component({
  selector: 'home-slider',
  templateUrl: 'home-slider.html'
})
export class HomeSliderComponent implements OnInit {
 @ViewChild(Slides) slides: Slides;
  @Input('in') fitsenseData: Fitsense;
  @Output() currentSlide = new EventEmitter();
  // private sIndex : string;
  public sliders: any;
  fitData:any;
  hide:any;
  index: any;
  isClassVisible: boolean = false;
  constructor(public sharedataservice?: SharedataProvider) {

  }
 /**
   * @author Banti Sutar
   * @description This method is used to get fitsense data from page
   */
  ngOnInit() {
    this.fitData = this.fitsenseData;
    this.sliders = [
      {
        icon: "assets/scbl-icons/favicon.ico",
        title: "FitSense",
        img: "assets/imgs/4.jpg",
        class:"show"
      }
     ,
     {
      icon: "assets/scbl-icons/favicon.ico",
      title: "Rewards",
      img: "assets/imgs/3.jpg",
      class:"show"
      
    },
    {
      icon: "assets/scbl-icons/favicon.ico",
      title: "Products",
      img: "assets/imgs/2.jpg",
      class:"show"
      
    },
      {
        icon: "assets/scbl-icons/favicon.ico",
        title: "Challenges",
        img: "assets/imgs/1.jpg",
        class:"show"
      },
      
      // TODO - Removed from Release 1
      // {
      //   icon: "assets/scbl-icons/favicon.ico",
      //   title: "PolicyDashboard",
      //   img: "assets/imgs/2.jpg",
      //   class:"show"
      // },
       
      // {
      //   icon: "assets/scbl-icons/favicon.ico",
      //   title: "Stories",
      //   img: "assets/imgs/5.jpg",
      //   class:"show"
      // },
      
      {
        icon: "assets/scbl-icons/favicon.ico",
        title: "FitSense",
        img: "assets/imgs/4.jpg",
        class:"hide"
      },
    ];
  }
 /**
   * @author Banti Sutar
   * @description This method is used to get status of changedSlide
   */
  slideChanged(index) {
    
    let currentIndex = this.slides.realIndex;
    if(currentIndex  == 4){
      this.slides.slideTo(3, 0);
    }
    // change this conditions when slides are increased
   console.log(currentIndex);
   this.sharedataservice.currentMessage.subscribe(message => {
    console.log("In home slider to check index::::: ", message)
    this.index = message;
  });
  if(currentIndex != this.index){
    if(currentIndex<=4 ){
      this.sharedataservice.changeMessage(currentIndex);
    }else{
      this.changeslide(currentIndex-1);
    }
  }
   
   
  }
  changeslide(index){
    // change this conditions when slides are increased
    if(index<=5){
      this.slides.slideTo(index, 500);
    }
  }

  

}
