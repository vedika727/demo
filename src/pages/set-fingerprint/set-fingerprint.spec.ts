import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { SetFingerprintPage } from './set-fingerprint';
import { IonicModule, NavController, NavParams } from "ionic-angular";
import { ModalServiceProvider } from "../../providers/modal-service/modal-service";
import { CallNumber } from "@ionic-native/call-number";
import { SharedataProvider } from "../../providers/sharedata/sharedata";
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth';
import { CacheServiceProvider } from "../../providers/ion-service/cache-service";
import { pipe } from "rxjs/util/pipe";
import { NavMock, StorageMock } from "../../../test-config/mocks-ionic";
import { TranslateModule, TranslateService, TranslateParser, TranslateLoader } from "ng2-translate";
import { ScbHeaderIconComponent } from "../../components/scb-header-icon/scb-header-icon";
import { LogServiceProvider } from "../../providers/data-service/log-service";
import { TouchID } from "@ionic-native/touch-id";
import { Storage } from '@ionic/storage';
import { Device } from "@ionic-native/device";

describe('SetFingerprintPage', () => {
  let de: DebugElement;
  let setFingerprint: SetFingerprintPage;
  let fixture: ComponentFixture<SetFingerprintPage>;
  let scbHeaderComponent: ScbHeaderIconComponent;
  let fixture1: ComponentFixture<ScbHeaderIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SetFingerprintPage, ScbHeaderIconComponent],
      imports: [
        IonicModule.forRoot(SetFingerprintPage),
        TranslateModule
      ],
      providers: [
        AndroidFingerprintAuth,
        { provide: NavController, useClass: NavMock },
        {
          provide: NavParams,
          useFactory: NavMock
        },
        TranslateService,
        TranslateLoader,
        TranslateParser,
        LogServiceProvider,
        TouchID,
        CacheServiceProvider,
        {
          provide: Storage,

          useFactory: () => StorageMock.instance()
        },
        Device
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetFingerprintPage);
    setFingerprint = fixture.componentInstance;
    fixture1 = TestBed.createComponent(ScbHeaderIconComponent);
    scbHeaderComponent = fixture1.componentInstance;
    let pipe = new TranslateModule();
    spyOn(setFingerprint, "ionViewDidLoad").and.callThrough();
    spyOn(setFingerprint, "fingerPrintRegister").and.callThrough();
    spyOn(setFingerprint, "registrationSuccessful").and.callThrough();
    spyOn(setFingerprint, "fingerPrintAuthAndroid").and.callThrough();
    spyOn(setFingerprint, "fingerPrintAuthIos").and.callThrough();
    spyOn(setFingerprint, "registrationSuccessWithoutFingerprint").and.callThrough();
    spyOn(setFingerprint.platform, "is").and.callThrough();
  });

  it('should create page', () => expect(setFingerprint).toBeDefined());

  it('should create SCB Header Icon component', () => expect(scbHeaderComponent).toBeDefined());

  it('should call pipe', () => expect(pipe).toBeDefined());

  it('should call function ionViewDidLoad()', () => {
        setFingerprint.ionViewDidLoad();
        expect(setFingerprint.ionViewDidLoad).toBeDefined;
      });

  it('should call function fingerPrintRegister()', () => {
    setFingerprint.fingerPrintRegister();
    expect(setFingerprint.fingerPrintRegister).toBeDefined;
  });

  it('should call function registrationSuccess()', () => {
    setFingerprint.registrationSuccessful();
    expect(setFingerprint.registrationSuccessful).toBeDefined;
  });

  it('should call function fingerPrintAuthAndroid()', () => {
    setFingerprint.fingerPrintAuthAndroid();
    expect(setFingerprint.fingerPrintAuthAndroid).toBeDefined;
  });

  it('should call function fingerPrintAuthIos()', () => {
    setFingerprint.fingerPrintAuthIos();
    expect(setFingerprint.fingerPrintAuthIos).toBeDefined;
  });

  it('should call function registrationSuccessWithoutFingerprint()', () => {
    setFingerprint.registrationSuccessWithoutFingerprint();
    expect(setFingerprint.registrationSuccessWithoutFingerprint).toBeDefined;
  });

  it('should call finger Print auth for android', () => {
    setFingerprint.os='android'
    setFingerprint.fingerPrintRegister();
    setFingerprint.fingerPrintAuthAndroid();
    expect(setFingerprint.fingerPrintAuthAndroid).toHaveBeenCalled();
  });

  it('should call finger Print auth for ios', () => {
    setFingerprint.os='ios'
    setFingerprint.fingerPrintRegister();
    setFingerprint.fingerPrintAuthIos();
    expect(setFingerprint.fingerPrintAuthIos).toHaveBeenCalled();
  });

});
