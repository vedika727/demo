import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { DashboardHeaderComponent } from './dashboard-header';

/**
 * Describing module for Component
 */
describe('Dashboard Header Component', () => {
    let fixture;
    let component;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [DashboardHeaderComponent],
        imports: [
          IonicModule.forRoot(DashboardHeaderComponent)
        ],
        providers: [
       
        ]
      }).compileComponents
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(DashboardHeaderComponent);
      component = fixture.componentInstance;
    });

  //Check for component created or not
    it('should be created', () => {
      expect(component instanceof DashboardHeaderComponent).toBe(true);
    });
 
  });