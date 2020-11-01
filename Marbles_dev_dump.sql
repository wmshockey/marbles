-- MySQL dump 10.13  Distrib 5.7.29, for macos10.14 (x86_64)
--
-- Host: localhost    Database: Marbles_dev
-- ------------------------------------------------------
-- Server version	5.7.29

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
-- Table structure for table `ar_internal_metadata`
--

DROP TABLE IF EXISTS `ar_internal_metadata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ar_internal_metadata` (
  `key` varchar(255) NOT NULL,
  `value` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ar_internal_metadata`
--

LOCK TABLES `ar_internal_metadata` WRITE;
/*!40000 ALTER TABLE `ar_internal_metadata` DISABLE KEYS */;
INSERT INTO `ar_internal_metadata` VALUES ('environment','development','2020-05-15 21:06:52','2020-05-15 21:06:52');
/*!40000 ALTER TABLE `ar_internal_metadata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `games`
--

DROP TABLE IF EXISTS `games`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `games` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `players` varchar(255) DEFAULT NULL,
  `turn` varchar(255) DEFAULT NULL,
  `comment` text,
  `board` text,
  `deck` text,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `greenhand` text,
  `redhand` text,
  `bluehand` text,
  `yellowhand` text,
  `discardpile` text,
  `yplayer` varchar(255) DEFAULT NULL,
  `rplayer` varchar(255) DEFAULT NULL,
  `gplayer` varchar(255) DEFAULT NULL,
  `bplayer` varchar(255) DEFAULT NULL,
  `gbteam` varchar(255) DEFAULT NULL,
  `ryteam` varchar(255) DEFAULT NULL,
  `screen` text,
  `winner` varchar(255) DEFAULT NULL,
  `refresh` int(11) DEFAULT NULL,
  `moved` varchar(255) DEFAULT NULL,
  `plays` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=522 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `games`
--

LOCK TABLES `games` WRITE;
/*!40000 ALTER TABLE `games` DISABLE KEYS */;
INSERT INTO `games` VALUES (407,'Lenoras Game','2020-10-06','Started',NULL,'1','',',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,r48,,,,,,,,r45,r46,r47,,,,,,,,,,,,,,,,,,,,,y96,,,,,,,,,,,,,,,,,,,,,,,,,y93,y94,y95,,','AC,7D,J3,8H,7S,3C,QC,JS,5S,QH,6H,4H,JC,5C,6S,JH,4D,AS,10H,10C,2C,KH,2S,J4,3H,3D,8S,7C,9S,JD,5H,2H,10D,J1,QD,4S,3S,8C,8D,10S,AH,J2,5D,9D,9H,2D','2020-10-06 14:17:40','2020-10-13 15:42:14','','KD,9C,AD','','6C,7H','6D,QS,4C,KS,KC','Lenora Shockey','Lenora Shockey','','','','','253,435,253,435,253,435,253,435','',5,'y96,',5),(448,'firstTurnCheck','2020-10-10','Started',NULL,'1','',',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,r45,r46,r47,r48,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,y93,y94,y95,y96','J4,KD,7C,8H,QC,9H,7H,2S,5S,5C,10H,10S,2D,3C,7S,2H,6H,J3,JS,AH,J1,3D,5H,9C,4H,6C,8S,JH,5D,3S,2C,8C,JC,10C,KS,AC,8D,3H,4D,KC,QS,6D,J2,4C,KH,AS','2020-10-11 02:11:19','2020-10-13 15:41:55','','7D,10D,6S,9S,QD','','4S,QH,AD,JD,9D','','Warren Shockey','Lenora Shockey','','','','','365,435,365,435,365,435,365,435','',5,'',0),(450,'checkOvershoot','2020-10-11','Started',NULL,'3','',',,,,,,,,,,,,,,,,,,,,,g21,g22,g23,,y95,,,,,,,,,,,,b71,,,,,,b70,b72,r45,r46,r47,r48,,,y94,,,,,,,,,,,,y93,,,,,,b69,,,,y96,,,,,,,,,,,,,,,,,,,g24,,,,,','9H,JD,QH,7S,AS,AH,5S,8C,6H,J4,4S,2D,KD,AD,3H,6C,KH,J2,8D,KC,10C,10H,3S,5H,4H,6S,6D,3D,QS,7C,KS,2S,JH,JS,9C,5C','2020-10-11 16:22:44','2020-10-18 15:24:53','7D','','AC,QD','4D,3C','2C,9S,4C,10S,J1,J3,JC,7H,5D,8H,2H,8S,9D,QC,10D','Warren Shockey','Warren Shockey','Warren Shockey','Warren Shockey','','','291,436,289,435,291,442,290,439','',5,'g24,',46),(452,'checkNames','2020-10-13','Started',NULL,'1','',',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,r45,r46,r47,r48,,,,,,,,,,,,,,,,,,,,,,,,,y96,,,,,,,,,,,,,,,,,,,,y93,y94,y95,,','AH,2S,10H,10D,5S,AS,3S,QS,J1,KD,8D,6C,4S,JC,10C,7D,KC,7C,6S,2C,9H,8H,JD,9S,2H,9C,5C,10S,3C,5H,7H,4H,QC,J2,2D,6H,JH,4D,KS,3H,AD,QH,KH,8C,J3,JS','2020-10-13 15:27:43','2020-10-13 15:30:15','','J4,QD,3D,7S,6D','','4C,8S,5D,9D','AC','Warren Shockey','Lenora Shockey','','','','','365,435,365,435,365,435,365,435','',5,'y96,',1),(455,'Name Test','2020-10-13','Finished',NULL,'0','',',,,,,,,,,,,,,,,,,,,,,g21,g22,g23,g24,,,,,,,,,,,,,,,,,,,,,r45,r46,r47,r48,,,,,,,,,,,,,,,,,,,,,b69,b70,b71,b72,,,,,,,,,,,,,,,,,,,,,y93,y94,y95,y96','3D,10H,QH,2H,5D,8C,4C,KH,4H,2D,7D,2C,3S,3H,5S,JS,QC,9D,4D,J4,J1,6C,JC,JD,7H,AS,8D,7S,10D,5C,10C,7C,AD,QD,KC,QS','2020-10-14 01:08:03','2020-10-14 20:50:00','KD,8S,6H,AH,9S','5H,J3,9H,J2,6D','AC,2S,3C,10S,6S','8H,9C,4S,JH,KS','','Tester','Warren Shockey','Lois Schneider','Lenora Shockey','B Team','A Team','365,435,365,435,365,435,365,435','A Team',5,'',0),(474,'Team Test','2020-10-19','Started',NULL,'0','',',,,,,,,,,,,,,,,,,,,,,g21,g22,g23,g24,,,,,,,,,,,,,,,,,,,,,r45,r46,r47,r48,,,,,,,,,,,,,,,,,,,,,b69,b70,b71,b72,,,,,,,,,,,,,,,,,,,,,y93,y94,y95,y96','9D,KD,2C,9H,3H,AH,10S,7C,4D,5C,5S,QC,2D,2S,6D,QD,3S,9C,8S,AC,4S,3D,KS,5H,4C,AS,3C,J3,9S,AD,QH,JD,QS,6H,2H,10C','2020-10-19 13:58:52','2020-10-22 01:44:12','8C,KC,6C,4H,7S','8D,J1,JH,KH,5D','7D,10H,JS,J4,JC','8H,J2,6S,7H,10D','','Lenora Shockey','Lois Schneider','Warren Shockey','Randy Schneider','Team 2','Team 1','290,435,290,435,290,435,290,435','',0,'',0),(478,'refactor test','2020-10-19','Started',NULL,'2','',',,,,,,,,,,,,,g24,,,,,,,,g21,g22,g23,,,,,,,,,,,,,,,,,,,,,,r45,r46,r47,r48,,,,,,,b72,,,,,,,,,,,,,,b69,b70,b71,,,,,,,,,,,,,,,,,,,,,,y93,y94,y95,y96,','5C,J1,4C,7H,AD,2D,8S,JC,7S,8D,AC,9C,QS,7D,8H,AS,4H,KS,2C,2S,QD,10H,KH,10S,5S,10D,4D,JD,3C,6H,7C,J2,JS,9S,J3,9D','2020-10-19 19:14:52','2020-10-20 19:14:19','8C,3H','5D,3S,5H','AH,6C,6S','','2H,6D,4S,10C,KC,KD,J4,3D,JH,9H,QH,QC','Warren Shockey','Warren Shockey','Warren Shockey','Warren Shockey','','','290,435,290,435,290,435,290,435','',0,'r48,g24,',8),(482,'test Dropdown','2020-10-21','Started',NULL,'3','','b72,,,,,,,,,,,,,r48,,,,,,,,g21,g22,g23,,r47,,,,,,,,,,,,,,,,,,,,r45,r46,,,,,,,,,,,,,,,y96,,,,,,,,b69,b70,b71,,,,,,,,,,,,,,,,,,,,,g24,y93,y94,y95,,','3H,2C,KD,10D,6H,4D,5C,9D,AD,9S,6S,J2,3C,10S,KH,JS,7D,QS,3D,5S,JD,10C,2S,3S,7S,QD,QH,8H,2H,JC,5H,6D,10H,J4,2D,7H','2020-10-21 15:57:32','2020-10-22 00:47:57','8S,8C','JH,9C','AC,QC,8D','AH,5D,9H','KS,6C,4S,7C,4C,4H,KC,J3,J1,AS','Warren Shockey','Warren Shockey','Warren Shockey','Warren Shockey','B Team','A Team','290,435,290,435,290,435,290,435','',0,'r47,',10),(483,'Lens Game','2020-10-21','Started',NULL,'0','',',,,,y96,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,r45,r46,r47,r48,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,y93,y94,y95,,','6C,JC,4C,QC,4S,AD,KS,JH,8S,7D,2C,QH,6H,J1,AC,2S,KD,5C,3H,7C,AS,9D,3C,J4,10C,4H,5D,8D,3S,KH,J2,2D,6S,KC,QS,5H,8H,J3,10S,QD,2H,4D,8C,7H,JS,10H','2020-10-21 23:21:24','2020-10-22 13:02:52','','','','JD,3D','10D,9S,AH,7S,9C,9H,6D,5S','Lenora Shockey','Lenora Shockey','','','','','290,435,290,435,290,435,290,435','',0,'y96,',4),(508,'Bad Path','2020-10-30','Started',NULL,'0','',',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,g22,,,,,,,g24,,g23,,,,,g21,,,,,,,','10D,5S,2D,JH,QC,KD,10H,10S,3C,AD,J3,7C,3D,6D,2C,7H,9C,4S,8D,QH,AC,QD,5D,JC,9H,4D,3H,QS,JD,J2,8S,AS,7D,J1,6S,6C','2020-10-30 11:21:59','2020-10-30 17:27:03','9D,8H','','','','4C,J4,5H,KS,6H,8C,AH,KH,4H,2H,3S,9S,7S,4S,4C,JS,4C,KC','','','Warren Shockey','','','','290,435,290,435,290,435,290,435','',0,'g22,',18),(521,'Marble Color Tags','2020-10-30','Started',NULL,'0','',',,,,,,,,,,,,,,,,,,,,,g21,g22,g23,g24,r48,,,,,,,,,,,,b72,,,,,,,,r45,r46,r47,,,,,,,,,,,,,,,,,,,,,,b69,b70,b71,,y96,,,,,,,,,,,,,,,,,,,,y93,y94,y95,,','8D,QC,5C,J2,JH,6H,KD,2C,J1,QH,9S,JS,8H,5H,2D,10S,10H,JD,5D,4S,9C,4C,3S,6D,KH,6C,QS,7H,7S,6S,8C,2H,AC,J4,3D,KS','2020-10-31 01:49:11','2020-10-31 12:24:43','','5S,10C,AH,3C','2S,AS,9D','QD,8S,3H,7C','4D,KC,J3,AD,4H,7D,JC,10D,9H','Warren Shockey','Warren Shockey','Warren Shockey','Warren Shockey','','','290,435,290,435,290,435,290,435','',0,'b72,',5);
/*!40000 ALTER TABLE `games` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schema_migrations`
--

DROP TABLE IF EXISTS `schema_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `schema_migrations` (
  `version` varchar(255) NOT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schema_migrations`
--

LOCK TABLES `schema_migrations` WRITE;
/*!40000 ALTER TABLE `schema_migrations` DISABLE KEYS */;
INSERT INTO `schema_migrations` VALUES ('0'),('20200517131558'),('20200523004910'),('20200525135028'),('20200525135224'),('20200525135306'),('20200525135340'),('20200525135556'),('20200527172725'),('20200528133202'),('20200528133223'),('20200528133243'),('20200528133257'),('20200528133438'),('20200608004941'),('20200608010043'),('20200914141508'),('20200914151938'),('20200914222914'),('20200922163656'),('20200925134511'),('20200925193102'),('20201001133121'),('20201006120341');
/*!40000 ALTER TABLE `schema_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL DEFAULT '',
  `encrypted_password` varchar(255) NOT NULL DEFAULT '',
  `reset_password_token` varchar(255) DEFAULT NULL,
  `reset_password_sent_at` datetime DEFAULT NULL,
  `remember_created_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_users_on_email` (`email`),
  UNIQUE KEY `index_users_on_reset_password_token` (`reset_password_token`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'wmshockey@gmail.com','$2a$12$C1UrQAoXsKKmwVv72IlRAORESxHSMqOPp.qh6roT/ljrIJExobpZ6',NULL,NULL,NULL,'2020-09-14 15:26:42','2020-10-21 23:20:42','Warren Shockey'),(2,'llshockey@gmail.com','$2a$12$QCqSMPKIDsnwGEurIy8Z.uebTfC5U2KtYKfPHIo7iztQqxwp6D3Ki','d0687c83fcdddf08e79e1612f412378934a4d52184542a5735c9824bddd16a2d','2020-10-04 14:21:40',NULL,'2020-09-14 23:32:14','2020-10-04 14:21:40','Lenora Shockey'),(3,'rjamesschneider@gmail.com','$2a$12$nw5i2yl3ld/HlHf/iwyw4uuhHfIcJ.YFEFYOMTxwUNxHuh.QRoXNO',NULL,NULL,NULL,'2020-09-24 18:07:46','2020-09-24 18:07:46','Randy Schneider'),(4,'loiszella@gmail.com','$2a$12$Ekpuz7e7WygHvtLkdaD21Oq/tDPeZtkOUSaT0OWCB0C6KmhOuidxC',NULL,NULL,NULL,'2020-09-24 19:36:25','2020-09-24 19:36:25','Lois Schneider'),(5,'wshockey@telus.net','$2a$12$pPIXh0D3YiP6MAfLf.ydW.HTJXAokoGb.ss89dSpl6zzy3sjKk9qu',NULL,NULL,NULL,'2020-09-27 13:13:13','2020-09-27 15:38:27','Tester');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-31  8:31:07
