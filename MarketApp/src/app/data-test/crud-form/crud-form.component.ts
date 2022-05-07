import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataTest } from 'src/app/shared/data-test.model';
import { DataTestService } from 'src/app/shared/data-test.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-crud-form',
  templateUrl: './crud-form.component.html',
  styles: [
  ]
})
export class CRUDFormComponent implements OnInit {
  
  constructor(public service:DataTestService,public datepipe: DatePipe) { }
  fileToUpload: File = null as any;
  ngOnInit(): void {
  }
  onSubmit(form:NgForm){
    
    let currentDateTime =this.datepipe.transform((new Date), 'yyyy-MM-ddThh:mm:ss')||'2010-12-12T00:00:00';
    this.service.formData.createdAt=currentDateTime;
    this.service.formData.updatedAt=currentDateTime;
    this.service.postUser(this.fileToUpload).subscribe(
      res =>{
        this.resetForm(form);
        console.log("Success");
        this.service.refreshlist();
      },
      err =>{
        console.log(this.service.formData);
      }
    )
  }
  resetForm(form:NgForm){
    form.form.reset();
    this.service.formData = new DataTest();
  }
}
