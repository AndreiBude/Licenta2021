import { Component, OnInit } from '@angular/core';
import { AccountService, ListingService } from '../shared/data-test.service';

@Component({
  selector: 'app-user-listings',
  templateUrl: './user-listings.component.html',
  styleUrls: ['./user-listings.component.css']
})
export class UserListingsComponent implements OnInit {

  constructor(private accountService:AccountService,public listingsService:ListingService) { }
  userID:number;
  ngOnInit(): void {
    this.accountService.currentUser$.subscribe(user => {
      this.listingsService.getListingsByUserId(user.userID);
      console.log(user.userID);
    },error =>{
      console.log(error);
    })
  }

}
