import { async, TestBed, inject,ComponentFixture } from '@angular/core/testing';
import { HttpServiceProvider } from './http-service';
import { IonicModule } from 'ionic-angular';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Http, HttpModule, BaseRequestOptions, Response, ResponseOptions, RequestMethod  } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { NetworkServiceProvider } from './network-service';
import { Network } from '@ionic-native/network';
import { LoadingServiceProvider } from '../ion-service/loading-service';
import { ModalServiceProvider } from '../modal-service/modal-service';

describe('Http Service : ', () => {
       let comp;
      let fixture: ComponentFixture<HttpServiceProvider>;
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [     
           ],
        imports: [
          IonicModule.forRoot(HttpServiceProvider)
        ],
        providers: [
            HttpClient,
            HttpHandler,
            HttpServiceProvider,
            MockBackend,
            Network,
            NetworkServiceProvider,
            BaseRequestOptions,
            {
                provide: Http,
                useFactory: (mockBackend, options) => {
                    return new Http(mockBackend, options);
                },
                deps: [MockBackend, BaseRequestOptions]
            }
           
            ]
            
      })
    }));
 
    let  httpService:HttpServiceProvider;
    let http:HttpClient;
    let httpClient:HttpClient;
    let networkService: NetworkServiceProvider
    let LoadingServiceProvider:LoadingServiceProvider
    let ModalServiceProvider:ModalServiceProvider

    beforeEach(() => {
     httpService  = new HttpServiceProvider(http,networkService,ModalServiceProvider,LoadingServiceProvider);
    
    
    });
      it('should be call http service', () => {
          expect(httpService).toBeDefined(true);
      });
      it('#httpGet should return array after creation', inject([HttpServiceProvider], (service: HttpServiceProvider) => {
        expect(service.httpGet('')).toBeDefined(true);
       // expect(service.httpGet.resolve()).toBeDefined(true);
      
      }));

      it('#httpPost should return array after creation', inject([HttpServiceProvider], (service: HttpServiceProvider) => {
        expect(service.httpPost('','')).toBeDefined(true);
       
      }));
      // it('#httpPost have  post method call', inject([HttpServiceProvider, mockBackend], (service: HttpServiceProvider,mockBackend: MockBackend) => {
      //   //expect(service.httpPost()).toBeDefined(true);
      //   expect(service.mockBackend.method).toEqual(RequestMethod.Post);
      // }));

      it('#httpPut should return array after creation', inject([HttpServiceProvider], (service: HttpServiceProvider) => {
        expect(service.httpPut('',2)).toBeDefined(true);
      }));
      it('#httpDelete should return array after creation', inject([HttpServiceProvider], (service: HttpServiceProvider) => {
        expect(service.httpDelete(2)).toBeDefined(true);
      }));
     
  });
  