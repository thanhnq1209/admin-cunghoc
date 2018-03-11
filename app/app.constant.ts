import { Http, Headers, RequestOptions, Response } from '@angular/http';
export class AppSettings {
    // public static API_ENDPOINT='http://localhost:17453/api/';
    public static API_ENDPOINT='https://elearningrunning.azurewebsites.net/api/';
    // public static API_ENDPOINT_IMAGE = 'http://localhost:17453';
    public static API_ENDPOINT_IMAGE = 'https://elearningrunning.azurewebsites.net';
    public static jwt() {
        let headers = new Headers({ 
            'Access-Control-Allow-Origin': '*',
            'Content-Type' : 'application/json',
            'authorization' : localStorage.token_type + ' ' + localStorage.access_token
        });
        return new RequestOptions({ headers: headers });
    }
}