-- MySQL dump 10.14  Distrib 5.5.56-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: Marbles_prod
-- ------------------------------------------------------
-- Server version	5.5.56-MariaDB

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
INSERT INTO `ar_internal_metadata` VALUES ('environment','production','2020-05-15 21:06:52','2020-11-01 15:44:07');
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
) ENGINE=InnoDB AUTO_INCREMENT=351 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `games`
--

LOCK TABLES `games` WRITE;
/*!40000 ALTER TABLE `games` DISABLE KEYS */;
INSERT INTO `games` VALUES (286,'BC-AB Round 1','2020-10-12','Finished',NULL,'0','',',,,,,,,,,,,,,,,,g21,r47,r48,r45,r46,,,,,,,,,,,,,,,,,,,,,b70,b71,,b72,,,,,,,,,,,,,,,,,,,,b69,y93,y95,y94,y96,,,,,,,,,,,,,,,,,,,,,g23,,g22,g24,,,,,','6H,8C,7D,8S,AH,6C,KC,4H,J1,2D,7S,8H,4C,JD,3H,10D','2020-10-12 19:12:18','2020-10-16 04:40:53','4S,KS,10S,9H','9D,6D,QC','QH,8D,5S','JC,7H,J2','5H,J4,2H,5D,AS,J3,2C,3C,KD,QD,5C,10C,QS,9C,6S,2S,4D,3S,7C,JH,JS,AD,KH,10H,AC,9S,3D','Lenora Shockey','Lois Schneider','Warren Shockey','Randy Schneider','Good Guys','Las Diablas','365,435,365,435,365,435,365,435','Las Diablas',5,'r47,',172),(287,'BC-AB Round 2','2020-10-12','Finished',NULL,'2','',',,,,,,,,,,,,,,,,,r45,r46,r47,r48,g21,,,,,,,,,,,,,,,,,,,,b70,b69,b71,b72,,,,,,,,,,,,,,,,,,,,,y93,y94,y96,y95,,,,,,,,,,,,,,,,,g24,,,,,g22,g23,,,,,,','','2020-10-13 01:03:32','2020-10-16 04:41:20','9S,9H,4H','J4,JD,AD','AC,3C,2S,J3','10S,QC,8S','7S,4C,JH,3D,3S,2H,QD,KH,J2,QS,10H,QH,9C,J1,9D,JS,AS,4D,AH,4S,7C,2D,KD,JC,7H,2C,KC,8H,3H,5C,8D,6D,6C,5D,5H,6S,6H,10C,10D,KS,5S,7D,8C','Lenora Shockey','Lois Schneider','Warren Shockey','Randy Schneider','Good Guys','Las Diablas','365,435,365,435,365,435,365,435','Las Diablas',5,'y94,y93,g21,',172),(288,'BC/AB 3','2020-10-13','Finished',NULL,'1','',',,,,,,,,,,,,,,,,,,r48,r46,r45,,,,,,,r47,,,,,,,,,,,,,,b70,b69,b71,b72,,,,,,,,,,,,,,,,,,,,,y94,y95,y93,y96,,,,,,,,,,,,,,,,,,,,,g23,g21,g22,g24,,,,,','7S,2C,4C,10H,4H,3C,AH,4S,J2,8H,9D,10C,JD,9C,9S,8S,QS,4D,AS,10S,KC,9H,6S,3H,AC,8C,QH,7D,8D,QC,5H,6C,JS,JC,2H,KH','2020-10-13 21:04:29','2020-10-15 19:46:04','KS,2D','5C,JH,6D','','3D,AD','3S,2S,J1,7C,6H,7H,10D,KD,J4,J3,5D,QD,5S','Lenora Shockey','Lois Schneider','Warren Shockey','Randy Schneider','Good Guys','Las Diablas','365,435,365,435,365,435,365,435','Good Guys',5,'b70,',236),(297,'BC/AB 4','2020-10-15','Finished',NULL,'2','',',,,,,,,,,,,,,,,,,r48,r46,r47,r45,,,,,,,,,,,,,,,,,b69,,,,b71,,b72,,,,,,b70,,,,,,,,,g22,,,,,,,y94,y95,y93,y96,,,,,,,,,,,,,,,,,,,,,,g21,g24,g23,,,,,','10S,6D,7C,9D,5H,QS,8C,J3,7D,KS,8D,J2,10C,KD,3H,8H','2020-10-16 01:13:42','2020-10-16 02:58:11','AD,3S,9C','QD,10D','JH,5S,AH','5C,JC,JD','AC,J1,9H,4D,QH,6S,2S,J4,3D,2C,QC,8S,JS,KH,4S,7S,3C,KC,4H,4C,2D,AS,10H,6C,2H,9S,7H,6H,5D','Lenora Shockey','Lois Schneider','Warren Shockey','Randy Schneider','Good Guys','Las Diablas','365,435,365,435,365,435,365,435','Las Diablas',5,'r48,',173),(298,'BC/AB 5','2020-10-18','Finished',NULL,'0','',',,,,,,,,,,,,,,,,,,,,,g21,g22,g23,g24,,,,,,,,,,,,,,,,,,,,,r45,r46,r47,r48,,,,,,,,,,,,,,,,,,,,,b69,b70,b71,b72,,,,,,,,,,,,,,,,,,,,,y93,y94,y95,y96','4D,7C,5D,QD,8H,10H,JC,5C,10D,KH,3H,3S,2S,5H,QC,2D,3C,2C,6D,3D,8C,6S,9H,AH,4H,KD,J1,8D,4C,JD,KC,J2,J4,QS,7S,7D','2020-10-18 15:46:09','2020-10-18 15:46:44','10C,JS,9S,2H,4S','J3,9C,KS,AD,5S','JH,7H,QH,AS,6H','8S,AC,6C,9D,10S','','Lenora Shockey','Lois Schneider','Warren Shockey','Randy Schneider','Good Guys','Las Diablas','290,435,290,435,290,435,290,435','Las Diablas',1,'',0),(301,'BC/AB 6','2020-10-18','Finished',NULL,'2','',',,,,,,,,,,,g23,,,,,,r47,r48,r46,r45,,,,,,,,,,,,,,,,,b70,,,,,,b72,b69,,,,,b71,,,,,,,,,,,,,,,,y93,y95,y94,y96,,,,,,,,,,,,,,,,,,,,,,g21,g22,g24,,,,,','J4,JC,10D,AH,7S,9H,KS,4H,JH,JD,6H,5C,8S,6C,QC,4S','2020-10-18 19:54:45','2020-10-18 21:50:51','8H,JS,9C','QS,8D','QH,9D,5H','4D,KD,AC','7C,KC,3H,4C,3D,2C,5S,AS,2S,3S,10H,5D,2D,10C,10S,2H,3C,J1,J2,7D,6D,6S,7H,9S,J3,8C,KH,QD,AD','Lenora Shockey','Lois Schneider','Warren Shockey','Randy Schneider','Good Guys','Las Diablas','291,435,290,435,290,436,290,435','Las Diablas',1,'y93,',169),(302,'BC/AB 7','2020-10-18','Finished',NULL,'3','',',,,,,,,,,,,,r48,,,,,r47,,r46,r45,,,,,,,,,,,,,,,,,,,,,b69,b70,b71,b72,,,,,,,,,,,,,,,,y93,,,,,,y94,y95,y96,,,,,,,,,,,,,,,,,,,,,g21,g23,g22,g24,,,,,','5D,8H,JS,2C,6C,9D,J3,AS,JH,QD,KH,J4,AC,10D,JC,KS,9H,AD,7C,AH,2D,5C,5H,8C,3S,9S,3D,4C,QS,4H,8S,J2,6H,10S,2S,J1','2020-10-18 21:54:21','2020-10-19 13:52:03','2H,10C,10H,8D,QC','6D,JD,4S,3C,5S','9C,KD,3H,6S','QH,4D,KC,7S,7D','7H','Lenora Shockey','Lois Schneider','Warren Shockey','Randy Schneider','Good Guys','Las Diablas','291,435,290,435,290,436,290,435','Good Guys',1,'g21,',159),(305,'BC/AB 8','2020-10-20','Finished',NULL,'0','',',,,,,,,,,,,,,,,b71,,r45,r48,r46,r47,,,,,,,,,,,,,,,,,,,,,,b72,b69,b70,,,,,,,,,,,,,,,,,,,,,y93,y94,y95,y96,,,,,,,,,,,,,,,,,,,,,g21,g22,g23,g24,,,,,','QH,7D,J2,5C,9S,6H,2C,JH,8C,4H,2D,5D,7H,QD,J4,AD','2020-10-21 01:25:51','2020-10-21 03:01:19','4S,8D','','7S,8S','10H','3D,KS,QC,10S,3S,7C,4C,8H,AS,10C,9C,JD,5H,J1,AC,3C,3H,6C,KD,6S,JC,4D,10D,JS,2H,AH,2S,KC,9D,5S,J3,QS,6D,KH,9H','Lenora Shockey','Lois Schneider','Warren Shockey','Randy Schneider','Good Guys','Las Diablas','291,435,290,435,290,436,290,435','Las Diablas',1,'y93,',181),(311,'Karens Game','2020-10-27','Started',NULL,'0','','r48,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,r45,r46,r47,,,,,,,,,,,,,,y96,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,y93,y94,y95,,','3S,4S,KD,QD,6C,9C,10S,KS,4H,3H,9D,QC,2S,KC,7S,QH,AD,10D,5C,JS,J1,AC,JC,10H,5H,3C,KH,J4,JH,2H,6D,9H,8C,7D,6S,3D,7H,5D,6H,7C,4C,AS,JD,QS,AH,2C','2020-10-27 23:25:11','2020-10-27 23:36:47','','8S,10C','','8H,9S,8D','2D,4D,5S,J2,J3','Karen Boyne','Karen Boyne','','','','','290,435,291,435,290,435,291,435','',1,'r48,',5),(315,'BC/AB 9','2020-10-29','Finished',NULL,'2','','g23,,,,,,,,,,,,,,,,,r45,r46,r47,r48,g21,g22,,,,,,,,b72,,,,,,,,,,,,,,,,,,,b70,,,b71,,,,,,,,,,,,,y93,y94,y95,y96,b69,,,,,,,,,,,,,,,,,,,,,g24,,,,,,,','8C,8S,6H,7H,3D,5C,AD,AS,6D,3S,KS,QH,J1,2H,4S,J3,2C,JC,9C,10H,7S,6S,KH,KC,5H,10D,9H,6C,J2,10C,JH,7C,QS,JS,8D,5D','2020-10-30 01:24:21','2020-10-30 02:14:59','7D,KD,J4,9D,4C','9S,4H,QD,QC','JD,4D,AC,2D,10S','3H,5S,2S,3C,8H','AH','Lenora Shockey','Lois Schneider','Warren Shockey','Randy Schneider','Good Guys','Las Diablas','291,435,290,435,290,436,290,435','Las Diablas',1,'r45,',95),(316,'BC/AB 10','2020-10-29','Finished',NULL,'0','',',g23,,,,,,,,,,,,,,,,r48,r45,r47,r46,g21,,,,,,,,,,,,,b69,,,,,,,,,b71,b70,,,,,b72,,,,,,,,,,,,,,,,y95,y93,y94,y96,,,,,,,,,,,,,,,,,,,,,,,g22,g24,,,,,','','2020-10-30 02:17:07','2020-10-30 03:44:44','3H,4S,6C','4H,AD,5S','8C,10C,3C','KS,JH','2S,J3,7S,AH,10D,4C,6H,6D,2D,9D,8S,3S,QC,JS,AC,7D,KC,7H,QD,9C,JC,10H,KD,5D,9S,5C,5H,4D,JD,AS,8D,J4,7C,QS,2H,J1,J2,KH,QH,8H,6S,10S,9H,2C,3D','Lenora Shockey','Lois Schneider','Warren Shockey','Randy Schneider','Good Guys','Las Diablas','291,435,858,415,290,436,267,439','Las Diablas',1,'r48,',182),(318,'GP 2','2020-10-30','Finished',NULL,'3','',',,,,,,,,,,,,,,r45,,,,r46,r47,r48,,,,,,,,,,,,,,,,,,,,,b69,b70,b71,b72,,,,,,,,,,,,,,,,,,,,,y93,y94,y95,y96,,,,,,,,,,,,,,,,,,,,,g21,g24,g23,g22,,,,,','4D,8D,9C,10S,7H,4C,6C,JC,8H,5C,2H,JS,KC,7D,KS,5H','2020-10-30 22:01:18','2020-10-30 23:24:41','','2D,8C,4H,J4','3D,10C,JH,6S','4S,QH,J3,JD,AS','AD,3S,AH,AC,2S,7S,3H,9H,9D,7C,5D,10D,QC,J1,QS,KD,J2,6H,6D,9S,QD,8S,3C,10H,KH,5S,2C','Lenora Shockey','Flora Shockey','Warren Shockey','Merle Shockey','Hams','XYL\'s','291,435,290,435,291,435,290,435','Hams',1,'g21,',134),(319,'BC/AB 11','2020-10-30','Finished',NULL,'2','',',,,,,,,,,,,,,,,,,r45,r46,r47,r48,,,,,,,,,,,,,,,,b70,,,,,,b71,b72,b69,,,,,,,,,,,,,,,,,,,,,y93,y94,y95,y96,,,,,,,,,,,,,,,,,,,,,g21,g22,g24,g23,,,,,','4D,9C,4H,10S,4S,JH,QC,JS,8D,QS,3C,5S,KS,AS,KH,8H','2020-10-31 02:00:55','2020-10-31 03:27:44','','10C,J4,5H,5C','4C,8S,6D,6S,J2','2H,AH,9D,3S,3D','6H,AC,6C,JD,7C,JC,7S,2S,J3,QH,9S,5D,QD,2C,10H,KC,2D,3H,AD,7D,J1,9H,KD,10D,8C,7H','Lenora Shockey','Lois Schneider','Warren Shockey','Randy Schneider','Good Guys','Las Diablas','291,435,829,438,290,436,290,435','Las Diablas',1,'r45,',158),(320,'Test Game','2020-10-31','Started',NULL,'2','',',,,,,,,,,,,g23,,g21,,,r48,,,r47,r45,,,,,,,,,,,,,,,r46,,,,,,b71,,,b72,,,,,,,,,,,,,,,,,,,,,,,,y96,b69,b70,,,,,y95,,,,g22,,,,,,,,,,,,g24,,y93,y94,,,','JH,8D,9H,JC,6S,2H,8H,6H,2D,6D,9D,5C,10D,2C,3H,AC','2020-10-31 12:59:41','2020-11-10 19:38:12','J3,10H','4D,KS,AH','','4S,JS','10C,7H,4C,JD,J4,7S,J1,8S,3C,5H,5S,6C,9S,2S,7D,4H,KC,QS,5D,AD,3D,KH,J2,AS,9C,10S,QH,QC,KD,3S,QD,8C,7C','Warren Shockey','Warren Shockey','Warren Shockey','Warren Shockey','','','291,435,291,435,290,435,290,435','',0,'g23,',66),(324,'GP 3','2020-11-01','Finished',NULL,'3','',',,,,,,,,,,,,,,,,,r45,r47,r46,r48,,,,,,,,,,,,,,,,,,,,,b69,b71,b70,b72,,,,,,,,,,,,,,,,y93,,,,,,y94,y96,y95,,,,,,,,,,,,,,,,,,,,,g21,g23,g22,g24,,,,,','','2020-11-01 21:54:34','2020-11-01 23:51:54','7C,10H','8H,2H','3H,KS','6C,10D,JS','AS,QD,3D,KC,6D,7H,QH,8C,JH,6H,QS,8S,5H,J4,9D,5D,2D,AD,J2,QC,4D,KH,4H,6S,4C,9S,3C,JD,JC,AC,KD,5S,10C,4S,7S,J3,5C,J1,8D,10S,9C,AH,3S,7D,9H,2C,2S','Lenora Shockey','Flora Shockey','Warren Shockey','Merle Shockey','Hams','XYL\'s','291,435,290,435,290,435,290,435','Hams',1,'g21,',190),(325,'BC/AB 12','2020-11-02','Finished',NULL,'3','',',,,,,,,,,,,,,r45,,,,,r47,r46,r48,,,,,,,,,,,,,,,,,,,,,b69,b71,b72,b70,,,,,,,,,,,,,,,,,,,,,y93,y94,y95,y96,,,,,,,,,,,,,,,,,,,,,g24,g21,g23,g22,,,,,','9C,J4,6S,J2,3D,9H,3S,KH,2C,KD,AC,JC,AH,QS,2H,6D','2020-11-03 02:27:44','2020-11-03 03:20:24','8H,7C,7S,KS','','JS,JH,2S','10C,KC,10H,QC','6C,4H,3H,7H,4D,3C,6H,J3,4C,4S,9S,5C,J1,8S,2D,QD,AD,8D,9D,AS,JD,8C,10S,5D,5S,QH,5H,10D,7D','Lenora Shockey','Lois Schneider','Warren Shockey','Randy Schneider','Good Guys','Las Diablas','291,435,873,456,288,434,290,435','Good Guys',1,'g24,',122),(327,'GP 4','2020-11-03','Finished',NULL,'0','',',,,,,,,,,,,,,,,,,r46,r45,r47,r48,g21,,,,,,,,,,,,,,,,,,b69,,b70,b71,,b72,,,,,,,,,,,,,,,,,,,,,y93,y94,y96,y95,,,,,,,,,,,,,,,,,,,,,,g22,g23,g24,,,,,','4H,7S,10C,10D,JD,2S,10H,8C,9S,J4,6C,KC,4D,AC,J2,9C,8H,5C,JC,4S,J1,7C,QH,J3,6S,2H,3H,9D,AD,AH,JH,6H,7D,KS,3C,3D','2020-11-03 21:54:43','2020-11-03 23:13:26','','5S,5D,10S,AS','5H,8D,6D,QS','9H,QC,KH,KD','8S,2D,4C,QD,JS,2C,7H,3S','Lenora Shockey','Flora Shockey','Warren Shockey','Merle Shockey','Hams','XYL\'s','291,435,290,435,290,435,290,435','XYL\'s',1,'r46,',140),(328,'Sugosa 1','2020-11-04','Finished',NULL,'3','',',,,,,,,,,,,,,,,,,,,r45,,,,,,r47,,,,,,,,,,,,,,,,b69,b70,b71,b72,,r46,,,,,,,,,r48,,,,,,,,,,y93,,y95,y96,,,,,y94,,,,,,,,,,,,,,,,g23,g21,g22,g24,,,,,','9C,AD,8C,4D,4C,5C,10D,J2,5H,2C,9D,6H,6D,7C,AH,JH','2020-11-05 03:10:03','2020-11-05 04:11:22','QS,6C,AS,QD','4H,3C,8H,9H','5S,J3,KH,KC','2H,6S,4S,JD','2D,KD,10S,J4,8S,J1,AC,2S,3H,3S,10H,QH,8D,QC,7D,3D,10C,KS,7H,JS,5D,JC,9S,7S','Margot Floer','Lois Schneider','Doug Floer','Randy Schneider','Guys','Gals','290,435,839,498,290,436,290,435','Guys',1,'b69,',118),(329,'Sugosa 2','2020-11-04','Finished',NULL,'0','',',,,,,,,,,,,,,,,,,r48,r46,r45,r47,,,,,,,,,,,,,,,,,,,,,b70,b69,b71,b72,,,,,,,,,,,,,,,,g22,,,,,y94,y93,y95,y96,,,,,,,,,,,,,,,,,,,,,,g21,g23,g24,,,,,','JS,3S,KS,J2,9H,QD,10D,6D,8D,10H,QH,JD,7H,KC,J4,9D,5C,8C,4H,QS,8H,4S,10C,8S,9S,AC,AS,4D,AD,5D,QC,7S,JC,3C,2H,6S','2020-11-05 04:12:48','2020-11-05 05:26:16','KH,5H,3H,5S,10S','7C,4C,6H,J1,6C','J3,2D,9C,2S,7D','2C,KD,AH,JH','3D','Margot Floer','Lois Schneider','Doug Floer','Randy Schneider','Guys','Gals','290,435,883,520,290,436,290,435','Gals',1,'r48,',150),(331,'BC/AB 13','2020-11-05','Finished',NULL,'1','',',,,,,,,,,,,,,,,,,,,r48,,,,,,,,,r46,,,,,,r47,,,,,,,b69,b70,b72,b71,r45,,,,,,,,,,,,,,,,,,,,,,,y96,,,,,,,,,,,,,,,,,,,,,g22,g21,g24,g23,y93,y94,y95,,','','2020-11-06 02:35:04','2020-11-06 03:05:20','JS,2H,3D','4H,KS,10C,5S','JC,4D,6S,2S','','8S,3H,J4,JD,AH,8H,QH,5H,5D,J2,9D,AC,3S,J3,4S,10H,QC,6H,KC,AS,KH,AD,5C,7C,4C,7H,7D,7S,KD,8D,J1,10S,9S,3C,QS,JH,6D,2C,QD,8C,9H,9C,6C,10D,2D','Lenora Shockey','Lois Schneider','Warren Shockey','Randy Schneider','Good Guys','Las Diablas','291,435,808,559,290,436,290,435','Good Guys',1,'g22,',82),(332,'BC/AB 14','2020-11-05','Finished',NULL,'2','','b71,,,,,,,,,,,,,g21,,,,r46,r45,r47,r48,,,,,,,,,,,,,g22,,,,,,,,b70,,,b72,,,,,,,,,,,,,,,,,,,,,y95,y94,y93,y96,b69,,,,,,,,,,,,g23,,,,,,,,,,,g24,,,,,','7C,10D,4H,JD,6H,JS,J2,2C,JH,QS,9C,AD,7H,9H,2H,7S','2020-11-06 03:06:32','2020-11-06 03:55:33','AH,2S,5H','QC,3H,KC','6S,5D,10C,8C','','2D,QD,4S,8S,J1,7D,3S,6C,3D,4D,KD,4C,8H,JC,10H,AC,9S,KS,10S,AS,9D,J4,5C,QH,J3,3C,KH,6D,5S,8D','Lenora Shockey','Lois Schneider','Warren Shockey','Randy Schneider','Good Guys','Las Diablas','291,435,853,615,290,436,290,435','Las Diablas',1,'r46,',115),(333,'BC/AB 15','2020-11-05','Finished',NULL,'0','','g22,,,,,,,,,,,,,,,,,r47,r48,r46,r45,,,,,,,,,,,,,,,,,,,,,b69,b70,b72,b71,,,,,,,,,,,,,,,,,,,,,y93,y95,y94,y96,,,,,,,,,,,,,,,,,,,,,g21,g23,,g24,,,,,','J4,5H,7H,4C,5S,QS,6C,JH,9H,J3,KS,AC,6D,10S,10D,4S,J1,8C,AS,2H,4H,9D,JS,6H,KD,KH,2D,3D,3H,5C,9C,5D,7S,QD,2S,3C','2020-11-06 03:57:08','2020-11-06 05:21:20','8H,10C,KC,QC','3S,AH,JC,6S','AD,QH,10H,2C','4D,8D,7C','9S,7D,8S,JD,J2','Lenora Shockey','Lois Schneider','Warren Shockey','Randy Schneider','Good Guys','Las Diablas','291,435,881,453,290,436,290,435','Las Diablas',1,'r47,',199),(334,'ATLW 1','2020-11-06','Finished',NULL,'1','',',y94,,,,,,,,,,,,,,,,,,r47,r48,,,,,,,,,,,,,,,,,,,,,b70,b72,b69,b71,r45,r46,,,,,,,,,,,,,,,,,,,,y95,,y96,,,,,,,,,,,,,,,,,,,,,g22,g21,g24,g23,y93,,,,','JD,J1,8C,7S,QH,JS,6H,10S,3S,3H,8H,4D,10H,QS,3C,10C,JH,QC,2H,5C,KC,7H,4C,3D,AH,2C,JC,6S,KS,9H,J2,AS,8S,AC,5D,J3','2020-11-07 02:43:27','2020-11-07 03:35:19','5H','','','4S','AD,2S,9S,6C,KD,5S,QD,8D,7D,J4,7C,KH,4H,9D,2D,9C,10D,6D','Lenora Shockey','Trina Shockey','Warren Shockey','Adam Shockey','Banditos','Chicas','291,435,290,436,899,500,290,435','Banditos',1,'b70,',105),(335,'ATLW 2','2020-11-06','Finished',NULL,'2','',',,,,,,,,,,,,,,,,,r48,r45,r47,r46,,,,,,,,,,,,,,,,,,,,,b71,,b72,,,,,,b70,,,,,,,,,,,,,,,,y94,y93,y95,y96,b69,,,,,,,,,,,,,,g21,,,,,,,g22,g24,g23,,,,,','3D,JS,9D,5C,9S,6D,J2,JH,5D,7C,10H,2D,AH,6H,5S,QH,KS,J4,QD,JD,7D,2C,9H,KD,AC,7S,4H,4C,4S,5H,10S,3S,6S,8C,2H,8S','2020-11-07 03:36:43','2020-11-07 04:46:59','3H,J1,2S','4D,AD,8H','10D,QS,8D,7H','6C,9C,QC,10C','J3,AS,3C,KC,KH,JC','Lenora Shockey','Trina Shockey','Warren Shockey','Adam Shockey','Banditos','Chicas','291,435,290,436,948,401,290,435','Chicas',1,'r48,',154),(337,'GP 5','2020-11-07','Finished',NULL,'2','',',,,,,,,,,,,,,,,,,r46,r45,r47,r48,,,,,,,,,,,,,,,,,,,,,b71,b69,b70,b72,,,,,g24,,,,,,,,,,,,,,,,y94,y93,y95,y96,,,,,,,,,,,,,,,,,,,,,,g21,g23,g22,,,,,','QS,3D,J2,KS,2S,AD,5D,9S,4D,JC,JD,2D,3C,J4,5C,2C,8S,10H,10S,7H,6H,KH,8H,4H,6D,AH,5S,2H,6S,8C,QD,QC,8D,AS,3H,AC','2020-11-07 22:01:36','2020-11-07 23:46:21','6C,4C','QH,10C','7C,10D,9D','','5H,KD,7D,4S,KC,JS,JH,J3,3S,9H,7S,9C,J1','Lenora Shockey','Flora Shockey','Warren Shockey','Merle Shockey','Hams','XYL\'s','291,435,290,435,290,435,290,435','XYL\'s',1,'y94,',194),(340,'BC/AB 16','2020-11-09','Finished',NULL,'0','',',g21,,,,,,,,,,,,,,,,r46,r48,r45,r47,,,,,,,,,,,,,,,,,,,,,b69,b71,b70,b72,,,,,,,,,,,,,,,,,,,,,y93,y94,y95,y96,,,,,,,,,,,,,,,,,,,,,,g22,g23,g24,,,,,','6S,KC,4H,5C,J3,JC,9D,2S,7D,J1,3S,8H,7C,9S,9C,3D,8C,4D,2C,8D,JD,8S,KH,AH,2H,2D,5D,10D,4S,QS,AC,6H,7S,J4,JH,AS','2020-11-10 02:32:42','2020-11-10 04:12:45','10S,QC,5S,6D,QH','4C,J2,6C,QD,10C','5H,KD,9H,JS','KS,3C,3H,10H','7H,AD','Lenora Shockey','Lois Schneider','Warren Shockey','Randy Schneider','Good Guys','Las Diablas','291,435,913,481,290,436,290,435','Las Diablas',1,'y93,r46,',200),(343,'BC/AB 17','2020-11-10','Finished',NULL,'0','',',,,,,,,,,,,,,,,,,r46,r47,r45,r48,g21,,,,,,,,,,,,,,g22,,,,,,b70,,b71,b72,,,,,,,,,,,,,,,,,,,,,y94,y93,y95,y96,b69,,,,,,,,,,,,,,,,,,,,,,g23,g24,,,,,','5D,4H,QD,7H,9H,J2,AS,8S,J3,6H,10S,6S,8H,6C,QC,9D','2020-11-11 02:31:41','2020-11-11 03:24:03','5S,7C','','','JD','5H,7S,AD,8C,9S,JS,KH,5C,8D,AH,JH,6D,J4,3C,KD,2C,4D,4C,KS,10C,3D,2H,2D,AC,3H,J1,10H,JC,10D,3S,2S,4S,7D,KC,QS,QH,9C','Lenora Shockey','Lois Schneider','Warren Shockey','Randy Schneider','Good Guys','Las Diablas','291,435,848,540,290,436,290,435','Las Diablas',1,'r46,',123),(345,'Sugosa 3','2020-11-12','Finished',NULL,'2','',',,,,,,,,,,,,,,,,,r45,r47,r46,r48,,,,,,,,,,g21,,,,,,,,,,,,b71,,b69,,,,,,,,,,,,,,,,,,b70,,,y94,y93,y96,y95,,,,b72,,,,,,,,,,,,,,,,,,g22,g23,g24,,,,,','2S,9C,KD,JH,9S,10H,9D,QC,7S,8C,AC,KS,3H,2C,4H,6S','2020-11-13 03:01:02','2020-11-13 03:56:48','5D,4S,5H','3D,KC,10D','AH,7H,QS,7D','','AD,6C,8H,AS,10S,6D,4C,4D,5C,JS,J2,JC,8D,JD,2H,7C,5S,8S,10C,9H,6H,KH,J3,J1,QH,3C,2D,3S,J4,QD','Margot Floer','Lois Schneider','Doug Floer','Randy Schneider','Guys','Gals','891,463,861,490,290,436,290,435','Gals',1,'y94,',117),(346,'Sugosa 4','2020-11-12','Finished',NULL,'2','',',,,,,,,,,,,,,,,,,r45,r46,r47,r48,,,,,,,,,,,,,,,,,,,,,,,b70,b72,,,,,,,b71,,,,,,,,,,,,,,y95,y94,y93,y96,b69,,,,,,,,,,,,,,,,,,,,g22,g21,g24,g23,,,,,','','2020-11-13 03:58:26','2020-11-13 05:27:47','AC','10D','10C,9C','JC,KH','AH,2S,6S,J1,3C,8D,5D,9H,10S,KD,J2,2D,QH,6C,3H,3S,J4,JD,5C,QC,AS,7C,KS,KC,AD,J3,QS,4S,QD,7D,2C,9D,10H,9S,JS,JH,3D,4H,4C,6H,7S,8H,4D,7H,2H,8C,5H,5S,6D,8S','Margot Floer','Lois Schneider','Doug Floer','Randy Schneider','Guys','Gals','887,433,876,453,888,400,290,435','Gals',1,'y95,',196),(349,'top notch8','2020-11-15','Finished',NULL,'0','',',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,b70,,,,,,,,b69,,,,,b71,b72,,,,,,,,,,,,,,,,,,,,,y96,y94,y95,y93,,,,,,,,,,,,,,,,,,,,,,,,,,,,,','J4,9S,2C,3H,J1,AC,3S,QD,AH,7D,KS,6C,10D,5H,JD,10C,3D,10H,2S,J3,JC,JH,2D,5S,QC,6D,6S,4H,6H,7C,3C,5D,QS,KH,7H,J2,9D,JS,5C,4C,8H,9H,2H,8D,7S,QH','2020-11-15 17:36:32','2020-11-15 18:41:33','','','8C,10S,KC,9C,4D','4S,8S,AD,KD','AS','Flora Shockey','','','Merle Shockey','','','290,435,290,435,290,435,290,435','Flora',1,'y96,',93),(350,'First','2020-11-15','Finished',NULL,'1','',',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,y95,y96,,,,,,y93,,,,,,,,,,,,,,,g22,g21,g23,g24,,y94,,,','9S,5C,10H,3C,8C,5D,4C,6C,QC,5H,J2,2S,J4,9H,7D,7S,9C,7H,2H,AH,6D,KD,JC,6S,QS,AC','2020-11-15 23:23:06','2020-11-16 00:44:06','QD,10C,10D','','','J1,KC,KS','5S,AS,4S,J3,3D,8H,8S,2D,2C,7C,KH,JS,JH,4D,10S,QH,AD,8D,3H,3S,9D,JD,4H,6H','Dan Hayduk','','Edna Hayduk','','','','290,435,290,435,290,435,290,435','Edna',1,'g22,',67);
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
INSERT INTO `schema_migrations` VALUES ('0'),('20200517131558'),('20200523004910'),('20200525135028'),('20200525135224'),('20200525135306'),('20200525135340'),('20200525135556'),('20200527172725'),('20200528133202'),('20200528133223'),('20200528133243'),('20200528133257'),('20200528133438'),('20200608004941'),('20200608010043'),('20200914141508'),('20200914151938'),('20200914222914'),('20200922163656'),('20200925134511'),('20200925193102'),('20201001133121'),('20201006120341'),('20201031144847'),('20201101022254');
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
  `confirmation_token` varchar(255) DEFAULT NULL,
  `confirmed_at` datetime DEFAULT NULL,
  `confirmation_sent_at` datetime DEFAULT NULL,
  `unconfirmed_email` varchar(255) DEFAULT NULL,
  `theme` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_users_on_email` (`email`),
  UNIQUE KEY `index_users_on_reset_password_token` (`reset_password_token`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'wmshockey@gmail.com','$2a$12$C1UrQAoXsKKmwVv72IlRAORESxHSMqOPp.qh6roT/ljrIJExobpZ6',NULL,NULL,NULL,'2020-09-14 15:26:42','2020-11-01 19:38:30','Warren Shockey','p6-r-z3qehfyahmSjuiC','2020-11-01 15:48:46','2020-11-01 15:48:14',NULL,'Standard'),(2,'llshockey@gmail.com','$2a$12$mJ9HtWS0CFSWaKfnPb50uOpvNAbciKzsxo/tVt2qH65kO3xntLX7O',NULL,NULL,NULL,'2020-09-14 23:32:14','2020-11-12 04:32:59','Lenora Shockey','p6-r-z3qehfyahmSjuiC','2020-11-01 15:48:46','2020-11-01 15:48:14',NULL,'Standard'),(3,'amshockey@gmail.com','$2a$12$2GJ82fN3Wg9yhZxL0BzmjuTZgFVC2PVxceVQ4m81ZOHQJoAgS4Xiu',NULL,NULL,'2020-11-07 02:46:30','2020-09-26 17:05:40','2020-11-07 02:46:30','Adam Shockey','p6-r-z3qehfyahmSjuiC','2020-11-01 15:48:46','2020-11-01 15:48:14',NULL,'Standard'),(4,'shockeytrina@gmail.com','$2a$12$OO0KLQVeiLyjK/6BZACdFeqr7IvFjr7BRw..vwpfw0bOheQw7NN0m',NULL,NULL,NULL,'2020-09-26 19:11:01','2020-11-07 04:47:58','Trina Shockey','p6-r-z3qehfyahmSjuiC','2020-11-01 15:48:46','2020-11-01 15:48:14',NULL,'Standard'),(5,'loiszella@gmail.com','$2a$12$roFSS9L7aVOsnrBC/bmC7ONsDoDoFSyAfaJ3id81lWD.k7GVg/swC',NULL,NULL,NULL,'2020-10-10 23:20:59','2020-11-05 03:05:54','Lois Schneider','p6-r-z3qehfyahmSjuiC','2020-11-01 15:48:46','2020-11-01 15:48:14',NULL,'Standard'),(6,'rjamesschneider@gmail.com','$2a$12$igwWDNZD5ZotCbWfhP0AbuErEBVUZE4y/sizYw.sgDphy5srvBdxi',NULL,NULL,NULL,'2020-10-12 19:09:24','2020-11-05 04:15:43','Randy Schneider','p6-r-z3qehfyahmSjuiC','2020-11-01 15:48:46','2020-11-01 15:48:14',NULL,'Standard'),(7,'hayduk@sasktel.net','$2a$12$53yijzJgcZhg5fK0U0rjnO8e9gcIrtX1JJ67AIgFyaY2Jgyvov9fC',NULL,NULL,NULL,'2020-10-15 03:06:42','2020-10-28 22:38:57','Dan Hayduk','p6-r-z3qehfyahmSjuiC','2020-11-01 15:48:46','2020-11-01 15:48:14',NULL,'Standard'),(8,'ehayduk@sasktel.net','$2a$12$5tb2ISPjFXbYTvL6uw//M.2CyrG8J4ffJypqul5i2ACXvX7hu1Nqu',NULL,NULL,'2020-10-15 04:18:08','2020-10-15 03:10:10','2020-11-15 23:28:08','Edna Hayduk','p6-r-z3qehfyahmSjuiC','2020-11-01 15:48:46','2020-11-01 15:48:14',NULL,'Standard'),(10,'f.m.shockey@gmail.com','$2a$12$1ceuoff63pENrBSrXf9H0.6QlknDjb2o9tjEx/eCb3bel34e.kjvG',NULL,NULL,NULL,'2020-10-27 16:14:39','2020-11-01 16:59:27','Flora Shockey','p6-r-z3qehfyahmSjuiC','2020-11-01 15:48:46','2020-11-01 15:48:14',NULL,'Standard'),(11,'kboyne@telus.net','$2a$12$VIjaW3LQMx/uGMuMvEvki.GDs/GxgnNggY9AamVYFPTW9l1NyzeU2',NULL,NULL,NULL,'2020-10-27 23:23:52','2020-10-27 23:23:52','Karen Boyne','p6-r-z3qehfyahmSjuiC','2020-11-01 15:48:46','2020-11-01 15:48:14',NULL,'Standard'),(12,'mshockey@telusplanet.net','$2a$12$hFy51G/yhOAkKSKVJiWNzO.rRaj1oP6e6KLv0tmdJ5x7PmqDsh4xW',NULL,NULL,'2020-11-11 18:28:04','2020-10-29 19:22:48','2020-11-11 18:28:04','Merle Shockey','p6-r-z3qehfyahmSjuiC','2020-11-01 15:48:46','2020-11-01 15:48:14',NULL,'Labeled Marbles'),(14,'doug@floer.ca','$2a$12$LHu56doWYStBYmA30.KkxOa8b6lqMLp3wqDlpYdaDLqchT4T6i7Sa',NULL,NULL,'2020-11-15 02:52:28','2020-11-05 03:06:36','2020-11-15 02:52:28','Godot Floer','z8CXJU8isFG33w8WySzN','2020-11-05 03:09:54','2020-11-05 03:06:36',NULL,'Standard'),(15,'margot@floer.ca','$2a$12$82pFZQVgzFuZ6WRP87zrl.iUrKRX5XNsjZrtS.22OqZN6nsioPOTm',NULL,NULL,'2020-11-05 03:12:00','2020-11-05 03:08:17','2020-11-05 03:12:00','Margot Floer','VzDZiP-sLTwoTsustARb','2020-11-05 03:11:45','2020-11-05 03:08:17',NULL,'Standard');
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

-- Dump completed on 2020-11-16  8:36:44
