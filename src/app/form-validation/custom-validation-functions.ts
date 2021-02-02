import { FormGroup, AbstractControl, ValidatorFn } from '@angular/forms';
import { startDateAfterCurrentDateErrMsg, endDateAfterStartDateErrMsg,
         globalValidationOK, maxLenghtDefaultErrMsg, endYearAfterStartYearMsg } from '../form-errors/err-msg';
import { ValidationUtils } from './validation-utils';
import { ErrorMsgUtils} from '../form-errors/errors-utils';
import { Utils } from '../utils/utils';

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

/*
 ****************************  Group of element validations *********************************************************
 */

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

/**
 * Predicates: Create another file...
 */
const secondGreaterThanFirst = (first, second) => second > first;

/**
 * Should not be here
 */

/**
 * @param maxLenght
 *  This Function check that the lenght of the control value is less or equal than the maxLenght
 * removing the spaces and html tags
 */

export function maxLengthStrippingTagsAndSpaces(maxLength: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        if ( control.value ) {
            const tagsStrippedContent = Utils.cleanTagsAndSpaces(control.value);
            return tagsStrippedContent.length > maxLength ? ErrorMsgUtils.getControlErrorMsg(maxLenghtDefaultErrMsg) : null;
        }
    };

}

