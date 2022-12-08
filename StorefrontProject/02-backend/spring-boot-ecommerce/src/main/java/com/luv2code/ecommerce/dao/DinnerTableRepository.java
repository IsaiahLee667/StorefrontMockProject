package com.luv2code.ecommerce.dao;

import com.luv2code.ecommerce.entity.dinnerTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin("*")
public interface DinnerTableRepository extends JpaRepository<dinnerTable, Integer> {

}
