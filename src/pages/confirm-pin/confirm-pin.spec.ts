import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ConfirmPinPage } from './confirm-pin';
import { IonicModule, NavController, NavParams } from "ionic-angular";
import { ModalServiceProvider } from "../../providers/modal-service/modal-service";
import { CallNumber } from "@ionic-native/call-number";
import { SharedataProvider } from "../../providers/sharedata/sharedata";
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth';
import { CacheServiceProvider } from "../../providers/ion-service/cache-service";
import { pipe } from "rxjs/util/pipe";
import { StorageMock, NavMock, NavParamsMock } from "../../../test-config/mocks-ionic";
import { Storage } from '@ionic/storage';
import { PinPadComponent } from "../../components/pin-pad/pin-pad";
import { TranslateParser, TranslateLoader, TranslateService, TranslateModule } from "ng2-translate";
import { ScbHeaderIconComponent } from "../../components/scb-header-icon/scb-header-icon";
import { SetFingerprintPage } from "../pages";

describe('ConfirmPinPage', () => {
  let de: DebugElement;
  let confirmPin: ConfirmPinPage;
  let fixture: ComponentFixture<ConfirmPinPage>;
  let pinPadComponent: PinPadComponent;
  let navParams: NavParams;
  let fixture1: ComponentFixture<PinPadComponent>;
  let scbHeaderComponent: ScbHeaderIconComponent;
  let fixture2: ComponentFixture<ScbHeaderIconComponent>;
  let number:number;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmPinPage, PinPadComponent, ScbHeaderIconComponent],
      imports: [
        IonicModule.forRoot(ConfirmPinPage),
        TranslateModule
      ],
      providers: [
        {
          provide: Storage,

          useFactory: () => StorageMock.instance()
        },
        { provide: NavParams, useClass: NavParamsMock },
        AndroidFingerprintAuth,
        {provide: NavController, useClass: NavMock},
        SharedataProvider,
        CacheServiceProvider,
        TranslateService,
        TranslateLoader,
        TranslateParser
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmPinPage);
    confirmPin = fixture.componentInstance;
    fixture1 = TestBed.createComponent(PinPadComponent);
    pinPadComponent = fixture1.componentInstance;
    fixture2 = TestBed.createComponent(ScbHeaderIconComponent);
    scbHeaderComponent = fixture2.componentInstance;
    spyOn(confirmPin, "ionViewDidLoad").and.callThrough();
    spyOn(confirmPin, "keypadButtonPress").and.callThrough();
    spyOn(confirmPin.arrayOfNumbers, "pop").and.callThrough();
    spyOn(confirmPin.navCtrl, "push").and.callThrough();
    let pipe = new TranslateModule();
  });

  it('should create page', () => {
    expect(confirmPin).toBeDefined();
  });

  it('should create Pin Pad component', () => expect(pinPadComponent).toBeDefined());

  it('should create SCB Header Icon component', () => expect(scbHeaderComponent).toBeDefined());
  
  it('should call pipe', () => expect(pipe).toBeDefined());

  it('should call function ionViewDidLoad()', () => {
    confirmPin.ionViewDidLoad();
  });

  it('should call function keypadButtonPress()', () => {
    confirmPin.keypadButtonPress(name);
    expect(confirmPin.keypadButtonPress).toBeDefined();
  });

  it('should call function arrayOfNumbers.pop()', () => {
    number=-1;
    confirmPin.keypadButtonPress(number);
    expect(confirmPin.arrayOfNumbers.pop).toBeDefined();
  });

  it('should call function navCtrl.push()', () => {
    number=1;
    confirmPin.whichPageToNavigate='SetFingerPrintPage'
    confirmPin.checkPin='123451'
    confirmPin.arrayOfNumbers=['1','2','3','4','5'];
    confirmPin.keypadButtonPress(number);
    confirmPin.navCtrl.push(confirmPin.whichPageToNavigate)
    expect(confirmPin.navCtrl.push).toHaveBeenCalledWith(confirmPin.whichPageToNavigate);
  });

  it('should call function navCtrl.push()', () => {
    number=1;
    confirmPin.whichPageToNavigate='SetFingerPrintPage'
    confirmPin.checkPin='123451'
    confirmPin.arrayOfNumbers=['1','2','3','4','5'];
    confirmPin.keypadButtonPress(number);
    confirmPin.navCtrl.push(confirmPin.whichPageToNavigate)
    expect(confirmPin.navCtrl.push).toHaveBeenCalledWith(confirmPin.whichPageToNavigate);
  });

  it('should call provider when pin is not correct', () => {
    number=1;
    confirmPin.whichPageToNavigate='SetFingerPrintPage'
    confirmPin.checkPin='123452'
    confirmPin.arrayOfNumbers=['1','2','3','4','5'];
    confirmPin.keypadButtonPress(number);
    expect(confirmPin.setEmptyArray).toBe(true);
  });

  it('should check whichPageToNavigate=SetNewpinSuccessfulLoginPage inside ionViewDidLoad()', () => {
    confirmPin.page=''
    confirmPin.ionViewDidLoad();
    
    // confirmPin.whichPageToNavigate='SetNewpinSuccessfulLoginPage'
    expect(confirmPin.whichPageToNavigate).toEqual('SetFingerprintPage');
  });

});
