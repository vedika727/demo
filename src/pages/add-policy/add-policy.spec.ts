import { SharedataProvider } from '../../providers/sharedata/sharedata';
import { AddPolicyPage } from './add-policy';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, Platform, NavController, NavPush} from 'ionic-angular/index';
import { ModalServiceProvider } from '../../providers/modal-service/modal-service';
import { ScbHeaderIconComponent } from '../../components/scb-header-icon/scb-header-icon';
import { NavMock } from "../../../test-config/mocks-ionic";
import { TranslateParser, TranslateModule, TranslateService, TranslateLoader } from "ng2-translate";

/**
 * Describing module for Page
 */
describe('Add Policy Page', () => {
  let de: DebugElement;
  let el: HTMLElement;
  let comp: AddPolicyPage;
  let fixture: ComponentFixture<AddPolicyPage>;
  let comp1: SharedataProvider;
  let fixture1: ComponentFixture<SharedataProvider>;
  let comp2: ModalServiceProvider;
  let fixture2: ComponentFixture<ModalServiceProvider>;
  let comp3 : ScbHeaderIconComponent;
  let fixture3 : ComponentFixture<ScbHeaderIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddPolicyPage,SharedataProvider,ModalServiceProvider,ScbHeaderIconComponent],
      imports: [
        IonicModule.forRoot(AddPolicyPage),TranslateModule
      ],
      providers: [
        {
            {provide: NavController, useClass: NavMock},
            TranslateService,
            TranslateLoader,
            TranslateParser,
            ModalServiceProvider
        }
    ]

    });
  }));

  beforeEach(() => {
    
    fixture = TestBed.createComponent(AddPolicyPage);
    comp = fixture.componentInstance;
    fixture1 = TestBed.createComponent(SharedataProvider);
    comp1 = fixture1.componentInstance;
    fixture2 = TestBed.createComponent(ModalServiceProvider);
    comp2 = fixture2.componentInstance;
    fixture3 = TestBed.createComponent(ScbHeaderIconComponent);
    comp3 = fixture3.componentInstance;
    let pipe = new TranslateModule();
  });


  //To check the page is created or not
  it('AddPolicyPage should create component', () => expect(comp).toBeDefined());

 // integration testing for provider
 it('should integrate SharedataProvider', () => expect(comp1).toBeDefined()); 
   
 // integration testing for component
 it('should integrate ModalService component', () => expect(comp2).toBeDefined());
 
 // integration testing for component
 it('should integrate ScbHeaderIcon component', () => expect(comp3).toBeDefined());

 // integrating testing for pipe
 it('should call pipe', () => expect(pipe).toBeDefined());
});
