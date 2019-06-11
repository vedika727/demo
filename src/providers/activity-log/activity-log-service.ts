import { BaseApiService } from "../base-api-integration/baseapi.service";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpErrorHandler } from "../base-api-integration/http-error-handler.service";
import { IServiceResponse } from "../../common/service-models/iServiceResponse";
import { routes } from '../../common/constants/http-routes/routes.const';
import { CacheServiceProvider } from '../ion-service/cache-service';

@Injectable()
export class ActivityLogServicesProvider extends BaseApiService {
  
  getActivitylogData: any;
  urmId: string;
  constructor(http: HttpClient,
    httpErrorHandler: HttpErrorHandler,
    private cacheService: CacheServiceProvider) {
    super(http, httpErrorHandler);
  }

  /**
   * @param serviceResponse observable handler passed from page
   * @param activityTypeCode 101= history, 102=,103=inapp 
   * @description called from inapp history log from hamgermenu activity log and 
   */
  activityLog(serviceResponse: IServiceResponse<any>, activityTypeCode: string) {
    this.setNetworkOperation(serviceResponse, "GET_ACTIVITY_LOG");
    this.cacheService.getCache(this.CONSTANT.KEY_URM_ID).then((res: string) => {
      this.urmId = res;
      let url = routes.getActivityLog.url + "activityTypeCode=" + activityTypeCode + "&customerId=" + this.urmId;
      this.get(url, serviceResponse);
    }, error => {
      console.log('==================================== urm id not found');
      this.urmId = null;
    });
  }

  sortData(data: any[]) {
    let returnObj = { todaysActivity: [], historyActivity: [] };
    let currentDate = new Date();
    data.forEach(element => {
      let dateOfActivity = new Date(element.createdDate);
      if (currentDate.getFullYear() === dateOfActivity.getFullYear()
        && currentDate.getMonth() === dateOfActivity.getMonth()
        && currentDate.getDay() === dateOfActivity.getDay()) {
        returnObj.todaysActivity.push(element)
      } else {
        returnObj.historyActivity.push(element);
      }
    });
    return returnObj;
  }

  updateActivityLog(serviceResponse: IServiceResponse<any>, activityLog: any) {
    this.setNetworkOperation(serviceResponse, "UPDATE_ACTIVITY_LOG");
      this.put(routes.updateActivityLog.url, serviceResponse,activityLog);
  }
}