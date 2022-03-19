export class DataTest {
    userID:number=0;
    firstName:string='';
    lastName:string='';
    email:string='';
    password:string='';
    createdAt:string='';
    updatedAt:string='';
}
export class Cat{
    categoryID:number=0;
    categoryName:string='';
    listings:string='';
}
export class Listing {
    listingID:number=0;
    userID:number=0;
    title:string='';
    price:number=0;
    categoryID:Cat;
    description:string='';
    publishedAt:string='';
}
export class User {
    username:string='';
}