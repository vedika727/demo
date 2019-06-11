##F orm validation steps

1. import { FormGroup, FormBuilder, Validators } from '@angular/forms'; where you want to use forms
2. create variable of FormGroup that represents your form.
    #e.g
    fm:FormGroup;
3. Initialise  your form and form controls in ngOnInit method
    #e.g 
    this.fm = this.fb.group({
    username: ['',[Validators.required, Validators.minLength(4)]],
    mobile: ['', [Validators.required]]
    });
     
4. Add required validations in Validators array
5. Create getter method for all form control
    #e.g 
        get username(){
            return this.fm.get(‘username’);
        }
6. Bind FormGroup variable to html form like below comment
    <!-- 
        <form [formGroup]="fm">
        <ion-item>
        <ion-label floating>username </ion-label>
        <ion-input formControlName="username" type="text"></ion-input>
        </ion-item>
        </form> 
    -->

For other queries, refer to baseline code: homepage
and validation rules in 
common>form-validations>common.validator.ts