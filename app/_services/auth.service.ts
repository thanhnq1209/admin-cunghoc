import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { AppSettings } from '../app.constant';

@Injectable()
export class AuthService implements CanActivate {
 
    constructor(private router: Router, private http: Http) { }
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }
 
        // not logged in so redirect to login page with the return url and return false
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }

    getProfile(){
        return this.http.get(AppSettings.API_ENDPOINT +'Accounts/GetProfile', this.jwt()).map((response: Response) => response.json());
    }  

    private jwt() {
        let headers = new Headers({ 
            'Content-Type' : 'application/json',
            'authorization' : localStorage.token_type + ' ' + localStorage.access_token
        });
        return new RequestOptions({ headers: headers });
    }

}