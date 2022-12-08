import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {map} from 'rxjs'
import { FoodItem } from '../common/food-item';

@Injectable({
  providedIn: 'root'
})
export class FoodItemService {
  private baseFoodUrl = 'http://localhost:8080/api/foodItems';
  constructor(private httpClient: HttpClient) { }


  getFoodList(): Observable<FoodItem[]>
  {
    return this.httpClient.get<GetResponse>(this.baseFoodUrl).pipe(
      map(response => response._embedded.foodItems)
    );
  }


}
interface GetResponse{
  _embedded:{
    foodItems: FoodItem[];
  }
}
