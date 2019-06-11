import { HttpServiceProvider } from './../data-service/http-service';
import { Injectable } from "@angular/core";
import { routes } from '../../common/constants/http-routes/routes.const';
import { Stories } from '../../common/models/cms-stories.class';
import { Rewards } from '../../common/models/cms-rewards.class';
import { Challenges } from '../../common/models/cms-challenges.class';
import { WeeklyContent } from '../../common/models/cms-weekly.class';

/**
 * @author Sandesh Uttarwar
 * @description All the Api calls will done from here
 */
@Injectable()
export class CmsServiceProvider {
  //Headers for SSL security

  public storiesList: Stories[] = new Array(0);
  public rewadsList:Rewards[] = new Array(0);
  public challengesList: Challenges[] = new Array(0);
  public weeklyContentList:WeeklyContent[] = new Array(0);

  constructor(public httpService: HttpServiceProvider) { }

  /**
   * @param endPoint {string} - api endPoint
   * @description This method will call HttpClient's Get method to fetch data from API
   * @returns Promise
   */

  getPrivacyPolicy() {
    return new Promise((resolve, reject) => {
      this.httpService.httpGet(routes.getPrivacyPolicy.url).then(res => {
        console.log("privacypolicy - ", res);
        resolve(res[0]);
      }, err => {
        console.log('privacypolicy err - ', err);
        reject(err);
      });
    });
  }

  getTermsAndConditions() {
    return new Promise((resolve, reject) => {
      this.httpService.httpGet(routes.getTermsAndConditions.url).then(res => {
        console.log("termsconditions - ", res);
        resolve(res[0]);
      }, err => {
        console.log('termsconditions err - ', err);
        reject(err);
      });
    });
  }

  getSecuritytips() {
    return new Promise((resolve, reject) => {
      this.httpService.httpGet(routes.getSecuritytips.url).then(res => {
        console.log("securitytips - ", res);
        resolve(res);
      }, err => {
        console.log('securitytips err - ', err);
        reject(err);
      });
    });
  }

  getHospitallist() {
    return new Promise((resolve, reject) => {
      this.httpService.httpGet(routes.getHospitallist.url).then(res => {
        console.log("hospitallist - ", res);
        resolve(res);
      }, err => {
        console.log('hospitallist err - ', err);
        reject(err);
      });
    });
  }

  getAboutus() {
    return new Promise((resolve, reject) => {
      this.httpService.httpGet(routes.getAboutus.url).then(res => {
        console.log("aboutus - ", res);
        resolve(res);
      }, err => {
        console.log('getAboutus err - ', err);
        reject(err);
      });
    });
  }

  getRewards() {
    return new Promise((resolve, reject) => {
      this.httpService.httpGet(routes.rewards.url).then(res => {
        console.log("getRewards - ", res);
        this.rewadsList = res;
        resolve(res);
      }, err => {
        console.log('getRewards err - ', err);
        reject(err);
      });
    });
  }

  getChallenges() {
    return new Promise((resolve, reject) => {
      this.httpService.httpGet(routes.challenges.url).then(res => {
        console.log("getChallenges - ", res);
        this.challengesList = res;
        resolve(res);
      }, err => {
        console.log('getRewards err - ', err);
        reject(err);
      });
    });
  }

  getPromotions() {
    return new Promise((resolve, reject) => {
      this.httpService.httpGet(routes.promotions.url).then(res => {
        console.log("getPromotions - ", res);
        resolve(res);
      }, err => {
        console.log('getPromotions err - ', err);
        reject(err);
      });
    });
  }

  getWeeklyContent() {
    return new Promise((resolve, reject) => {
      this.httpService.httpGet(routes.weeklyContent.url).then(res => {
        console.log("getWeeklyContent - ", res);
        this.weeklyContentList = res;
        resolve(res);
      }, err => {
        console.log('getWeeklyContent err - ', err);
        reject(err);
      });
    });
  }

  getStories() {
    return new Promise((resolve, reject) => {
      this.httpService.httpGet(routes.stories.url).then(res => {
        console.log("getStories - ", res);
        this.storiesList = res;
        resolve(res);
      }, err => {
        console.log('getStories err - ', err);
        reject(err);
      });
    });
  }

  getEmailTermsAndCondition() {
    return new Promise((resolve, reject) => {
      this.httpService.httpGet(routes.emailTnC.url).then(res => {
        console.log("Terms and condition email - ", res);
        this.storiesList = res;
        resolve(res);
      }, err => {
        console.log('Terms and condition email err - ', err);
        reject(err);
      });
    });
  }

  getPaymentTermsAndCondition() {
    return new Promise((resolve, reject) => {
      this.httpService.httpGet(routes.paymentTnC.url).then(res => {
        console.log("Terms and condition Payment - ", res);
        this.storiesList = res;
        resolve(res);
      }, err => {
        console.log('Terms and condition Payment err - ', err);
        reject(err);
      });
    });
  }

  getLoansTermsAndConditions() {
    return new Promise((resolve, reject) => {
      this.httpService.httpGet(routes.getTermsAndConditionsLoans.url).then(res => {
        console.log("Terms and condition Loans - ", res);
        debugger
        resolve(res[0]);
      }, err => {
        console.log('Terms and condition Loans err - ', err);
        debugger
        reject(err);
      });
    });
  }
}
