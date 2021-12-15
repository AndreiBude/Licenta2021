import { Component, OnInit } from '@angular/core';
import { DataTest } from '../shared/data-test.model';
import { DataTestService } from '../shared/data-test.service';
import { DatePipe } from "@angular/common";
@Component({
  selector: 'app-data-test',
  templateUrl: './data-test.component.html',
  styles: [
  ]
})
export class DataTestComponent implements OnInit {

  constructor(public service: DataTestService) { }

  ngOnInit(): void {
    this.service.refreshlist();
  }
  populateForm(selectedRecord: DataTest){
    this.service.formData = Object.assign({},selectedRecord);
  }
  onDelete(id:number){
    if(confirm('Are you sure you wanna delete the record?')){
    this.service.deleteDataTest(id)
      .subscribe(
        res => {
          this.service.refreshlist();
          console.log("Deletede successfully")
        },
        err => {console.log(err)}
      )
  }}
}
