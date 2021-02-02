import { CustomValidator } from './custom-validator-model';
import { decimalValidationErrMsg } from '../form-errors/err-msg';
import { numericValidationErrMsg,
         emailValidationErrMsg,
         requiredDefaultErrMsg,
         yearRange2020to2030ValidationErrMsg} from '../form-errors/err-msg';

/*
 **************************************  CUSTOM ELEMENT VALIDATIONS *************************************************
*/

export const numericValidator: CustomValidator = {
    pattern: /^\d*$/,
    msg: numericValidationErrMsg,
};

export const decimalValidator: CustomValidator = {
    pattern: /^\d+(\.\d{1,2})?$/,
    msg: decimalValidationErrMsg,
};

export const emailValidator: CustomValidator = {
    pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/,
    msg: emailValidationErrMsg,
};

export const range2020To2030Validator: CustomValidator = {
    pattern: /^(202\d|2030)$/,
    msg: yearRange2020to2030ValidationErrMsg,
};

/**
 * Tricky: Use to set with a hyphen the field and require to udate.
 */
export const oneHyphenValidator: CustomValidator = {
    pattern: /^-{1}$/,
    msg: requiredDefaultErrMsg,
};

/**
 * The difference with the Angular Validator.required is that it does not allow just only Spaces.
 */
export const notJustSpaceValidator: CustomValidator = {
    pattern: /.*[^ ].*/,
    msg: requiredDefaultErrMsg,
};

/**
 * Used by Rich Text editor
 */
// export const removeSpacesAndTags: RegExp = /(<([^>]+)>)|\s/ig;
export const removeSpacesAndTags: RegExp = /(<[^>]*)>|\s/ig;

export const okValidator = {};
