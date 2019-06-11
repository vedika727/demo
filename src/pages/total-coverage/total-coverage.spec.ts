import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, Platform, NavController, NavPush} from 'ionic-angular/index';
import { TotalCoveragePage } from './total-coverage';

/**
 * Describing module for Page
 */
describe('Total Coverage Page', () => {
  let de: DebugElement;
  let el: HTMLElement;
  let comp: TotalCoveragePage;
  let fixture: ComponentFixture<TotalCoveragePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TotalCoveragePage],
      imports: [
        IonicModule.forRoot(TotalCoveragePage)
      ],
      providers: [
        {
            provide: NavController
        }
    ]

    });
  }));

  beforeEach(() => {
    
    fixture = TestBed.createComponent(TotalCoveragePage);
    comp = fixture.componentInstance;
  });


  //To check the page is created or not
  it('should create component', () => expect(comp).toBeDefined());


   
});
