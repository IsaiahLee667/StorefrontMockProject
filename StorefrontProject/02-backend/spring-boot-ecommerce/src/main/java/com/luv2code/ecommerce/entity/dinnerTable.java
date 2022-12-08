package com.luv2code.ecommerce.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="dinner_table")
@Data
public class dinnerTable {
    @Id
    @Column(name = "table_id")
    private int tableNumber;




}
