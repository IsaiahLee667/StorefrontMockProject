import { Component, OnInit } from '@angular/core';
import { FoodItemService } from 'src/app/services/food-item.service';
import { FoodItem } from 'src/app/common/food-item';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent implements OnInit {
  foodItems: FoodItem[] = [];
  toDisplay = true;
  constructor(private foodItemService: FoodItemService){

  }

  

  ngOnInit(): void {
    this.listFoodItems();
    this.toDisplay = false;
    
  }
listFoodItems(){
  this.foodItemService.getFoodList().subscribe(
    data => {
      this.foodItems = data;
    })
}

toggleFood() {
  this.toDisplay = !this.toDisplay;
}


}
