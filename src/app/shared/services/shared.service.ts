import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class SharedService {

  API_ENDPOINT = this.getApiEndPoint();

  constructor() { }

  logout() {
    localStorage.removeItem('currentUser');
  }

  getCurrentUser() {
    let currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      return JSON.parse(currentUser);
    } else {
      return false;
    }
  }

  getApiEndPoint() {

      return 'http://13.41.83.79/api-survey';

  }

  httpOptions() {
    let currentUser = this.getCurrentUser();
    if (currentUser && currentUser.token) {
      let headers = new HttpHeaders({ 'Authorization': currentUser.token });
      return {
        observe: 'response' as 'response',
        headers: headers
      }
    }
  }



}
