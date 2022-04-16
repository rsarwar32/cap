-- CreateTable
CREATE TABLE `c_order` (
    `c_order_id` INTEGER NOT NULL,
    `c_order_date` DATE NOT NULL,
    `c_order_paid` TINYINT NOT NULL,
    `customer_id` INTEGER NOT NULL,
    `review_id` INTEGER NULL,
    `c_order_payment_method` VARCHAR(45) NOT NULL,
    `c_order_ship` TINYINT NOT NULL,
    `c_order_ship_status` TINYINT NULL,
    `c_order_ship_cost` FLOAT NULL,
    `c_order_subtotal` FLOAT NULL,
    `c_order_tax` FLOAT NULL,
    `c_order_total` FLOAT NULL,

    INDEX `customer_id`(`customer_id`),
    INDEX `review_id`(`review_id`),
    PRIMARY KEY (`c_order_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `c_order_line_item` (
    `c_order_id` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,
    `c_oli_item` INTEGER NOT NULL,
    `c_oli_count` INTEGER NOT NULL,
    `c_oli_discount` FLOAT NOT NULL,

    INDEX `product_id`(`product_id`),
    PRIMARY KEY (`c_order_id`, `product_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customer` (
    `customer_id` INTEGER NOT NULL,
    `customer_f_name` VARCHAR(45) NOT NULL,
    `customer_l_name` VARCHAR(45) NOT NULL,
    `customer_ship_address` VARCHAR(45) NULL,
    `customer_ship_address_two` VARCHAR(45) NULL,
    `customer_ship_city` VARCHAR(45) NULL,
    `customer_ship_state` CHAR(2) NULL,
    `customer_ship_zip` INTEGER NULL,
    `customer_bill_address` VARCHAR(45) NOT NULL,
    `customer_bill_address_two` VARCHAR(45) NOT NULL,
    `customer_bill_city` VARCHAR(45) NOT NULL,
    `customer_bill_state` CHAR(2) NOT NULL,
    `customer_bill_zip` INTEGER NOT NULL,
    `customer_email` VARCHAR(45) NOT NULL,
    `customer_point_total` INTEGER NOT NULL,

    PRIMARY KEY (`customer_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `event` (
    `event_id` INTEGER NOT NULL,
    `location_id` INTEGER NOT NULL,
    `event_name` VARCHAR(45) NOT NULL,
    `event_desc` VARCHAR(255) NOT NULL,

    INDEX `location_id`(`location_id`),
    PRIMARY KEY (`event_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `location` (
    `location_id` INTEGER NOT NULL,
    `location_name` VARCHAR(45) NOT NULL,
    `location_address` VARCHAR(45) NOT NULL,
    `location_address_two` VARCHAR(45) NULL,
    `location_city` VARCHAR(45) NOT NULL,
    `location_state` CHAR(2) NOT NULL,
    `location_zip` INTEGER NOT NULL,

    PRIMARY KEY (`location_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `material` (
    `material_id` INTEGER NOT NULL,
    `material_name` VARCHAR(255) NOT NULL,
    `material_desc` VARCHAR(255) NOT NULL,
    `material_cost` FLOAT NOT NULL,

    PRIMARY KEY (`material_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product` (
    `product_id` INTEGER NOT NULL,
    `product_category` INTEGER NOT NULL,
    `product_name` VARCHAR(250) NOT NULL,
    `product_desc` TEXT NOT NULL,
    `product_cost` FLOAT NOT NULL,

    PRIMARY KEY (`product_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_category` (
    `prod_cat_id` INTEGER NOT NULL,
    `prod_cat_name` VARCHAR(250) NOT NULL,

    PRIMARY KEY (`prod_cat_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `review` (
    `review_id` INTEGER NOT NULL,
    `c_order_id` INTEGER NOT NULL,
    `review_rating` INTEGER NOT NULL,
    `review_desc` VARCHAR(255) NOT NULL,

    INDEX `c_order_id`(`c_order_id`),
    PRIMARY KEY (`review_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `state_tax` (
    `state_abbr` CHAR(2) NOT NULL,
    `state_tax_rate` FLOAT NOT NULL,

    PRIMARY KEY (`state_abbr`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `supplier` (
    `supplier_id` INTEGER NOT NULL,
    `supplier_name` VARCHAR(255) NOT NULL,
    `supplier_address` VARCHAR(255) NULL,
    `supplier_address_two` VARCHAR(255) NULL,
    `supplier_city` VARCHAR(255) NULL,
    `supplier_state` VARCHAR(2) NULL,
    `supplier_zip` INTEGER NULL,
    `supplier_contact_f_name` VARCHAR(255) NOT NULL,
    `supplier_contact_l_name` VARCHAR(255) NOT NULL,
    `supplier_contact_email` VARCHAR(255) NOT NULL,
    `supplier_notes` VARCHAR(255) NULL,

    PRIMARY KEY (`supplier_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `supplier_item` (
    `supplier_id` INTEGER NOT NULL,
    `material_id` INTEGER NOT NULL,
    `si_name` VARCHAR(255) NOT NULL,

    INDEX `material_id`(`material_id`),
    PRIMARY KEY (`supplier_id`, `material_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `supply_order` (
    `so_id` INTEGER NOT NULL,
    `so_date` DATE NOT NULL,
    `supplier_id` INTEGER NOT NULL,
    `so_payment_methods` VARCHAR(45) NOT NULL,
    `so_subtotal` FLOAT NOT NULL,
    `so_tax` FLOAT NOT NULL,
    `so_total` FLOAT NOT NULL,

    INDEX `supplier_id`(`supplier_id`),
    PRIMARY KEY (`so_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `supply_order_line_item` (
    `soli_id` INTEGER NOT NULL,
    `so_id` INTEGER NOT NULL,
    `material_id` INTEGER NOT NULL,
    `soli_count` INTEGER NOT NULL,
    `soli_discount` FLOAT NULL,

    INDEX `material_id`(`material_id`),
    INDEX `so_id`(`so_id`),
    PRIMARY KEY (`soli_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `user_id` INTEGER NOT NULL,
    `user_name` VARCHAR(45) NULL,
    `user_pass` VARCHAR(45) NULL,

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `visit_history` (
    `customer_id` INTEGER NOT NULL,
    `location_id` INTEGER NOT NULL,

    INDEX `location_id`(`location_id`),
    PRIMARY KEY (`customer_id`, `location_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `c_order` ADD CONSTRAINT `c_order_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer`(`customer_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `c_order` ADD CONSTRAINT `c_order_ibfk_2` FOREIGN KEY (`review_id`) REFERENCES `review`(`review_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `c_order_line_item` ADD CONSTRAINT `c_order_line_item_ibfk_1` FOREIGN KEY (`c_order_id`) REFERENCES `c_order`(`c_order_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `c_order_line_item` ADD CONSTRAINT `c_order_line_item_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product`(`product_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `event` ADD CONSTRAINT `event_ibfk_1` FOREIGN KEY (`location_id`) REFERENCES `location`(`location_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product_category`(`prod_cat_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_ibfk_1` FOREIGN KEY (`c_order_id`) REFERENCES `c_order`(`c_order_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `supplier_item` ADD CONSTRAINT `supplier_item_ibfk_2` FOREIGN KEY (`material_id`) REFERENCES `material`(`material_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `supplier_item` ADD CONSTRAINT `supplier_item_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `supplier`(`supplier_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `supply_order` ADD CONSTRAINT `supply_order_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `supplier`(`supplier_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `supply_order_line_item` ADD CONSTRAINT `supply_order_line_item_ibfk_2` FOREIGN KEY (`material_id`) REFERENCES `material`(`material_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `supply_order_line_item` ADD CONSTRAINT `supply_order_line_item_ibfk_1` FOREIGN KEY (`so_id`) REFERENCES `supply_order`(`so_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `visit_history` ADD CONSTRAINT `visit_history_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer`(`customer_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `visit_history` ADD CONSTRAINT `visit_history_ibfk_2` FOREIGN KEY (`location_id`) REFERENCES `location`(`location_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
