import { async, ComponentFixture, TestBed ,inject } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ModalServiceProvider } from './modal-service';
import { IonicModule, Platform, NavController, NavPush} from 'ionic-angular/index';
import { NavMock ,ModalMock,ModalControllerMock } from '../../../test-config/mocks-ionic';
import { ModalController, Modal } from 'ionic-angular';




describe('ModalServiceProvider', () => {
 
  let comp: ModalServiceProvider;
  let  modalCtrl:ModalController;
  let modal: Modal;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalServiceProvider],
      imports: [
        IonicModule.forRoot(ModalServiceProvider),
  
      ],
      providers: [
       
        {
             provide: ModalController,
           
         useFactory: () => ModalControllerMock.instance()
         },
        { 
            provide: Modal,
          
            useFactory: () => ModalMock.instance()
             }

    ]

    });
  }));

  beforeEach(() => {
    
   modal = ModalMock.instance();
   modalCtrl = ModalControllerMock.instance();
    comp = new ModalServiceProvider(modalCtrl);
   spyOn(comp,"dismissModal").and.callThrough();
   spyOn(comp,"presentModal").and.callThrough();
  
  
  });


  //To check the page is created or not
  it('should create component', () => expect(comp).toBeDefined());

         it('should call function presentModal()', () =>{
             // spyOn(comp,"dismissModal").and.callThrough();
             comp.presentModal(name);
              expect(modal.present).toBeDefined(true);
                expect(comp.presentModal).toBeDefined;
                
       
                }); 
          it('should call function dismissModal()', () =>{
             // spyOn(comp,"dismissModal").and.callThrough();
             comp.presentModal(name);
            
             comp.dismissModal();
              expect(modal.dismiss).toBeDefined(true);
                expect(comp.dismissModal).toBeDefined;
                
       
                });               
 
});
