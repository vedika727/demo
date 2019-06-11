import { ChallengesFullViewPage } from './challenges-full-view';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, Platform, NavController, NavPush} from 'ionic-angular/index';

/**
 * Describing module for Page
 */
describe('Challenges-full-view Page', () => {
  let de: DebugElement;
  let el: HTMLElement;
  let comp: ChallengesFullViewPage;
  let fixture: ComponentFixture<ChallengesFullViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChallengesFullViewPage],
      imports: [
        IonicModule.forRoot(ChallengesFullViewPage)
      ],
      providers: [
        {
            provide: NavController
        }
    ]

    });
  }));

  beforeEach(() => {
    
    fixture = TestBed.createComponent(ChallengesFullViewPage);
    comp = fixture.componentInstance;
  });


  //To check the page is created or not
  it('should create component', () => expect(comp).toBeDefined());


   
});
