import { async, ComponentFixture, TestBed ,inject } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { LoadingServiceProvider } from './loading-service';
import { IonicModule, Platform, NavController, NavPush} from 'ionic-angular/index';
import { NavMock ,LoadingMock,LoadingControllerMock } from '../../../test-config/mocks-ionic';
import { LoadingController } from 'ionic-angular';




describe('LoadingServiceProvider', () => {
 
  let comp: LoadingServiceProvider;
  let  loadCtrl:LoadingController;

  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingServiceProvider],
      imports: [
        IonicModule.forRoot(LoadingServiceProvider),
  
      ],
      providers: [
       
        {
             provide: LoadingController,
           
         useFactory: () => LoadingControllerMock.instance()
        }
       

    ]

    });
  }));

  beforeEach(() => {
    

    loadCtrl = LoadingControllerMock.instance();
    comp = new LoadingServiceProvider(loadCtrl);
    spyOn(comp,"presentLoading").and.callThrough();
    // spyOn(comp,"dismissAlert").and.callThrough();
  
  
  });


  //To check the page is created or not
  it('should create component', () => expect(comp).toBeDefined());
 
  it('should call function presentLoading()', () =>{
    
    comp.presentLoading();
    
       expect(comp.presentLoading).toBeDefined(true);
       

       });
          
       
       it('should call function dismissLoading()', () =>{

        comp.presentLoading();
        
        comp.dismissLoading();
           expect(comp.dismissLoading).toBeDefined(true);
           
    
           });
 
});
