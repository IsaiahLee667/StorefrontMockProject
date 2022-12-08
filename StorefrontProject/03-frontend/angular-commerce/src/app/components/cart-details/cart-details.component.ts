import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { FoodItemPurchase } from 'src/app/common/food-item-purchase';
import { FoodOrder} from 'src/app/common/food-order';
import { OrderItem } from 'src/app/common/order-item';
import { Orders } from 'src/app/common/orders';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit{

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;
  justPaid: boolean = false;

  constructor(private cartService: CartService , private checkoutService: CheckoutService
    , private router:Router){

  }


  ngOnInit(): void {
    this.listCartDetails();
  }

  listCartDetails(){
    //get a handle to th cart items
    this.cartItems = this.cartService.cartItems;

    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    this.cartService.computeCartTotals();
  }

  incrementQuantity(tempCartItem: CartItem){
    this.cartService.addToCart(tempCartItem)

  }

  decrementQuantity(theCartItem:CartItem){
    this.cartService.decrementQuantity(theCartItem);
  }

  remove(theCartItem: CartItem){
    this.cartService.remove(theCartItem);
  }



  onSubmit(){
    let foodOrder = new FoodOrder();
    foodOrder.totalPrice = this.totalPrice;
    foodOrder.totalQuantity = this.totalQuantity;

    //Get items within the cart
    const cartItems = this.cartService.cartItems;

    let orderItems: OrderItem[] = cartItems.map(tempCartItem => new OrderItem(tempCartItem));

    let purchase = new FoodItemPurchase();
    purchase.foodOrder = foodOrder;
    purchase.orderItems = orderItems;

    console.log(JSON.stringify(foodOrder));
    console.log(JSON.stringify(orderItems));

    this.checkoutService.placeFoodOrder(purchase).subscribe(
      {
        next: response =>{
          alert('Your order has been recieved')

          //reset card
          this.resetCart();
        },
        error: err =>{
          alert(`there is an error: ${err.message} + this camee from an error`)
        }
      }
    )



  }

  resetCart() {
    //reset card data
    this.cartService.cartItems = [];
    //reset form data
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    //go back to products
    this.router.navigateByUrl("/products")
  }

}
