import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FindLocationPage } from './find-location';
import { IonicModule, Platform, NavController, NavPush} from 'ionic-angular/index';
import { NavMock } from '../../../test-config/mocks-ionic';
import { NearbyLocationListPage } from '../nearby-location-list/nearby-location-list';
import { PipesModule } from '../../pipes/pipes.module';
import { TranslateModule,  TranslateLoader, TranslateParser } from 'ng2-translate';
import { TranslateService } from "ng2-translate";
import { AgmCoreModule } from '@agm/core';

describe('FindLocationPage', () => {
  let de: DebugElement;
  let el: HTMLElement;
  let comp: FindLocationPage;
  let fixture: ComponentFixture<FindLocationPage>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FindLocationPage],
      imports: [
        IonicModule.forRoot(FindLocationPage),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBEHbtzGqA5e9LLY4HzozVjHq6uOqsNbpc'
          }),
        TranslateModule 
      ],
      providers: [
          {
            provide: NavController,
            useClass: NavMock,
          },
        TranslateService,TranslateParser, TranslateLoader 
      ]
    });
  }));

 

  beforeEach(() => {
    
    fixture = TestBed.createComponent(FindLocationPage);
    comp = fixture.componentInstance;
  
  });


  //To check the page is created or not
  it('should create component', () => expect(comp).toBeDefined());

    //button is clicked or not , function is called or not
    it('should call function goToPlacesList function()', () =>{
   
        spyOn(comp, "goToPlacesList").and.callThrough();
        comp.goToPlacesList();
        expect(comp.goToPlacesList).toHaveBeenCalled();
        });
  
        // navCtrl.push method is called or not to push the page , navigate to next page
        it('should be able to launch  NearbyLocationListPage', () => {
   
          let navCtrl = fixture.debugElement.injector.get(NavController);
          spyOn(navCtrl, 'push');
   
          de = fixture.debugElement.query(By.css('button'));
   
          de.triggerEventHandler('click', NearbyLocationListPage);
          expect(navCtrl.push).toHaveBeenCalled;
         
   
      });
    });