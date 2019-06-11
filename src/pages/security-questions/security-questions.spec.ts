import { NavController, NavParams, IonicModule } from "ionic-angular";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

import { SecurityQuestionsPage } from "../security-questions/security-questions";
import { TranslateModule, TranslateParser, TranslateLoader, TranslateService } from "ng2-translate";
import { pipe } from "rxjs/util/pipe";
import { ScbHeaderIconComponent } from "../../components/scb-header-icon/scb-header-icon";
describe("SecurityQuestionsPage", () => {
  let securityQuestions: SecurityQuestionsPage;
  let fixture: ComponentFixture<SecurityQuestionsPage>;
  let nav: NavController;
  let navParam: NavParams;
  let scbHeaderComponent: ScbHeaderIconComponent;
  let fixture1: ComponentFixture<ScbHeaderIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SecurityQuestionsPage, ScbHeaderIconComponent],
      imports: [IonicModule.forRoot(SecurityQuestionsPage), TranslateModule],
      providers: [
        NavController,
        TranslateService,
        TranslateLoader,
        TranslateParser,
      ]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityQuestionsPage);
    securityQuestions = fixture.componentInstance;
    fixture1 = TestBed.createComponent(ScbHeaderIconComponent);
    scbHeaderComponent = fixture1.componentInstance;
    let pipe = new TranslateModule();
    spyOn(securityQuestions, "backBtn").and.callThrough();
    spyOn(securityQuestions, "sendAnswerSet").and.callThrough();
    spyOn(securityQuestions, "contactSupport").and.callThrough();
  });

  it("is created", () => {
    expect(securityQuestions instanceof SecurityQuestionsPage).toBe(true);
  });

  it('should call pipe', () => expect(pipe).toBeDefined());

  it('should call component', () => expect(scbHeaderComponent).toBeDefined());

  // it("selected question should shown as placeholder in input", () => {
  //   //expect(true).toBe(true);
  //   component.selectedQue.que = "1";
  //   component.sendAnswerSet();
  //   expect(component.securityQA.question).toBe(component.selectedQue.que);
  // });

  it('should call function backBtn()', () => {
    securityQuestions.backBtn();
    expect(securityQuestions.backBtn).toBeDefined;
  });

  it('should call function sendAnswerSet()', () => {
    securityQuestions.sendAnswerSet();
    expect(securityQuestions.sendAnswerSet).toBeDefined;
  });

  it('should call function contactSupport()', () => {
    securityQuestions.contactSupport();
    expect(securityQuestions.contactSupport).toBeDefined;
  });

});
