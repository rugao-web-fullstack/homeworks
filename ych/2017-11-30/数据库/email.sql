/*
Navicat MySQL Data Transfer

Source Server         : email
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : email

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2017-11-30 20:03:49
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for email
-- ----------------------------
DROP TABLE IF EXISTS `email`;
CREATE TABLE `email` (
  `mailID` int(11) NOT NULL,
  `senderID` int(255) DEFAULT NULL,
  `sendername` varchar(255) DEFAULT NULL,
  `receiverID` varchar(255) DEFAULT NULL,
  `receivername` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`mailID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of email
-- ----------------------------

-- ----------------------------
-- Table structure for emailbox
-- ----------------------------
DROP TABLE IF EXISTS `emailbox`;
CREATE TABLE `emailbox` (
  `userID` varchar(255) NOT NULL,
  `mailID` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of emailbox
-- ----------------------------

-- ----------------------------
-- Table structure for email_emailbox
-- ----------------------------
DROP TABLE IF EXISTS `email_emailbox`;
CREATE TABLE `email_emailbox` (
  `mailID` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`mailID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of email_emailbox
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `userID` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------

-- ----------------------------
-- Table structure for user_emailbox
-- ----------------------------
DROP TABLE IF EXISTS `user_emailbox`;
CREATE TABLE `user_emailbox` (
  `userID` int(11) DEFAULT NULL,
  `mailID` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_emailbox
-- ----------------------------
