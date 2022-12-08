import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FoodItemPurchase } from '../common/food-item-purchase';
import { Purchase } from '../common/purchase';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private purchaseUrl = 'http://localhost:8080/api/checkout/purchase'
  private purchaseFoodUrl = 'http://localhost:8080/api/checkout/purchaseFood';

  constructor(private httpClient: HttpClient) { 

  }

  placeOrder(purchase: Purchase):Observable<any>{
    return this.httpClient.post<Purchase>(this.purchaseUrl, purchase);
  }
  placeFoodOrder(purchase: FoodItemPurchase):Observable<any>{
    return this.httpClient.post<Purchase>(this.purchaseFoodUrl, purchase);
  }
}
