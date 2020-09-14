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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=253 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `games`
--

LOCK TABLES `games` WRITE;
/*!40000 ALTER TABLE `games` DISABLE KEYS */;
INSERT INTO `games` VALUES (249,'1','2020-09-13','Started',NULL,'1','',',,,,y96,,,,,,,,,,,,,,r45,r47,r46,,,,,,,,,,,,,,,,,,,,,,,,,,,,r48,,,,,,,,,,y94,,,,,,,y95,,y93,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,','9H,2C,8H,AC,4D,5H','2020-09-13 13:03:01','2020-09-13 22:54:08','','4S,7S,3C,AS','','2D,4H,KC,6D,5C','JD,3S,6S,2S,4C,5S,9C,9S,8D,JH,AD,6H,9D,8C,10C,3H,10D,8S,JC,JS,7C,2H,AH,10H,KD,10S,5D,3D,7H,7D,6C','Warren','Lenora','','','',NULL),(251,'2','2020-09-13','Started',NULL,'0','',',,,,,,,,,,,,,,,,,,,,,,,,,r45,,,,,,,,,,,,,r46,,,,,,,,,,,,,,,,,,,,y94,,,,,,,y95,,y96,,,,,,y93,,,,,,,,r48,r47,,,,,,,,,,,,,,,','2C,2D,2H,2S,3C,3D,3H,3S,4C,4D,4H,4S,5C,5D,5H,5S,6C,6D,6H,6S,7C,7D,7H,7S,8C,8D,8H,8S,9C,9D,9H,9S,10C,10D,10H,10S,AC,AD,AH,AS,JC,JD,JH,JS,KC,KD','2020-09-13 22:56:48','2020-09-14 00:42:17','','J3,J1,QH,QC,KH','','J4,J2,QS,QD,KS','','Warren','Lenora','','','',NULL),(252,'3','2020-09-13','Started',NULL,'1','',',,,,,,r48,,,,,,,r46,,,,,,,r47,,,,,,,,,,,,,,,,,,,,,,,,,r45,,,,,,,,,,,,,,,,,,,,,,y96,,,,,,,,,,,,,,,,,,,,,,,,,,y93,y94,y95,,','J2,8D,8S,9H,QS,2C,9S,KC,JD,JS,9C,4C,KH,J1,JH,7C,10D,JC,6D,6C,J3,6H,8C,AC,5C,AS','2020-09-14 00:47:54','2020-09-14 01:00:00','','AD,9D','','3S,QC,3H,QD,5S','10H,4H,AH,7D,QH,6S,4S,KS,2H,2D,2S,5D,10C,5H,10S,7S,J4,KD','Warren','Lenora','','','',NULL);
/*!40000 ALTER TABLE `games` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `players`
--

DROP TABLE IF EXISTS `players`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `players` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `handle` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `players`
--

LOCK TABLES `players` WRITE;
/*!40000 ALTER TABLE `players` DISABLE KEYS */;
/*!40000 ALTER TABLE `players` ENABLE KEYS */;
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
INSERT INTO `schema_migrations` VALUES ('0'),('20200517131558'),('20200523004910'),('20200525135028'),('20200525135224'),('20200525135306'),('20200525135340'),('20200525135556'),('20200527172725'),('20200528133202'),('20200528133223'),('20200528133243'),('20200528133257'),('20200528133438'),('20200608004941'),('20200608010043');
/*!40000 ALTER TABLE `schema_migrations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-14  7:16:33
