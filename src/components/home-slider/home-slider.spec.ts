import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { HomeSliderComponent } from './home-slider';

/**
 * Describing module for Component
 */
describe('Home Slider Component', () => {
    let fixture;
    let component;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [HomeSliderComponent],
        imports: [
          IonicModule.forRoot(HomeSliderComponent)
        ],
        providers: [
       
        ]
      }).compileComponents
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(HomeSliderComponent);
      component = fixture.componentInstance;
    });

  //Check for component created or not
    it('should be created', () => {
      expect(component instanceof HomeSliderComponent).toBe(true);
    });
 
  });