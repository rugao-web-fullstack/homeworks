-- MySQL dump 10.13  Distrib 5.7.20, for Linux (x86_64)
--
-- Host: localhost    Database: mail
-- ------------------------------------------------------
-- Server version	5.7.20-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `mail`
--

DROP TABLE IF EXISTS `mail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `sender` varchar(255) NOT NULL,
  `receiver` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mail`
--

LOCK TABLES `mail` WRITE;
/*!40000 ALTER TABLE `mail` DISABLE KEYS */;
INSERT INTO `mail` VALUES (1,'hi','hello world','99','ee@qq.com'),(2,'ohayo','nice to meet you','99','ee@qq.com'),(3,'hi','hello','mm','ee@qq.com'),(4,'haha','hhhhhhhh','mm','kk@qq.com'),(5,'hi','hello,mm','99','mm@qq.com'),(6,'hi','hello,mm','99','mm@qq.com'),(7,'hi','hello,mm','99','mm@qq.com'),(8,'hi','hello,mm','99','mm@qq.com'),(9,'hi','hello,mm','99','mm@qq.com'),(10,'hi','hello,mm','99','mm@qq.com'),(11,'hi','hello,mm','99','mm@qq.com'),(12,'hi','hello,kk','mm','kk@qq.com'),(13,'hi','hello,kk','mm','kk@qq.com'),(14,'hi','hello,ee','kk','ee@qq.com'),(15,'hi','hehe,kk','mm','kk@qq.com'),(16,'你好','你好吗','99','ee@qq.com'),(17,'哈哈','哈哈哈','99','ee@qq.com'),(18,'赫赫','呵呵呵','99','ee@qq.com'),(19,'哈哈','你好，kk','99','kk@qq.com'),(20,'11','222','99','kk@qq.com'),(21,'22','222','99','ee@qq.com'),(22,'11','111','99','ee@qq.com'),(23,'hi','22','99','ee@qq.com'),(24,'11','222','99','ee@qq.com'),(25,'11','111','99','ee@qq.com'),(26,'hi','11','99','ee@qq.com'),(27,'hi','hello','mm','kk@qq.com');
/*!40000 ALTER TABLE `mail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mail_mailbox`
--

DROP TABLE IF EXISTS `mail_mailbox`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mail_mailbox` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `mail` int(100) NOT NULL,
  `mailbox` int(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mail_mailbox`
--

LOCK TABLES `mail_mailbox` WRITE;
/*!40000 ALTER TABLE `mail_mailbox` DISABLE KEYS */;
INSERT INTO `mail_mailbox` VALUES (1,27,3);
/*!40000 ALTER TABLE `mail_mailbox` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mailbox`
--

DROP TABLE IF EXISTS `mailbox`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mailbox` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `user` int(100) NOT NULL,
  `address` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mailbox`
--

LOCK TABLES `mailbox` WRITE;
/*!40000 ALTER TABLE `mailbox` DISABLE KEYS */;
INSERT INTO `mailbox` VALUES (1,33,'ee@qq.com'),(2,34,'mm@qq.com'),(3,35,'kk@qq.com');
/*!40000 ALTER TABLE `mailbox` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (3,'11','111'),(4,'22','222'),(5,'33','333'),(6,'55','555'),(7,'88','888'),(17,'44','444'),(18,'66','666'),(19,'77','777'),(20,'99','999'),(21,'1q','111'),(22,'w2','111'),(23,'8i','888'),(24,'qq','111'),(25,'ss','111'),(26,'34','333'),(27,'13','111'),(28,'234','111'),(29,'10','999'),(30,'35','333'),(31,'09','999'),(32,'qqq','999'),(33,'ee','999'),(34,'mm','111'),(35,'kk','111');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-12-02 11:52:40
