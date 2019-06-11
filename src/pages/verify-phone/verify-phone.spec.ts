import {async,ComponentFixture,TestBed} from '@angular/core/testing';
import {VerifyPhonePage} from './verify-phone';
import { IonicModule, NavController } from 'ionic-angular';
import { LogServiceProvider } from '../../providers/data-service/log-service';
import { TranslateModule, TranslateService, TranslateLoader, TranslateParser } from 'ng2-translate';
import { ScbHeaderIconComponent } from "../../components/scb-header-icon/scb-header-icon";

describe("verify phone",()=>{
    let page : VerifyPhonePage;
    let fixture : ComponentFixture<VerifyPhonePage>;
    let scbHeaderComponent: ScbHeaderIconComponent;
    let fixture1: ComponentFixture<ScbHeaderIconComponent>;
    
    beforeEach(async(()=>{
        TestBed.configureTestingModule({
            declarations:[VerifyPhonePage,ScbHeaderIconComponent],
            imports:[
                IonicModule.forRoot(VerifyPhonePage), 
                TranslateModule
            ],
            providers:[
                NavController,
                TranslateService,
                LogServiceProvider,
                TranslateParser,
                TranslateLoader
            ]
        })
    }));
    beforeEach(()=>{
        fixture = TestBed.createComponent(VerifyPhonePage);
        page = fixture.componentInstance;
        fixture1 = TestBed.createComponent(ScbHeaderIconComponent);
        scbHeaderComponent = fixture1.componentInstance;
    })
    it('should call scb header component', () => expect(scbHeaderComponent).toBeDefined());
    
    // ionViewDidLoad should be defined
    it("ionViewDidLoad should be defined",()=>{
        page.ionViewDidLoad();
        fixture.detectChanges();
        expect(page.ionViewDidLoad).toBeDefined(true);
    })
    // sendOtp should be defined
    it("sendOtp should be defined",()=>{
        page.sendOtp();
        fixture.detectChanges();
        expect(page.sendOtp).toBeDefined(true);
    })
    // noMobile should be defined
    it("noMobile should be defined",()=>{
        page.noMobile();
        fixture.detectChanges();
        expect(page.noMobile).toBeDefined(true);
    })
})