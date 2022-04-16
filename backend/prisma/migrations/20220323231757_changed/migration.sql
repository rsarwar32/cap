/*
  Warnings:

  - The primary key for the `c_order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `c_order_line_item` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `c_order_line_item` DROP FOREIGN KEY `c_order_line_item_ibfk_1`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `review_ibfk_1`;

-- AlterTable
ALTER TABLE `c_order` DROP PRIMARY KEY,
    MODIFY `c_order_id` BIGINT NOT NULL,
    ADD PRIMARY KEY (`c_order_id`);

-- AlterTable
ALTER TABLE `c_order_line_item` DROP PRIMARY KEY,
    MODIFY `c_order_id` BIGINT NOT NULL,
    ADD PRIMARY KEY (`c_order_id`, `product_id`);

-- AlterTable
ALTER TABLE `review` MODIFY `c_order_id` BIGINT NOT NULL;

-- AddForeignKey
ALTER TABLE `c_order_line_item` ADD CONSTRAINT `c_order_line_item_ibfk_1` FOREIGN KEY (`c_order_id`) REFERENCES `c_order`(`c_order_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_ibfk_1` FOREIGN KEY (`c_order_id`) REFERENCES `c_order`(`c_order_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
