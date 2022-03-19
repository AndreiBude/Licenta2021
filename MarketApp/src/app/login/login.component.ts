import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../shared/data-test.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private accountService:AccountService, public _router:Router) { }
  loginData:any = {};
  wrong:boolean;
  ngOnInit(): void {
  }

  onSubmit(){
    this.accountService.login(this.loginData).subscribe(res => {
      console.log(res);
      this._router.navigate(['/MainPage']);
    },error =>{
      console.log(error);
      this.wrong=true;
      console.log(this.wrong);
    }); 
  }

 
}
