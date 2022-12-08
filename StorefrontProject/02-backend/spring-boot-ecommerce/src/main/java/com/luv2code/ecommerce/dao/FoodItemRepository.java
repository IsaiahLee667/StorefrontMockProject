package com.luv2code.ecommerce.dao;

import com.luv2code.ecommerce.entity.FoodItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin("http://localhost:4200")
public interface FoodItemRepository extends JpaRepository <FoodItem,Integer> {

}
