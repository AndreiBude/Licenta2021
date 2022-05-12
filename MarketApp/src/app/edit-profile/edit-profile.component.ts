import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTest } from '../shared/data-test.model';
import {AccountService, DataTestService} from '../shared/data-test.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  imageUrl: string = '/assets/img/upload.png';
  fileToUpload: File = null as any;
  form:NgForm;
  deleted=false;
  constructor(public service:DataTestService,
     public datepipe:DatePipe,
     public _router:Router,
     private accountService:AccountService
     ) { }
  ngOnInit(): void {
    this.accountService.currentUser$.subscribe(user => {
      this.service.getUserById(user.userID);
      this.service.formData.imagePath=this.service.user.imagePath;
      this.service.formData.createdAt = user.createdAt;
    },error =>{
      console.log(error);
    })
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0) as File;

    //preview
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  delete(){
    this.accountService.currentUser$.subscribe(user => {
      this.service.deletePhoto(user.userID);
      //window.location.reload();
    },error =>{
      console.log(error);
    })
    
  }

  onSubmit(form:NgForm){
    
    let currentDateTime =this.datepipe.transform((new Date), 'yyyy-MM-ddThh:mm:ss')||'2010-12-12T00:00:00';
    this.service.formData.updatedAt=currentDateTime;
    this.service.putUser(this.fileToUpload).subscribe(
      res =>{
        localStorage.setItem('user', JSON.stringify(res));
        console.log("Success");
        this._router.navigate(['/MainPage']).then(()=>
          window.location.reload()
        );
      },
      err =>{
        window.alert("Something went wrong! Please try again later");
        console.log(err)
      }
    )
  }
}
