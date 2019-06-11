import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { InsuranceCardComponent } from './insurance-card';

/**
 * Describing module for Component
 */
describe('Insurance Card Component', () => {
    let fixture;
    let component;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [InsuranceCardComponent],
        imports: [
          IonicModule.forRoot(InsuranceCardComponent)
        ],
        providers: [
       
        ]
      }).compileComponents
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(InsuranceCardComponent);
      component = fixture.componentInstance;
    });

  //Check for component created or not
    it('should be created', () => {
      expect(component instanceof InsuranceCardComponent).toBe(true);
    });
 
  });