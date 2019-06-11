import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ScbHeaderIconComponent } from './scb-header-icon';
import { IonicModule, NavController } from "ionic-angular";
import { pipe } from "rxjs/util/pipe";
import { TranslateModule, TranslateService, TranslateLoader, TranslateParser } from "ng2-translate";
import { NavMock } from "../../../test-config/mocks-ionic";
describe('ScbHeaderIconComponent', () => {
    let de: DebugElement;
    let scbHeader: ScbHeaderIconComponent;
    let fixture: ComponentFixture<ScbHeaderIconComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ScbHeaderIconComponent],
            imports: [
                IonicModule.forRoot(ScbHeaderIconComponent),
                TranslateModule
            ],
            providers: [
                {provide: NavController, useClass: NavMock},
                TranslateService,
                TranslateLoader,
                TranslateParser
            ]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ScbHeaderIconComponent);
        scbHeader = fixture.componentInstance;
        spyOn(scbHeader, "backBtnEvent").and.callThrough();
        let pipe = new TranslateModule();

    });

    it('should create component', () => expect(scbHeader).toBeDefined());
    it('should call pipe', () => expect(pipe).toBeDefined());

    it('should call function backBtnEvent()', () => {
        scbHeader.backBtnEvent()
        expect(scbHeader.backBtnEvent).toBeDefined;
        scbHeader.inputsDetails.nav.pop();
        expect(scbHeader.inputsDetails.nav.pop).toBeDefined;
    });


});
