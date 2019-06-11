import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { SetPinPage } from './set-pin';
import { IonicModule, NavController, NavParams } from "ionic-angular";
import { pipe } from "rxjs/util/pipe";
import { PinPadComponent } from "../../components/pin-pad/pin-pad";
import { NavParamsMock, NavMock } from "../../../test-config/mocks-ionic";
import { SharedataProvider } from "../../providers/sharedata/sharedata";
import { TranslateModule, TranslateService, TranslateLoader, TranslateParser } from "ng2-translate";
import { ScbHeaderIconComponent } from "../../components/scb-header-icon/scb-header-icon";
import { ConfirmPinPage } from "../pages";

describe('SetPinPage', () => {
  let de: DebugElement;
  let setPin: SetPinPage;
  let fixture: ComponentFixture<SetPinPage>;
  let pinPadComponent: PinPadComponent;
  let fixture1: ComponentFixture<PinPadComponent>;
  let number:number
  let scbHeaderComponent: ScbHeaderIconComponent;
  let fixture2: ComponentFixture<ScbHeaderIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SetPinPage, PinPadComponent, ScbHeaderIconComponent],
      imports: [
        IonicModule.forRoot(SetPinPage),
        TranslateModule
      ],
      providers: [
        {provide: NavController, useClass: NavMock},
        {provide: NavParams, useClass: NavParamsMock},
        SharedataProvider,
        TranslateService,
        TranslateLoader,
        TranslateParser
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetPinPage);
    setPin = fixture.componentInstance;
    fixture1 = TestBed.createComponent(PinPadComponent);
    pinPadComponent = fixture1.componentInstance;
    fixture2 = TestBed.createComponent(ScbHeaderIconComponent);
    scbHeaderComponent = fixture2.componentInstance;
    spyOn(setPin, "keypadButtonPress").and.callThrough();
    spyOn(setPin.arrayOfNumbers, "pop").and.callThrough();
    spyOn(setPin.navCtrl, "push").and.callThrough();
  });
  it('should create page', () => expect(setPin).toBeDefined());
  
  it('should create SCB Header Icon component', () => expect(scbHeaderComponent).toBeDefined());

  it('should create Pin Pad component', () => expect(pinPadComponent).toBeDefined());

  it('should call pipe', () => expect(pipe).toBeDefined());

  it('should call function keypadButtonPress()', () => {
    setPin.keypadButtonPress(number);
    expect(setPin.keypadButtonPress).toBeDefined();

  });

  it('should call function arrayOfNumbers.pop()', () => {
    number=-1;
    setPin.keypadButtonPress(number);
    expect(setPin.arrayOfNumbers.pop).toBeDefined();
  });


  it('should call function navCtrl.push()', () => {
    number=1;
    let data={'pin':this.pin,'flow':this.flow};
    setPin.arrayOfNumbers=['1','2','3','4','5'];
    setPin.keypadButtonPress(number);
    setPin.navCtrl.push(ConfirmPinPage,data);
    expect(setPin.navCtrl.push).toHaveBeenCalledWith(ConfirmPinPage,data);
  });


});
