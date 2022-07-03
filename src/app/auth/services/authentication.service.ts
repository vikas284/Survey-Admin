import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../../shared/services';

@Injectable()
export class AuthenticationService {
    API_ENDPOINT: string;
    constructor(private http: HttpClient,
        private sharedService: SharedService) {
        this.API_ENDPOINT = this.sharedService.getApiEndPoint();
    }

    login(loginData) {
        return this.http.post(this.API_ENDPOINT + '/user/login', loginData);
    }

}