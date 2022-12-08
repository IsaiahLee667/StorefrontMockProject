package com.luv2code.ecommerce.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "fooditem")
@Data
public class FoodItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_id")
    private int itemId;

    @Column(name = "item_name")
    private String itemName;
    @Column(name = "item_price")
    private double itemPrice;

    @Column(name = "item_desc")
    private String itemDescription;

//    @ManyToMany(mappedBy = "itemList")
//    List<FoodOrder> orderList = new ArrayList<>();

}
