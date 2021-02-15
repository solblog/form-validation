import { FormGroup, AbstractControl, ValidatorFn } from '@angular/forms';
import { startDateAfterCurrentDateErrMsg, endDateAfterStartDateErrMsg,
         globalValidationOK, maxLenghtDefaultErrMsg, endYearAfterStartYearMsg, addedNumberMinus30} from '../form-errors/err-msg';
import { ValidationUtils } from './validation-utils';
import { ErrorMsgUtils} from '../form-errors/errors-utils';
import { Utils } from '../utils/utils';


/**
 * Predicates
 */

const secondGreaterThanFirst = (first, second) => second > first;

export type BooleanFn = () => boolean;


/*
 ****************************  Global validations *********************************************************
 */

/**
 * @param startDate This is the start date
 * @param endDate
 * This function run two validation:
 *  Check that the start date is higher than the current date.
 *  Check that the start date is lower or equal than the end date.
 */

export function validateDates(startDate: string, endDate: string): ValidatorFn {

    return (control: FormGroup): { [key: string]: any } | null => {

        try {
            const today: Date = new Date(); // StartDate for startDatetime

            const startingDatefield = control.get(startDate).value;
            const endingDatefield = control.get(endDate).value;

            if (startingDatefield && today && today >= startingDatefield) { // compare to current date
                return ErrorMsgUtils.getFormValidationErrorMsg(startDateAfterCurrentDateErrMsg);
            } else if (startingDatefield > endingDatefield && endingDatefield) {
                return ErrorMsgUtils.getFormValidationErrorMsg(endDateAfterStartDateErrMsg);
            }
        } catch (err) {
        }

        return globalValidationOK;

    };

}

export function validateYears(startYear: string, endYear: string): ValidatorFn {

    return (control: FormGroup): { [key: string]: any } | null => {
        try {
            const startYearValue = control.get(startYear).value;
            const endYearValue = control.get(endYear).value;

            if (endYearValue && startYearValue > endYearValue) {
                 // set error on matchingControl if validation fails
                return ErrorMsgUtils.getFormValidationErrorMsg(endYearAfterStartYearMsg);
            }

        } catch (err) {
        }

        return globalValidationOK;

    };

}

export function validateNumbers(number1: string, number2: string, number3: string): ValidatorFn {

  return (control: FormGroup): { [key: string]: any } | null => {
      try {

          console.log('validateNumbers');
          const number1Value: number = +control.get(number1).value;
          const number2Value: number = +control.get(number2).value;
          const number3Value: number = +control.get(number3).value;

          console.log('Nulls', number1Value && number2Value && number3Value );

          console.log('add', number1Value + number2Value + number3Value < 30);

          const addNumber = number1Value + number2Value + number3Value;

          console.log('addNumber', addNumber );



          if (number1Value && number2Value && number3Value && ( number1Value + number2Value + number3Value < 30 ) ) {
              console.log('addErrorMessage');
              return ErrorMsgUtils.getFormValidationErrorMsg(addedNumberMinus30);
          }

      } catch (err) {
      }

      return globalValidationOK;

  };

}

/*
 ****************************  Group of element validations *********************************************************
 */

export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          // return if another validator has already found an error on the matchingControl
          return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
      } else {
          matchingControl.setErrors(null);
      }

  };

}

export function validateYearsGroups(startYearLabel: string, endYearLabel: string) {
    return (formGroup: FormGroup) => {

        const startYear = formGroup.controls[startYearLabel];
        const endYear = formGroup.controls[endYearLabel];

        /*
        console.log('*****************************************************************');
        console.log('*****************************************************************');
        console.log('ERROR-LIST1', startYear.errors);
        console.log('ERROR-LIST2', endYear.errors);
        console.log('formGroup-errors', formGroup.errors);
        */

        const startYearValue = formGroup.get(startYearLabel).value;
        const endYearValue = formGroup.get(endYearLabel).value;

        /*
        console.log('ValidationUtils.hasErrors(startYear)' + startYearValue, ValidationUtils.hasAtomicErrors(startYear));
        console.log('ValidationUtils.hasErrors(endYear)' + endYearValue, ValidationUtils.hasAtomicErrors(endYear));
        */

        if (ErrorMsgUtils.hasElementErrors(startYear) || ErrorMsgUtils.hasElementErrors(endYear)) {
            if (ErrorMsgUtils.hasGroupErrors(startYear)) {
                startYear.setErrors(null);
            }
            return;
        }

        if ((startYearValue != null) && (endYearValue != null) && (startYearValue > endYearValue)) {
            startYear.setErrors(ErrorMsgUtils.getGroupErrorMsg(endYearAfterStartYearMsg));
        }
        // endYear.setErrors(ValidationUtils.getErrorMsgObject(endYearAfterStartYearMsg));

    };
}

export function validateDatesGroups(startDateLabel: string, endDateLabel: string) {

  return (form: FormGroup) => {

      console.log('Validate date groups');
      const today: Date = new Date(); // StartDate for startDatetime

      const startDate = form.controls[startDateLabel];
      const endDate = form.controls[endDateLabel];

      const starDateValue = form.get(startDateLabel).value;
      const endDateValue = form.get(endDateLabel).value;

      if (ErrorMsgUtils.hasElementErrors(startDate) || ErrorMsgUtils.hasElementErrors(endDate)) {
          console.log('Default errors');
          if (ErrorMsgUtils.hasGroupErrors(startDate)) {
              // startDate.setErrors(null); // ??
          }
          return;
      }

      if (starDateValue && today >= starDateValue) {
          console.log('Group validation 1');
          startDate.setErrors(ErrorMsgUtils.getGroupErrorMsg(startDateAfterCurrentDateErrMsg));
      } else if (starDateValue && endDateValue && starDateValue >= endDateValue) {
          console.log('Group validation 2');
          startDate.setErrors(ErrorMsgUtils.getGroupErrorMsg(endDateAfterStartDateErrMsg));
      } else {
          console.log('OK');
          // startDate.setErrors(null); // ??
      }
  };

}


/**
 * Predicates: Create another file...
 */


/**
 * @param maxLenght
 *  This Function check that the lenght of the control value is less or equal than the maxLenght
 * removing the spaces and html tags
 */

export function maxLengthTagsAndSpaceStripped(maxLength: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
      if ( control.value ) {
          const tagsStrippedContent = Utils.cleanTagsAndSpaces(control.value);
          return tagsStrippedContent.length > maxLength ? ErrorMsgUtils.getControlErrorMsg(maxLenghtDefaultErrMsg) : null;
      }
  };

}

export function conditionalMaxLength(predicate: BooleanFn, validator: ValidatorFn): ValidatorFn {
  return formControl => {

      console.log ('conditionalMaxLength');

      if (!formControl.parent) {
          return null;
      }

      let error = null;

      console.log('predicate()', predicate());

      if (predicate()) {
          error = validator(formControl);
      }
      console.log('error', error);
      return error;

  };
}

export function maxLengthRequiredIf(predicate) {
  return (formControl => {
      if (!formControl.parent) {
          return null;
      }
      if (predicate()) {
         // return Validators.required(formControl);
      }
      return null;
  });
}


