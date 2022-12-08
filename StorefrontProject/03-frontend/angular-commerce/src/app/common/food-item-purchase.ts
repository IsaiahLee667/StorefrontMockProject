import { FoodOrder } from "./food-order";
import { OrderItem } from "./order-item";
import { Orders } from "./orders";

export class FoodItemPurchase {
    foodOrder: FoodOrder;
    orderItems: OrderItem[];
}
