/*
Navicat MySQL Data Transfer

Source Server         : cyb
Source Server Version : 50515
Source Host           : localhost:3306
Source Database       : email_system

Target Server Type    : MYSQL
Target Server Version : 50515
File Encoding         : 65001

Date: 2017-12-01 13:40:37
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for email
-- ----------------------------
DROP TABLE IF EXISTS `email`;
CREATE TABLE `email` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(30) COLLATE utf8_sinhala_ci NOT NULL,
  `content` varchar(250) COLLATE utf8_sinhala_ci DEFAULT NULL,
  `sender` varchar(20) COLLATE utf8_sinhala_ci NOT NULL,
  `receiver` varchar(20) COLLATE utf8_sinhala_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sender` (`sender`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_sinhala_ci;

-- ----------------------------
-- Table structure for email_box
-- ----------------------------
DROP TABLE IF EXISTS `email_box`;
CREATE TABLE `email_box` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `address` varchar(30) COLLATE utf8_sinhala_ci NOT NULL,
  `owner` int(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `owner` (`owner`),
  CONSTRAINT `owner` FOREIGN KEY (`owner`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_sinhala_ci;

-- ----------------------------
-- Table structure for email_emailbox
-- ----------------------------
DROP TABLE IF EXISTS `email_emailbox`;
CREATE TABLE `email_emailbox` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `emailbox` int(64) NOT NULL,
  `email` int(64) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(20) NOT NULL,
  `username` varchar(20) COLLATE utf8_sinhala_ci NOT NULL,
  `password` varchar(20) COLLATE utf8_sinhala_ci NOT NULL,
  `email` varchar(30) COLLATE utf8_sinhala_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `email` (`email`),
  CONSTRAINT `email` FOREIGN KEY (`email`) REFERENCES `email` (`sender`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_sinhala_ci;
