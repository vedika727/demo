import { Injectable } from "@angular/core";
import { HttpServiceProvider } from "../data-service/http-service";
import { routes } from '../../common/constants/http-routes/routes.const';
import { loginModuleType } from '../../common/constants/config';
import { LogServiceProvider } from "../../providers/data-service/log-service";
@Injectable()
export class PreAuthServivceProvider {
    preauthResponse={};
    constructor(
        private logger:LogServiceProvider,
        private httpService: HttpServiceProvider
    ) {
    }

    getpreAuthData(authType?) {
        let promise = new Promise((resolve, reject) => {
            let preauthData = {
                "loginModuleId": "E2EEPIN"
            };
            // Default authType is pin it only change to BIO when having param BIO
            if (authType != "") {
                preauthData["loginModuleId"] = loginModuleType[authType];
            }
            this.httpService.httpPost(routes.preAuthentication.url, preauthData).then((data: any) => {
                this.preauthResponse = data.result;
                  
                this.logger.log("Responnse in getpreAuthData::::::", this.preauthResponse);
                this.preauthResponse['state'] = true;
                resolve(this.preauthResponse);
            }, error => {
                  ;
                this.preauthResponse['state'] = false;
                reject(error);
            })
        });
        return promise;
    }

}

