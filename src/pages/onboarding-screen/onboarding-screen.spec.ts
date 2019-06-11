import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { OnboardingScreenPage } from './onboarding-screen';
import { IonicModule, Platform, NavController, MenuController } from 'ionic-angular/index';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ENV } from '../../environments/environment';
import { ModalServiceProvider } from "../../providers/modal-service/modal-service";
import { HttpServiceProvider } from "../../providers/data-service/http-service";
import { BatteryStatus } from "@ionic-native/battery-status";
import { HttpClient, HttpHandler } from '@angular/common/http';
import { NetworkServiceProvider } from '../../providers/data-service/network-service';
import { Network } from '@ionic-native/network';
import { Http, ConnectionBackend, BaseRequestOptions, HttpModule } from "@angular/http";
import { MockBackend } from "@angular/http/testing";
import { pipe } from "rxjs/util/pipe";
import { SplashOnboardingProvider } from "../../providers/splash-onboarding-service/splash-onboarding";
import { CacheServiceProvider } from "../../providers/ion-service/cache-service";
import { Storage } from '@ionic/storage';
import { StorageMock, NavMock } from "../../../test-config/mocks-ionic";
import { TranslateModule, TranslateParser, TranslateLoader, TranslateService } from "ng2-translate";

describe('OnboardingScreenPage', () => {
  let de: DebugElement;
  let comp: OnboardingScreenPage;
  let fixture: ComponentFixture<OnboardingScreenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OnboardingScreenPage],
      imports: [
        IonicModule.forRoot(OnboardingScreenPage),
        HttpModule,
        TranslateModule
      ],
      providers: [
        {
          provide: Storage,

          useFactory: () => StorageMock.instance()
        },
        {provide: NavController, useClass: NavMock},
        HttpServiceProvider,
        HttpModule,
        ModalServiceProvider,
        HttpClient,
        HttpHandler,
        NetworkServiceProvider,
        Network,
        BatteryStatus,
        SplashOnboardingProvider,
        CacheServiceProvider,
        TranslateService,
        TranslateLoader,
        TranslateParser
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardingScreenPage);
    comp = fixture.componentInstance;
    let pipe = new TranslateModule();
    spyOn(comp, "Apply").and.callThrough();
    spyOn(comp, "gotopage").and.callThrough();
  });

  it('should create component', () => expect(comp).toBeDefined());

  it('should call pipe', () => expect(pipe).toBeDefined());

  it('should call function Apply()', () => {
    comp.Apply();
    expect(comp.Apply).toBeDefined;
  });

  it('should call function gotopage()', () => {
    comp.gotopage();
    expect(comp.gotopage).toBeDefined;
  });
});
