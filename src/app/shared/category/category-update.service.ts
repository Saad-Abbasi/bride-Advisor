import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryUpdateService {

  constructor() { }

  getCategory(data:any){
    
    data.forEach(element => {
      console.log(element.category)
      if(element.category == 1){
       return  element.category = 'Food and Drink'
      }
      else if(element.category ==2) {
        return element.category = 'Celebrants and Officiants'
      }
      else if(element.category == 3) {
        return element.category = 'Dresses, Suits and Accessories'
      }
      else if(element.category == 4) {
        return element.category = 'Entertainment'
      }
      else if(element.category == 5) {
        return  element.category = 'Flowers'
      }
      else if(element.category == 6) {
        return element.category = 'Hair, Make-Up and Beauty'
      }
      else if(element.category == 7) {
        return element.category = 'Invitations and Stationery'
      }
      else if(element.category == 8) {
        return element.category = 'Jewellery'
      }
      else if(element.category == 9) {
        return element.category = 'Music'
      }
      else if(element.category == 10) {
        return element.category = 'Photography'
      }
      else if(element.category == 11) {
        return element.category = 'Cake Makers'
      }
      else if(element.category == 12) {
        return element.category = 'Transport'
      }
      else if(element.category == 13) {
        return element.category = 'Venues'
      }
      else if(element.category == 14) {
        return element.category = 'Wedding Planners'
      }
      else if(element.category == 15) {
        return element.category = 'Decorations and Hire'
      }
      else if(element.category == 16) {
        return element.category = 'Accommodation'
      }
      else if(element.category == 17) {
        return element.category = 'Videography'
      }
      else if(element.category == 18) {
        return element.category = 'Gifts and Favors'
      }
      else  {
        return element.category = 'Udefined'
      }
      
    });
  }
//Changing diect value 
updateCategory(category){
  if(category == 1){
    return  category = 'Food and Drink'
   }
   else if(category ==2) {
     return category = 'Celebrants and Officiants'
   }
   else if(category == 3) {
     return category = 'Dresses, Suits and Accessories'
   }
   else if(category == 4) {
     return category = 'Entertainment'
   }
   else if(category == 5) {
     return  category = 'Flowers'
   }
   else if(category == 6) {
     return category = 'Hair, Make-Up and Beauty'
   }
   else if(category == 7) {
     return category = 'Invitations and Stationery'
   }
   else if(category == 8) {
     return category = 'Jewellery'
   }
   else if(category == 9) {
     return category = 'Music'
   }
   else if(category == 10) {
     return category = 'Photography'
   }
   else if(category == 11) {
     return category = 'Cake Makers'
   }
   else if(category == 12) {
     return category = 'Transport'
   }
   else if(category == 13) {
     return category = 'Venues'
   }
   else if(category == 14) {
     return category = 'Wedding Planners'
   }
   else if(category == 15) {
     return category = 'Decorations and Hire'
   }
   else if(category == 16) {
     return category = 'Accommodation'
   }
   else if(category == 17) {
     return category = 'Videography'
   }
   else if(category == 18) {
     return category = 'Gifts and Favors'
   }
   else  {
     return category = 'Udefined'
   }
}

}
