import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AppSettings } from '../app.constant';
import 'rxjs/add/operator/map'

@Injectable()
export class ConstantService {
    constructor(private http: Http) { }

    
}