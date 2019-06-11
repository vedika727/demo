import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";
import { RegistrationEntryPage } from "./registration-entry";
import {
  IonicModule,
  Platform,
  NavController,
  MenuController
} from "ionic-angular/index";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { ENV } from "../../environments/environment";
import { ModalServiceProvider } from "../../providers/modal-service/modal-service";
import { HttpServiceProvider } from "../../providers/data-service/http-service";
import { BatteryStatus } from "@ionic-native/battery-status";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { NetworkServiceProvider } from "../../providers/data-service/network-service";
import { Network } from "@ionic-native/network";
import {
  Http,
  ConnectionBackend,
  BaseRequestOptions,
  HttpModule
} from "@angular/http";
import { MockBackend } from "@angular/http/testing";
import { TranslaterModule } from "../../translator/translator";

describe("RegistrationEntryPage", () => {
  let de: DebugElement;
  let comp: RegistrationEntryPage;
  let fixture: ComponentFixture<RegistrationEntryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationEntryPage],
      imports: [
        IonicModule.forRoot(RegistrationEntryPage),
        HttpModule,
        TranslaterModule
      ],
      providers: [
        NavController,
        HttpServiceProvider,
        HttpModule,
        ModalServiceProvider,
        HttpClient,
        HttpHandler,
        NetworkServiceProvider,
        Network,
        BatteryStatus
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationEntryPage);
    comp = fixture.componentInstance;
    de = fixture.debugElement.query(By.css("h3"));
  });

  it("is created", () => {
    expect(comp instanceof RegistrationEntryPage).toBe(true);
  });
  it("should create component", () => expect(comp).toBeDefined());

  // it('should have expected <h3> text', () => {
  //   fixture.detectChanges();
  //   const h3 = de.nativeElement;
  //   expect(h3.innerText).toMatch('Hello unit testing');
  // });F
});
