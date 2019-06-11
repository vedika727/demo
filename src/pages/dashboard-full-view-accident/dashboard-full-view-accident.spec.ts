import { DashboardFullViewAccidentPage } from './dashboard-full-view-accident';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, Platform, NavController, NavPush,NavParams} from 'ionic-angular/index';
import { NavMock  } from '../../../test-config/mocks-ionic';

/**
 * Describing module for Page
 */
describe('Dashboard Full View Accident Page', () => {
  let de: DebugElement;
  let el: HTMLElement;
  let comp: DashboardFullViewAccidentPage;
  let fixture: ComponentFixture<DashboardFullViewAccidentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardFullViewAccidentPage],
      imports: [
        IonicModule.forRoot(DashboardFullViewAccidentPage)
      ],
      providers: [
        {
          provide: NavController,
          useClass: NavMock,
          
      },
      {
          provide: NavParams,
          
      }
    ]

    });
  }));

  beforeEach(() => {
    
    fixture = TestBed.createComponent(DashboardFullViewAccidentPage);
    comp = fixture.componentInstance;
  });


  //To check the page is created or not
  it('DashboardFullViewAccidentPage should create component', () => expect(comp).toBeDefined());


   
});
