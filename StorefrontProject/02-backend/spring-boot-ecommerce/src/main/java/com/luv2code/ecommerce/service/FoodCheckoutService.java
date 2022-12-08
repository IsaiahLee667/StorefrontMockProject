package com.luv2code.ecommerce.service;

import com.luv2code.ecommerce.dto.FoodItemPurchase;
import com.luv2code.ecommerce.dto.FoodItemPurchaseResponse;

public interface FoodCheckoutService {

    FoodItemPurchaseResponse placeFoodOrder(FoodItemPurchase foodPurchase);

}
