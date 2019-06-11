import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { DetailPolicyPiechartComponent } from './detail-policy-piechart';

/**
 * Describing module for Component
 */
describe('Detail Policy PieChart Component', () => {
    let fixture;
    let component;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [DetailPolicyPiechartComponent],
        imports: [
          IonicModule.forRoot(DetailPolicyPiechartComponent)
        ],
        providers: [
       
        ]
      }).compileComponents
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(DetailPolicyPiechartComponent);
      component = fixture.componentInstance;
    });

  //Check for component created or not
    it('should be created', () => {
      expect(component instanceof DetailPolicyPiechartComponent).toBe(true);
    });
 
  });