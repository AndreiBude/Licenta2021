import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService, CategoryService, ListingService } from '../shared/data-test.service';
@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.css']
})
export class AddListingComponent implements OnInit {
  imageUrl: string = '/assets/img/upload.png';
  fileToUpload: File = null as any;
  constructor(public service: ListingService,
    public datepipe: DatePipe,
    public _router: Router,
    public serviceC: CategoryService,
    public serviceU: AccountService
  ) { }
  existing: boolean = false;
  ngOnInit(): void {
    this.serviceC.getCats();
    this.verifyUser();
  }
  onSubmit() {
    this.service.formData.userID = this.serviceU.getCurrentUser();
    let currentDateTime = this.datepipe.transform((new Date), 'yyyy-MM-ddThh:mm:ss') || '2010-12-12T00:00:00';
    this.service.formData.publishedAt= currentDateTime;
    console.log(this.service.formData);
    this.service.postLising().subscribe(
      res => {
        console.log("Success");
      },
      err => {
        console.log(err);
      }
    )
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
  verifyUser(){
    this.serviceU.currentUser$.subscribe(user => {
      this.existing= !!user;
      if(!this.existing)
      this._router.navigate(['/Login']);
    },error =>{
      console.log(error);
    })
  }
}
