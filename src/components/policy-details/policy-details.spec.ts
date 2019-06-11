import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { PolicyDetailsComponent } from './policy-details';

/**
 * Describing module for Component
 */
describe('Policy Details Component', () => {
    let fixture;
    let component;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [PolicyDetailsComponent],
        imports: [
          IonicModule.forRoot(PolicyDetailsComponent)
        ],
        providers: [
       
        ]
      }).compileComponents
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(PolicyDetailsComponent);
      component = fixture.componentInstance;
    });

  //Check for component created or not
    it('should be created', () => {
      expect(component instanceof PolicyDetailsComponent).toBe(true);
    });
 
  });