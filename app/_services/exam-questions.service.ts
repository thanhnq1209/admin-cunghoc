import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AppSettings } from '../app.constant';
import 'rxjs/add/operator/map'

@Injectable()
export class ExamQuestionsService {
    constructor(private http: Http) { }

    getAllExams(sort: string, page: any, amount: any, keysearch: string){
        return this.http.get(AppSettings.API_ENDPOINT + 'ExamQuestions/GetAllExams?sort=' + sort + '&page=' + page + '&amount=' + amount + '&keysearch=' + keysearch)
        .map((response: Response) => response.json());
    }

    createExamQuestions(exam: any) {
        return this.http.post(AppSettings.API_ENDPOINT +'ExamQuestions/CreateExamQuestion', exam, this.jwt()).map((response: Response) => response.json());
    }

    update(category: any) {
        return this.http.put(AppSettings.API_ENDPOINT +'categories/Update', category, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: any) {
        return this.http.delete(AppSettings.API_ENDPOINT +'categories/Delete?Id=' + id, this.jwt()).map((response: Response) => response);
    }

    getAllForCreateExam(){
        return this.http.get(AppSettings.API_ENDPOINT + 'categories/getAllForCreateExam')
        .map((response: Response) => response.json());
    }

    // private helper methods

    private jwt() {
        let headers = new Headers({ 
            'Content-Type' : 'application/json'
        });
        return new RequestOptions({ headers: headers });
    }
}