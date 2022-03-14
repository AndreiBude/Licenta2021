import { Injectable } from '@angular/core';
import { DataTest,Cat, Listing } from './data-test.model';
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
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private https:HttpClient) { }
  categories:Cat = new Cat();
  readonly categoryUrl = `https://localhost:44309/api/Categories`;
  cats : Cat[];
  getCats(){
    this.https.get(this.categoryUrl)
    .toPromise()
    .then(res=>this.cats=res as Cat[])
  }
}

@Injectable({
  providedIn:'root'
})
export class ListingService{
  constructor(private https:HttpClient){ }
  listings:Listing = new Listing();
  readonly listingUrl = 'https://localhost:44309/api/Listings/4';
  listing : Listing;
  getListing(){
    this.https.get(this.listingUrl)
    .toPromise()
    .then(res=>this.listing=res as Listing)
  }
}