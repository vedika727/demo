import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CallMeBackPage } from './Call-me-back';
import { IonicModule, Platform, NavController } from 'ionic-angular/index';
import  {  TranslateModule,  TranslateLoader,  TranslateParser  }  from  'ng2-translate';
import  {  TranslateService  }  from  "ng2-translate";

describe('CallMeBackPage', () => {
  let de: DebugElement;
  let comp;
  let fixture;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CallMeBackPage],
      imports: [
        IonicModule.forRoot(CallMeBackPage),
        TranslateModule
      ],
      providers: [
        NavController, TranslateLoader, TranslateParser, TranslateService
      ]
    });
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(CallMeBackPage);
    comp = fixture.componentInstance;
  });
  it('should be created', () => {
    expect(comp instanceof CallMeBackPage).toBe(true);
  });
});
