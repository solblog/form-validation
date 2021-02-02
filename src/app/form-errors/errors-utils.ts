/**
 * @author: solsun
 * The purpose of this service is to host all the function related with the atomic form validations
 */

import { FormControl, FormGroup } from '@angular/forms';
import { minLenghtDefaultErrMsg, requiredDefaultErrMsg } from './err-msg';

export class ErrorMsgUtils {

    /**
     * Method used for angular default validators.
     *  TODO:  In case we want a common approach, we have to implement the Angular default validation
     * as custom validations
     *  Pending: Add all Angular validation error messages.
     */

    static addDefaultErrorMsg(control: FormControl) {
        if (control.errors.required) {
            control.setErrors(ErrorMsgUtils.getControlErrorMsg(requiredDefaultErrMsg));
        } else if (control.errors.minLength) {
            control.setErrors(ErrorMsgUtils.getControlErrorMsg(minLenghtDefaultErrMsg));
        }
    }

    /**
     * Functions to display global form error message
     */

    static getFormValidationErrorMsg(validationMessage: string): any {
        return ErrorMsgUtils.getControlErrorMsg(validationMessage);
    }

    static getFormErrorMsgWithParams(validationMessage: string, params: {}): any {
        return ErrorMsgUtils.getControlErrorMsgWithParams(validationMessage, params);
    }

    static getFormErrorWithoutMsg(): any {
        return ErrorMsgUtils.getEmptyErrorMsg();
    }

    /**
     * Functions to display global form error message
     */

    static addFormErrorMsg(form: FormGroup, errorMessage: string) {
        form.setErrors(ErrorMsgUtils.getControlErrorMsg(errorMessage));
    }

    /**
     * Message Objects
     */

    static getControlErrorMsgWithParams(msg: string, lparams: {}) {
        return { controlErrorMsg: msg, params: lparams };
    }

    static getControlErrorMsg(msg: string) {
        return { controlErrorMsg: msg };
    }

    static getGroupErrorMsg(msg: string) {
        return { groupErrorMsg: msg };
    }

    static getEmptyErrorMsg() {
        return { emptyMsg: null };
    }

    static addControlErrorMsg(control: FormControl, errorMessage: string) {
        control.setErrors(ErrorMsgUtils.getControlErrorMsg(errorMessage));
    }


    static hasElementErrors(control) {
        return (control.errors && control.errors.controlErrorMsg) ? true : false;
    }

    static hasGroupErrors(control) {
        return (control.errors && control.errors.groupErrorMsg) ? true : false;
    }


}
