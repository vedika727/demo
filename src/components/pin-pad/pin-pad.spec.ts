import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { PinPadComponent } from './pin-pad';
import { IonicModule } from "ionic-angular";
import { SharedataProvider } from "../../providers/sharedata/sharedata";
import { pipe } from "rxjs/util/pipe";
import { TranslateModule, TranslateService, TranslateLoader, TranslateParser } from "ng2-translate";
describe('PinPadComponent', () => {
    let de: DebugElement;
    let pinPadComponent: PinPadComponent;
    let fixture: ComponentFixture<PinPadComponent>;
    let number:number;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PinPadComponent],
            imports: [
                IonicModule.forRoot(PinPadComponent),
                TranslateModule
            ],
            providers: [
                SharedataProvider,
                TranslateService,
                TranslateLoader,
                TranslateParser
            ]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PinPadComponent);
        pinPadComponent = fixture.componentInstance;
        spyOn(pinPadComponent, "keypadButtonPress").and.callThrough();
        spyOn(pinPadComponent.input, "pop").and.callThrough();
        spyOn(pinPadComponent, 'ngOnInit').and.callThrough();
        spyOn(pinPadComponent, 'display').and.callThrough();
        spyOn(pinPadComponent, 'callbackForgotPin').and.callThrough();
        let pipe = new TranslateModule();

    });

    it('should create component', () => expect(pinPadComponent).toBeDefined());
    it('should call pipe', () => expect(pipe).toBeDefined());

    it('should call function keypadButtonPress()', () => {
        let keypadFunction = pinPadComponent.keypadButtonPress(name)
        expect(keypadFunction).toBeDefined;
    });

    it('should call function input.pop()', () => {
        number=-1;
        pinPadComponent.keypadButtonPress(number)
        pinPadComponent.input.pop();
        expect(pinPadComponent.input.pop).toBeDefined();
    });

    it('should call function ngOnInit()', () => {
        pinPadComponent.ngOnInit()
        expect(pinPadComponent.ngOnInit).toBeDefined;
    });

    it('should call function display()', () => {
        pinPadComponent.display()
        expect(pinPadComponent.display).toBeDefined;
    });

    it('should check emptyArray to be false', () => {
        
        pinPadComponent.emptyArray=true
        expect(pinPadComponent.emptyArray).toBe(true);
        pinPadComponent.display()
        expect(pinPadComponent.emptyArray).toBe(false)
    });

    it('should call function callbackForgotPin()', () => {
        pinPadComponent.callbackForgotPin()
        expect(pinPadComponent.callbackForgotPin).toBeDefined;
    });



});
