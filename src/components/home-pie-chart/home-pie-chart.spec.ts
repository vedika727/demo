import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { HomePieChartComponent } from './home-pie-chart';

/**
 * Describing module for Component
 */
describe('Home Pie Chart Component', () => {
    let fixture;
    let component;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [HomePieChartComponent],
        imports: [
          IonicModule.forRoot(HomePieChartComponent)
        ],
        providers: [
       
        ]
      }).compileComponents
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(HomePieChartComponent);
      component = fixture.componentInstance;
    });

  //Check for component created or not
    it('should be created', () => {
      expect(component instanceof HomePieChartComponent).toBe(true);
    });
 
  });