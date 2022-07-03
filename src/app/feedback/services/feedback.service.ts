import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../../shared/services';
import { Observable } from 'rxjs';


@Injectable()
export class FeedbackService {
    API_ENDPOINT: string;
    constructor(
        private http: HttpClient,
        private sharedService: SharedService) {
        this.API_ENDPOINT = this.sharedService.getApiEndPoint();
    }

    

    getSurvey(params): Observable<any> {
        return this.http.get(`${this.API_ENDPOINT}/survey/response?skip=${params.skip}&limit=${params.limit}`, this.sharedService.httpOptions());
    }

    
}