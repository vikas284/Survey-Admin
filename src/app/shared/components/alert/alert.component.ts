import { Component, OnDestroy } from '@angular/core';
import { AlertService } from '../../services/index';

@Component({
    selector: 'alert',
    templateUrl: 'alert.component.html'
})

export class AlertComponent {
    message: any;

    constructor(private alertService: AlertService) {
        alertService.getMessage().subscribe(message => {
            this.message = message;
            setTimeout(function () {
                this.message = false;
            }.bind(this), 10000);
        });
    }

}