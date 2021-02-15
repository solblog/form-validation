/**
 * @author: solsun
 * The purpose of this service is to host all the function related with the atomic form validations
 */

import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import {
    decimalValidator,
    emailValidator,
    notJustSpaceValidator,
    numericValidator,
    oneHyphenValidator,
    range2020To2030Validator,
} from './regexp-validators';
import { ValidationUtils } from './validation-utils';
import { maxLenghtDefaultErrMsg } from '../form-errors/err-msg';
import { ErrorMsgUtils } from '../form-errors/errors-utils';

export class MyProjectValidators {

    static numericValidator(control: AbstractControl): ValidationErrors | null {
        return ValidationUtils.noMatchRegExpValidator(numericValidator)(control);
    }

    static decimalValidator(control: AbstractControl): ValidationErrors | null {
        return ValidationUtils.noMatchRegExpValidator(decimalValidator)(control);
    }

    static emailValidator(control: AbstractControl): ValidationErrors | null {
        return ValidationUtils.noMatchRegExpValidator(emailValidator)(control);
    }

    static yearBetween2020to2030Validator(control: AbstractControl): ValidationErrors | null {
        return ValidationUtils.noMatchRegExpValidator(range2020To2030Validator)(control);
    }


    /**
     * Document all of them
     */

    static notJustSpaceValidator(control: AbstractControl): ValidationErrors | null {
        return ValidationUtils.noMatchRegExpValidator(notJustSpaceValidator)(control);
    }

    static hasZeroCharacters(pnumber: number): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            // console.log('number' , number);
            return pnumber === 0 ? ErrorMsgUtils.getControlErrorMsg(maxLenghtDefaultErrMsg) : null;
        };
    }

     /*
     * Force to remove the hyphen to update the field. Use to notice the user that he/she
     * has to update the field.
     * @param control
     */
    // removeHyphenValidator

    static hasHyphenValidator(control: AbstractControl): ValidationErrors | null {
        return ValidationUtils.matchRegExpValidator(oneHyphenValidator)(control);
    }

    static requiredIf(predicate) {
      return (control: AbstractControl) => {
          if (!control.parent) {
              return null;
          }
          if (predicate()) {
              return Validators.required(control);
          }
          return null;
      };
  }

  static conditionalValidator(predicate, validator) {
      return (control: AbstractControl) => {
          if (!control.parent) {
              return null;
          }
          if (predicate()) {
              return validator(control);
          }
          return null;
      };
  }

}
