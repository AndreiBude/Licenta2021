import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTestService } from '../shared/data-test.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public service:DataTestService,
     public datepipe:DatePipe,
     public _router:Router
     ) { }
    existing:boolean = false;
  ngOnInit(): void {
  }
  onSubmit(form:NgForm){
    
    let currentDateTime =this.datepipe.transform((new Date), 'yyyy-MM-ddThh:mm:ss')||'2010-12-12T00:00:00';
    this.service.formData.createdAt=currentDateTime;
    this.service.formData.updatedAt=currentDateTime;
    this.service.postUser().subscribe(
      res =>{
        console.log("Success");
        this._router.navigate(['/Login']);
      },
      err =>{
        if(err.error="Email already existing")
        this.existing=true;
        else window.alert("Something went wrong! Please try again later");
      }
    )
  }
}
