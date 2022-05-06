import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTest } from '../shared/data-test.model';
import { AccountService, DataTestService, ListingService } from '../shared/data-test.service';

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
    private accountS:AccountService) { }

  imageUrl: string = '/assets/img/logo.png';
  
  ngOnInit(): void {
    this.populate();
  }
  item(id:number,user:number){
    this._router.navigate(['/Listing',id,user])
  }
  populate(){
    this._route.params.subscribe(routeParams => {
      this.listingsService.getListingsByUserId(routeParams.id);
      this.userService.getUserById(routeParams.id);
      });
  }
}
