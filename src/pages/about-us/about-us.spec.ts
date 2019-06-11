/**
* @author Ayush Vyas
* @description AboutUs Spec file
*/
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AboutUsPage } from './about-us'
import { IonicModule, Platform, NavController} from 'ionic-angular/index';
import { TranslateModule, TranslateLoader, TranslateParser } from 'ng2-translate';
import { TranslateService } from "ng2-translate"; 

describe('AboutUsPage', () => {
  let de: DebugElement;
  let comp;
  let fixture;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AboutUsPage],
      imports: [
        IonicModule.forRoot(AboutUsPage),
        TranslateModule
      ],
      providers: [
        NavController,
        TranslateLoader,TranslateParser,TranslateService
      ]
    });
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AboutUsPage);
    comp = fixture.componentInstance;
  });
  it('should be created', () => {
    expect(comp instanceof AboutUsPage).toBe(true);
});
});
