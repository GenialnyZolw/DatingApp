import { AccountService } from './_services/account.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'client';
  users: any;

  constructor(private http: HttpClient, private accountService: AccountService){
  }

  ngOnInit(): void {
   this.getUsers();
   this.setCurrentUser();
  }

  setCurrentUser(){
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
  }


  getUsers(){
    this.http.get("https://localhost:44355/api/users").subscribe(response => {
      response = this.users
    }, error =>{
      console.log(error)
    })
  }


}
