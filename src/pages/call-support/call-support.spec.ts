import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CallSupportPage } from './call-support';
import { IonicModule, NavController } from "ionic-angular";
import { ModalServiceProvider } from "../../providers/modal-service/modal-service";
import { CallNumber } from "@ionic-native/call-number";
import { pipe } from "rxjs/util/pipe";
import { LoginPage } from "../pages";
import { NavMock } from "../../../test-config/mocks-ionic";
import { TranslateParser, TranslateModule, TranslateService, TranslateLoader } from "ng2-translate";

describe('Call Support Page', () => {
  let de: DebugElement;
  let callSupport: CallSupportPage;
  let fixture: ComponentFixture<CallSupportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CallSupportPage],
      imports: [
        IonicModule.forRoot(CallSupportPage),
        TranslateModule
      ],
      providers: [
        ModalServiceProvider,
        {provide: NavController, useClass: NavMock},
        CallNumber,
        TranslateService,
        TranslateLoader,
        TranslateParser
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallSupportPage);
    callSupport = fixture.componentInstance;
    spyOn(callSupport, "call").and.callThrough();
    spyOn(callSupport, "dismissModal").and.callThrough();
    let pipe = new TranslateModule();
  });

  it('should create page', () => expect(callSupport).toBeDefined());

  it('should call pipe', () => expect(pipe).toBeDefined());

  it('should call function call()', () => {
    callSupport.call();
    expect(callSupport.call).toBeDefined();
  });
  it('should call function dismissModal()', () => {
    callSupport.dismissModal();
    expect(callSupport.dismissModal).toHaveBeenCalled();
  });

});
