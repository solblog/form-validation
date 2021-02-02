import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorMessageComponent} from '../app/error-message/error-message.component';
import { FormElementsService } from '../app/service/form-service';
import { FormErrorsService } from '../app/form-errors/errors-service';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorMessageComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [
    FormElementsService,
    FormErrorsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
