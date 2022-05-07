import { Component, OnInit } from '@angular/core';
import { AccountService, DataTestService, ListingService, ReviewService } from '../shared/data-test.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-procut-page',
  templateUrl: './procut-page.component.html',
  styleUrls: ['./procut-page.component.css']
})
export class ProductPageComponent implements OnInit {
  
  constructor(public service:ListingService,
    public _route:ActivatedRoute,
    public username:DataTestService,
    private _router:Router,
    public review:ReviewService,
    public accountService:AccountService
    ) { }
    sameUser:boolean;
  ngOnInit(): void {
    const id = +this._route.snapshot.params['id'];
    this.service.getListing(id);
    const userID = +this._route.snapshot.params['userid'];
    this.username.getUserById(userID);
    this.review.getReviewsById(userID);
    this.accountService.currentUser$.subscribe(user => {
      this.sameUser=(user.userID==userID);
    },error =>{
      console.log(error);
    })
  }
  getUser(){
    this.username.getUserById(this.service.listing.userID);
  }
  UserListings(id:number){
    this._router.navigate(['/UserListings',id]);
  }
}
