package com.luv2code.ecommerce.service;

import com.luv2code.ecommerce.dao.FoodOrderRepository;
import com.luv2code.ecommerce.dto.FoodItemPurchase;
import com.luv2code.ecommerce.dto.FoodItemPurchaseResponse;
import com.luv2code.ecommerce.entity.FoodOrder;
import com.luv2code.ecommerce.entity.OrderItem;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import java.util.Set;
import java.util.UUID;


@Service
public class FoodCheckoutServiceImpl implements FoodCheckoutService{

    private FoodOrderRepository foodOrderRepository;
    public FoodCheckoutServiceImpl(FoodOrderRepository foodOrderRepository){
        this.foodOrderRepository = foodOrderRepository;
    }
    @Override
    @Transactional
    public FoodItemPurchaseResponse placeFoodOrder(FoodItemPurchase foodPurchase) {
        System.out.println(foodPurchase);
        FoodOrder foodOrder = foodPurchase.getFoodOrder();
        String orderTrackingNumber = generateOrderTrackingNumber();
        foodOrder.setOrderTrackingNumber(orderTrackingNumber);

        Set<OrderItem> orderItemSet = foodPurchase.getOrderItems();
        orderItemSet.forEach(foodOrder::add);

        foodOrderRepository.save(foodOrder);



        return new FoodItemPurchaseResponse(orderTrackingNumber);
    }
    private String generateOrderTrackingNumber() {

        // generate a random UUID number (UUID version-4)
        // For details see: https://en.wikipedia.org/wiki/Universally_unique_identifier
        //
        return UUID.randomUUID().toString();
    }
}
