import { Injectable, Inject } from '@angular/core';
import { FormGroup, FormArray, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { ErrorMsgUtils } from './errors-utils';
import { FormElementsService } from '../service/form-service';

@Injectable()
export class FormErrorsService {

    constructor() {
        // const loc: Locales = new Locales();
    }

    errorsVisitor = (key , obj) => this.updateErrorsMessage(key, obj);

    updateErrorsMessage(key: string, control: FormControl) {
        /*
         * Faster: Check control touched or dirty
         */
        if (control != null && control.errors != null) {
            if (control.errors.controlErrorMsg) {
              // Custom message already added, nothing to do
            } else {
                console.log('addDefaultErrorMsg');
                ErrorMsgUtils.addDefaultErrorMsg(control);
            }
        }
    }

    updateFormElementsErrors(group: FormGroup | FormArray) {
        FormElementsService.traverseForm(group, this.errorsVisitor);
    }

}
