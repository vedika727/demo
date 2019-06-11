import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ContactUsPage } from './Contact-us'
import { IonicModule, Platform, NavController } from 'ionic-angular/index';
import  {  TranslateModule,  TranslateLoader,  TranslateParser  }  from  'ng2-translate';
import  {  TranslateService  }  from  "ng2-translate";
import { AlertServiceProvider } from "../../providers/ion-service/alert-service";
import { AlertMock, NavMock } from "../../../test-config/mocks-ionic";
import { CallMeBackPage } from "../pages";
import { CallNumber } from '@ionic-native/call-number';


describe('ContactUsPAge', () => {
  let de: DebugElement;
  let comp: ContactUsPage;
  let fixture: ComponentFixture<ContactUsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactUsPage],
      imports: [
        IonicModule.forRoot(ContactUsPage), TranslateModule
      ],
      providers: [
        {
          provide: AlertServiceProvider,
          useFactory: () => AlertMock.instance() 
        },
        {
          provide: NavController,
         useClass: NavMock,
        },
        TranslateLoader, TranslateParser, TranslateService ,CallNumber
      ]
    });
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ContactUsPage);
    comp = fixture.componentInstance;
  });
  //To check the page is created or not
  it('should create component', ()  =>  expect(comp).toBeDefined());
  //button is clicked or not , fuction is called or not
    //prompt function called or not
    it('should call function Prompt function()', () =>{
         spyOn(comp, "prompt").and.callThrough();
         comp.prompt();
         expect(comp.prompt).toHaveBeenCalled();
         });
    //CallMeBack is clicked or not , fuction is called or not
    it('should call function click function()', ()  => {
      spyOn(comp,  "CallMe").and.callThrough();
      comp.CallMe();
      expect(comp.CallMe).toHaveBeenCalled();
    });
    // navCtrl.push method is called or not to push the page , navigate to next page
    it('should be able to launch  CallMeBack', () => {
      let navCtrl = fixture.debugElement.injector.get(NavController);
      spyOn(navCtrl, 'push');
      de = fixture.debugElement.query(By.css('button')); 
      de.triggerEventHandler('click', CallMeBackPage);
      expect(navCtrl.push).toHaveBeenCalled;
    }); 
});
