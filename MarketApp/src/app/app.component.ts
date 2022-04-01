import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataTest } from './shared/data-test.model';
import { AccountService } from './shared/data-test.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'MarketApp';
  constructor(private accountService: AccountService, private _router:Router) { }
  current_user:DataTest;
  loggedIn:boolean;
  ngOnInit(): void {
    this.setCurrentUser();
    this.getCurrentUser();
  }
  logout(){
    this.accountService.logout();
  }
  setCurrentUser(){
    const user: DataTest = JSON.parse(localStorage.getItem('user')!);
    this.accountService.setUser(user);
  }
  getCurrentUser(){
    this.accountService.currentUser$.subscribe(user => {
      this.loggedIn= !!user;
      console.log("logat?" + this.loggedIn);
    },error =>{
      console.log(error);
    })
  }
  myListings(){
    this.accountService.currentUser$.subscribe(user => {
      this.loggedIn= !!user;
      if(this.loggedIn)
      this._router.navigate(['/UserListings',user.userID])
      else
      this._router.navigate(['/Login']);
    },error =>{
      console.log(error);
    })
  }
}
