import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@/_models';
import { UserService, AuthenticationService } from '@/_services';
import { HttpClient } from '@angular/common/http';

@Component({ templateUrl: 'auditor.component.html' })
export class AuditorComponent implements OnInit {
    searchTerm: string;
    page = 1;
    pageSize = 5;
    collectionSize: number;
    currentRate = 1;
    users: User[];
    allUsers: User[];

    currentUser: User;
    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private http: HttpClient
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit(): void {
        this.userService.getAll()
        .pipe(first())
        .subscribe((data) => {
             this.collectionSize = data.length;
            this.users = data;
            this.allUsers = this.users;});
          this.loadAllUsers();

      }

    deleteUser(id: number) {
        this.userService.delete(id)
            .pipe(first())
            .subscribe(() => this.loadAllUsers());
    }

    private loadAllUsers() {
        this.userService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
    }
}