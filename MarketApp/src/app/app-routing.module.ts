import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MainComponent } from './MainPage/main/main.component';
import { DataTestComponent } from './data-test/data-test.component';
import { ProductPageComponent } from './product-page/procut-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path:'MainPage', component:MainComponent},
  {path:'DataTest', component:DataTestComponent},
  {path:'Listing/:id',component:ProductPageComponent},
  {path:'',   redirectTo: 'MainPage', pathMatch: 'full' },
  {path:'Login',component:LoginComponent},
  {path:'Register',component:RegisterComponent}
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