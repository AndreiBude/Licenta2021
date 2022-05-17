import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListingService } from '../shared/data-test.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(public _route:ActivatedRoute,public service:ListingService) { }
  ngOnInit(): void {
    const key = this._route.snapshot.params['key'];
    this.service.getListingsByKey(key)
    
  }

}
