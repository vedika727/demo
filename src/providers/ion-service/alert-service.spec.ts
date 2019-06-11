import { async, ComponentFixture, TestBed ,inject } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AlertServiceProvider } from './alert-service';
import { IonicModule, Platform, NavController, NavPush} from 'ionic-angular/index';
import { NavMock ,AlertMock,AlertControllerMock } from '../../../test-config/mocks-ionic';
import { AlertController } from 'ionic-angular';




describe('AlertServiceProvider', () => {
 
  let comp: AlertServiceProvider;
  let  alertCtrl:AlertController;

  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlertServiceProvider],
      imports: [
        IonicModule.forRoot(AlertServiceProvider),
  
      ],
      providers: [
       
        {
             provide: AlertController,
           
         useFactory: () => AlertControllerMock.instance()
        }
        // { 
        //     provide: Modal,
          
        //     useFactory: () => AlertMock.instance()
        //      }

    ]

    });
  }));

  beforeEach(() => {
    

    alertCtrl = AlertControllerMock.instance();
    comp = new AlertServiceProvider(alertCtrl);
    spyOn(comp,"presentSimpleAlert").and.callThrough();
    spyOn(comp,"dismissAlert").and.callThrough();
  
  
  });


  //To check the page is created or not
  it('should create component', () => expect(comp).toBeDefined());
 
  it('should call function presentModal()', () =>{
    
    comp.presentSimpleAlert("","");
    
       expect(comp.presentSimpleAlert).toBeDefined(true);
       

       });
          
       
       it('should call function dismissAlert()', () =>{

        comp.presentSimpleAlert("","");
        
        comp.dismissAlert();
           expect(comp.dismissAlert).toBeDefined(true);
           
    
           });
 
});
