import { Component, OnInit } from '@angular/core';
import { ListingService } from '../shared/data-test.service';
import { Listing } from '../shared/data-test.model';
@Component({
  selector: 'app-procut-page',
  templateUrl: './procut-page.component.html',
  styleUrls: ['./procut-page.component.css']
})
export class ProductPageComponent implements OnInit {

  constructor(public service:ListingService) { }

  ngOnInit(): void {
    this.service.getListing();
  }

}
