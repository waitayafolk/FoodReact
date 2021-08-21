-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 21, 2021 at 08:46 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `restaurant`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_bill_order`
--

CREATE TABLE `tb_bill_order` (
  `id` int(11) NOT NULL,
  `customer_name` varchar(100) NOT NULL,
  `user_id` int(11) NOT NULL,
  `sum_sale` double NOT NULL,
  `pay_date` date NOT NULL,
  `status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tb_bill_order_detail`
--

CREATE TABLE `tb_bill_order_detail` (
  `id` int(11) NOT NULL,
  `bill_id` int(11) NOT NULL,
  `food_id` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `price_sale` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tb_food`
--

CREATE TABLE `tb_food` (
  `id` int(11) NOT NULL,
  `name_food` varchar(50) NOT NULL,
  `name_food_en` varchar(50) NOT NULL,
  `price_food` double NOT NULL,
  `detail_food` varchar(150) NOT NULL,
  `status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tb_food`
--

INSERT INTO `tb_food` (`id`, `name_food`, `name_food_en`, `price_food`, `detail_food`, `status`) VALUES
(1, 'ผัดไท', 'Pad Thai', 60, 'ผัดไทย เป็นอาหารไทยที่หารับประทานได้ทั่วประเทศไทย โดยเฉพาะในภาคกลาง และอาจพบได้ในร้านอาหารไทยในต่างประเทศบางแห่ง', 'use'),
(2, 'ราดหน้าหมู', 'Rat na', 70, 'ราดหน้าเป็นอาหารกลางวันไทยยอดนิยมและเป็นอาหารที่สะดวกสบายสำหรับฉัน ฉันเดาว่าน่าจะเป็นน้ำเกรวี่อุ่นและบะหมี่นุ่ม', 'use'),
(3, 'ผัดกะเพราหมู', 'Stir- fried Pork with Basil', 60, 'ผัดระเพรา เป็นเมนูยอดฮิตของชาวไทย ปรุงด้วยเนื้อสัตว์ เช่น หมู ไก่ เนื้อ กุ้ง ปลาหมึก พริก กระเทียม เครื่องปรุงต่างๆ และใบกะเพรา มีรสชาติเผ็ดและหอมใบกะ', 'use'),
(4, 'ข้าวไข่เจียว', 'Omelette Rice', 60, 'อ่ยถึงเมนูข้าวไข่เจียว เชื่อว่าเป็นอาหารในดวงใจใครหลายคน มีให้เลือกโปะข้าวสารพัดทั้งเมนูไข่เจียว เมนูไข่ยัดไส้ เมนูไข่ลูกเขย เมนูไข่ตุ๋น เมนูไข่กระทะ ', 'use'),
(5, 'ข้าวแกงกะหรี่', 'Curry Rice', 70, 'กงกะหรี่ญี่ปุ่น เป็นหนึ่งในอาหารที่นิยมในประเทศญี่ปุ่น โดยทั่วไปจะเสิร์ฟในสามรูปแบบหลักคือ ข้าวแกงกะหรี่ อูดงแกงกะหรี่ และขนมปังแกงกะหรี่ ข้าวแกงกะหรี', 'use'),
(6, 'test', 'test', 40, 'test', 'delete');

-- --------------------------------------------------------

--
-- Table structure for table `tb_group_food`
--

CREATE TABLE `tb_group_food` (
  `id` int(11) NOT NULL,
  `name_group_food` varchar(100) NOT NULL,
  `name_group_food_en` varchar(100) NOT NULL,
  `group_food_code` varchar(50) NOT NULL,
  `status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tb_group_food`
--

INSERT INTO `tb_group_food` (`id`, `name_group_food`, `name_group_food_en`, `group_food_code`, `status`) VALUES
(1, 'ของหวาน', 'Dessert', '1001', 'use'),
(2, 'ของหวาน', 'Dessert', '1001', 'delete'),
(3, 'อาหารไทย', 'Thai Food', '1002', 'use');

-- --------------------------------------------------------

--
-- Table structure for table `tb_order`
--

CREATE TABLE `tb_order` (
  `id` int(11) NOT NULL,
  `customer_name` varchar(100) NOT NULL,
  `customer_table` varchar(50) NOT NULL,
  `status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tb_order_detail`
--

CREATE TABLE `tb_order_detail` (
  `id` int(11) NOT NULL,
  `id_order` int(11) NOT NULL,
  `food_id` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tb_user`
--

CREATE TABLE `tb_user` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `level` varchar(10) NOT NULL,
  `status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tb_user`
--

INSERT INTO `tb_user` (`id`, `name`, `username`, `password`, `level`, `status`) VALUES
(1, 'admin', 'admin', 'admin', 'admin', 'use'),
(2, 'Folk', 'folk', '1234', 'user', 'delete'),
(3, 'test', 'adminfolk', '186722', 'admin', 'delete'),
(5, 'test', 'test', '1234', 'user', 'delete');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_bill_order`
--
ALTER TABLE `tb_bill_order`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_bill_order_detail`
--
ALTER TABLE `tb_bill_order_detail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_food`
--
ALTER TABLE `tb_food`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_group_food`
--
ALTER TABLE `tb_group_food`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_order`
--
ALTER TABLE `tb_order`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_order_detail`
--
ALTER TABLE `tb_order_detail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_user`
--
ALTER TABLE `tb_user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_bill_order`
--
ALTER TABLE `tb_bill_order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_bill_order_detail`
--
ALTER TABLE `tb_bill_order_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_food`
--
ALTER TABLE `tb_food`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tb_group_food`
--
ALTER TABLE `tb_group_food`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tb_order`
--
ALTER TABLE `tb_order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_order_detail`
--
ALTER TABLE `tb_order_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_user`
--
ALTER TABLE `tb_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
