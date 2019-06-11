import { async, TestBed, inject,ComponentFixture} from '@angular/core/testing';
import { IonicModule, Platform } from 'ionic-angular';
import { NavController,ModalController, Modal } from 'ionic-angular';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ModalServiceProvider } from '../../providers/modal-service/modal-service';
import { LogoutPromptPage } from './logout-prompt';
import { NgModule } from '@angular/core';
import { TranslateModule,  TranslateLoader, TranslateParser } from 'ng2-translate';
import { TranslateService } from "ng2-translate";
import { NavMock ,ModalMock,ModalControllerMock } from '../../../test-config/mocks-ionic';


describe('logout', () => {

let component;

let fixture: ComponentFixture<LogoutPromptPage>;
let de: DebugElement;
let el: HTMLElement;


beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [LogoutPromptPage],
imports: [
IonicModule.forRoot(LogoutPromptPage),
TranslateModule 
],
providers: [
    {
        provide: ModalServiceProvider,
      
    useFactory: () => ModalControllerMock.instance()
    },
   { 
       provide: Modal,
     
       useFactory: () => ModalMock.instance()
        },
NavController,

TranslateService,TranslateParser, TranslateLoader 
]
})
}));
beforeEach(() => {
fixture = TestBed.createComponent(LogoutPromptPage);
component = fixture.componentInstance;




});

// check if the page is created or not 
it('is created', () => {
expect(fixture).toBeTruthy();
expect(component).toBeTruthy();

});
// check for component is created or not
it('should be created FeedbackPage Component', () => {
expect(component instanceof LogoutPromptPage).toBe(true);

});


// ionviewdid load is loaded or not 
it('should call function ionViewDidLoad()', () =>{
   
    spyOn(component, "ionViewDidLoad").and.callThrough();
    component.ionViewDidLoad();
    expect(component.ionViewDidLoad).toBeDefined;

    });



   //button is clicked or not , fuction is called or not
   it('should call function dismissLogoutModal function()', () =>{
   
    spyOn(component, "dismissLogoutModal").and.callThrough();

   // component.dismissLogoutModal();
      expect(component.dismissLogoutModal).toBeDefined;
   
 
     });

      //button is clicked or not , fuction is called or not
   it('should call function logout function()', () =>{
   
    spyOn(component, "logout").and.callThrough();

    // component.logout();
    
    
      expect(component.logout).toBeDefined;
   
 
     });

    
});

