import { Injectable } from '@angular/core';
import { DataTest } from './data-test.model';
import {HttpClient} from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class DataTestService {

  constructor(private http:HttpClient) { }

  formData:DataTest = new DataTest();
  readonly baseUrl = `https://localhost:44309/api/Users`;
  list : DataTest[];
  postUser(){
    return this.http.post(this.baseUrl,this.formData)
  }
  refreshlist(){
    this.http.get(this.baseUrl)
    .toPromise()
    .then(res=>this.list=res as DataTest[])
  }
  deleteDataTest(id:number){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
