Navicat MySQL Data Transfer

Source Server         : email
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : emaildb

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2017-11-30 20:51:49
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for email
-- ----------------------------
DROP TABLE IF EXISTS `email`;
CREATE TABLE `email` (
  `senderID` int(255) DEFAULT NULL,
  `sendername` varchar(255) DEFAULT NULL,
  `receiverID` varchar(255) DEFAULT NULL,
  `receivername` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of email
-- ----------------------------

-- ----------------------------
-- Table structure for emailadd
-- ----------------------------
DROP TABLE IF EXISTS `emailadd`;
CREATE TABLE `emailadd` (
  `userID` varchar(255) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of emailadd
-- ----------------------------

-- ----------------------------
-- Table structure for email_emailadd
-- ----------------------------
DROP TABLE IF EXISTS `email_emailadd`;
CREATE TABLE `email_emailadd` (
  
  `title` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`mailID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of email_emailadd
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `ID` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------

-- ----------------------------
-- Table structure for user_emailadd
-- ----------------------------
DROP TABLE IF EXISTS `user_emailadd`;
CREATE TABLE `user_emailadd` (
  `userID` int(11) DEFAULT NULL,
  `mailID` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_emailadd
-- ----------------------------
