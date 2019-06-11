import { InsuranceCardPage } from './insurance-card';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, Platform, NavController, NavPush} from 'ionic-angular/index';

/**
 * Describing module for Page
 */
describe('Insurance Card Page', () => {
  let de: DebugElement;
  let el: HTMLElement;
  let comp: InsuranceCardPage;
  let fixture: ComponentFixture<InsuranceCardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InsuranceCardPage],
      imports: [
        IonicModule.forRoot(InsuranceCardPage)
      ],
      providers: [
        {
            provide: NavController
        }
    ]

    });
  }));

  beforeEach(() => {
    
    fixture = TestBed.createComponent(InsuranceCardPage);
    comp = fixture.componentInstance;
  });


  //To check the page is created or not
  it('InsuranceCardPage should create component', () => expect(comp).toBeDefined());


   
});
