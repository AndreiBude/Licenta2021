import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cat } from 'src/app/shared/data-test.model';
import { CategoryService } from 'src/app/shared/data-test.service';
import { ListingService } from 'src/app/shared/data-test.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(public serviceC: CategoryService, 
    public serviceL:ListingService,
    public _router:Router
    ) { }

  ngOnInit(): void {
    this.serviceC.getCats();
    this.serviceL.getListings();
  }
  item(id:number){
    this._router.navigate(['/Listing',id])
  }
}
