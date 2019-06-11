import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, Platform, NavController, NavPush} from 'ionic-angular/index';
import { PolicyDashboardPage } from './policy-dashboard';

/**
 * Describing module for Page
 */
describe('Policy Dashboard Page', () => {
  let de: DebugElement;
  let el: HTMLElement;
  let comp: PolicyDashboardPage;
  let fixture: ComponentFixture<PolicyDashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PolicyDashboardPage],
      imports: [
        IonicModule.forRoot(PolicyDashboardPage)
      ],
      providers: [
        {
            provide: NavController
        }
    ]

    });
  }));

  beforeEach(() => {
    
    fixture = TestBed.createComponent(PolicyDashboardPage);
    comp = fixture.componentInstance;
  });


  //To check the page is created or not
  it('should create component', () => expect(comp).toBeDefined());


   
});
