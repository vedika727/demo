import { async, TestBed, inject,ComponentFixture} from '@angular/core/testing';
import { IonicModule, Platform } from 'ionic-angular';
import { Ionic2RatingModule } from 'ionic2-rating';
import { NavController,ModalController, Modal } from 'ionic-angular';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ModalServiceProvider } from '../../providers/modal-service/modal-service';
import { FeedbackPage } from './feedback';
import { NgModule } from '@angular/core';
import { TranslateModule,  TranslateLoader, TranslateParser } from 'ng2-translate';
import { TranslateService } from "ng2-translate";
import { NavMock ,ModalMock,ModalControllerMock } from '../../../test-config/mocks-ionic';


describe('FeedbackPage', () => {

let component;


let fixture: ComponentFixture<FeedbackPage>;
let de: DebugElement;
let el: HTMLElement;


beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [FeedbackPage],
imports: [
    Ionic2RatingModule,
IonicModule.forRoot(FeedbackPage),
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
fixture = TestBed.createComponent(FeedbackPage);
component = fixture.componentInstance;



});

// check if the page is created or not 
it('is created', () => {
expect(fixture).toBeTruthy();
expect(component).toBeTruthy();

});
// check for component is created or not
it('should be created FeedbackPage Component', () => {
expect(component instanceof FeedbackPage).toBe(true);

});

// check for textarea
it('should be ok', async(() => {
    let fixture = TestBed.createComponent(FeedbackPage);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      let input = fixture.debugElement.query(By.css('textarea'));
      let el = input.nativeElement;

      expect(el.value).toBe('');

      el.value = 'someValue';
      el.dispatchEvent(new Event('input'));

      expect(fixture.componentInstance.feedback.comment).toBe('someValue');
    });
  }));

   //button is clicked or not , fuction is called or not
   it('should call function dismissFeedbackModal function()', () =>{
   
    spyOn(component, "dismissFeedbackModal").and.callThrough();

   // component.dismissFeedbackModal();
      expect(component.dismissFeedbackModal).toBeDefined;
   
 
     });

      //button is clicked or not , fuction is called or not
   it('should call function sendFeedback function()', () =>{
   
    spyOn(component, "sendFeedback").and.callThrough();

    component.sendFeedback();
      expect(component.sendFeedback).toBeDefined;
   
 
     });
    
});

