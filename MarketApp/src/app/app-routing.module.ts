import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MainComponent } from './MainPage/main/main.component';
import { DataTestComponent } from './data-test/data-test.component';
import { ProductPageComponent } from './product-page/procut-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddListingComponent } from './add-listing/add-listing.component';
import { UserListingsComponent } from './user-listings/user-listings.component';
import { CategoryComponent } from './category/category.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {path:'MainPage', component:MainComponent},
  {path:'DataTest', component:DataTestComponent},
  {path:'Listing/:id/:userid',component:ProductPageComponent},
  {path:'',   redirectTo: 'MainPage', pathMatch: 'full' },
  {path:'Login',component:LoginComponent},
  {path:'Register',component:RegisterComponent},
  {path:'AddListing',component:AddListingComponent},
  {path:'UserListings/:id',component:UserListingsComponent},
  {path:'Category/:id',component:CategoryComponent},
  {path:'EditProfile',component:EditProfileComponent},
  {path:'Search/:key',component:SearchComponent}
];

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forRoot(routes,{scrollPositionRestoration:'enabled'})]
  ],
  exports: [ RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [MainComponent,DataTestComponent]