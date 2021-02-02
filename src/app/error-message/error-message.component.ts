import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
// import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-error-message',
    templateUrl: './error-message.component.html',
    styleUrls: ['./error-message.component.css'],
})
export class ErrorMessageComponent implements OnInit {

    @Input() control: AbstractControl;

    constructor() {
    }

    ngOnInit(): void {

        console.log('Status', this.control, this.control.status);
    }

}
