/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50720
 Source Host           : localhost
 Source Database       : mailsys

 Target Server Type    : MySQL
 Target Server Version : 50720
 File Encoding         : utf-8

 Date: 11/30/2017 19:17:11 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `maitext`
-- ----------------------------
DROP TABLE IF EXISTS `maitext`;
CREATE TABLE `maitext` (
	`id` int(11) NOT NULL,
	`title` varchar(255) NOT NULL,
	`content` varchar(255) NOT NULL,
	`status` char(20) NOT NULL
) ENGINE=`InnoDB` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci ROW_FORMAT=DYNAMIC COMMENT='' CHECKSUM=0 DELAY_KEY_WRITE=0;

-- ----------------------------
--  Table structure for `send_reciever`
-- ----------------------------
DROP TABLE IF EXISTS `send_reciever`;
CREATE TABLE `send_reciever` (
	`senderid` int(20) NOT NULL,
	`recieverid` int(20) NOT NULL,
	`mailid` int(20) NOT NULL
) ENGINE=`InnoDB` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci ROW_FORMAT=DYNAMIC COMMENT='' CHECKSUM=0 DELAY_KEY_WRITE=0;

-- ----------------------------
--  Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
	`id` int(30) NOT NULL AUTO_INCREMENT,
	`username` varchar(70) NOT NULL,
	`password` varchar(70) NOT NULL,
	`status` char(10) NOT NULL DEFAULT '',
	PRIMARY KEY (`id`)
) ENGINE=`InnoDB` AUTO_INCREMENT=1 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci ROW_FORMAT=DYNAMIC COMMENT='' CHECKSUM=0 DELAY_KEY_WRITE=0;

SET FOREIGN_KEY_CHECKS = 1;
