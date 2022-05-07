export class DataTest {
    userID:number=0;
    firstName:string='';
    lastName:string='';
    imagePath:string='';
    imageSource:string='';
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
    price:number;
    categoryID:Cat;
    description:string='';
    publishedAt:string='';
    imageSource:string='';
}
export class User {
    username:string='';
}
export class UserReview{
    reviewID:number=0;
    userID:number=0;
    text:string='';
    rating:number=0;
    createdAt:string=''
}