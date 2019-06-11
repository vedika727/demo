import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { HomePolicyTabsDetailsComponent } from './home-policy-tabs-details';

/**
 * Describing module for Component
 */
describe('Home Policy Tabs Details Component', () => {
    let fixture;
    let component;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [HomePolicyTabsDetailsComponent],
        imports: [
          IonicModule.forRoot(HomePolicyTabsDetailsComponent)
        ],
        providers: [
       
        ]
      }).compileComponents
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(HomePolicyTabsDetailsComponent);
      component = fixture.componentInstance;
    });

  //Check for component created or not
    it('should be created', () => {
      expect(component instanceof HomePolicyTabsDetailsComponent).toBe(true);
    });
 
  });