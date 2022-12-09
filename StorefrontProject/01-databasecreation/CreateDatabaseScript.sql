-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema full-stack-ecommerce
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema full-stack-ecommerce
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `full-stack-ecommerce` DEFAULT CHARACTER SET utf8mb3 ;
USE `full-stack-ecommerce` ;

-- -----------------------------------------------------
-- Table `full-stack-ecommerce`.`address`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `full-stack-ecommerce`.`address` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `city` VARCHAR(255) NULL DEFAULT NULL,
  `country` VARCHAR(255) NULL DEFAULT NULL,
  `state` VARCHAR(255) NULL DEFAULT NULL,
  `street` VARCHAR(255) NULL DEFAULT NULL,
  `zip_code` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 13
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `full-stack-ecommerce`.`country`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `full-stack-ecommerce`.`country` (
  `id` SMALLINT(5) UNSIGNED NOT NULL,
  `code` VARCHAR(2) NULL DEFAULT NULL,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `full-stack-ecommerce`.`customer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `full-stack-ecommerce`.`customer` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(255) NULL DEFAULT NULL,
  `last_name` VARCHAR(255) NULL DEFAULT NULL,
  `email` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `full-stack-ecommerce`.`dinner_table`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `full-stack-ecommerce`.`dinner_table` (
  `table_id` INT(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`table_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `full-stack-ecommerce`.`fooditem`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `full-stack-ecommerce`.`fooditem` (
  `item_id` INT(11) NOT NULL AUTO_INCREMENT,
  `item_desc` VARCHAR(45) NULL DEFAULT NULL,
  `item_name` VARCHAR(45) NULL DEFAULT NULL,
  `item_price` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`item_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `full-stack-ecommerce`.`foodorder`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `full-stack-ecommerce`.`foodorder` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `order_tracking_number` VARCHAR(255) NULL DEFAULT NULL,
  `total_price` DECIMAL(19,2) NULL DEFAULT NULL,
  `total_quantity` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `full-stack-ecommerce`.`orders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `full-stack-ecommerce`.`orders` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `order_tracking_number` VARCHAR(255) NULL DEFAULT NULL,
  `total_price` DECIMAL(19,2) NULL DEFAULT NULL,
  `total_quantity` INT(11) NULL DEFAULT NULL,
  `billing_address_id` BIGINT(20) NULL DEFAULT NULL,
  `customer_id` BIGINT(20) NULL DEFAULT NULL,
  `shipping_address_id` BIGINT(20) NULL DEFAULT NULL,
  `status` VARCHAR(128) NULL DEFAULT NULL,
  `date_created` DATETIME(6) NULL DEFAULT NULL,
  `last_updated` DATETIME(6) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `UK_billing_address_id` (`billing_address_id` ASC) VISIBLE,
  UNIQUE INDEX `UK_shipping_address_id` (`shipping_address_id` ASC) VISIBLE,
  INDEX `K_customer_id` (`customer_id` ASC) VISIBLE,
  CONSTRAINT `FK_billing_address_id`
    FOREIGN KEY (`billing_address_id`)
    REFERENCES `full-stack-ecommerce`.`address` (`id`),
  CONSTRAINT `FK_customer_id`
    FOREIGN KEY (`customer_id`)
    REFERENCES `full-stack-ecommerce`.`customer` (`id`),
  CONSTRAINT `FK_shipping_address_id`
    FOREIGN KEY (`shipping_address_id`)
    REFERENCES `full-stack-ecommerce`.`address` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `full-stack-ecommerce`.`product_category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `full-stack-ecommerce`.`product_category` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `category_name` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `full-stack-ecommerce`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `full-stack-ecommerce`.`product` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `sku` VARCHAR(255) NULL DEFAULT NULL,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `unit_price` DECIMAL(13,2) NULL DEFAULT NULL,
  `image_url` VARCHAR(255) NULL DEFAULT NULL,
  `active` BIT(1) NULL DEFAULT b'1',
  `units_in_stock` INT(11) NULL DEFAULT NULL,
  `date_created` DATETIME(6) NULL DEFAULT NULL,
  `last_updated` DATETIME(6) NULL DEFAULT NULL,
  `category_id` BIGINT(20) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_category` (`category_id` ASC) VISIBLE,
  CONSTRAINT `fk_category`
    FOREIGN KEY (`category_id`)
    REFERENCES `full-stack-ecommerce`.`product_category` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 101
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `full-stack-ecommerce`.`order_item`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `full-stack-ecommerce`.`order_item` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `image_url` VARCHAR(255) NULL DEFAULT NULL,
  `quantity` INT(11) NULL DEFAULT NULL,
  `unit_price` DECIMAL(19,2) NULL DEFAULT NULL,
  `order_id` BIGINT(20) NULL DEFAULT NULL,
  `product_id` BIGINT(20) NULL DEFAULT NULL,
  `food_order_id` BIGINT(20) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `K_order_id` (`order_id` ASC) VISIBLE,
  INDEX `FK_product_id` (`product_id` ASC) VISIBLE,
  CONSTRAINT `FK_order_id`
    FOREIGN KEY (`order_id`)
    REFERENCES `full-stack-ecommerce`.`orders` (`id`),
  CONSTRAINT `FK_product_id`
    FOREIGN KEY (`product_id`)
    REFERENCES `full-stack-ecommerce`.`product` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 18
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `full-stack-ecommerce`.`state`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `full-stack-ecommerce`.`state` (
  `id` SMALLINT(5) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `country_id` SMALLINT(5) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_country` (`country_id` ASC) VISIBLE,
  CONSTRAINT `fk_country`
    FOREIGN KEY (`country_id`)
    REFERENCES `full-stack-ecommerce`.`country` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 224
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
