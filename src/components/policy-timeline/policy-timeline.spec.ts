import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { PolicyTimelineComponent } from './policy-timeline';

/**
 * Describing module for Component
 */
describe('Policy Timeline Component', () => {
    let fixture;
    let component;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [PolicyTimelineComponent],
        imports: [
          IonicModule.forRoot(PolicyTimelineComponent)
        ],
        providers: [
       
        ]
      }).compileComponents
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(PolicyTimelineComponent);
      component = fixture.componentInstance;
    });

  //Check for component created or not
    it('should be created', () => {
      expect(component instanceof PolicyTimelineComponent).toBe(true);
    });
 
  });