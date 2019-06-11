import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { SecurityTipsPage } from './security-tips'
import { IonicModule, Platform, NavController } from 'ionic-angular/index';
import { TranslateLoader, TranslateParser, TranslateService, TranslateModule } from "ng2-translate";

describe('SecurityTipsPage', () => {
  let de: DebugElement;
  let comp;
  let fixture;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SecurityTipsPage],
      imports: [
        IonicModule.forRoot(SecurityTipsPage),
        TranslateModule
      ],
      providers: [
        NavController, TranslateLoader, TranslateParser, TranslateService
      ]
    });
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityTipsPage);
    comp = fixture.componentInstance;
  });
  it('should be created', () => {
    expect(comp instanceof SecurityTipsPage).toBe(true);
  });
});
