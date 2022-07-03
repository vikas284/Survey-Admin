import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../../shared/services';
import { Observable } from 'rxjs';


@Injectable()
export class UserService {
    API_ENDPOINT: string;
    constructor(
        private http: HttpClient,
        private sharedService: SharedService) {
        this.API_ENDPOINT = this.sharedService.getApiEndPoint();
    }

    getUser(params): Observable<any> {
        return this.http.get(`${this.API_ENDPOINT}/user?searchText=${params.searchText}&skip=${params.skip}&limit=${params.limit}`, this.sharedService.httpOptions());
    }

    createUser(data): Observable<any> {
        return this.http.post(`${this.API_ENDPOINT}/user`, data, this.sharedService.httpOptions());
    }

    deleteUser(id): Observable<any> {
        return this.http.delete(`${this.API_ENDPOINT}/user/${id}`, this.sharedService.httpOptions());
    }

}