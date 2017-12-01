/*
Navicat MySQL Data Transfer

Source Server         : email
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : email

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2017-12-01 14:17:16
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for email
-- ----------------------------
DROP TABLE IF EXISTS `email`;
CREATE TABLE `email` (
  `id` int(11) NOT NULL,
  `sender` varchar(255) NOT NULL,
  `receiver` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of email
-- ----------------------------

-- ----------------------------
-- Table structure for emailbox
-- ----------------------------
DROP TABLE IF EXISTS `emailbox`;
CREATE TABLE `emailbox` (
  `id` int(11) NOT NULL,
  `user` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of emailbox
-- ----------------------------

-- ----------------------------
-- Table structure for email_emailbox
-- ----------------------------
DROP TABLE IF EXISTS `email_emailbox`;
CREATE TABLE `email_emailbox` (
  `id` int(11) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `mailbox` int(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of email_emailbox
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
