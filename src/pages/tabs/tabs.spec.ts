import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, Platform, NavController, NavPush} from 'ionic-angular/index';
import { TabsPage } from './tabs';

/**
 * Describing module for Page
 */
describe('Insurance Card Page', () => {
  let de: DebugElement;
  let el: HTMLElement;
  let comp: TabsPage;
  let fixture: ComponentFixture<TabsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabsPage],
      imports: [
        IonicModule.forRoot(TabsPage)
      ],
      providers: [
        {
            provide: NavController
        }
    ]

    });
  }));

  beforeEach(() => {
    
    fixture = TestBed.createComponent(TabsPage);
    comp = fixture.componentInstance;
  });


  //To check the page is created or not
  it('TabsPage should create component', () => expect(comp).toBeDefined());


   
});
