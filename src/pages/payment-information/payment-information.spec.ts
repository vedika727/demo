import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, Platform, NavController, NavPush} from 'ionic-angular/index';
import { PaymentInformationPage } from './payment-information';


describe('Payment Information Page', () => {
  
  let comp: PaymentInformationPage;
  let fixture: ComponentFixture<PaymentInformationPage>;
  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentInformationPage],
      imports: [
        IonicModule.forRoot(PaymentInformationPage)
      ],
      providers: [
        {
            provide: NavController
        }
    ]

    });
  }));

  beforeEach(() => {
    
    fixture = TestBed.createComponent(PaymentInformationPage);
    comp = fixture.componentInstance;
  });


  //To check the page is created or not
  it('PaymentInformationPage should create component', () => expect(comp).toBeDefined());

});
