import { Component } from '@angular/core';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';

/**
 * Generated class for the PromotionsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'promotions',
  templateUrl: 'promotions.html'
})
export class PromotionsComponent {

  options:InAppBrowserOptions;

  constructor(private iab: InAppBrowser) {
    this.options = {
      zoom:'no',
      toolbar:'yes'
    }
   
  }

  openPrivacyPolicy(){
    this.iab.create("http://www.google.com",'_blank',this.options);
  }

}
