import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { AllpolicyDetailTabsComponent } from './allpolicy-detail-tabs';

/**
 * Describing module for Component
 */
describe('All Policy Details Tab Component', () => {
    let fixture;
    let component;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [AllpolicyDetailTabsComponent],
        imports: [
          IonicModule.forRoot(AllpolicyDetailTabsComponent)
        ],
        providers: [
       
        ]
      }).compileComponents
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(AllpolicyDetailTabsComponent);
      component = fixture.componentInstance;
    });

  //Check for component created or not
    it('should be created', () => {
      expect(component instanceof AllpolicyDetailTabsComponent).toBe(true);
    });
 
  });