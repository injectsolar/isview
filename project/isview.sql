-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jan 08, 2017 at 06:09 AM
-- Server version: 5.7.9
-- PHP Version: 5.6.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `isview`
--

-- --------------------------------------------------------

--
-- Table structure for table `api_tokens`
--

DROP TABLE IF EXISTS `api_tokens`;
CREATE TABLE IF NOT EXISTS `api_tokens` (
  `token` varchar(300) NOT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `customers_id` int(11) NOT NULL,
  PRIMARY KEY (`token`),
  UNIQUE KEY `token_UNIQUE` (`token`),
  KEY `fk_api_tokens_customers1_idx` (`customers_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
CREATE TABLE IF NOT EXISTS `customers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(150) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mobile` varchar(15) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `address` varchar(300) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `password_UNIQUE` (`password`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `data_recorders`
--

DROP TABLE IF EXISTS `data_recorders`;
CREATE TABLE IF NOT EXISTS `data_recorders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `device_id` varchar(100) NOT NULL,
  `project_installation_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `device_id_UNIQUE` (`device_id`),
  KEY `fk_data_recorders_project_installation1_idx` (`project_installation_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `email_change_requests`
--

DROP TABLE IF EXISTS `email_change_requests`;
CREATE TABLE IF NOT EXISTS `email_change_requests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `customers_id` int(11) NOT NULL,
  `new_email` varchar(150) NOT NULL,
  `old_email` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_email_change_requests_customers1_idx` (`customers_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `inverter_types`
--

DROP TABLE IF EXISTS `inverter_types`;
CREATE TABLE IF NOT EXISTS `inverter_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `password_change_requests`
--

DROP TABLE IF EXISTS `password_change_requests`;
CREATE TABLE IF NOT EXISTS `password_change_requests` (
  `token` varchar(150) NOT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `users_id` int(11) NOT NULL,
  PRIMARY KEY (`token`),
  KEY `fk_password_change_requests_users1` (`users_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `password_change_requests`
--

INSERT INTO `password_change_requests` (`token`, `time`, `users_id`) VALUES
('bfcc362b068939816ce07a1841261e71477fb249', '2017-01-08 11:29:36', 7);

-- --------------------------------------------------------

--
-- Table structure for table `project_installations`
--

DROP TABLE IF EXISTS `project_installations`;
CREATE TABLE IF NOT EXISTS `project_installations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `customer_id` int(11) NOT NULL,
  `system_size` varchar(45) DEFAULT NULL,
  `inverter_rating` varchar(15) DEFAULT NULL,
  `latest_maintenance_date` datetime DEFAULT NULL,
  `cod_date` datetime NOT NULL,
  `inverter_types_id` int(11) NOT NULL,
  `system_types_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_project_installation_customer_idx` (`customer_id`),
  KEY `fk_project_installation_inverter_types1_idx` (`inverter_types_id`),
  KEY `fk_project_installation_system_types1_idx` (`system_types_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `recorded_data`
--

DROP TABLE IF EXISTS `recorded_data`;
CREATE TABLE IF NOT EXISTS `recorded_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `value` varchar(100) NOT NULL,
  `recorded_data_types_id` int(11) NOT NULL,
  `timestamp` datetime NOT NULL,
  `data_recorders_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_recorded_data_recorded_data_types1_idx` (`recorded_data_types_id`),
  KEY `fk_recorded_data_data_recorders1_idx` (`data_recorders_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `recorded_data_types`
--

DROP TABLE IF EXISTS `recorded_data_types`;
CREATE TABLE IF NOT EXISTS `recorded_data_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `system_types`
--

DROP TABLE IF EXISTS `system_types`;
CREATE TABLE IF NOT EXISTS `system_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(150) NOT NULL,
  `emailid` varchar(200) NOT NULL,
  `password` varchar(300) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_verified` int(1) NOT NULL DEFAULT '0',
  `is_epc` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `emailid` (`emailid`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `emailid`, `password`, `created_at`, `updated_at`, `is_verified`, `is_epc`) VALUES
(7, 'sudhir', 'nagasudhirpulla@gmail', 'pullasudhir', '2016-11-22 13:37:32', '2017-01-07 07:47:41', 1, 0),
(8, 'pradeep', 'psanodiya@gmail.com', 'abc123', '2016-11-22 13:38:59', '2016-11-22 13:38:59', 0, 0),
(24, 'ghggj', 'nagasudhirpulla@gmail.co', 'gghgHGJHGH', '2016-12-04 07:03:21', '2017-01-07 05:34:25', 0, 0),
(25, 'hgjh', 'ghgj@hjhjg.com', 'asdf', '2017-01-07 07:04:40', '2017-01-07 07:04:40', 0, 0),
(30, 'ghgugj', 'nagasudhirpulla@gmail.com', 'asdf', '2017-01-08 04:55:23', '2017-01-08 04:55:23', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `users_verification`
--

DROP TABLE IF EXISTS `users_verification`;
CREATE TABLE IF NOT EXISTS `users_verification` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `users_id` int(11) NOT NULL,
  `token` varchar(300) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `users_id` (`users_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users_verification`
--

INSERT INTO `users_verification` (`id`, `users_id`, `token`, `created_at`) VALUES
(2, 7, 'e3acd91b03ec3a2223d7fe90884d236f6c87f4c1', '2016-11-22 19:07:32'),
(3, 8, '9684eaf385e2886f02b0c69a76e221e5366770d8', '2016-11-22 19:08:59'),
(18, 24, 'c33de1210c7c9464c6b63136d986363b49e6b6f9', '2016-12-04 12:33:21'),
(19, 25, '2b1595cc24c5cc944cbcebf92b9986784e743dda', '2017-01-07 12:34:40'),
(22, 30, '079521da309de740966b1d4c3df6bf6c36032f22', '2017-01-08 10:25:23');

-- --------------------------------------------------------

--
-- Table structure for table `user_details`
--

DROP TABLE IF EXISTS `user_details`;
CREATE TABLE IF NOT EXISTS `user_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `device_id` varchar(100) NOT NULL,
  `users_id` int(11) NOT NULL,
  `system_size` int(11) NOT NULL,
  `solar_pv` varchar(300) NOT NULL,
  `solar_inverter` varchar(300) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `address` varchar(500) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_id` (`users_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_details`
--

INSERT INTO `user_details` (`id`, `device_id`, `users_id`, `system_size`, `solar_pv`, `solar_inverter`, `full_name`, `phone`, `address`) VALUES
(3, 'gfgf', 30, 20, '100', 'gjhg', 'gjhghjg', 'gfhgf', 'fghfghfgf');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `api_tokens`
--
ALTER TABLE `api_tokens`
  ADD CONSTRAINT `fk_api_tokens_customers1` FOREIGN KEY (`customers_id`) REFERENCES `customers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `data_recorders`
--
ALTER TABLE `data_recorders`
  ADD CONSTRAINT `fk_data_recorders_project_installation1` FOREIGN KEY (`project_installation_id`) REFERENCES `project_installations` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `email_change_requests`
--
ALTER TABLE `email_change_requests`
  ADD CONSTRAINT `fk_email_change_requests_customers1` FOREIGN KEY (`customers_id`) REFERENCES `customers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `password_change_requests`
--
ALTER TABLE `password_change_requests`
  ADD CONSTRAINT `fk_password_change_requests_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `project_installations`
--
ALTER TABLE `project_installations`
  ADD CONSTRAINT `fk_project_installation_customer` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_project_installation_inverter_types1` FOREIGN KEY (`inverter_types_id`) REFERENCES `inverter_types` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_project_installation_system_types1` FOREIGN KEY (`system_types_id`) REFERENCES `system_types` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `recorded_data`
--
ALTER TABLE `recorded_data`
  ADD CONSTRAINT `fk_recorded_data_data_recorders1` FOREIGN KEY (`data_recorders_id`) REFERENCES `data_recorders` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_recorded_data_recorded_data_types1` FOREIGN KEY (`recorded_data_types_id`) REFERENCES `recorded_data_types` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `users_verification`
--
ALTER TABLE `users_verification`
  ADD CONSTRAINT `users_verification_ibfk_1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_details`
--
ALTER TABLE `user_details`
  ADD CONSTRAINT `user_details_ibfk_1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
