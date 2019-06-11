import { SupportDocumentsPage } from './support-documents';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, Platform, NavController, NavPush} from 'ionic-angular/index';

/**
 * Describing module for Page
 */
describe('SupportDocumentsPage', () => {
  let de: DebugElement;
  let el: HTMLElement;
  let comp: SupportDocumentsPage;
  let fixture: ComponentFixture<SupportDocumentsPage>;




  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SupportDocumentsPage],
      imports: [
        IonicModule.forRoot(SupportDocumentsPage)
      ],
      providers: [
        {
            provide: NavController
        }
    ]

    });
  }));

  beforeEach(() => {
    
    fixture = TestBed.createComponent(SupportDocumentsPage);
    comp = fixture.componentInstance;
  });


  //To check the page is created or not
  it('should create component', () => expect(comp).toBeDefined());


   
});
