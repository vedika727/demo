import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, Platform } from 'ionic-angular/index';
import { ToastServiceProvider } from "../../providers/ion-service/toast-service";
import { ToastController } from "ionic-angular/components/toast/toast-controller";
import { Toast } from "ionic-angular/components/toast/toast";
import { ToastMock, ToastControllerMock } from "../../../test-config/mocks-ionic";


describe('TestPage', () => {

    let service: ToastServiceProvider;
    let toastController: ToastController;
    let toast: Toast;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ToastServiceProvider],
            imports: [
                IonicModule.forRoot(ToastServiceProvider)
            ],
            providers: [
                {
                    provide: ToastController,
                  
                useFactory: () => ToastControllerMock.instance()
                },
               { 
                   provide: Toast,
                 
                   useFactory: () => ToastMock.instance()
                    }
            ]
        });
    }));

    beforeEach(() => {
        toast = ToastMock.instance();
        toastController = ToastControllerMock.instance();
        service = new ToastServiceProvider(toastController);
        spyOn(service,"presentToast").and.callThrough();
        spyOn(service,"dismissToast").and.callThrough();
       
       
    });

   //To check the page is created or not
  it('should create Toast Service provider', () => expect(service).toBeDefined());
  
           it('should call function presentToast()', () =>{
               service.presentToast(name,'');
                expect(toast.present).toBeDefined(true);
                  expect(service.presentToast).toBeDefined;
                  
         
                  }); 
            it('should call function dismissToast()', () =>{
               service.presentToast(name,'');             
               service.dismissToast();
                expect(toast.dismiss).toBeDefined(true);
                  expect(service.dismissToast).toBeDefined;
                  });                  
});
