import { PolicyTimelineComponent } from '../../components/policy-timeline/policy-timeline';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, Platform, NavController, NavPush} from 'ionic-angular/index';
import { HomeDashboardCreditlifePage } from './home-dashboard-creditlife';

/**
 * Describing module for Page
 */
describe('Home-dashboard-creditlife', () => {
  let de: DebugElement;
  let el: HTMLElement;
  let comp: HomeDashboardCreditlifePage;
  let fixture: ComponentFixture<HomeDashboardCreditlifePage>;
  let comp1: PolicyTimelineComponent;
  let fixture1: ComponentFixture<PolicyTimelineComponent>;



  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeDashboardCreditlifePage,PolicyTimelineComponent],
      imports: [
        IonicModule.forRoot(HomeDashboardCreditlifePage)
      ],
      providers: [
        {
            provide: NavController
        }
    ]

    });
  }));

  beforeEach(() => {
    
    fixture = TestBed.createComponent(HomeDashboardCreditlifePage);
    comp = fixture.componentInstance;
    fixture1 = TestBed.createComponent(PolicyTimelineComponent);
    comp1 = fixture1.componentInstance;
  });


  //To check the page is created or not
  it('should create component', () => expect(comp).toBeDefined());

  // integration testing for component
  it('should integrate policy timeline component', () => expect(comp1).toBeDefined());

   
});
