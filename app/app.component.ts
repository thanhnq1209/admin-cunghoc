import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { PagerService, ConstantService, LocalStorageService, AuthService } from '../app/_services/index';
import { Subscription } from 'rxjs/Subscription';
import { fail } from 'assert';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
declare var jquery: any;
declare var $: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
    title = 'app';
    currentUrl = '';
    menus: any = [];
    accountLogged: any = {};
    isLogged: boolean = false;
    subscription: Subscription;

    constructor(private location: Location, private router: Router,
        private constantService: ConstantService, private http: Http,
        private storageService: LocalStorageService, private authService: AuthService,
        public toastr: ToastsManager, vcr: ViewContainerRef,
        private spinnerService: Ng4LoadingSpinnerService) {

        this.toastr.setRootViewContainerRef(vcr);
        this.subscription = this.storageService.watchStorage().subscribe(message => {
            this.init();
        });

    }

    private init() {
        var token = localStorage.getItem('access_token');
        if (token) {
            this.spinnerService.show();
            this.getInfoUser();
        }
        else {
            this.router.navigate(['/login']);
        }
    }

    ngOnInit() {
        this.init();
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }

    private getInfoUser() {
        this.authService.getProfile().subscribe(
            response => {
                this.accountLogged = response;
                this.isLogged = true;
                this.setPageActive();
                this.spinnerService.hide();
            }, error => {
                this.router.navigate(['/login']);
                console.log(error.json());
                this.toastr.error(error.json().Message);
                this.spinnerService.hide();
            }
        );
    }

    private logout() {
        this.storageService.logoutSuccess();
        this.isLogged = false;
        this.router.navigate(['/login']);
    }

    setPageActive() {
        this.menus = [{
            id: 'page-home',
            link: 'home',
            name: 'Home',
            icon: 'menu-icon glyphicon glyphicon-home',
            sub_menu: [],
            active: this.currentUrl == '' ? 'active' : ''
        }, {
            id: 'page-exam-questions',
            link: 'exam-questions',
            name: 'Exam Questions',
            icon: 'menu-icon glyphicon glyphicon-tasks',
            sub_menu: [],
            active: this.currentUrl == '/exam-questions' ? 'active' : ''
        }, {
            id: 'page-type-exam-question',
            link: 'type-exam-question',
            name: 'Type Exam',
            icon: 'menu-icon fa fa-th',
            sub_menu: [],
            active: this.currentUrl == '/type-exam-question' ? 'active' : ''
        }, {
            id: 'page-create-exam-questions',
            link: 'create-exam-questions',
            name: 'Create Exam Question',
            icon: 'menu-icon fa fa-th',
            sub_menu: [],
            active: this.currentUrl == '/create-exam-questions' ? 'active' : ''
        }, {
            id: 'page-lessions',
            link: 'lessions',
            name: 'List Lession',
            icon: 'menu-icon fa fa-th',
            sub_menu: [],
            active: this.currentUrl == '/lessions' ? 'active' : ''
        }, {
            id: 'page-type-lession',
            link: 'type-lession',
            name: 'Type Lession',
            icon: 'menu-icon fa fa-th',
            sub_menu: [],
            active: this.currentUrl == '/type-lession' ? 'active' : ''
        }, {
            id: 'page-create-lession',
            link: 'create-lession',
            name: 'Create Lession',
            icon: 'menu-icon fa fa-th',
            sub_menu: [],
            active: this.currentUrl == '/create-lession' ? 'active' : ''
        }, {
            id: 'page-create-practice-lession',
            link: 'create-practice-lession',
            name: 'Create Lession Practice',
            icon: 'menu-icon fa fa-th',
            sub_menu: [],
            active: this.currentUrl == '/create-practice-lession' ? 'active' : ''
        }];
    }

    slideBarClick() {
        var classContain = $('.sidebar-collapse').attr('class');
        if (classContain.indexOf('active') != -1) {
            $('.sidebar-collapse').removeClass("active");
            $('#sidebar').removeClass('menu-compact');
        } else {
            $('.sidebar-collapse').addClass("active");
            $('#sidebar').addClass('menu-compact');
        }
    }

    gotoPage(page: string) {
        this.router.navigateByUrl('/' + page);
        this.setNextPageActive(page);
    }

    setNextPageActive(page: string) {
        this.menus.forEach(element => {
            if (page == element.link) {
                $('#' + element.id).addClass('active');
            } else {
                $('#' + element.id).removeClass('active');
            }
        });
    }

}
