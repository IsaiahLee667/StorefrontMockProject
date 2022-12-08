package com.luv2code.ecommerce.dto;

import com.luv2code.ecommerce.entity.*;
import lombok.Data;
import java.util.Set;

@Data
public class FoodItemPurchase {

    private FoodOrder foodOrder;
    private Set<OrderItem> orderItems;


}

