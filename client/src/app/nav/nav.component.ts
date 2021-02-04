import { Observable } from 'rxjs/internal/Observable';
import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}
  currentUser$ = new Observable<User>();

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
  }

  login(){
  this.accountService.login(this.model).subscribe(response =>{
      console.log(response);
    }, error => {
      console.log(error)
    });
}


  logout(){
    this.accountService.logout();
  }
}
