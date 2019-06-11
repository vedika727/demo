import { ErrorService } from "../../providers/base-api-integration/error.service";
import { BaseModel } from "./base.model";


export interface IServiceResponse<T extends BaseModel> {
    operation?:string;
    serviceID?:string;
    errorService?:ErrorService;
    success(data?:T );
    fail(errorService?:ErrorService);
    systemFailure(errorService?:ErrorService);
    progress?(isProgress:boolean);
    parentServiceResponse?:IServiceResponse<any>;
    extraData?:any;
    
}