import {async,ComponentFixture,TestBed} from '@angular/core/testing';
import {RegisterUserPage} from './register-user';
import { IonicModule, NavController, NavParams } from 'ionic-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpServiceProvider } from '../../providers/data-service/http-service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { NetworkServiceProvider } from '../../providers/data-service/network-service';
import { Network } from '@ionic-native/network';
import { LogServiceProvider } from '../../providers/data-service/log-service';
import { TranslateModule, TranslateService, TranslateLoader, TranslateParser } from 'ng2-translate';
import { ScbHeaderIconComponent } from "../../components/scb-header-icon/scb-header-icon";
import { NavMock } from "../../../test-config/mocks-ionic";
import { VerifyPhonePage } from "../pages";

describe("register user ",()=>{
    let page : RegisterUserPage;
    let fixture : ComponentFixture<RegisterUserPage>;
    let fixture1:ComponentFixture<ScbHeaderIconComponent>;

    beforeEach(async(()=>{
        TestBed.configureTestingModule({
            declarations:[RegisterUserPage, ScbHeaderIconComponent],
            imports:[
                IonicModule.forRoot(RegisterUserPage),
                TranslateModule,
                FormsModule,
                ReactiveFormsModule
            ],
            providers:[
                TranslateService,
                {provide: NavController, useClass: NavMock},
                HttpServiceProvider,
                HttpClient,
                HttpHandler,
                NetworkServiceProvider,
                Network,
                TranslateLoader,
                TranslateParser,
                LogServiceProvider
            ]
        })
    }));
    beforeEach(()=>{
        fixture = TestBed.createComponent(RegisterUserPage);
        page = fixture.componentInstance;
        fixture1 = TestBed.createComponent(ScbHeaderIconComponent);
        let scbHeaderComponent = fixture1.componentInstance;
        // spyOn(page, "register").and.callThrough();
        spyOn(page.navCtrl, "push").and.callThrough();
    })

    // it('should call scb header component', () => expect(scbHeaderComponent).toBeDefined());

    // form should be invalid when empty
    it('form should be invalid when empty',()=>{
        expect(page.registerSCBLifeCustomer.valid).toBeFalsy();
    })
    // email should be invalid when empty
    it("email should be invalid when empty",()=>{
        expect(page.registerSCBLifeCustomer.controls['email'].valid).toBeFalsy();
    })
    // existing customer should be invalid when empty
    it("existing customer should be invalid when empty",()=>{
        expect(page.registerSCBLifeCustomer.controls['existingCustomer'].valid).toBeFalsy();
    })
    // passkey should be invalid when empty
    it("passkey should be invalid when empty",()=>{
        expect(page.registerSCBLifeCustomer.controls['thaiId'].valid).toBeFalsy();
    })
    // acceptTerms should be invalid when empty
    it("acceptTerms should be invalid when empty",()=>{
        expect(page.registerSCBLifeCustomer.controls['acceptTerms'].valid).toBeFalsy();
    })
    // email should give error when required pattern is not entered
    it("email should give error when required pattern is not entered",()=>{
        let errors = {};
        let email = page.registerSCBLifeCustomer.controls['email'];
        email.setValue('test');
        errors = email.errors || {}
        expect(errors['pattern']).toBeTruthy();
    })
    // email should not give error when required pattern is entered
    it("email should not give error when required pattern is entered",()=>{
        let errors = {};
        let email = page.registerSCBLifeCustomer.controls['email'];
        email.setValue('test@xyz.com');
        errors = email.errors || {}
        expect(email.errors).toBeFalsy();
    })
    // ionViewDidLoad should be defined
    it("ionViewDidLoad should be defined",()=>{
        page.ionViewDidLoad();
        fixture.detectChanges();
        expect(page.ionViewDidLoad).toBeDefined(true);
    })
    
    // applyLater should be defined
    it("applyLater should be defined",()=>{
        page.applyLater();
        fixture.detectChanges();
        expect(page.applyLater).toBeDefined(true);
    })

})