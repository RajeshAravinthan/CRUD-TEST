import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Injectable({ providedIn: 'root' })
export class apiService {
  public mode: string = 'DEV';
  public url: string = '';
  public loggedIn: Boolean = false;
  constructor(public http: HttpClient, public router: Router) {
    switch (this.mode) {
      case 'DEV': {
        this.url = 'https://jsonplaceholder.typicode.com/todos';
        break;
      }
    }
  }
  getUsers(): Observable<any> {
    return this.http.get(this.url);
  }
}
