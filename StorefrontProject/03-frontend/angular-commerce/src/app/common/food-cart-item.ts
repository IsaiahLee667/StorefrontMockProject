import { FoodItem } from "./food-item";

export class FoodCartItem {
    id: number;
    name: string;
    unitPrice:number;

    quantity: number;

    constructor(foodItem: FoodItem){
        this.id = foodItem.itemId;
        this.name = foodItem.itemName;
        this.unitPrice = foodItem.itemPrice;

        this.quantity=1;
    }
}
