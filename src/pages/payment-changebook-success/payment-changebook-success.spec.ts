import { PaymentChangebookSuccessPage } from './payment-changebook-success';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, Platform, NavController, NavPush} from 'ionic-angular/index';

/**
 * Describing module for Page
 */
describe('Payment Changebook Success Page', () => {
  let de: DebugElement;
  let el: HTMLElement;
  let comp: PaymentChangebookSuccessPage;
  let fixture: ComponentFixture<PaymentChangebookSuccessPage>;




  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentChangebookSuccessPage],
      imports: [
        IonicModule.forRoot(PaymentChangebookSuccessPage)
      ],
      providers: [
        {
            provide: NavController
        }
    ]

    });
  }));

  beforeEach(() => {
    
    fixture = TestBed.createComponent(PaymentChangebookSuccessPage);
    comp = fixture.componentInstance;
  });


  //To check the page is created or not
  it('should create component', () => expect(comp).toBeDefined());


   
});
