import { PolicyListPage } from './policy-list';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, Platform, NavController, NavPush} from 'ionic-angular/index';

/**
 * Describing module for Page
 */
describe('Policy List Page', () => {
  let de: DebugElement;
  let el: HTMLElement;
  let comp: PolicyListPage;
  let fixture: ComponentFixture<PolicyListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PolicyListPage],
      imports: [
        IonicModule.forRoot(PolicyListPage)
      ],
      providers: [
        {
            provide: NavController
        }
    ]

    });
  }));

  beforeEach(() => {
    
    fixture = TestBed.createComponent(PolicyListPage);
    comp = fixture.componentInstance;
  });


  //To check the page is created or not
  it('should create component', () => expect(comp).toBeDefined());


   
});
