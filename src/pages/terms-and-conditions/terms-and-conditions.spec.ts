/**
* @author Ayush Vyas
* @description Terms And Conditions Spec file
*/

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { TermsAndConditionsPage } from './terms-and-conditions'
import { IonicModule, Platform, NavController } from 'ionic-angular/index';
import  {  TranslateModule,  TranslateLoader,  TranslateParser  }  from  'ng2-translate';
import  {  TranslateService  }  from  "ng2-translate";

describe('TermsAndConditionsPage', () => {
  let de: DebugElement;
  let comp;
  let fixture;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TermsAndConditionsPage],
      imports: [
        IonicModule.forRoot(TermsAndConditionsPage), TranslateModule
      ],
      providers: [
        NavController, TranslateLoader, TranslateParser, TranslateService
      ]
    });
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(TermsAndConditionsPage);
    comp = fixture.componentInstance;
  });
  it('should be created', () => {
    expect(comp instanceof TermsAndConditionsPage).toBe(true);
  });
});
