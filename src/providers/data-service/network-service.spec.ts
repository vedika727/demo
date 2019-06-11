import { async, TestBed, inject,ComponentFixture } from '@angular/core/testing';
import { NetworkServiceProvider } from './network-service';
import { IonicModule } from 'ionic-angular';
import { HttpClient, HttpHandler } from '@angular/common/http';
import {Http,  HttpModule, BaseRequestOptions, Response, ResponseOptions, RequestMethod  } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Network } from '@ionic-native/network';

describe('Http Service : ', () => {
       let comp;
      let fixture: ComponentFixture<NetworkServiceProvider>;
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [     
           ],
        imports: [
          IonicModule.forRoot(NetworkServiceProvider)
        ],
        providers: [
            HttpClient,
            HttpHandler,
            NetworkServiceProvider,
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
 
    let  networkService:NetworkServiceProvider;
    beforeEach(() => {
     networkService  = new NetworkServiceProvider(name);
    
    
    });
      it('should be call Network service', () => {
          expect(networkService).toBeDefined(true);
      });
      it('#getNetworkStrength should return strength of network', inject([NetworkServiceProvider], (service: NetworkServiceProvider) => {
        expect(service.getNetworkStrength()).toBeDefined(true);
        expect(service.getNetworkStrength()).not.toBeTruthy();
      }));

      it('checkNetwork should return strength of network', inject([NetworkServiceProvider], (service: NetworkServiceProvider) => {
        expect(service.checkNetwork()).toBeDefined(true);
       // expect(service.checkNetwork()).not.toBeTruthy();
      }));
     
  });
  