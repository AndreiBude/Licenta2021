import { Injectable } from '@angular/core';
import { DataTest,Cat, Listing} from './data-test.model';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTestService {

  constructor(private https:HttpClient) { }

  formData:DataTest = new DataTest();
  
  readonly baseUrl = `https://localhost:44309/api/Users`;
 
  list : DataTest[];
  user : DataTest;
  postUser(){
    return this.https.post(this.baseUrl,this.formData)
  }
  refreshlist(){
    this.https.get(this.baseUrl)
    .toPromise()
    .then(res=>this.list=res as DataTest[])
  }
  deleteDataTest(id:number){
    return this.https.delete(`${this.baseUrl}/${id}`);
  }
  getUserById(id:number){
    this.https.get(`${this.baseUrl}/${id}`)
    .toPromise()
    .then(res=>this.user=res as DataTest)
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
  formData:Listing = new Listing();
  readonly listingUrl = 'https://localhost:44309/api/Listings';
  idu:number = 0;
  listing : Listing;
  listingz : Listing[];
  getListing(id:number){
    this.https.get(this.listingUrl+"/"+id)
    .toPromise()
    .then(res=>this.listing=res as Listing)
  }
  getListings(){
    this.https.get(this.listingUrl)
    .toPromise()
    .then(res=>this.listingz=res as Listing[])
  }
  postLising(){
      return this.https.post(this.listingUrl,this.formData)
  }
}

@Injectable({
  providedIn:'root'
})
export class AccountService{
  constructor(private https:HttpClient){ }
  readonly baseUrl = 'https://localhost:44309/api/Users';
  private currentUserSource= new ReplaySubject<DataTest>(1);
  currentUser$=this.currentUserSource.asObservable();
  currentId:number;
  login(model:any){
    return this.https.post<DataTest>(this.baseUrl+'/Login',model).pipe(
      map((response : DataTest) => {
        const user = response;
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    ) 
  }
  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next();
  }
  setUser(user:DataTest){
    this.currentUserSource.next(user);
  }
}