import { Injectable } from '@angular/core';
import { DataTest,Cat, Listing,UserReview} from './data-test.model';
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
  postUser(fileToUpload:File){
    const newFormData = new FormData();
      newFormData.append('firstName',this.formData.firstName.toString());
      newFormData.append('lastName',this.formData.lastName.toString());
      newFormData.append('email',this.formData.email.toString());
      if(fileToUpload)
      newFormData.append('imageFile',fileToUpload,fileToUpload.name);
      else
      newFormData.append('imagePath','default.jpg');
      newFormData.append('password',this.formData.password.toString());
      newFormData.append('createdAt',this.formData.createdAt.toString());
      newFormData.append('updatedAt',this.formData.updatedAt.toString());
    return this.https.post(this.baseUrl,newFormData)
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
  numarAnunturi:number;
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
  postLising(fileToUpload: File){
      const newFormData = new FormData();
      newFormData.append('userID',this.formData.userID.toString());
      newFormData.append('title',this.formData.title.toString());
      newFormData.append('price',this.formData.price.toString());
      newFormData.append('categoryID',this.formData.categoryID.toString());
      newFormData.append('description',this.formData.description.toString());
      newFormData.append('imageFile',fileToUpload,fileToUpload.name);
      newFormData.append('publishedAt',this.formData.publishedAt.toString());
      return this.https.post(this.listingUrl,newFormData)
  }
  getListingsByUserId(id:number){
    this.https.get(this.listingUrl+"/User/"+id)
    .toPromise()
    .then(res=>this.listingz=res as Listing[])
    .then(res=>this.numarAnunturi=res.length)
  }
  getListingsByCategory(id:number){
    this.https.get(this.listingUrl+"/Category/"+id)
    .toPromise()
    .then(res=>this.listingz=res as Listing[])
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
  getCurrentUser():number{
    let userID=0;
    let imagePath='';
    this.currentUser$.subscribe(user => {
      userID = user.userID;
      imagePath=user.imagePath;
    },error =>{
      console.log(error);
    })
    return userID;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  constructor(private https:HttpClient) { }
  review:UserReview = new UserReview();
  readonly reviewUrl = `https://localhost:44309/api/UserReviews`;
  reviews: UserReview[];
  getReviewsById(id:number){
    this.https.get(this.reviewUrl+"/UserId/"+id)
    .toPromise()
    .then(res=>this.reviews=res as UserReview[])
  }
}