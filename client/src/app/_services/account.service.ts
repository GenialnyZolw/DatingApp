import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = "https://localhost:44355/api/"
  constructor(private http: HttpClient ) { }

  login(model: any): Observable<any> {
    return this.http.post(this.baseUrl + "account/login", model);
  }
}
