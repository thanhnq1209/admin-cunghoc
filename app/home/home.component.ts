import { Component, OnInit } from '@angular/core';


@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {

    constructor() {

    }

    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(id: number) {
    }

    private loadAllUsers() {
    }
}