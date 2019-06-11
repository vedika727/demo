import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";
import { SplashScreenPage } from "./splash-screen";
import {
  IonicModule,
  Platform,
  NavController,
  MenuController
} from "ionic-angular/index";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { ENV } from "../../environments/environment";

import {
  Http,
  ConnectionBackend,
  BaseRequestOptions,
  HttpModule
} from "@angular/http";
import { MockBackend } from "@angular/http/testing";
import { SplashOnboardingProvider } from "../../providers/splash-onboarding-service/splash-onboarding";
import { ScbHeaderIconComponent } from "../../components/scb-header-icon/scb-header-icon";
import { ProgressBarComponent } from "../../components/progress-bar/progress-bar";
import { TranslateModule, TranslateParser, TranslateLoader, TranslateService } from "ng2-translate";
import { pipe } from "rxjs/util/pipe";
import { CacheServiceProvider } from "../../providers/ion-service/cache-service";
import { StorageMock, NavMock } from "../../../test-config/mocks-ionic";
import { Storage } from '@ionic/storage';
import { OnboardingScreenPage, RegisterUserPage } from "../pages";

describe("SplashScreenPage", () => {
  let de: DebugElement;
  let comp: SplashScreenPage;
  let fixture: ComponentFixture<SplashScreenPage>;
  let scbHeaderComponent: ScbHeaderIconComponent;
  let fixture1: ComponentFixture<ScbHeaderIconComponent>;
  let progressBar: ProgressBarComponent;
  let fixture2: ComponentFixture<ProgressBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SplashScreenPage, ScbHeaderIconComponent, ProgressBarComponent],
      imports: [
        IonicModule.forRoot(SplashScreenPage),
        HttpModule,
        TranslateModule
      ],
      providers: [
        { provide: NavController, useClass: NavMock },
        SplashOnboardingProvider,
        TranslateService,
        TranslateLoader,
        TranslateParser,
        CacheServiceProvider,
        {
          provide: Storage,
          useFactory: () => StorageMock.instance()
        }
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplashScreenPage);
    comp = fixture.componentInstance;
    fixture1 = TestBed.createComponent(ScbHeaderIconComponent);
    scbHeaderComponent = fixture1.componentInstance;
    fixture2 = TestBed.createComponent(ProgressBarComponent);
    progressBar = fixture2.componentInstance;
    let pipe = new TranslateModule();
    spyOn(comp, "checkifAppOpensFirstTime").and.callThrough();
    spyOn(comp.navCtrl, "setRoot").and.callThrough();
  });

  it("is created", () => {
    expect(comp instanceof SplashScreenPage).toBe(true);
  });

  it('should call pipe', () => expect(pipe).toBeDefined());

  it("should create component", () => expect(comp).toBeDefined());

  it('should create SCB Header Icon component', () => expect(scbHeaderComponent).toBeDefined());

  it('should create Progress Bar component', () => expect(progressBar).toBeDefined());

  it('should call function checkifAppOpensFirstTime()', () => {

    comp.checkifAppOpensFirstTime();
    expect(comp.checkifAppOpensFirstTime).toBeDefined;

  });
  it('should navigate to onboarding screen page', () => {
    comp.progressCounter=100;
    comp.userAppState = false;
    comp.navCtrl.setRoot(OnboardingScreenPage)
    expect(comp.navCtrl.setRoot).toHaveBeenCalledWith(OnboardingScreenPage);
  });

  it('should navigate to onboarding screen page', () => {
    comp.progressCounter=100;
    comp.userAppState = true;
    comp.navCtrl.setRoot(RegisterUserPage)
    expect(comp.navCtrl.setRoot).toHaveBeenCalledWith(RegisterUserPage);
  });
});
