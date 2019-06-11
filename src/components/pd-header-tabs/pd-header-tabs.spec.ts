import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { PdHeaderTabsComponent } from './pd-header-tabs';

/**
 * Describing module for Component
 */
describe('PD Header tabs Component', () => {
    let fixture;
    let component;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [PdHeaderTabsComponent],
        imports: [
          IonicModule.forRoot(PdHeaderTabsComponent)
        ],
        providers: [
       
        ]
      }).compileComponents
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(PdHeaderTabsComponent);
      component = fixture.componentInstance;
    });

  //Check for component created or not
    it('should be created', () => {
      expect(component instanceof PdHeaderTabsComponent).toBe(true);
    });
 
  });