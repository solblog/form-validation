import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormErrorsService } from '../app/form-errors/errors-service';
import { MyProjectValidators } from '../app/form-validation/validators';
import { validateDatesGroups, validateNumbers } from '../app/form-validation/custom-validation-functions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  formControlValidation: FormGroup;
  formElementValid = false;

  formGroupValidation: FormGroup;
  formGroupValid = false;

  formAllValidation: FormGroup;
  formAllValid = false;


  formSubscription: Subscription;
  formGroupSubscription: Subscription;
  formAllSubscription: Subscription;


  constructor(private formBuilder: FormBuilder, private formErrorsService: FormErrorsService) {
  }

  ngOnInit(): void {


    this.formControlValidation = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required , MyProjectValidators.emailValidator]),
    });


    this.formGroupValidation  = this.formBuilder.group({
        startDate: new FormControl('', Validators.required),
        endDate: new FormControl('', Validators.required)
     } , { validators: validateDatesGroups('startDate', 'endDate') } );

    this.formAllValidation = this.formBuilder.group({
      number1: new FormControl('', [ Validators.required, MyProjectValidators.numericValidator]),
      number2: new FormControl('', [ Validators.required, MyProjectValidators.numericValidator] ) ,
      number3: new FormControl('', [ Validators.required , MyProjectValidators.numericValidator] ) },
      { validators: validateNumbers('number1', 'number2', 'number3' ) }
    );

    /*
    this.formConditionalValidation = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required]),
    });
    */

    this.initCheckFormErrors();

    this.initCheckGroupFormErrors();

    this.initCheckAllFormErrors();

  }


  initCheckFormErrors() {
    this.formSubscription = this.formControlValidation.statusChanges.subscribe(
      result => {
          // console.log(this.formControlValidation);
          this.formErrorsService.updateFormElementsErrors(this.formControlValidation);
          this.formElementValid = result === 'VALID';
      });
  }

  initCheckGroupFormErrors() {
    console.log('Init form group errors');
    this.formGroupSubscription = this.formGroupValidation.statusChanges.subscribe(
      result => {
          console.log('this.formGroupValidation', this.formGroupValidation);
          this.formErrorsService.updateFormElementsErrors(this.formGroupValidation);
          this.formGroupValid = result === 'VALID';
      });
  }

  initCheckAllFormErrors() {
    console.log('Init form group errors');
    this.formAllSubscription = this.formAllValidation.statusChanges.subscribe(
      result => {
          console.log('this.formAllValidation', this.formAllValidation);
          this.formErrorsService.updateFormElementsErrors(this.formAllValidation);
          this.formAllValid = result === 'VALID';
      });
  }

  onSave() {
  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
    // this.formGroupSubscription.unsubscribe();
  }



}
