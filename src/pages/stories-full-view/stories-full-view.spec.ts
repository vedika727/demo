import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, Platform, NavController, NavPush} from 'ionic-angular/index';
import { StoriesFullViewPage } from './stories-full-view';

/**
 * Describing module for Page
 */
describe('Story-full-view Page', () => {
  let de: DebugElement;
  let el: HTMLElement;
  let comp: StoriesFullViewPage;
  let fixture: ComponentFixture<StoriesFullViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StoriesFullViewPage],
      imports: [
        IonicModule.forRoot(StoriesFullViewPage)
      ],
      providers: [
        {
            provide: NavController
        }
    ]

    });
  }));

  beforeEach(() => {
    
    fixture = TestBed.createComponent(StoriesFullViewPage);
    comp = fixture.componentInstance;
  });


  //To check the page is created or not
  it('should create component', () => expect(comp).toBeDefined());


   
});
