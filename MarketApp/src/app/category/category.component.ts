import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListingService } from '../shared/data-test.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(public _route:ActivatedRoute,public service:ListingService ) { }

  ngOnInit(): void {
    const id = +this._route.snapshot.params['id'];
    this.service.getListingsByCategory(id);
  }

}
