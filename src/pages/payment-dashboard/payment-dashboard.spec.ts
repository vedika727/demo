
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, Platform, NavController, NavPush} from 'ionic-angular/index';
import { PaymentDashboardPage } from './payment-dashboard';

/**
 * Describing module for Page
 */
describe('Single Policy Payment Page', () => {
  let de: DebugElement;
  let el: HTMLElement;
  let comp: PaymentDashboardPage;
  let fixture: ComponentFixture<PaymentDashboardPage>;




  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentDashboardPage],
      imports: [
        IonicModule.forRoot(PaymentDashboardPage)
      ],
      providers: [
        {
            provide: NavController
        }
    ]

    });
  }));

  beforeEach(() => {
    
    fixture = TestBed.createComponent(PaymentDashboardPage);
    comp = fixture.componentInstance;
  });


  //To check the page is created or not
  it('should create component', () => expect(comp).toBeDefined());


   
});
