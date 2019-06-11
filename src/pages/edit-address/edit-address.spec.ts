import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { EditAddressPage } from './edit-address';
import { IonicModule, Platform, NavController} from 'ionic-angular/index';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import { TranslateModule,  TranslateLoader, TranslateParser } from 'ng2-translate';
import { TranslateService } from "ng2-translate";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


describe('Edit Address', () => {
  let de: DebugElement;
  let comp: EditAddressPage;
  let fixture: ComponentFixture<EditAddressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditAddressPage],
      imports: [
        IonicModule.forRoot(EditAddressPage),
        ReactiveFormsModule,
        FormsModule,
        TranslateModule 
      ],
      providers: [
        NavController,
        TranslateService,TranslateParser, TranslateLoader 
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAddressPage);
    comp = fixture.componentInstance;

     // get test component from the fixture
    
     comp.ngOnInit();
  
  });

  it('should create component', () => expect(comp).toBeDefined());

  
  //form empty validation
  it('form invalid when empty', () => {
    expect(comp.editAddressForm.valid).toBeFalsy();
  });

  //selectpolicy validation
  it('selectpolicy field validity', () => {
    let errors = {};
    let selectpolicy = comp.editAddressForm.controls['selectpolicy'];
    expect(selectpolicy.valid).toBeFalsy();

    //  selectpolicy is required
    errors = selectpolicy.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set selectpolicy to something
    selectpolicy.setValue("test");
    errors = selectpolicy.errors || {};
    expect(errors['required']).toBeFalsy();
    
  
});
});

