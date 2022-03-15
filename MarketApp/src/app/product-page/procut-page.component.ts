import { Component, OnInit } from '@angular/core';
import { ListingService } from '../shared/data-test.service';
import { Listing } from '../shared/data-test.model';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-procut-page',
  templateUrl: './procut-page.component.html',
  styleUrls: ['./procut-page.component.css']
})
export class ProductPageComponent implements OnInit {

  constructor(public service:ListingService,
    public _route:ActivatedRoute
    ) { }

  ngOnInit(): void {
    const id = +this._route.snapshot.params['id'];
    this.service.getListing(id);
  }

}
