import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../../shared/services';
import { Observable } from 'rxjs';


@Injectable()
export class SurveyService {
    API_ENDPOINT: string;
    constructor(
        private http: HttpClient,
        private sharedService: SharedService) {
        this.API_ENDPOINT = this.sharedService.getApiEndPoint();
    }

    addSurvey(data): Observable<any> {
        return this.http.post(`${this.API_ENDPOINT}/survey`, data, this.sharedService.httpOptions());
    }

    getSurvey(params): Observable<any> {
        return this.http.get(`${this.API_ENDPOINT}/survey?skip=${params.skip}&limit=${params.limit}`, this.sharedService.httpOptions());
    }

    updateSurvey(id, data): Observable<any> {
        return this.http.put(`${this.API_ENDPOINT}/survey/${id}`, data, this.sharedService.httpOptions());
    }

    deleteSurvey(id): Observable<any> {
        return this.http.delete(`${this.API_ENDPOINT}/survey/${id}`, this.sharedService.httpOptions());
    }

    assignSurveyToUser(id, email): Observable<any> {
        return this.http.put(`${this.API_ENDPOINT}/survey/assign/${id}/${email}`, {}, this.sharedService.httpOptions());
    }

}