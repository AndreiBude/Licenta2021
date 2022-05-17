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

  putUser(fileToUpload:File){
    const newFormData = new FormData();
      newFormData.append('userID',this.user.userID.toString());
      newFormData.append('firstName',this.user.firstName.toString());
      newFormData.append('lastName',this.user.lastName.toString());
      newFormData.append('email',this.user.email.toString());
      newFormData.append('imagePath',this.user.imagePath.toString());
      if(fileToUpload)
      newFormData.append('imageFile',fileToUpload,fileToUpload.name);
      if(!this.formData.password)
      newFormData.append('password',this.user.password.toString());
      else
      newFormData.append('password',this.formData.password.toString());
      newFormData.append('createdAt',this.user.createdAt.toString());
      newFormData.append('updatedAt',this.formData.updatedAt.toString());
    return this.https.put(`${this.baseUrl}/${this.user.userID}`,newFormData)
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
  deletePhoto(id:number){
    return this.https.delete(`${this.baseUrl}/Photo/${id}`);
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
  empty=false;
  getListing(id:number){
    this.https.get(this.listingUrl+"/"+id)
    .toPromise()
    .then(res=>this.listing=res as Listing)
  }
  getListings(){
    this.https.get(this.listingUrl)
    .toPromise()
    .then(res=>{this.listingz=res as Listing[];
    this.listingz.reverse()})
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
    .then(res=>{this.numarAnunturi=res.length;
      this.listingz.reverse()})
  }
  getListingsByCategory(id:number){
    this.https.get(this.listingUrl+"/Category/"+id)
    .toPromise()
    .then(res=>{this.listingz=res as Listing[];
    this.listingz.reverse();})
  }
  getListingsByKey(key:string){
    return this.https.get(`${this.listingUrl}/Search/${key}`).subscribe(
      res=>{
        this.listingz = res as Listing[];
        if(this.listingz.length == 0)
        this.empty=true;
        else
        this.empty=false;
      }
    );
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
  rating=0;
  noOfRatings=0;
  finalRating:number;
  readonly reviewUrl = `https://localhost:44309/api/UserReviews`;
  reviews: UserReview[];
  getReviewsById(id:number){
    this.https.get(this.reviewUrl+"/UserId/"+id)
    .toPromise()
    .then(res=>this.reviews=res as UserReview[])
    .then(res=>{res.forEach(i=>{this.rating +=i.rating;
    this.noOfRatings++;
    console.log(this.rating);
    });
    this.finalRating=this.rating/this.noOfRatings;
    this.finalRating= Math.round(this.finalRating * 10) / 10
  })
  }
  
}