import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, Platform, NavController, NavPush} from 'ionic-angular/index';
import { DocumentSentConfirmationPage } from './document-sent-confirmation';

/**
 * Describing module for Page
 */
describe('Document Sent Confirmation Page', () => {
  let de: DebugElement;
  let el: HTMLElement;
  let comp: DocumentSentConfirmationPage;
  let fixture: ComponentFixture<DocumentSentConfirmationPage>;




  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentSentConfirmationPage],
      imports: [
        IonicModule.forRoot(DocumentSentConfirmationPage)
      ],
      providers: [
        {
            provide: NavController
        }
    ]

    });
  }));

  beforeEach(() => {
    
    fixture = TestBed.createComponent(DocumentSentConfirmationPage);
    comp = fixture.componentInstance;
  });


  //To check the page is created or not
  it('should create component', () => expect(comp).toBeDefined());


   
});
