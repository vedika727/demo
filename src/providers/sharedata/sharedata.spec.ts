import { async, ComponentFixture, TestBed ,inject } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, Platform, NavController, NavPush} from 'ionic-angular/index';
import { NavMock ,ModalMock,ModalControllerMock } from '../../../test-config/mocks-ionic';
import { ModalController, Modal } from 'ionic-angular';
import { SharedataProvider } from './sharedata';

describe('ModalServiceProvider', () => {
 
  let comp: SharedataProvider;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SharedataProvider],
      imports: [
        IonicModule.forRoot(SharedataProvider),
      ],
      providers: []
    });
  }));

  beforeEach(() => {
   comp = new SharedataProvider();
  
  });


  //To check the page is created or not
  it('should create component', () => expect(comp).toBeDefined());             
 
});
