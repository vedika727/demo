import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { routes } from '../../common/constants/http-routes/routes.const';
import { LogServiceProvider } from "../../providers/data-service/log-service";
import { Observable } from "rxjs";
import { ENV } from '../../environments/environment';
@Injectable()
export class ProductDetailServiceProvider {
    baseUrl: string;
    constructor(
        private logger:LogServiceProvider,
        private http: HttpClient
    ) {
        this.baseUrl = ENV.apiEndPoint;
    }

    getProductDetail(id): Observable<any> {
        const mockUrl = id === 1 ? "../../assets/mock-json/productDetailsOffline.json" : "../../assets/mock-json/productDetailsOnline.json";
        return this.http.get(mockUrl);
    }

    getRecommendedProducts(): Observable<any> {
        const mockUrl = "../../assets/mock-json/recommendedProductsDashboard.json";
        return this.http.get(mockUrl);
    }

    postContactUs(data) {
        return this.http.post(this.baseUrl + routes.contactUsSales.url, data)
        .retryWhen(errors => errors.delay(4000).take(4).concat(Observable.throw(errors)));
    }

}

