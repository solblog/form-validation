import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormErrorsService } from '../app/form-errors/errors-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  formControlValidation: FormGroup;
  /*
  formGroupValidation: FormGroup;
  formGlobalValidation: FormGroup;
  formConditionalValidation: FormGroup;
  */

  formSubscription: Subscription;
  saveDisable = false;

  constructor(private formBuilder: FormBuilder, private formErrorsService: FormErrorsService) {
  }

  ngOnInit(): void {

    this.formControlValidation = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      email: new FormControl(),
    });

    /*
    this.formGroupValidation = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required]),
    });

    this.formGlobalValidation = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required]),
    });

    this.formConditionalValidation = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required]),
    });
    */

    this.initCheckFormErrors();

  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }

  initCheckFormErrors() {
    this.formSubscription = this.formControlValidation.statusChanges.subscribe(
      result => {
          console.log(this.formControlValidation);
          this.formErrorsService.updateFormElementsErrors(this.formControlValidation);
      });
  }

  onSave() {
  }



}
