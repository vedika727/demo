import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, Platform, NavController, NavPush} from 'ionic-angular/index';
import { PolicyInfoPage } from './policy-info';

/**
 * Describing module for Page
 */
describe('Policy Info Page', () => {
  let de: DebugElement;
  let el: HTMLElement;
  let comp: PolicyInfoPage;
  let fixture: ComponentFixture<PolicyInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PolicyInfoPage],
      imports: [
        IonicModule.forRoot(PolicyInfoPage)
      ],
      providers: [
        {
            provide: NavController
        }
    ]

    });
  }));

  beforeEach(() => {
    
    fixture = TestBed.createComponent(PolicyInfoPage);
    comp = fixture.componentInstance;
  });


  //To check the page is created or not
  it('should create component', () => expect(comp).toBeDefined());


   
});
