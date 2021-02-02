/**
 * @author: solsun
 * The purpose of this service is to host all the function related with the atomic form validations
 */

import { CustomValidator } from './custom-validator-model';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { removeSpacesAndTags } from './regexp-validators';
import { ErrorMsgUtils } from '../form-errors/errors-utils';

export class ValidationUtils {

    static noMatchRegExpValidator(customValidator: CustomValidator): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const urlRegEx: RegExp = customValidator.pattern;
            if (control.value) {
                const value = control.value + '';
                if (!value.match(urlRegEx)) {
                    return ErrorMsgUtils.getControlErrorMsg(customValidator.msg);
                } else {
                    return null;
                }
            }
        };
    }

    static matchRegExpValidator(customValidator: CustomValidator): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const urlRegEx: RegExp = customValidator.pattern;
            if (control.value) {
                const value = control.value + '';
                if (value.match(urlRegEx)) {
                    return ErrorMsgUtils.getControlErrorMsg(customValidator.msg);
                } else {
                    return null;
                }
            }
        };
    }

     /* Alternative to use --> IntelliSense error message
     *  Error message to display per element
     *  Examples:
     *   editedName: new FormControl('', [Validators.required, SFC2021Validators.addCustomValidator(notJustSpaceValidator)]),
     *   editedEmail: new FormControl('', [Validators.required, SFC2021Validators.addCustomValidator(emailValidator),
     */
    static addCustomValidator(customValidator: CustomValidator): ValidatorFn {

        return (control: FormControl) => {
            const urlRegEx: RegExp = customValidator.pattern;
            if (control.value && !control.value.match(urlRegEx)) {
                return ErrorMsgUtils.getControlErrorMsg(customValidator.msg);
            } else {
                return null;
            }
        };

    }


    /*
      * TODO: Create a generic one for all form Elements.
      * By default select can have just one validator mandatory or not.
    */

    static updateSelectValidators(mandatory: boolean, hideSelect: boolean, form: FormGroup, formElementId: string) {

        if (mandatory) {
            if (hideSelect) {
                form.controls[formElementId].setValidators(null);
            } else {
                form.controls[formElementId].setValidators(Validators.required);
            }
        }

    }

    /**
     * DELETE
     */

    static regExpValidator2(customValidator: CustomValidator, match: boolean): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const urlRegEx: RegExp = customValidator.pattern;
            if (control.value) {
                const value = control.value + '';
                const result = match ? value.match(urlRegEx) : !value.match(urlRegEx);
                if (result) {
                    return ErrorMsgUtils.getControlErrorMsg(customValidator.msg);
                } else {
                    return null;
                }
            }
        };
    }

}
