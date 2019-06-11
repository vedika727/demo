import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RegistrationSuccessfulPage } from './registration-successful';
import { IonicModule, NavController, NavParams } from "ionic-angular";
import { pipe } from "rxjs/util/pipe";
import { NavParamsMock, NavMock } from "../../../test-config/mocks-ionic";
import { TranslateModule, TranslateService, TranslateLoader, TranslateParser } from "ng2-translate";
import { ScbHeaderIconComponent } from "../../components/scb-header-icon/scb-header-icon";
import { ProcessActionComponent } from "../../components/process-action/process-action"

describe('RegistrationSuccessfulPage', () => {
  let de: DebugElement;
  let regSuccess: RegistrationSuccessfulPage;
  let fixture: ComponentFixture<RegistrationSuccessfulPage>;
  let processAction: ProcessActionComponent;
  let fixture1: ComponentFixture<ProcessActionComponent>;
  let scbHeaderComponent: ScbHeaderIconComponent;
  let fixture2: ComponentFixture<ScbHeaderIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationSuccessfulPage,ProcessActionComponent, ScbHeaderIconComponent],
      imports: [
        IonicModule.forRoot(RegistrationSuccessfulPage),
        TranslateModule
      ],
      providers: [
        {provide: NavController, useClass: NavMock},
        {provide: NavParams, useClass: NavParamsMock},
        TranslateService,
        TranslateLoader,
        TranslateParser
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationSuccessfulPage);
    regSuccess = fixture.componentInstance;
    fixture1 = TestBed.createComponent(ProcessActionComponent);
    processAction = fixture1.componentInstance;
    fixture2 = TestBed.createComponent(ScbHeaderIconComponent);
    scbHeaderComponent = fixture2.componentInstance;
    spyOn(regSuccess, "ionViewDidLoad").and.callThrough();
    spyOn(regSuccess, "toLoginPage").and.callThrough();
    spyOn(regSuccess, "action").and.callThrough();
    let pipe = new TranslateModule();
  });

  it('should create page', () => expect(regSuccess).toBeDefined());
  

  it('should create SCB Header Icon component', () => expect(scbHeaderComponent).toBeDefined());

  it('should create Process Action component', () => expect(processAction).toBeDefined());

  it('should call pipe', () => expect(pipe).toBeDefined());

  it('should call function ionViewDidLoad()', () => {
    regSuccess.ionViewDidLoad();
    expect(regSuccess.ionViewDidLoad).toBeDefined();

  });

  it('should call function toLoginPage()', () => {
    regSuccess.toLoginPage()
    expect(regSuccess.toLoginPage).toBeDefined();

  });

  it('should call function action()', () => {
    regSuccess.action()
    expect(regSuccess.action).toBeDefined();

  });



});
