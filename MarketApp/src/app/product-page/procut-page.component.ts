import { Component, OnInit } from '@angular/core';
import { DataTestService, ListingService, ReviewService } from '../shared/data-test.service';
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
    public review:ReviewService
    ) { }

  ngOnInit(): void {
    const id = +this._route.snapshot.params['id'];
    this.service.getListing(id);
    const userID = +this._route.snapshot.params['userid'];
    this.username.getUserById(userID);
    this.review.getReviewsById(userID);
  }
  getUser(){
    this.username.getUserById(this.service.listing.userID);
  }
  UserListings(id:number){
    this._router.navigate(['/UserListings',id]);
  }
}
