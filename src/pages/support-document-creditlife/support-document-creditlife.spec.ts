import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, Platform, NavController, NavPush} from 'ionic-angular/index';
import { SupportDocumentCreditlifePage } from './support-document-creditlife';

/**
 * Describing module for Page
 */
describe('SupportDocumentCreditlifePage', () => {
  let de: DebugElement;
  let el: HTMLElement;
  let comp: SupportDocumentCreditlifePage;
  let fixture: ComponentFixture<SupportDocumentCreditlifePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SupportDocumentCreditlifePage],
      imports: [
        IonicModule.forRoot(SupportDocumentCreditlifePage)
      ],
      providers: [
        {
            provide: NavController
        }
    ]

    });
  }));

  beforeEach(() => {
    
    fixture = TestBed.createComponent(SupportDocumentCreditlifePage);
    comp = fixture.componentInstance;
  });


  //To check the page is created or not
  it('should create component', () => expect(comp).toBeDefined());


   
});
