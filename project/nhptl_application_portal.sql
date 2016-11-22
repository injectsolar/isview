-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Nov 09, 2016 at 11:01 AM
-- Server version: 5.7.9
-- PHP Version: 5.6.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nhptl_application_portal`
--

-- --------------------------------------------------------

--
-- Table structure for table `applications`
--

DROP TABLE IF EXISTS `applications`;
CREATE TABLE IF NOT EXISTS `applications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(500) NOT NULL,
  `sc_ka` varchar(100) NOT NULL,
  `failure_fault_ka` varchar(100) NOT NULL,
  `sc_duration` varchar(100) NOT NULL,
  `n_shots` int(11) NOT NULL,
  `from_time` datetime NOT NULL,
  `to_time` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  `cancel_request` int(11) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `applications`
--

INSERT INTO `applications` (`id`, `description`, `sc_ka`, `failure_fault_ka`, `sc_duration`, `n_shots`, `from_time`, `to_time`, `user_id`, `cancel_request`, `created_at`, `updated_at`) VALUES
  (2, 'bhjghj', '3123', '21213', '1215', 242, '2016-11-09 00:02:00', '2013-04-11 15:04:00', 2, 0, '2016-11-09 06:58:37', '2016-11-09 06:58:37'),
  (3, 'sudhirtest1', '12', '50', '2', 10, '2016-11-09 12:37:00', '2016-11-14 15:25:00', 2, 0, '2016-11-09 07:07:39', '2016-11-09 07:07:39'),
  (4, 'test1', '50', '100', '200', 2, '2016-12-31 12:59:00', '2014-12-30 23:58:00', 2, 0, '2016-11-09 07:10:56', '2016-11-09 07:10:56'),
  (5, 'sfkj', '15', '151', '215', 115, '2016-11-09 11:58:00', '2015-01-07 23:57:00', 2, 0, '2016-11-09 07:15:30', '2016-11-09 07:15:30'),
  (6, 'ager', '15', '1515', '15154', 11, '2016-11-09 00:15:00', '2021-12-01 13:02:00', 2, 0, '2016-11-09 07:17:00', '2016-11-09 07:17:00'),
  (7, 'hgjh', '15', '45', '151', 321, '2111-12-02 14:02:00', '1111-12-01 02:55:00', 2, 0, '2016-11-09 07:20:26', '2016-11-09 07:20:26'),
  (8, 'from_test', '199', '199', '199', 199, '2016-11-09 14:01:00', '2016-11-09 14:01:00', 2, 0, '2016-11-09 10:07:22', '2016-11-09 10:07:22'),
  (9, 'from_test', '199', '199', '199', 199, '2016-11-09 14:01:00', '2016-11-09 14:01:00', 2, 0, '2016-11-09 10:08:38', '2016-11-09 10:08:38'),
  (10, 'from_test', '199', '199', '199', 199, '2016-11-09 14:01:00', '2016-11-09 14:01:00', 2, 0, '2016-11-09 10:09:43', '2016-11-09 10:09:43'),
  (11, 'from_test', '199', '199', '199', 199, '2016-11-09 14:01:00', '2016-11-09 14:01:00', 2, 0, '2016-11-09 10:10:04', '2016-11-09 10:10:04'),
  (12, 'from_test', '199', '199', '199', 199, '2016-11-09 14:01:00', '2016-11-09 14:01:00', 2, 0, '2016-11-09 10:39:42', '2016-11-09 10:39:42'),
  (13, 'from_test', '199', '199', '199', 199, '2016-11-09 14:01:00', '2016-11-09 14:01:00', 2, 0, '2016-11-09 10:40:10', '2016-11-09 10:40:10');

-- --------------------------------------------------------

--
-- Table structure for table `approvals`
--

DROP TABLE IF EXISTS `approvals`;
CREATE TABLE IF NOT EXISTS `approvals` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `application_id` int(11) NOT NULL,
  `description` varchar(500) NOT NULL,
  `sc_ka` varchar(100) NOT NULL,
  `failure_fault_ka` varchar(100) NOT NULL,
  `sc_duration` varchar(100) NOT NULL,
  `n_shots` int(11) NOT NULL,
  `from_time` datetime NOT NULL,
  `to_time` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  `fees` decimal(14,4) NOT NULL DEFAULT '5000.0000',
  `is_cancelled` int(11) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `approval_id` (`application_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `approvals`
--

INSERT INTO `approvals` (`id`, `application_id`, `description`, `sc_ka`, `failure_fault_ka`, `sc_duration`, `n_shots`, `from_time`, `to_time`, `user_id`, `fees`, `is_cancelled`, `created_at`, `updated_at`) VALUES
  (1, 2, 'from_test', '299', '299', '299', 299, '2016-11-09 14:01:00', '2016-11-09 14:01:00', 2, '5000.0000', 0, '2016-11-09 10:48:32', '2016-11-09 10:48:32'),
  (2, 2, 'from_test', '299', '299', '299', 299, '2016-11-09 14:01:00', '2016-11-09 14:01:00', 2, '5000.0000', 0, '2016-11-09 10:52:20', '2016-11-09 10:52:20'),
  (3, 2, 'from_test', '299', '299', '299', 299, '2016-11-09 14:01:00', '2016-11-09 14:01:00', 2, '5000.0000', 0, '2016-11-09 10:53:12', '2016-11-09 10:53:12');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(150) NOT NULL,
  `password` varchar(300) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `created_at`, `updated_at`) VALUES
  (1, 'sudhir', '123', '2016-11-08 04:13:23', '2016-11-08 04:13:23'),
  (2, 'nhptl', 'nhptl@123', '2016-11-08 04:43:19', '2016-11-08 04:43:19'),
  (3, 'admin', 'admin@123', '2016-11-08 05:06:02', '2016-11-08 05:06:02');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `applications`
--
ALTER TABLE `applications`
ADD CONSTRAINT `applications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `approvals`
--
ALTER TABLE `approvals`
ADD CONSTRAINT `approvals_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
ADD CONSTRAINT `approvals_ibfk_2` FOREIGN KEY (`application_id`) REFERENCES `applications` (`id`) ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
