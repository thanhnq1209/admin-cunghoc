import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable, } from 'rxjs/Observable';

import { AppSettings } from '../app.constant';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class LocalStorageService {
    constructor(private http: Http) { }

    private accountLogged = new Subject<any>();

    loginSuccess(account: any) {
        localStorage.setItem('Cart', JSON.stringify(account));
        this.accountLogged.next();
    }

    logoutSuccess() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('expires_in');
        localStorage.removeItem('token_type');
        this.accountLogged.next();
    }

    watchStorage(): Observable<any> {
        return this.accountLogged.asObservable();
    }

}