import { Component, OnInit } from '@angular/core';
import { Cat } from 'src/app/shared/data-test.model';
import { CategoryService } from 'src/app/shared/data-test.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(public service: CategoryService) { }

  ngOnInit(): void {
    this.service.getCats();
  }

}
