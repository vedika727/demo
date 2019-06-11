import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, Platform, NavController, NavPush} from 'ionic-angular/index';
import { RewardsFullViewPage } from './rewards-full-view';

/**
 * Describing module for Page
 */
describe('Story-full-view Page', () => {
  let de: DebugElement;
  let el: HTMLElement;
  let comp: RewardsFullViewPage;
  let fixture: ComponentFixture<RewardsFullViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RewardsFullViewPage],
      imports: [
        IonicModule.forRoot(RewardsFullViewPage)
      ],
      providers: [
        {
            provide: NavController
        }
    ]

    });
  }));

  beforeEach(() => {
    
    fixture = TestBed.createComponent(RewardsFullViewPage);
    comp = fixture.componentInstance;
  });


  //To check the page is created or not
  it('should create component', () => expect(comp).toBeDefined());


   
});
