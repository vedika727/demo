/**
* @author Ayush Vyas
* @description Privacy Policy Spec file
*/

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { PrivacyPolicyPage } from './privacy-policy'
import { IonicModule, Platform, NavController } from 'ionic-angular/index';
import  {  TranslateModule,  TranslateLoader,  TranslateParser  }  from  'ng2-translate';
import  {  TranslateService  }  from  "ng2-translate";

describe('PrivacyPolicyPage', () => {
  let de: DebugElement;
  let comp;
  let fixture;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PrivacyPolicyPage],
      imports: [
        IonicModule.forRoot(PrivacyPolicyPage),
        TranslateModule
      ],
      providers: [
        NavController, TranslateLoader, TranslateParser, TranslateService
      ]
    });
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacyPolicyPage);
    comp = fixture.componentInstance;
  });
  it('should be created', () => {
    expect(comp instanceof PrivacyPolicyPage).toBe(true);
  });
});
