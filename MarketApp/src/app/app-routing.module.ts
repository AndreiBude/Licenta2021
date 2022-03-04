import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MainComponent } from './MainPage/main/main.component';
import { DataTestComponent } from './data-test/data-test.component';

const routes: Routes = [
  {path: 'MainPage', component:MainComponent},
  {path:"DataTest", component:DataTestComponent}
];

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forRoot(routes)]
  ],
  exports: [ RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [MainComponent,DataTestComponent]