/*
 **************************************  Angular default validation ***********************************************
 * See https://angular.io/api/forms/Validators for more information.
 */

/**
 * TODO: How to get the parameter of the validator in case we wand to display
 * a message with parameters.
 */

/**
 * defaultRequired: The value in the field is required
 * static required(control: AbstractControl): ValidationErrors | null
 */
// export const requiredDefaultErrMsg = 'common.validation.ui.required';
export const requiredDefaultErrMsg = 'This field is required';

// export const requiredErrMsgWithControlName = 'common.validation.ui.required.with.control.name';
export const requiredErrMsgWithControlName = 'The field {arg1} is required';

/**
 * static min(min: number): ValidatorFn
 */

/**
 * static max(max: number): ValidatorFn
 */

/**
 * static requiredTrue(control: AbstractControl): ValidationErrors | null
 */

/**
 * static email(control: AbstractControl): ValidationErrors | null
 */

/**
 * static minLength(minLength: number): ValidatorFn
 */

/**
 * defaultMaxLenght: 'The value in the field exceeds the maximum length allowed'
 * static maxLength(maxLength: number): ValidatorFn
 * PS: Not use with EUI controls -->  <ux-form-control formControlName='code' [maxlength]="5">
 * TODO: Add parameters to the message (replace on the fly)
 */
// export const maxLenghtDefaultErrMsg = 'common.validation.ui.maxlength';
export const maxLenghtDefaultErrMsg = 'The value in the field exceeds the maximum length allowed';

/**
 * defaultMinLenght: The value in the field can not be less than the minimun lenght
 * static minLength(maxLength: number): ValidatorFn
 * TODO: Add parameters to the message (replace on the fly)
 */

export const minLenghtDefaultErrMsg = 'The value in the field can not be less than the minimun lenght';

/*
 **************************************  CONTROL CUSTOM ERROR MESSAGE *************************************************
 */

export const numericValidationErrMsg = 'The value of this field must be numeric';

export const decimalValidationErrMsg = 'The value of this field must be decimal';

export const emailValidationErrMsg = 'Email format not valid';

export const yearRange2020to2030ValidationErrMsg = 'Range year between 2020 to 2030';

/*
 **************************************  FORM CUSTOM ERROR MESSAGE *********************
 TODO: Pending to add all the validations in this file
 */

// export const startDateAfterCurrentDateErrMsg = 'common.validation.ui.startdate.higher.current';
export const startDateAfterCurrentDateErrMsg = 'Please set a Start Date that is on or after Current Date and Time.';
// 'Please set a Start Date that is on or after Current Date and Time.'

export const endDateAfterStartDateErrMsg = 'Please set an End Date and Time that is after the Start Date and Time.';
// 'Please set an End Date and Time that is after the Start Date and Time.'

export const mandatoryFormFieldsRequired = 'common.mandatoryFields';

export const endYearAfterStartYearMsg = 'common.validation.ui.endyear.higher.startyear';

export const addedNumberMinus30 = 'The added number is less than 30';

export const globalValidationOK = {};
