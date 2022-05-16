import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTest } from '../shared/data-test.model';
import { AccountService, DataTestService, ListingService, ReviewService } from '../shared/data-test.service';

@Component({
  selector: 'app-user-listings',
  templateUrl: './user-listings.component.html',
  styleUrls: ['./user-listings.component.css']
})
export class UserListingsComponent implements OnInit {

  constructor(private accountService:AccountService,
    public listingsService:ListingService,
    private _route:ActivatedRoute,
    public userService:DataTestService,
    private _router:Router,
    private accountS:AccountService,
    public reviewService:ReviewService) { }
  imageUrl: string = '/assets/img/logo.png';
  profilePic:string;
  currentUserId:number;
  admin:boolean;
  ngOnInit(): void {
    const id = +this._route.snapshot.params['id'];
    this.populate(id);
    
  }
  item(id:number,user:number){
    this._router.navigate(['/Listing',id,user])
  }
  populate(id:number){
      this.listingsService.getListingsByUserId(id);
      this.userService.getUserById(id);
      this.reviewService.getReviewsById(id);
      this.accountService.currentUser$.subscribe(user => {
        this.currentUserId=user.userID;
        if(id==this.currentUserId)
        this.admin=true;
      },error =>{
        console.log(error);
      })
      this.profilePic = this.userService.user.imageSource;
  }
  deleteProfile(id:number){
    this.userService.deleteDataTest(id).subscribe(
      ()=>{
    this.accountService.logout();
    this._router.navigate(['/MainPage']);})
  }
  }

