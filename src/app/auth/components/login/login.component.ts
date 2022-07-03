import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services';
import { SharedService, LoaderService, AlertService } from '../../../shared/services';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    email: string;
    password: string;

    constructor(
        private SharedService: SharedService,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthenticationService,
        private alertService: AlertService,
        private loaderService: LoaderService,
    ) {

    }

    ngOnInit() {

    }

    login() {
        let loginObject = {
            email: this.email,
            password: this.password
        }
        this.loaderService.display(true);
        this.authService.login(loginObject).subscribe((userData) => {
            this.loaderService.display(false);
            localStorage.setItem('currentUser', JSON.stringify(userData));
            this.router.navigate(['admin/user']);
        }, (err) => {
            this.loaderService.display(false);
            this.alertService.error(err.error.message, true);
        })
    }



}
