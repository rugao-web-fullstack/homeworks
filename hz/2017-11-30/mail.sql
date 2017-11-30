/*
Navicat MySQL Data Transfer

Source Server         : 123
Source Server Version : 50520
Source Host           : localhost:3306
Source Database       : mail

Target Server Type    : MYSQL
Target Server Version : 50520
File Encoding         : 65001

Date: 2017-11-30 21:24:53
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for email
-- ----------------------------
DROP TABLE IF EXISTS `email`;
CREATE TABLE `email` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8 NOT NULL,
  `content` varchar(255) CHARACTER SET utf8 NOT NULL,
  `sender` varchar(255) CHARACTER SET utf8 NOT NULL,
  `receiver` varchar(255) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of email
-- ----------------------------

-- ----------------------------
-- Table structure for mailbox
-- ----------------------------
DROP TABLE IF EXISTS `mailbox`;
CREATE TABLE `mailbox` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 NOT NULL,
  `emailaddress` varchar(255) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of mailbox
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 NOT NULL,
  `emailaddress` varchar(255) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of user
-- ----------------------------
