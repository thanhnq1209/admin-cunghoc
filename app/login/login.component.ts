import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { LocalStorageService } from '../_services/index';
import { AppSettings } from '../app.constant';
import { AuthService } from '../_services/index';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLogin: any = {};
  loading = false;
  returnUrl: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService, private http: Http,
    private storageService: LocalStorageService,
    public toastr: ToastsManager, vcr: ViewContainerRef,
    private spinnerService: Ng4LoadingSpinnerService) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    if (localStorage.getItem('access_token')) {
      this.getInfoUser();
    }
  }

  private login() {
    let url = AppSettings.API_ENDPOINT + 'Accounts/token';
    let body = "username=" + this.userLogin.username + "&password=" + this.userLogin.password + "&grant_type=password";
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    this.spinnerService.show();
    this.http.post(url, body, options).subscribe(
      response => {
        localStorage.setItem('access_token', response.json().access_token);
        localStorage.setItem('expires_in', response.json().expires_in);
        localStorage.setItem('token_type', response.json().token_type);
        this.getInfoUser();
      },
      error => {
        this.spinnerService.hide();
        console.log(error.json());
        this.toastr.error(error.json().error_description, error.json().error);
      }
    );
  }

  private getInfoUser() {
    var token = localStorage.getItem('access_token');
    if (token) {
      this.authService.getProfile().subscribe(
        response => {
          this.storageService.loginSuccess(response);
          this.router.navigate(['/home']);
          this.toastr.success('Login successfully!', 'Yeah!');
          this.spinnerService.hide();
        }, error => {
          this.spinnerService.hide();
          console.log(error.json());
        }
      );
    }
  }

}
