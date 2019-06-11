import { AbstractControl, ValidationErrors } from "@angular/forms";

/** 
 * @author Sandesh Uttarwar
*/
export class CommonValidations {
    /**
     * 
     * @param control 
     */
    static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
        if ((control.value as string).indexOf(' ') >= 0) {
            return { cannotContainSpace: 'Can not contain space' }
        }
        return null;
    }

    /**
     * 
     * @param control 
     */
    static thaiIdValidator(control: AbstractControl): ValidationErrors | null {
        let value = control.value as string;
        let pattern = /^[0-9]+$/;
        if (value.match(pattern) && value.length !== 0 && value.length > 8 && value.length < 13)
            return null;
        return {
            msg: 'Thai id is not valid'
        }
    }

      /**
     * 
     * @param control 
     */
    static thaiPhoneNumber(control: AbstractControl): ValidationErrors | null {
        let value = control.value as string;
        let pattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (value.match(pattern) && value.length == 10)
            return null;
        return {
            msg: 'Phone number is not valid'
        }
    }

}