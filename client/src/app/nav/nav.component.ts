import { Observable } from 'rxjs/internal/Observable';
import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}
  currentUser$ = new Observable<User>();

  constructor(private accountService: AccountService, private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
  }

  login(){
  this.accountService.login(this.model).subscribe(response =>{
    this.router.navigateByUrl('/members')
    }, error => {
      this.toastr.error(error.error);
    });
}


  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/')
  }
}
