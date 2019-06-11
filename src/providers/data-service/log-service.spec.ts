import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { LogServiceProvider } from './log-service';
import { IonicModule, Platform, NavController, NavPush } from 'ionic-angular/index';
import { NavMock } from '../../../test-config/mocks-ionic';



describe('LogServiceProvider', () => {

  let comp: LogServiceProvider;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LogServiceProvider],
      imports: [
        IonicModule.forRoot(LogServiceProvider),

      ],
      providers: [
        {
          provide: NavController,
          useClass: NavMock,

        }
      ]

    });
  }));

  beforeEach(() => {

    comp = new LogServiceProvider();

  });


  //To check the page is created or not
  it('should create component', () => expect(comp).toBeDefined());

  it('should call function log()', ()  => {
    let message: any;

    spyOn(comp,  "log").and.callThrough();
    comp.log(message, "");
    expect(comp.log).toBeDefined;
    comp.log(message);
    expect(comp.log).toBeDefined;

  });

  it('should call function warn()', ()  => {
    let message: any;

    spyOn(comp,  "warn").and.callThrough();
    comp.warn(message, "");
    expect(comp.warn).toBeDefined;
    comp.warn(message);
    expect(comp.warn).toBeDefined;

  });

  it('should call function error()', ()  => {
    let message: any;

    spyOn(comp,  "error").and.callThrough();
    comp.error(message, "");
    expect(comp.error).toBeDefined;
    comp.error(message);
    expect(comp.error).toBeDefined;

  });
  it('should call function trace()', ()  => {
    let message: any;

    spyOn(comp,  "trace").and.callThrough();
    comp.trace(message, "");
    expect(comp.trace).toBeDefined;
    comp.trace(message);
    expect(comp.trace).toBeDefined;

  });
  it('should call function debug()', ()  => {
    let message: any;

    spyOn(comp,  "debug").and.callThrough();
    comp.debug(message, "");
    expect(comp.debug).toBeDefined;
    comp.debug(message);
    expect(comp.debug).toBeDefined;

  });


});
