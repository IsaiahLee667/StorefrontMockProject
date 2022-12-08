package com.luv2code.ecommerce.controller;

import com.luv2code.ecommerce.dto.FoodItemPurchase;
import com.luv2code.ecommerce.dto.FoodItemPurchaseResponse;
import com.luv2code.ecommerce.dto.PurchaseResponse;
import com.luv2code.ecommerce.service.FoodCheckoutService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/checkout")
public class FoodCheckoutController {
    private FoodCheckoutService foodCheckoutService;

    public FoodCheckoutController(FoodCheckoutService foodCheckoutService){
        this.foodCheckoutService = foodCheckoutService;
    }

    @PostMapping("/purchaseFood")
    public FoodItemPurchaseResponse placeFoodOrder(@RequestBody FoodItemPurchase foodItemPurchase) {

        FoodItemPurchaseResponse foodResponse = foodCheckoutService.placeFoodOrder(foodItemPurchase);

        return foodResponse;
    }
}
