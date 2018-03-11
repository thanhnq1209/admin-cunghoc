import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AppSettings } from '../app.constant';
import 'rxjs/add/operator/map'

@Injectable()
export class LessionService {
    constructor(private http: Http) { }

    getAllTypeLession(sort: string, page: any, amount: any, keysearch: string) {
        return this.http.get(AppSettings.API_ENDPOINT + 'lessions/GetAllTypeLession?sort=' + sort + '&page=' + page + '&amount=' + amount + '&keysearch=' + keysearch)
        .map((response: Response) => response.json());
    }

    createTypeLession(typeLession: any) {
        return this.http.post(AppSettings.API_ENDPOINT +'lessions/CreateTypeLession', typeLession, AppSettings.jwt()).map((response: Response) => response.json());
    }

    update(category: any) {
        return this.http.put(AppSettings.API_ENDPOINT +'lessions/Update', category, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: any) {
        return this.http.delete(AppSettings.API_ENDPOINT +'categories/Delete?Id=' + id, this.jwt()).map((response: Response) => response);
    }

    getAllForCreateExam(){
        return this.http.get(AppSettings.API_ENDPOINT + 'categories/getAllForCreateExam')
        .map((response: Response) => response.json());
    }

    getAllForCreateLession(){
        return this.http.get(AppSettings.API_ENDPOINT + 'lessions/getAllForCreateLession')
        .map((response: Response) => response.json());
    }

    createLession(lession: any){
        // return this.http.post(AppSettings.API_ENDPOINT +'lessions/CreateTypeLession', typeLession, 
        // AppSettings.jwt()).map((response: Response) => response.json());
        return this.http.post(AppSettings.API_ENDPOINT +'lessions/CreateLession', lession, 
        AppSettings.jwt()).map((response: Response) => response.json());
    }

    createPractice(pratice: any) {
        return this.http.post(AppSettings.API_ENDPOINT +'lessions/CreatePracticeLession', pratice, AppSettings.jwt()).map((response: Response) => response.json());
    }

    // private helper methods

    private jwt() {
        let headers = new Headers({ 
            'Content-Type' : 'application/json'
        });
        return new RequestOptions({ headers: headers });
    }
}