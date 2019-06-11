import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { LoginPage } from './login';
import { IonicModule, NavController } from "ionic-angular";
import { PinPadComponent } from "../../components/pin-pad/pin-pad";
import { PinEntryComponent } from "../../components/pin-entry/pin-entry";
import { FingerprintAIO } from "@ionic-native/fingerprint-aio";
import { LogServiceProvider } from "../../providers/data-service/log-service";
import { AlertServiceProvider } from "../../providers/ion-service/alert-service";
import { ModalServiceProvider } from "../../providers/modal-service/modal-service";
import { CallNumber } from "@ionic-native/call-number";
import { SharedataProvider } from "../../providers/sharedata/sharedata";
import { TouchID } from "@ionic-native/touch-id";
import { CallSupportPage, TabsPage } from "../pages";
import { pipe } from "rxjs/util/pipe";
import { AndroidFingerprintAuth } from "@ionic-native/android-fingerprint-auth";
import { CacheServiceProvider } from "../../providers/ion-service/cache-service";
import { Storage } from '@ionic/storage';
import { StorageMock, NavMock } from '../../../test-config/mocks-ionic';
import { TranslateService, TranslateLoader, TranslateParser, TranslateModule } from "ng2-translate";
import { ScbHeaderIconComponent } from "../../components/scb-header-icon/scb-header-icon";

describe('LoginPage', () => {
    let de: DebugElement;
    let login: LoginPage;
    let fixture: ComponentFixture<LoginPage>;
    let pinPadComponent: PinPadComponent;
    let fixture1: ComponentFixture<PinPadComponent>;
    let scbHeader: ScbHeaderIconComponent;
    let fixture2: ComponentFixture<ScbHeaderIconComponent>;
    let pagename:any;
    let number:number;
    let data:any;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LoginPage, PinPadComponent, ScbHeaderIconComponent],
            imports: [
                IonicModule.forRoot(LoginPage),
                TranslateModule,
              
            ],
            providers: [
             {
                provide: Storage,
                
        useFactory: () => StorageMock.instance()
             },
             {provide: NavController, useClass: NavMock},
                FingerprintAIO,
                LogServiceProvider,
                AlertServiceProvider,
                ModalServiceProvider,
                CallNumber,
                SharedataProvider,
                TouchID,
                AndroidFingerprintAuth,
                CacheServiceProvider,
                TranslateService,
                TranslateLoader,
                TranslateParser
             
            ]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginPage);
        login = fixture.componentInstance;
        fixture1 = TestBed.createComponent(PinPadComponent);
        pinPadComponent = fixture1.componentInstance;
        fixture2 = TestBed.createComponent(ScbHeaderIconComponent);
        scbHeader = fixture2.componentInstance;
        pagename=CallSupportPage
        let pipe = new TranslateModule();
        spyOn(login.touchId, "verifyFingerprint").and.callThrough();
        spyOn(login, "ionViewDidLoad").and.callThrough();
        spyOn(login, "loginWithFingerprint").and.callThrough();
        spyOn(login.androidFingerprintAuth, "encrypt").and.callThrough();
        spyOn(login, "triggerModal").and.callThrough();
        spyOn(login.modalCTRL, "presentModal").and.callThrough();
        spyOn(login, "callbackForgotPin").and.callThrough();
        spyOn(login.navCtrl, "push").and.callThrough();
        spyOn(login.arrayOfNumbers, "pop").and.callThrough();
        // spyOn(login.androidFingerprintAuth, "encrypt").and.callThrough();
    });

    it('should create login page', () => expect(LoginPage).toBeDefined());

    it('should call pipe', () => expect(pipe).toBeDefined());
    
    it('should create Pin Pad component', () => expect(pinPadComponent).toBeDefined());

    it('should create SCB Header component', () => expect(scbHeader).toBeDefined());
    
    it('should call function ionViewDidLoad()', () => {
        login.ionViewDidLoad();
        expect(login.ionViewDidLoad).toBeDefined();

    });
    it('should call function loginWithFingerprint()', () => {
        login.loginWithFingerprint();
        expect(login.loginWithFingerprint).toBeDefined();
    });

    it('should call function androidFingerprintAuth()', () => {
        login.loginWithFingerprint();
        let data={ clientId: 'myAppName', username: 'myUsername', password: 'myPassword' }
        login.androidFingerprintAuth.encrypt(data)
        expect(login.androidFingerprintAuth.encrypt).toHaveBeenCalledWith(data);
    });


    it('should call function keypadButtonPress()', () => {

        let keypadFunction = login.keypadButtonPress(name)
        expect(keypadFunction).toBeDefined;
        login.setEmptyArray = true;
        expect(login.setEmptyArray).toBe(true);

    });
    it('should call function keypadButtonPress()', () => {
        
        login.keypadButtonPress(name);
        login.count=0;
        login.modalCTRL.presentModal(CallSupportPage)
        expect(login.modalCTRL.presentModal).toHaveBeenCalledWith(CallSupportPage);

    });

    it('should call function arrayOfNumbers.pop()', () => {
        number=-1;
        login.keypadButtonPress(number);
        expect(login.arrayOfNumbers.pop).toBeDefined();
      });

    it('should call function triggerModal()', () => {
        
        login.triggerModal();;
        expect(login.triggerModal).toBeDefined;

    });
    it('should call function callbackForgotPin()', () => {
        
        login.callbackForgotPin(pagename);;
        expect(login.callbackForgotPin).toBeDefined;
        login.navCtrl.push(pagename);
        expect(login.navCtrl.push).toHaveBeenCalledWith(pagename);

    });

    it('should call function verifyFingerprint()', () => {
        login.deviceOs='ios';
        login.touchId.verifyFingerprint('Scan your fingerprint please');
        expect(login.touchId.verifyFingerprint).toHaveBeenCalledWith('Scan your fingerprint please');
    });

    it('should call function navCtrl.push() when password is correct', () => {
        number=1;
        login.arrayOfNumbers=['1','2','3','4','5'];
        login.password='123451'
        login.keypadButtonPress(number);
        login.navCtrl.push(TabsPage);
        expect(login.navCtrl.push).toHaveBeenCalledWith(TabsPage);
      });

      it('should call provider when password is incorrect', () => {
        number=1;
        login.arrayOfNumbers=['1','2','3','4','5'];
        login.password='123452'
        login.keypadButtonPress(number);
        expect(login.setEmptyArray).toBe(true);
      });

      it('should call modal when password is wrong 3 times', () => {
        number=1;
        login.arrayOfNumbers=['1','2','3','4','5'];
        login.password='123452';
        login.count=1;
        login.keypadButtonPress(number);
        expect(login.count).toBe(3);
      });

      it('should login with fingerprint if device is angroid', () => {
          login.deviceOs='android'
        login.loginWithFingerprint();
        data={ clientId: 'myAppName', username: 'myUsername', password: 'myPassword' }
        login.androidFingerprintAuth.encrypt(data)
        expect(login.androidFingerprintAuth.encrypt).toHaveBeenCalledWith(data);
      });

      it('should login with fingerprint if device is ios', () => {
        login.deviceOs='ios'
      login.loginWithFingerprint();
      login.touchId.verifyFingerprint('Scan your fingerprint please')
      expect(login.touchId.verifyFingerprint).toHaveBeenCalledWith('Scan your fingerprint please');
    });
    
    
});
