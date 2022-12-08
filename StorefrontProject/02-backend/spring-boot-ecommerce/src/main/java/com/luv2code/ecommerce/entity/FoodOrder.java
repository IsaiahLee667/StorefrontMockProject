package com.luv2code.ecommerce.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "foodorder")
@Getter
@Setter
public class FoodOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

//    @ManyToOne()
//    //Name of Foreign key column
//    @JoinColumn(name = "tables_id")
//    //Name of Table itself you are connecting/linking too
//    private dinnerTable dinnerTable;
    @Column(name="order_tracking_number")
    private String orderTrackingNumber;

    @Column(name="total_quantity")
    private int totalQuantity;

    @Column(name="total_price")
    private BigDecimal totalPrice;


    @OneToMany(cascade = CascadeType.ALL, mappedBy = "foodOrder")
    private Set<OrderItem> orderItems = new HashSet<>();

    public void add(OrderItem item) {

        if (item != null) {
            if (orderItems == null) {
                orderItems = new HashSet<>();
            }

            orderItems.add(item);
            item.setFoodOrder(this);
        }
    }





}
