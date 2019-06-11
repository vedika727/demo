import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { HomeHolderComponent } from './home-holder';

/**
 * Describing module for Component
 */
describe('Home Holder Component', () => {
    let fixture;
    let component;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [HomeHolderComponent],
        imports: [
          IonicModule.forRoot(HomeHolderComponent)
        ],
        providers: [
       
        ]
      }).compileComponents
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(HomeHolderComponent);
      component = fixture.componentInstance;
    });

  //Check for component created or not
    it('should be created', () => {
      expect(component instanceof HomeHolderComponent).toBe(true);
    });
 
  });