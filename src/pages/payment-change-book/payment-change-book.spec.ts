import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, Platform, NavController, NavPush} from 'ionic-angular/index';
import { PaymentChangeBookPage } from './payment-change-book';

/**
 * Describing module for Page
 */
describe('Payment Change Book Page', () => {
  let de: DebugElement;
  let el: HTMLElement;
  let comp: PaymentChangeBookPage;
  let fixture: ComponentFixture<PaymentChangeBookPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentChangeBookPage],
      imports: [
        IonicModule.forRoot(PaymentChangeBookPage)
      ],
      providers: [
        {
            provide: NavController
        }
    ]

    });
  }));

  beforeEach(() => {
    
    fixture = TestBed.createComponent(PaymentChangeBookPage);
    comp = fixture.componentInstance;
  });


  //To check the page is created or not
  it('Payment Change Book should create component', () => expect(comp).toBeDefined());

 
});
