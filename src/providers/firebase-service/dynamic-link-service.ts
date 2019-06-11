import { Injectable } from '@angular/core';
import { FirebaseDynamicLinks } from '@ionic-native/firebase-dynamic-links';

@Injectable()
export class DynamicLinkService {

  //this will hold the page name parsed from dynamic link
  public pageName: string;

  constructor(private firebaseDynamicLink: FirebaseDynamicLinks) {
  }

  /**
  * @description- checks if the app is opened through dynamic links;
  * if so, upon login navigate to the page provided in dynamic links  
  */
  checkToOpenDynamicLink() {
    this.firebaseDynamicLink.onDynamicLink().subscribe(result => {
      console.log('firebase dynamiclink:' + '=link=' + result.deepLink)

      //string to URL
      let strURL = new URL(result.deepLink);

      //get which page to navigate 
      this.pageName = strURL.pathname.replace('/', '');

      //printing which page name to be open
      console.log('firebase dynamiclink:' + '=page to open=' + this.pageName);

    }, error => {
      console.log('firebase dynamiclink:' + '=error=' + error);
    });
  }

  /**
   * @description - to parse dynamic link and pull the page name which needs to be opened
   */
  getPageNameFromDynamicLink() {
    return new Promise((resolve, reject) => {
      if (this.pageName) {
        resolve(this.pageName);
      } else {
        reject('no page found');
      }
    });
  }

}
