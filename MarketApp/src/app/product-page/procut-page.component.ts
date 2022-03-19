import { Component, OnInit } from '@angular/core';
import { DataTestService, ListingService } from '../shared/data-test.service';
import { DataTest, Listing } from '../shared/data-test.model';
import { ActivatedRoute } from '@angular/router';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';
@Component({
  selector: 'app-procut-page',
  templateUrl: './procut-page.component.html',
  styleUrls: ['./procut-page.component.css']
})
export class ProductPageComponent implements OnInit {

  constructor(public service:ListingService,
    public _route:ActivatedRoute,
    public username:DataTestService
    ) { }

  ngOnInit(): void {
    const id = +this._route.snapshot.params['id'];
    this.service.getListing(id);
  }
  getUser(){
    this.username.getUserById(this.service.listing.userID);
  }
}
