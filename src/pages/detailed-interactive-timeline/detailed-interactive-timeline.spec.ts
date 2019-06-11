import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, Platform, NavController, NavPush} from 'ionic-angular/index';
import { DetailedInteractiveTimelinePage } from './detailed-interactive-timeline';
import { ModalServiceProvider } from '../../providers/modal-service/modal-service';

/**
 * Describing module for Page
 */
describe('Detailed Interactive Timeline Page', () => {
  let de: DebugElement;
  let el: HTMLElement;
  let comp: DetailedInteractiveTimelinePage;
  let fixture: ComponentFixture<DetailedInteractiveTimelinePage>;
  let comp1: ModalServiceProvider;
  let fixture1: ComponentFixture<ModalServiceProvider>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailedInteractiveTimelinePage,ModalServiceProvider],
      imports: [
        IonicModule.forRoot(DetailedInteractiveTimelinePage)
      ],
      providers: [
        {
            provide: NavController
        }
    ]

    });
  }));

  beforeEach(() => {
    
    fixture = TestBed.createComponent(DetailedInteractiveTimelinePage);
    comp = fixture.componentInstance;
    fixture1 = TestBed.createComponent(ModalServiceProvider);
    comp1 = fixture1.componentInstance;
  });


  //To check the page is created or not
  it('DetailedInteractiveTimelinePage should create component', () => expect(comp).toBeDefined());

  // integration testing for component
  it('should integrate ModalService component', () => expect(comp1).toBeDefined());
   
});
