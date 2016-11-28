CREATE DATABASE  IF NOT EXISTS `pichangamaker` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `pichangamaker`;
-- MySQL dump 10.13  Distrib 5.6.23, for Win64 (x86_64)
--
-- Host: 173.194.86.41    Database: pichangamaker
-- ------------------------------------------------------
-- Server version	5.6.26

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
-- Table structure for table `asistentes`
--

DROP TABLE IF EXISTS `asistentes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `asistentes` (
  `idPichanga` int(11) NOT NULL,
  `idPersona` int(11) NOT NULL,
  `pagoRealizado` double DEFAULT NULL,
  `observaciones` varchar(120) DEFAULT NULL,
  PRIMARY KEY (`idPichanga`,`idPersona`),
  KEY `fk_Asistencia_Pichanga_idx` (`idPichanga`),
  KEY `fk_Asistencia_Persona1_idx` (`idPersona`),
  CONSTRAINT `fk_Asistencia_Persona1` FOREIGN KEY (`idPersona`) REFERENCES `persona` (`idPersona`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Asistencia_Pichanga` FOREIGN KEY (`idPichanga`) REFERENCES `pichanga` (`idPichanga`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asistentes`
--

LOCK TABLES `asistentes` WRITE;
/*!40000 ALTER TABLE `asistentes` DISABLE KEYS */;
INSERT INTO `asistentes` VALUES (2,1,0,'por correo'),(2,2,0,'como es'),(2,4,0,'<a href = \"http://pichangamaker.com\"> Click Please</a>'),(2,6,0,'http://pad1.whstatic.com/images/thumb/8/8a/Observe-People-Step-4-Version-3.jpg/670px-Observe-People-Step-4-Version-3.jpg'),(2,12,0,''),(2,13,0,''),(2,16,NULL,'enviado desde mi android'),(4,1,0,'go'),(4,2,0,'Apuntense'),(4,4,0,'El 10 '),(4,5,0,'Si va jonathan'),(4,6,0,'Solo advinculas'),(4,7,0,'despues casino? :D'),(4,12,0,''),(4,16,0,'vamos con el verdureto'),(4,17,0,''),(5,1,0,'go angular'),(5,2,0,'Apuntense!'),(5,4,0,'El de arriba es gay'),(5,6,0,'im in'),(5,7,0,'El de abajo es gay'),(5,10,0,''),(5,12,0,'go'),(5,13,0,''),(5,15,0,'en el arco'),(5,17,0,'subiremos a pie'),(5,21,0,'........................................................................................................................'),(5,22,0,'i\'m in'),(7,1,0,''),(7,2,0,'without short'),(7,4,0,'<a herf =\"http://www.paginasamarillas.com.pe/fichas/verizon-peru_423114/\">  Verizon S.R.L </a>'),(7,6,0,'El q pide tiempo es gay'),(7,10,0,'Go'),(7,12,0,'go'),(7,13,0,''),(7,15,0,'de cada 10 uno es gay'),(7,17,0,'go'),(7,21,0,'no debo subir iframes'),(8,1,0,''),(8,2,0,'pichangamaker.com'),(8,4,0,'El de arriba es gaytorade'),(8,5,0,'pichangamaker.com'),(8,6,0,'botellita de jerez'),(8,7,0,'el de abajo es chipi'),(8,10,0,''),(8,12,0,'sin golpear brazo'),(8,13,0,''),(8,21,0,'pichangamaker.com'),(9,1,0,''),(9,2,0,'pichangamaker.com'),(9,4,0,'pichangamaker.com'),(9,5,0,'vale jugar dando pase'),(9,6,NULL,NULL),(9,7,0,'El de arriba se besa con el de abajo'),(9,8,0,'pichangamaker.com'),(9,10,0,''),(9,11,NULL,NULL),(9,12,0,''),(9,13,0,''),(9,17,0,'ojala Raul de pase'),(9,21,NULL,NULL),(9,22,0,''),(11,1,0,''),(11,4,0,'pichangamaker.com'),(11,5,NULL,''),(11,6,NULL,NULL),(11,7,NULL,'el de arriba es gay'),(11,10,NULL,NULL),(11,13,0,''),(11,16,0,'Y el android app?????'),(11,17,0,''),(11,21,NULL,NULL),(12,1,0,'Mao'),(12,4,0,'La versión anterior se podía poner gift :)'),(12,5,0,'el de arriba es gay'),(12,6,NULL,NULL),(12,7,NULL,'el q no va es gay'),(12,12,0,NULL),(12,13,0,''),(12,16,NULL,'puecher'),(12,21,0,'<iframe src=\"http://www.w3schools.com\"></iframe>'),(12,22,0,NULL),(13,1,0,''),(13,4,0,''),(13,5,0,NULL),(13,6,NULL,NULL),(13,7,NULL,'el q no va es gay'),(13,13,0,NULL),(13,16,NULL,'puecher'),(13,21,0,''),(14,1,0,'#pichanganuncamuere'),(14,6,NULL,NULL);
/*!40000 ALTER TABLE `asistentes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chatline`
--

DROP TABLE IF EXISTS `chatline`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chatline` (
  `idChatLine` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` datetime DEFAULT NULL,
  `texto` varchar(500) DEFAULT NULL,
  `room` int(11) NOT NULL,
  `idPersona` int(11) NOT NULL,
  `user` varchar(25) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idChatLine`,`idPersona`,`user`),
  KEY `fk_ChatLine_Pichanga1_idx` (`room`),
  KEY `fk_ChatLine_Persona1_idx` (`idPersona`,`user`),
  CONSTRAINT `fk_ChatLine_Persona1` FOREIGN KEY (`idPersona`, `user`) REFERENCES `persona` (`idPersona`, `user`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_ChatLine_Pichanga1` FOREIGN KEY (`room`) REFERENCES `pichanga` (`idPichanga`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=401 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chatline`
--

LOCK TABLES `chatline` WRITE;
/*!40000 ALTER TABLE `chatline` DISABLE KEYS */;
INSERT INTO `chatline` VALUES (1,'2015-07-08 18:11:23','hola?',2,4,'v151112','Jp el 10'),(2,'2015-07-08 18:11:27','sape!!!!',2,4,'v151112','Jp el 10'),(3,'2015-07-08 18:11:31','hablenp',2,4,'v151112','Jp el 10'),(4,'2015-07-08 18:11:35','go Note!',2,4,'v151112','Jp el 10'),(5,'2015-07-08 18:14:59','oe',2,2,'v174482','Thomas Sifuentes'),(6,'2015-07-08 18:15:04','como es la nuez',2,2,'v174482','Thomas Sifuentes'),(7,'2015-07-08 18:16:08','anybody over here?',2,2,'v174482','Thomas Sifuentes'),(8,'2015-07-08 18:16:17','holi',2,5,'v779535','Magyver Figueroa'),(9,'2015-07-08 18:16:24','hey',2,2,'v174482','Thomas Sifuentes'),(10,'2015-07-08 18:16:27','go no',2,5,'v779535','Magyver Figueroa'),(11,'2015-07-08 18:16:28','panchin',2,2,'v174482','Thomas Sifuentes'),(12,'2015-07-08 18:16:32','go note',2,5,'v779535','Magyver Figueroa'),(13,'2015-07-08 18:16:33','ese maguver',2,2,'v174482','Thomas Sifuentes'),(14,'2015-07-08 18:16:34',':D',2,1,'123','Pancho Vilchez'),(15,'2015-07-08 18:16:41','habla pe magaiva',2,2,'v174482','Thomas Sifuentes'),(16,'2015-07-08 18:16:45','is typing',2,5,'v779535','Magyver Figueroa'),(17,'2015-07-08 18:17:20','who we are?',2,2,'v174482','Thomas Sifuentes'),(18,'2015-07-08 18:17:21','༼ つ ◕_◕ ༽つ ',2,5,'v779535','Magyver Figueroa'),(19,'2015-07-08 18:17:25','who are we?',2,2,'v174482','Thomas Sifuentes'),(20,'2015-07-08 18:17:28','༼ つ ◕_◕ ༽つ ༼ つ ◕_◕ ༽つ ༼ つ ◕_◕ ༽つ ༼ つ ◕_◕ ༽つ ',2,5,'v779535','Magyver Figueroa'),(21,'2015-07-08 18:17:37','toma mi fuerza goku',2,5,'v779535','Magyver Figueroa'),(22,'2015-07-08 18:17:46','ve al bañ',2,2,'v174482','Thomas Sifuentes'),(23,'2015-07-08 18:18:06','esta muy opaco la letra',2,2,'v174482','Thomas Sifuentes'),(24,'2015-07-08 18:18:12','pancho',2,2,'v174482','Thomas Sifuentes'),(25,'2015-07-08 18:20:14','¯\\(°_o)/¯¯\\(°_o)/¯¯\\(°_o)/¯',2,5,'v779535','Magyver Figueroa'),(26,'2015-07-08 18:43:19','lord commander here.',2,6,'v550440','Raul Ramirez Alvarado'),(27,'2015-07-08 19:11:10','who?',2,2,'v174482','Thomas Sifuentes'),(28,'2015-07-09 03:03:04','for the watch',2,6,'v550440','Raul Ramirez Alvarado'),(29,'2015-07-09 03:03:07','the apple watch',2,6,'v550440','Raul Ramirez Alvarado'),(30,'2015-07-09 10:50:47','sup',2,7,'v153895','mOy'),(31,'2015-07-09 10:50:53','go o q',2,7,'v153895','mOy'),(32,'2015-07-09 10:50:56','no traje ni shet :( ',2,7,'v153895','mOy'),(33,'2015-07-09 10:51:02','ggyonexttimebra\'s',2,7,'v153895','mOy'),(34,'2015-07-09 13:04:21','aaa',2,8,'V828223','Joan Odicio'),(35,'2015-07-09 13:04:42','organizen otro dia pero miercoles o lunes pe',2,8,'V828223','Joan Odicio'),(37,'2015-07-09 14:59:16','8:D',2,4,'v151112','Jp el 10'),(38,'2015-07-09 15:00:01','....',2,2,'v174482','Thomas Sifuentes'),(39,'2015-07-09 15:00:03','while ( 1 ) location.href = \"sape.com\';',2,4,'v151112','Jp el 10'),(40,'2015-07-09 15:00:06','escribe p',2,2,'v174482','Thomas Sifuentes'),(41,'2015-07-09 15:00:13','alert(\'aaa\');',2,2,'v174482','Thomas Sifuentes'),(42,'2015-07-09 15:00:28','tommy 8::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::D',2,4,'v151112','Jp el 10'),(43,'2015-07-09 15:00:34','Roy 8D',2,4,'v151112','Jp el 10'),(44,'2015-07-09 15:00:52','Ext.create(\'Ext.button.Button\', {text:\'aaaaaaaa\', renderTo: Ext.getBody()});',2,2,'v174482','Thomas Sifuentes'),(45,'2015-07-09 15:01:18','8=====================================D',2,2,'v174482','Thomas Sifuentes'),(46,'2015-07-09 15:02:04','document.getElementById(\'chatwindow-1124_header-targetEl\').html(\'\');',2,4,'v151112','Jp el 10'),(47,'2015-07-09 15:02:39','Vale joinear en el evento',2,4,'v151112','Jp el 10'),(48,'2015-07-09 15:03:34','jajajajaja',2,1,'123','Pancho Vilchez'),(49,'2015-07-09 15:04:07','holis',2,11,'v151087','Jonathan'),(50,'2015-07-09 15:04:56','sa',2,2,'v174482','Thomas Sifuentes'),(51,'2015-07-09 15:06:50','a',2,11,'v151087','Jonathan'),(52,'2015-07-09 15:06:51','a',2,11,'v151087','Jonathan'),(53,'2015-07-09 15:10:13','http://pichangamaker.com',2,11,'v151087','Jonathan'),(54,'2015-07-09 15:10:31','<a>http://pichangamaker.com</a>',2,11,'v151087','Jonathan'),(55,'2015-07-09 15:10:44','<a>http://pichangamaker.com</a>',2,11,'v151087','Jonathan'),(56,'2015-07-09 15:12:46','jaja',2,4,'v151112','Jp el 10'),(57,'2015-07-09 15:13:03','Hay un click en el grid de pixangas, sale la ubicacion de la cancha',2,4,'v151112','Jp el 10'),(58,'2015-07-09 15:25:00','Colocho llama al tio de la canchap',2,4,'v151112','Jp el 10'),(59,'2015-07-09 15:28:24','ya han confirmado no?',2,12,'alxundr','Alexander'),(60,'2015-07-09 15:28:28','para no llamar por las puras',2,12,'alxundr','Alexander'),(61,'2015-07-09 15:28:42',':D',2,10,'v829414','Wilber'),(62,'2015-07-09 15:28:51','Jp el 10 gg',2,10,'v829414','Wilber'),(63,'2015-07-14 18:11:25','hi ',4,15,'v151016','Erik'),(64,'2015-07-14 18:13:23','alert(\'abc\')',2,15,'v151016','Erik'),(65,'2015-07-14 20:26:39','Go',4,6,'v550440','Raul Ramirez Alvarado'),(66,'2015-07-15 10:51:52','David is GO',4,2,'v174482','Thomas Sifuentes'),(67,'2015-07-15 10:52:10','Jonathan and Roy are GO',4,2,'v174482','Thomas Sifuentes'),(68,'2015-07-15 11:04:35','Moises GO',4,2,'v174482','Thomas Sifuentes'),(69,'2015-07-15 11:09:12','abajo hace frio csm T_T no hay otra cancha ? xd',4,7,'v153895','mOy'),(70,'2015-07-15 11:17:05','hay pichanga?',4,17,'v151018','miguel'),(71,'2015-07-15 11:36:28','claro',4,2,'v174482','Thomas Sifuentes'),(72,'2015-07-15 12:40:53','todos rdy ? salimos a las 6.',4,6,'v550440','Raul Ramirez Alvarado'),(73,'2015-07-15 16:35:38','que fue , separaron cancha ?',4,7,'v153895','mOy'),(74,'2015-08-05 14:16:49',' ',8,5,'v779535','Magyver Figueroa'),(120,'2015-08-05 14:51:45',' ',8,1,'123','Pancho Vilchez'),(121,'2015-08-05 14:51:46',' ',8,1,'123','Pancho Vilchez'),(122,'2015-08-05 14:51:46',' ',8,1,'123','Pancho Vilchez'),(123,'2015-08-05 14:51:47',' ',8,1,'123','Pancho Vilchez'),(124,'2015-08-05 14:53:51',':O',8,7,'v153895','mOy'),(125,'2015-08-05 14:53:58',' ',8,7,'v153895','mOy'),(126,'2015-08-05 16:06:50','k',8,6,'v550440','Raul Ramirez Alvarado'),(127,'2015-08-05 16:06:51','k',8,6,'v550440','Raul Ramirez Alvarado'),(128,'2015-08-05 16:13:49','test',8,4,'v151112','Jp el 10'),(129,'2015-08-05 17:56:02','pichangamaker.com',8,2,'v174482','Thomas Sifuentes'),(130,'2015-08-05 17:56:23','pichangamaker.com',8,2,'v174482','Thomas Sifuentes'),(131,'2015-08-05 17:56:35','pichangamaker.com',8,2,'v174482','Thomas Sifuentes'),(132,'2015-08-05 18:13:18','pichangamaker.com',8,4,'v151112','Jp el 10'),(133,'2015-08-05 18:14:27','pichangamaker.com',8,4,'v151112','Jp el 10'),(134,'2015-08-05 18:18:25','pichangamaker.com',8,4,'v151112','Jp el 10'),(135,'2015-08-05 18:24:05','pichangamaker.com',8,4,'v151112','Jp el 10'),(136,'2015-08-05 18:26:59','pichangamaker.com',8,1,'123','Pancho Vilchez'),(137,'2015-08-05 18:28:25','pichangamaker.com',8,1,'123','Pancho Vilchez'),(138,'2015-08-05 18:55:14','pichangamaker.com',8,6,'v550440','Raul Ramirez Alvarado'),(139,'2015-08-06 10:44:41','q foi',8,7,'v153895','mOy'),(140,'2015-08-10 10:44:49',' ',9,5,'v779535','Magyver Figueroa'),(141,'2015-08-10 10:44:49',' ',9,5,'v779535','Magyver Figueroa'),(142,'2015-08-10 10:44:50',' ',9,5,'v779535','Magyver Figueroa'),(143,'2015-08-10 10:44:50',' ',9,5,'v779535','Magyver Figueroa'),(144,'2015-08-10 10:44:50',' ',9,5,'v779535','Magyver Figueroa'),(145,'2015-08-10 10:44:51',' ',9,5,'v779535','Magyver Figueroa'),(146,'2015-08-10 10:44:52',' ',9,5,'v779535','Magyver Figueroa'),(147,'2015-08-10 10:44:53',' ',9,5,'v779535','Magyver Figueroa'),(148,'2015-08-10 10:44:54',' ',9,5,'v779535','Magyver Figueroa'),(149,'2015-08-10 10:44:54',' ',9,5,'v779535','Magyver Figueroa'),(150,'2015-08-11 11:40:12',':O',9,7,'v153895','mOy'),(151,'2015-08-11 14:17:52',':O',9,17,'v151018','miguel'),(152,'2015-08-11 14:30:17','muy lejos... san Miguel :S',9,19,'gino','Gino'),(153,'2015-08-11 14:36:01','sadassa',9,8,'v828223','Joan Odicio'),(154,'2015-08-11 14:36:05','<img src=\"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR4UQOdECXaRQHP5NWcCvmdLhNHlKCt9vBrWfKD5fV6-CLzR4C6jQvURD0\" alt=\"\" class=\"GeneratedImage\">',9,8,'v828223','Joan Odicio'),(155,'2015-08-11 14:36:06','<img src=\"https://elblogdecosasdivertidas.files.wordpress.com/2011/03/chica8.gif\" alt=\"Mountain View\" style=\"width:304px&lt;/div&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr id=\" gridview-1030-record-ext-record-451\"=\"\" data-boundview=\"gridview-1030\" data-recordid=\"ext-record-451\" data-recordindex=\"3\" class=\"x-grid-row x-grid-row-alt x-grid-data-row\" tabindex=\"-1\" id=\"ext-gen1346\">',9,4,'v151112','Jp el 10'),(156,'2015-08-11 17:16:20','https://elblogdecosasdivertidas.files.wordpress.com/2011/03/chica8.gif',9,11,'v151087','Jonathan'),(157,'2015-08-11 17:17:11','<img src=\"https://elblogdecosasdivertidas.files.wordpress.com/2011/03/chica8.gif\" alt=\"Mountain View\" style=\"width:304px</div></td></tr><tr id=\" gridview-1030-record-ext-record-451\"=\"\" data-boundview=\"gridview-1030\" data-recordid=\"ext-record-451\" data-recordindex=\"3\" class=\"x-grid-row x-grid-row-alt x-grid-data-row\" tabindex=\"-1\" id=\"ext-gen1346\">',9,11,'v151087','Jonathan'),(158,'2015-08-11 23:10:42','Trdt',9,4,'v151112','Jp el 10'),(159,'2015-08-12 09:54:08','Vale borrar registrados ? :D',9,10,'v829414','Wilber'),(160,'2015-08-12 10:45:34','tommy me dijo',9,1,'123','Pancho Vilchez'),(161,'2015-08-12 11:56:44','XD',9,7,'v153895','mOy'),(162,'2015-08-12 11:57:05',' ',9,5,'v779535','Magyver Figueroa'),(163,'2015-08-12 11:57:05',' ',9,5,'v779535','Magyver Figueroa'),(164,'2015-08-12 11:57:05',' ',9,5,'v779535','Magyver Figueroa'),(165,'2015-08-12 11:57:05',' ',9,5,'v779535','Magyver Figueroa'),(166,'2015-08-12 11:57:26','  ',9,5,'v779535','Magyver Figueroa'),(167,'2015-08-12 11:57:26',' ',9,5,'v779535','Magyver Figueroa'),(168,'2015-08-12 11:57:26','  ',9,5,'v779535','Magyver Figueroa'),(169,'2015-08-12 11:57:27',' ',9,5,'v779535','Magyver Figueroa'),(170,'2015-08-12 11:57:27',' ',9,5,'v779535','Magyver Figueroa'),(171,'2015-08-12 11:58:50','<img src=\"http://media.giphy.com/media/5MU1CpICpS01y/giphy.gif\" alt=\"Mountain View\" style=\"width:304px</div></td></tr><tr id=\" gridview-1030-record-ext-record-451\"=\"\" data-boundview=\"gridview-1030\" data-recordid=\"ext-record-451\" data-recordindex=\"3\" class=\"x-grid-row x-grid-row-alt x-grid-data-row\" tabindex=\"-1\" id=\"ext-gen1346\">',9,5,'v779535','Magyver Figueroa'),(172,'2015-08-12 12:04:01',' <img src=\"http://media.giphy.com/media/mhicJGJVAg48w/giphy.gif\" alt=\"Mountain View\" style=\"width:304px</div></td></tr><tr id=\" gridview-1030-record-ext-record-451\"=\"\" data-boundview=\"gridview-1030\" data-recordid=\"ext-record-451\" data-recordindex=\"3\" class=\"x-grid-row x-grid-row-alt x-grid-data-row\" tabindex=\"-1\" id=\"ext-gen1346\">',9,5,'v779535','Magyver Figueroa'),(173,'2015-08-12 12:06:00',' <img src=\"http://giphy.com/gifs/soccer-owned-pdAiipxDMCHni\" alt=\"Mountain View\" style=\"width:304px</div></td></tr><tr id=\" gridview-1030-record-ext-record-451\"=\"\" data-boundview=\"gridview-1030\" data-recordid=\"ext-record-451\" data-recordindex=\"3\" class=\"x-grid-row x-grid-row-alt x-grid-data-row\" tabindex=\"-1\" id=\"ext-gen1346\">',9,5,'v779535','Magyver Figueroa'),(174,'2015-08-12 12:06:44',' <img src=\"http://media2.giphy.com/media/pdAiipxDMCHni/giphy.gif\" alt=\"Mountain View\" style=\"width:304px</div></td></tr><tr id=\" gridview-1030-record-ext-record-451\"=\"\" data-boundview=\"gridview-1030\" data-recordid=\"ext-record-451\" data-recordindex=\"3\" class=\"x-grid-row x-grid-row-alt x-grid-data-row\" tabindex=\"-1\" id=\"ext-gen1346\">',9,5,'v779535','Magyver Figueroa'),(175,'2015-08-12 12:06:48','chaupis style',9,5,'v779535','Magyver Figueroa'),(176,'2015-08-28 14:55:04','as',12,1,'123','Pancho Vilchez'),(177,'2015-08-28 14:55:09','asd',12,1,'123','Pancho Vilchez'),(178,'2015-08-28 14:55:49','asd',12,1,'123','Pancho Vilchez'),(179,'2015-08-28 14:56:14','aDS',12,1,'123','Pancho Vilchez'),(180,'2015-08-28 14:57:46','ASD',12,1,'123','Pancho Vilchez'),(181,'2015-08-28 15:17:14','asd',12,1,'123','Pancho Vilchez'),(182,'2015-08-28 15:30:32','asd',2,1,'123','Pancho Vilchez'),(183,'2015-08-28 15:30:52','asd',2,6,'v550440','Raul Ramirez'),(184,'2015-08-28 15:47:12','asd',2,6,'v550440','Raul Ramirez'),(185,'2015-08-28 16:03:49','h',2,6,'v550440','Raul Ramirez'),(186,'2015-08-28 19:08:43','ho',2,1,'123','Pancho Vilchez'),(187,'2015-08-28 19:09:04','as',2,1,'123','Pancho Vilchez'),(188,'2015-08-28 19:10:46','asd',2,1,'123','Pancho Vilchez'),(189,'2015-08-28 19:12:34','asdx',2,1,'123','Pancho Vilchez'),(190,'2015-08-28 19:12:37','asd',2,1,'123','Pancho Vilchez'),(191,'2015-08-28 19:12:40','como esta',2,1,'123','Pancho Vilchez'),(192,'2015-08-28 19:46:29','hola q ase',2,1,'123','Pancho Vilchez'),(193,'2015-08-28 19:46:32','como esta',2,1,'123','Pancho Vilchez'),(194,'2015-08-28 19:46:35','o q as',2,1,'123','Pancho Vilchez'),(195,'2015-08-28 19:46:38','o q ase',2,1,'123','Pancho Vilchez'),(196,'2015-08-28 19:46:55','o q hacer',2,1,'123','Pancho Vilchez'),(197,'2015-08-28 19:47:01','o q hace o q hace',2,1,'123','Pancho Vilchez'),(198,'2015-08-28 19:47:16','diagle',2,1,'123','Pancho Vilchez'),(199,'2015-08-28 19:47:21','como va eso',2,1,'123','Pancho Vilchez'),(200,'2015-08-28 19:47:28','sale o no la pichanga?',2,1,'123','Pancho Vilchez'),(201,'2015-08-28 19:49:23','askdl aksdl aksl;dkal; sdkla;s kdl;akl ;dkasl;dk a',2,1,'123','Pancho Vilchez'),(202,'2015-08-28 19:49:25','askdj kalsjdk aj',2,1,'123','Pancho Vilchez'),(203,'2015-08-28 19:49:30','no escriban mucho porq se vaa',2,1,'123','Pancho Vilchez'),(204,'2015-08-28 19:49:35','a q pasa',2,1,'123','Pancho Vilchez'),(205,'2015-08-28 19:49:37','o q pasa',2,1,'123','Pancho Vilchez'),(206,'2015-08-28 19:49:40','o k pdos',2,1,'123','Pancho Vilchez'),(207,'2015-08-28 19:49:52','asd',2,1,'123','Pancho Vilchez'),(208,'2015-08-28 19:49:54','lokca',2,1,'123','Pancho Vilchez'),(209,'2015-08-28 19:49:57','loca loca loca loca',2,1,'123','Pancho Vilchez'),(210,'2015-08-28 19:50:00','asd ',2,1,'123','Pancho Vilchez'),(211,'2015-08-28 19:50:00','ads',2,1,'123','Pancho Vilchez'),(212,'2015-08-28 19:53:44','asdjkasd',2,1,'123','Pancho Vilchez'),(213,'2015-08-28 20:54:53','asd',2,1,'123','Pancho Vilchez'),(214,'2015-08-28 20:55:24','asd',2,6,'v550440','Raul Ramirez'),(215,'2015-08-28 20:56:34','asd',2,6,'v550440','Raul Ramirez'),(216,'2015-08-28 20:56:53','sdf',2,6,'v550440','Raul Ramirez'),(217,'2015-08-28 20:58:26','asd',2,1,'123','pancho'),(218,'2015-08-28 20:58:44','hola',2,1,'123','pancho'),(219,'2015-08-28 20:58:55','hola pancho q pas',2,6,'v550440','Raul Ramirez'),(220,'2015-08-28 21:01:00','hi',2,6,'v550440','Raul Ramirez'),(221,'2015-08-28 21:02:48','holia',2,1,'123','pancho'),(222,'2015-08-28 21:03:36','entonces q',2,1,'123','pancho'),(223,'2015-08-28 21:15:11','hi',2,1,'123','pancho'),(224,'2015-08-28 21:15:51','entonces q pesos',2,1,'123','pancho'),(225,'2015-08-28 21:16:11','guao',2,1,'123','pancho'),(226,'2015-08-28 21:18:13','a ass',2,1,'123','pancho'),(227,'2015-08-28 21:18:20','hola me',2,1,'123','pancho'),(228,'2015-08-28 21:18:22','me',2,1,'123','pancho'),(229,'2015-08-28 21:18:23','mr',2,1,'123','pancho'),(230,'2015-08-28 21:18:26','hola panchin',2,6,'v550440','Raul Ramirez'),(231,'2015-08-28 21:21:37','ala',2,1,'123','pancho'),(232,'2015-08-28 21:21:42','en q estan',2,1,'123','pancho'),(233,'2015-08-28 21:25:04','ala',2,1,'123','pancho'),(234,'2015-08-28 21:25:28','holis',2,1,'123','pancho'),(235,'2015-08-28 21:25:47','como va',2,1,'123','pancho'),(236,'2015-08-28 21:25:54','jdkdi',2,1,'123','pancho'),(237,'2015-08-28 21:25:56','iaidof',2,1,'123','pancho'),(238,'2015-08-28 21:26:06','entonces q',2,6,'v550440','Raul Ramirez'),(239,'2015-08-28 21:26:15','ala sc 2 ?',2,6,'v550440','Raul Ramirez'),(240,'2015-08-28 21:26:17','o dota ?',2,6,'v550440','Raul Ramirez'),(241,'2015-08-28 21:26:21','tu diras',2,6,'v550440','Raul Ramirez'),(242,'2015-08-28 21:30:09','hola gente',12,1,'123','pancho'),(243,'2015-08-28 21:30:21','a q hora salimoa ',12,1,'123','pancho'),(244,'2015-08-28 21:32:43','bros before ',11,1,'123','pancho'),(245,'2015-08-28 22:22:08','we ve come a long way',9,1,'123','pancho'),(246,'2015-08-28 22:24:09','hello',7,1,'123','pancho'),(247,'2015-08-29 02:11:12','hi how are you',2,1,'123','pancho'),(248,'2015-08-29 03:08:31','deploy',2,1,'123','pancho'),(249,'2015-08-29 03:10:16','raul',2,1,'123','pancho'),(250,'2015-08-29 03:13:01','holia',2,1,'123','pancho'),(251,'2015-08-29 03:13:09','q pasa aqui',2,1,'123','pancho'),(252,'2015-08-29 04:55:10','hilo',2,1,'123','pancho'),(253,'2015-08-29 04:55:15','hill',2,1,'123','pancho'),(254,'2015-08-29 04:55:20','hdhd',2,1,'123','pancho'),(255,'2015-08-29 04:55:22','jdjd',2,1,'123','pancho'),(256,'2015-08-29 04:58:13','hi',2,1,'123','pancho'),(257,'2015-08-29 05:00:23','nckd',2,1,'123','pancho'),(258,'2015-08-29 05:00:31','como ca',2,1,'123','pancho'),(259,'2015-08-29 05:00:47','salimos o q',2,1,'123','pancho'),(260,'2015-08-29 05:00:57','hold on bitches',2,6,'v550440','Raul Ramirez'),(261,'2015-08-29 05:04:59','jd',2,1,'123','pancho'),(262,'2015-08-29 05:05:02','honwy',2,1,'123','pancho'),(263,'2015-08-29 05:05:09','I understand ',2,6,'v550440','Raul Ramirez'),(264,'2015-08-29 05:05:11','but',2,6,'v550440','Raul Ramirez'),(265,'2015-08-29 05:05:15','you gotta be kidding me',2,6,'v550440','Raul Ramirez'),(268,'2015-08-29 05:33:23','jhh',2,1,'123','Pancho Vilchez'),(269,'2015-08-29 05:33:28','tyy',2,1,'123','Pancho Vilchez'),(270,'2015-08-29 05:42:08','hihi',8,1,'123','Pancho Vilchez'),(271,'2015-08-29 05:42:53','ai es muy largo sw chingjansjsjd s jdbs sjsjndnsjsjdjnd bhdjdj',8,1,'123','Pancho Vilchez'),(272,'2015-08-29 05:43:10','altoq pe bamos',8,1,'123','Pancho Vilchez'),(273,'2015-08-29 05:43:40','ya estamos saliendo...',8,1,'123','Pancho Vilchez'),(274,'2015-08-29 05:46:15','vamos gente',2,1,'123','Pancho Vilchez'),(276,'2015-08-29 13:21:32','hi',12,1,'123','Pancho Vilchez'),(277,'2015-08-29 13:21:52','aqui no me traquearan',12,1,'123','Pancho Vilchez'),(278,'2015-08-29 13:22:09','adios whatsapp',12,1,'123','Pancho Vilchez'),(279,'2015-08-29 13:22:26','11 ptas en q?',12,1,'123','Pancho Vilchez'),(280,'2015-08-29 13:23:00','ah el chat..',12,1,'123','Pancho Vilchez'),(281,'2015-08-29 13:23:41','tus mensajes no se quedan guardados en ',12,1,'123','Pancho Vilchez'),(282,'2015-08-29 13:24:04','en la bd',12,1,'123','Pancho Vilchez'),(283,'2015-08-29 13:24:13','salgo y entro y no se guardan',12,1,'123','Pancho Vilchez'),(284,'2015-08-29 13:24:18','los mios si',12,1,'123','Pancho Vilchez'),(285,'2015-08-29 13:24:28','tienes  enviar tu nombre correcto',12,1,'123','Pancho Vilchez'),(286,'2015-08-29 13:24:31','de tu session',12,1,'123','Pancho Vilchez'),(287,'2015-08-29 13:24:35','no mOy',12,1,'123','Pancho Vilchez'),(288,'2015-08-29 13:24:50','creo q otro',12,1,'123','Pancho Vilchez'),(289,'2015-08-29 13:25:23','se crashea hard ',12,1,'123','Pancho Vilchez'),(290,'2015-08-29 13:25:26','haha',12,1,'123','Pancho Vilchez'),(291,'2015-08-29 13:25:36','pero almenos se deja chatear',12,1,'123','Pancho Vilchez'),(292,'2015-08-29 13:26:12','mvp',12,1,'123','Pancho Vilchez'),(293,'2015-08-29 13:49:18','help',2,1,'123','Pancho Vilchez'),(294,'2015-08-29 13:49:47','whatsap',2,6,'v550440','Raul Ramirez'),(295,'2015-08-30 17:40:00','AsD',7,1,'123','Pancho Vilchez'),(296,'2015-08-30 17:40:55','sxa',7,1,'123','Pancho Vilchez'),(297,'2015-08-30 17:41:01','/',7,1,'123','Pancho Vilchez'),(298,'2015-08-30 17:41:20','lkl;kl;',7,1,'123','Pancho Vilchez'),(299,'2015-08-30 17:41:57',';\';\'l;l;\'l\'l\';l;l\'',7,1,'123','Pancho Vilchez'),(300,'2015-08-30 17:42:24','fhgfgghfghfhfhghfhhfhgfgfghffgf fhgfgghfghfhfhghfhhfhgfgfghffgf fhgfgghfghfhfhghfhhfhgfgfghffgf fhgfgghfghfhfhghfhhfhgfgfghffgf fhgfgghfghfhfhghfhhfhgfgfghffgf fhgfgghfghfhfhghfhhfhgfgfghffgf fhgfgghfghfhfhghfhhfhgfgfghffgf',7,1,'123','Pancho Vilchez'),(301,'2015-08-30 17:42:33','cxv',7,1,'123','Pancho Vilchez'),(302,'2015-08-30 17:42:38','qwert',7,1,'123','Pancho Vilchez'),(303,'2015-08-31 19:24:34','sup',12,21,'v153893','williams'),(304,'2015-08-31 19:25:13','supppp',12,6,'v550440','Raul Ramirez'),(305,'2015-08-31 19:26:03','fgbvc',12,21,'v153893','williams'),(306,'2015-08-31 19:26:20','hero ',12,6,'v550440','Raul Ramirez'),(307,'2015-08-31 19:26:29','sjsjhss',12,21,'v153893','williams'),(308,'2015-08-31 19:27:08','cjg',12,21,'v153893','williams'),(309,'2015-08-31 19:27:43','jajaja',12,6,'v550440','Raul Ramirez'),(310,'2015-08-31 19:27:58','syohdgkhr',12,21,'v153893','williams'),(311,'2015-08-31 19:28:11','',12,21,'v153893','williams'),(312,'2015-08-31 19:28:22','',12,6,'v550440','Raul Ramirez'),(313,'2015-08-31 19:28:24','',12,6,'v550440','Raul Ramirez'),(314,'2015-08-31 19:28:31','⚽️',12,6,'v550440','Raul Ramirez'),(315,'2015-08-31 19:28:45','☺️',12,6,'v550440','Raul Ramirez'),(316,'2015-08-31 19:29:42','...╚',12,21,'v153893','williams'),(317,'2015-08-31 19:30:47','',12,6,'v550440','Raul Ramirez'),(318,'2015-08-31 19:32:23','',12,1,'123','Pancho Vilchez'),(319,'2015-08-31 19:32:37','☺️',12,1,'123','Pancho Vilchez'),(320,'2015-08-31 19:33:04','',12,1,'123','Pancho Vilchez'),(321,'2015-09-01 18:43:55','hello cat',13,1,'123','Pancho Vilchez'),(322,'2015-09-01 18:44:47','ala cat',13,6,'v550440','Raul Ramirez'),(323,'2015-09-01 18:45:49','hi',13,6,'v550440','Raul Ramirez'),(324,'2015-09-01 18:46:24','fif',13,6,'v550440','Raul Ramirez'),(325,'2015-09-01 18:46:24','f',13,6,'v550440','Raul Ramirez'),(326,'2015-09-01 18:46:25','f',13,6,'v550440','Raul Ramirez'),(327,'2015-09-01 18:46:27','f',13,6,'v550440','Raul Ramirez'),(328,'2015-09-01 18:46:27','f',13,6,'v550440','Raul Ramirez'),(329,'2015-09-01 18:46:27','f',13,6,'v550440','Raul Ramirez'),(330,'2015-09-01 18:47:35','',13,6,'v550440','Raul Ramirez'),(331,'2015-09-01 18:47:41','',13,6,'v550440','Raul Ramirez'),(332,'2015-09-01 18:47:48','❤️❤️❤️',13,6,'v550440','Raul Ramirez'),(333,'2015-09-01 18:48:00','',13,6,'v550440','Raul Ramirez'),(334,'2015-09-01 18:48:22','',13,6,'v550440','Raul Ramirez'),(335,'2015-09-01 18:48:34','',13,6,'v550440','Raul Ramirez'),(336,'2015-09-01 21:00:12','hello',13,6,'v550440','Raul Ramirez'),(337,'2015-09-01 21:41:07','…',13,21,'v153893','williams'),(338,'2015-09-01 21:50:56','ala williams vas',13,6,'v550440','Raul Ramirez'),(339,'2015-09-01 22:11:35','whatsapp',13,6,'v550440','Raul Ramirez'),(340,'2015-09-01 22:14:33','asd',13,1,'123','Pancho Vilchez'),(341,'2015-09-01 22:16:48','asd',13,1,'123','Pancho Vilchez'),(342,'2015-09-01 22:17:05','as',13,1,'123','Pancho Vilchez'),(343,'2015-09-01 22:17:57','asdasd',13,1,'123','Pancho Vilchez'),(344,'2015-09-01 22:18:05','asdasda',13,1,'123','Pancho Vilchez'),(345,'2015-09-01 22:27:49','asd',13,1,'123','Pancho Vilchez'),(346,'2015-09-01 22:28:58','asdsa',13,1,'123','Pancho Vilchez'),(347,'2015-09-01 22:29:10','asdsada',13,1,'123','Pancho Vilchez'),(348,'2015-09-01 22:31:52','asd',13,1,'123','Pancho Vilchez'),(349,'2015-09-01 22:32:05','asdasda',13,1,'123','Pancho Vilchez'),(350,'2015-09-01 22:32:09','asdsa',13,1,'123','Pancho Vilchez'),(351,'2015-09-01 22:32:29','asdsadj ashjkdahks',13,1,'123','Pancho Vilchez'),(352,'2015-09-01 22:33:02','ala gente vamos',13,1,'123','Pancho Vilchez'),(353,'2015-09-01 22:34:14','asdsad',13,1,'123','Pancho Vilchez'),(354,'2015-09-01 22:34:33','asdasd',13,1,'123','Pancho Vilchez'),(355,'2015-09-01 22:34:39','asdasda dsa',13,1,'123','Pancho Vilchez'),(356,'2015-09-01 22:58:15','hi',13,6,'v550440','Raul Ramirez'),(357,'2015-09-01 22:58:23','+200',13,21,'v153893','williams'),(358,'2015-09-01 22:58:46','-600',13,21,'v153893','williams'),(359,'2015-09-02 03:06:30','cxxf',13,6,'v550440','Raul Ramirez'),(360,'2015-09-02 03:06:36','ghhh',13,6,'v550440','Raul Ramirez'),(361,'2015-09-02 03:19:37','xvkcx',13,6,'v550440','Raul Ramirez'),(362,'2015-09-02 03:20:05','a',13,6,'v550440','Raul Ramirez'),(363,'2015-09-02 03:20:33','asdasdx',13,6,'v550440','Raul Ramirez'),(364,'2015-09-02 03:21:29','xxxda',13,6,'v550440','Raul Ramirez'),(365,'2015-09-02 03:23:23','asdasd',13,6,'v550440','Raul Ramirez'),(366,'2015-09-02 03:28:15','sfdj',13,6,'v550440','Raul Ramirez'),(367,'2015-09-02 03:28:27','asdas',13,6,'v550440','Raul Ramirez'),(368,'2015-09-02 03:32:22','asdasd',13,6,'v550440','Raul Ramirez'),(369,'2015-09-02 03:32:30','asdxx',13,6,'v550440','Raul Ramirez'),(370,'2015-09-02 03:32:38','adsads',13,6,'v550440','Raul Ramirez'),(371,'2015-09-03 11:28:53','hibo',12,6,'v550440','Raul Ramirez'),(372,'2015-09-03 11:31:15','hijo',12,6,'v550440','Raul Ramirez'),(373,'2015-09-03 11:35:23','mama',12,6,'v550440','Raul Ramirez'),(374,'2015-09-03 11:40:16','frf',12,6,'v550440','Raul Ramirez'),(375,'2015-09-03 11:47:03','gg',12,6,'v550440','Raul Ramirez'),(376,'2015-09-03 12:24:26','hzkd',12,1,'123','Pancho Vilchez'),(377,'2015-09-03 12:24:35','bsjdid',12,1,'123','Pancho Vilchez'),(378,'2015-09-03 12:24:45','qwerrr',12,1,'123','Pancho Vilchez'),(379,'2015-09-03 12:24:52','llll',12,1,'123','Pancho Vilchez'),(380,'2015-09-03 18:31:55','jdjd',12,1,'123','Pancho Vilchez'),(381,'2015-09-03 18:32:56','lasttr',12,1,'123','Pancho Vilchez'),(382,'2015-09-03 18:39:35','this is. me',12,1,'123','Pancho Vilchez'),(383,'2015-09-03 18:39:51','ffgh',12,1,'123','Pancho Vilchez'),(384,'2015-09-03 18:42:54','ddf',12,1,'123','Pancho Vilchez'),(385,'2015-09-03 18:43:58','chg',12,1,'123','Pancho Vilchez'),(386,'2015-09-03 18:52:27','Holis',12,1,'123','Pancho Vilchez'),(387,'2015-09-03 18:53:07','Jdjd',12,1,'123','Pancho Vilchez'),(388,'2015-09-03 18:56:37','Lfkfk',12,1,'123','Pancho Vilchez'),(389,'2015-09-03 18:57:19','Kkk',12,1,'123','Pancho Vilchez'),(390,'2015-09-03 19:05:50','Jkkk',12,1,'123','Pancho Vilchez'),(391,'2015-09-03 19:07:44','Dmd',12,1,'123','Pancho Vilchez'),(392,'2015-09-04 20:20:53','hero',13,1,'123','Pancho Vilchez'),(393,'2015-09-04 20:21:41','hero',12,1,'123','Pancho Vilchez'),(394,'2015-09-04 20:22:02','como tas',12,1,'123','Pancho Vilchez'),(395,'2015-09-04 20:26:19','helo',12,1,'123','Pancho Vilchez'),(396,'2015-09-04 20:28:49','asd',12,1,'123','Pancho Vilchez'),(397,'2015-09-04 20:30:09','asd',12,1,'123','Pancho Vilchez'),(398,'2015-09-04 20:38:05','asd',12,1,'123','Pancho Vilchez'),(399,'2015-09-04 20:39:51','asd',12,1,'123','Pancho Vilchez'),(400,'2015-09-04 20:42:27','asd',12,1,'123','Pancho Vilchez');
/*!40000 ALTER TABLE `chatline` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `connectionhistory`
--

DROP TABLE IF EXISTS `connectionhistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `connectionhistory` (
  `idPersona` int(11) NOT NULL,
  `user` varchar(25) NOT NULL,
  `idPichanga` int(11) NOT NULL,
  `lastConnection` datetime DEFAULT NULL,
  PRIMARY KEY (`idPersona`,`user`,`idPichanga`),
  KEY `fk_ConnectionHistory_Pichanga1_idx` (`idPichanga`),
  CONSTRAINT `fk_ConnectionHistory_Persona1` FOREIGN KEY (`idPersona`, `user`) REFERENCES `persona` (`idPersona`, `user`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_ConnectionHistory_Pichanga1` FOREIGN KEY (`idPichanga`) REFERENCES `pichanga` (`idPichanga`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `connectionhistory`
--

LOCK TABLES `connectionhistory` WRITE;
/*!40000 ALTER TABLE `connectionhistory` DISABLE KEYS */;
INSERT INTO `connectionhistory` VALUES (1,'123',2,'2015-08-29 13:50:03'),(1,'123',4,'2015-08-30 17:19:33'),(1,'123',5,'2015-08-28 19:40:52'),(1,'123',7,'2015-08-30 18:12:00'),(1,'123',8,'2015-08-29 05:47:38'),(1,'123',9,'2015-08-29 05:47:39'),(1,'123',11,'2015-08-29 13:18:41'),(1,'123',12,'2015-09-04 21:25:56'),(1,'123',13,'2015-09-04 20:21:36'),(2,'v174482',2,'2015-07-09 15:17:46'),(2,'v174482',4,'2015-07-15 13:15:03'),(2,'v174482',5,'2015-07-20 17:44:19'),(2,'v174482',7,'1980-12-09 00:00:00'),(2,'v174482',8,'2015-08-05 17:56:47'),(2,'v174482',9,'2015-08-11 17:45:29'),(4,'v151112',2,'2015-07-23 12:58:24'),(4,'v151112',4,'2015-07-15 11:46:06'),(4,'v151112',5,'2015-07-23 12:58:32'),(4,'v151112',7,'1980-12-09 00:00:00'),(4,'v151112',8,'2015-08-05 19:08:32'),(4,'v151112',9,'2015-08-12 11:06:28'),(4,'v151112',11,'1980-12-09 00:00:00'),(5,'v779535',2,'2015-07-09 16:46:59'),(5,'v779535',4,'2015-07-15 14:17:38'),(5,'v779535',5,'2015-07-22 23:17:39'),(5,'v779535',7,'1980-12-09 00:00:00'),(5,'v779535',8,'2015-08-05 14:16:52'),(5,'v779535',9,'2015-08-12 12:06:55'),(5,'v779535',11,'1980-12-09 00:00:00'),(5,'v779535',13,'2015-09-03 21:31:20'),(6,'v550440',2,'2015-08-29 13:50:03'),(6,'v550440',4,'2015-07-23 01:06:47'),(6,'v550440',5,'2015-07-23 01:03:08'),(6,'v550440',7,'1980-12-09 00:00:00'),(6,'v550440',8,'2015-08-06 11:46:02'),(6,'v550440',9,'2015-08-12 05:57:55'),(6,'v550440',11,'2015-09-01 21:44:42'),(6,'v550440',12,'2015-09-04 20:24:03'),(6,'v550440',13,'2015-09-02 04:17:24'),(6,'v550440',14,'2015-09-04 21:23:54'),(7,'v153895',2,'2015-07-09 11:42:07'),(7,'v153895',4,'2015-07-15 16:35:38'),(7,'v153895',5,'1980-12-09 00:00:00'),(7,'v153895',8,'2015-08-06 10:44:42'),(7,'v153895',9,'2015-08-14 13:27:03'),(7,'v153895',11,'1980-12-09 00:00:00'),(8,'V828223',2,'2015-07-09 13:04:46'),(8,'v828223',9,'2015-08-11 14:36:56'),(10,'v829414',2,'2015-07-09 15:35:05'),(10,'v829414',5,'1980-12-09 00:00:00'),(10,'v829414',7,'1980-12-09 00:00:00'),(10,'v829414',9,'2015-08-12 13:21:19'),(10,'v829414',11,'2015-08-19 17:18:29'),(11,'v151087',2,'2015-07-09 16:20:44'),(11,'v151087',7,'2015-08-11 17:20:09'),(11,'v151087',8,'2015-08-11 17:20:03'),(11,'v151087',9,'2015-08-11 17:18:55'),(12,'alxundr',2,'2015-07-09 17:10:14'),(12,'alxundr',4,'1980-12-09 00:00:00'),(12,'alxundr',5,'1980-12-09 00:00:00'),(12,'alxundr',7,'1980-12-09 00:00:00'),(12,'alxundr',8,'2015-08-05 16:12:43'),(12,'alxundr',9,'2015-08-11 14:16:37'),(13,'susanda',2,'1980-12-09 00:00:00'),(13,'susanda',5,'1980-12-09 00:00:00'),(13,'susanda',7,'1980-12-09 00:00:00'),(13,'susanda',8,'1980-12-09 00:00:00'),(13,'susanda',9,'2015-08-11 17:16:48'),(13,'susanda',11,'1980-12-09 00:00:00'),(14,'V550550',2,'2015-07-09 18:16:38'),(15,'v151016',2,'2015-07-14 18:13:30'),(15,'v151016',4,'2015-07-14 18:11:43'),(15,'v151016',5,'1980-12-09 00:00:00'),(15,'v151016',7,'1980-12-09 00:00:00'),(16,'v174477',4,'2015-07-14 21:46:55'),(16,'v174477',11,'1980-12-09 00:00:00'),(17,'v151018',4,'2015-07-15 11:17:17'),(17,'v151018',5,'1980-12-09 00:00:00'),(17,'v151018',7,'1980-12-09 00:00:00'),(17,'v151018',9,'2015-08-11 14:17:55'),(17,'v151018',11,'1980-12-09 00:00:00'),(18,'v830152',2,'2015-07-16 12:15:05'),(18,'v830152',4,'2015-07-16 12:13:28'),(19,'gino',2,'1980-12-09 00:00:00'),(19,'gino',4,'2015-07-20 17:46:12'),(19,'gino',5,'2015-07-20 17:49:28'),(19,'gino',7,'1980-12-09 00:00:00'),(19,'gino',8,'2015-08-11 14:36:14'),(19,'gino',9,'2015-08-11 14:40:54'),(21,'v153893',7,'1980-12-09 00:00:00'),(21,'v153893',8,'1980-12-09 00:00:00'),(21,'v153893',12,'2015-08-31 19:31:24'),(21,'v153893',13,'2015-09-01 22:59:04'),(22,'V648075',5,'1980-12-09 00:00:00'),(22,'V648075',8,'2015-08-05 18:17:35'),(22,'V648075',9,'2015-08-11 16:43:09'),(23,'floma4y',2,'2015-07-30 18:11:21'),(23,'floma4y',4,'2015-07-30 18:10:52'),(23,'floma4y',5,'1980-12-09 00:00:00'),(23,'floma4y',7,'2015-07-30 18:04:15');
/*!40000 ALTER TABLE `connectionhistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empresa`
--

DROP TABLE IF EXISTS `empresa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `empresa` (
  `idEmpresa` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `lat` varchar(20) DEFAULT NULL,
  `lng` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`idEmpresa`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empresa`
--

LOCK TABLES `empresa` WRITE;
/*!40000 ALTER TABLE `empresa` DISABLE KEYS */;
INSERT INTO `empresa` VALUES (1,'Verizon','-12.1196257','-77.03739150000001'),(2,'BCP','-12.069538270159754','-76.93689107894897');
/*!40000 ALTER TABLE `empresa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `login` (
  `user` varchar(25) NOT NULL,
  `pass` blob,
  `verified` tinyint(1) DEFAULT NULL,
  `token` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
INSERT INTO `login` VALUES ('123','202cb962ac59075b964b07152d234b70',1,''),('153893','5525ff59adcaac313923ab89d0a618c5',0,'313533383933'),('alxundr','45f0c57e4ebcfe9717bbcdb73ba1fb2b',1,'616c78756e6472'),('floma4y','22149056141bac71b543311b979999ba',1,'666c6f6d613479'),('gino','202cb962ac59075b964b07152d234b70',1,'67696e6f'),('susanda','c26b99b310957c0dcb21378c579ebf3e',1,'737573616e6461'),('v#$%^','a2057c68d4922339e2a003405705e9ec',0,'762324255e'),('v151016','4cb9c8a8048fd02294477fcb1a41191a',1,'76313531303136'),('v151018','35a86b5d0e488812b58beb79a88a8a8c',1,'76313531303138'),('v151087','96d3eb7892c2c27ca1683110acc162e6',1,'76313531303837'),('v151112','3e8fc8cbc8f7f62cc33e2b35143ae2f1',1,'76313531313132'),('v153893','5525ff59adcaac313923ab89d0a618c5',1,'7631353338393333'),('v153895','202cb962ac59075b964b07152d234b70',1,'76313533383935'),('v174477','4cb9c8a8048fd02294477fcb1a41191a',1,'76313734343737'),('v174482','1dc55c98343fd4c9738fcab6018f8923',1,'76313734343832'),('v550440','666442f1bbc965815c5017a5d7bbd669',1,'76353530343430'),('v627511','202cb962ac59075b964b07152d234b70',1,'76363237353131'),('V648075','52c69e3a57331081823331c4e69d3f2e',1,'56363438303735'),('v779535','5f4dcc3b5aa765d61d8327deb882cf99',1,'76373739353335'),('v828223','f510b87b8c2efb5562be8c33f2bcd30d',1,'56383238323233'),('v829414','e10adc3949ba59abbe56e057f20f883e',1,'76383239343134'),('v830152','c27c72c1b531223a49732b4a34901cef',1,'76383330313532');
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `persona`
--

DROP TABLE IF EXISTS `persona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `persona` (
  `idPersona` int(11) NOT NULL AUTO_INCREMENT,
  `dni` varchar(10) DEFAULT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `idEmpresa` int(11) NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  `user` varchar(25) NOT NULL,
  PRIMARY KEY (`idPersona`,`user`),
  KEY `fk_Persona_Empresa1_idx` (`idEmpresa`),
  KEY `fk_Persona_login1_idx` (`user`),
  CONSTRAINT `fk_Persona_Empresa1` FOREIGN KEY (`idEmpresa`) REFERENCES `empresa` (`idEmpresa`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Persona_login1` FOREIGN KEY (`user`) REFERENCES `login` (`user`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `persona`
--

LOCK TABLES `persona` WRITE;
/*!40000 ALTER TABLE `persona` DISABLE KEYS */;
INSERT INTO `persona` VALUES (1,'72895677','Pancho Vilchez','995434141',1,'vilchez.francisco@pucp.pe','123'),(2,'45608569','Thomas Sifuentes','6314865',1,'smthomas1203@gmail.com','v174482'),(4,'70443993','Jp el 10','989438653',1,'jpcardenas@pucp.pe','v151112'),(5,'12345678','Magyver Figueroa','985037996',1,'magyver.figueroa@gmail.com','v779535'),(6,'11111111','Raul Ramirez','993929314',1,'erreauele@gmail.com','v550440'),(7,'45454545','mOy','999999999',1,'moisesqc24@gmail.com','v153895'),(8,'4421210','Joan Odicio','4421210',1,'Yusuke.joan@gmail.com','v828223'),(9,'153893','wskcoder','153893',1,'test@gmail.com','153893'),(10,'45038613','Wilber','940170199',1,'winftc@gmail.com','v829414'),(11,'44444920','Jonathan','980737205',1,'jonathanpba@gmail.com','v151087'),(12,'70435993','Alexander','987531800',1,'alwongm@gmail.com','alxundr'),(13,'41746752','david susanibar','51993964349',1,'david.susanibar@verizon.com','susanda'),(15,'000','Erik','0000',1,'erik@chaupis.com','v151016'),(16,'44073426','Jimmy','994984494',1,'jimmyej23@gmail.com','v174477'),(17,'43786266','miguel','992847695',1,'miguelcordovadev@gmail.com','v151018'),(18,'47471453','Carlos Calla','998994424',1,'calla.alarcon@gmail.com','v830152'),(19,'12345678','Gino','997779928',1,'gino.ureta@verizon.com','gino'),(21,'45335599','williams','944818281',1,'wmanriques@gmail.com','v153893'),(22,'09599876','Francisco Cordero','999098812',1,'frcordero91@gmail.com','V648075'),(23,'70427823','Marco Flores','99999999',1,'marcozfr@gmail.com','floma4y'),(24,'0000#45','JCARLOS','55555corriente',1,'jcarlos.ortiz.cunza@gmail.com','v627511'),(25,'sdf#$%','Jcarlos','555corriente',1,'jcarlos.ortiz.cunza@gmail.com','v#$%^');
/*!40000 ALTER TABLE `persona` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pichanga`
--

DROP TABLE IF EXISTS `pichanga`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pichanga` (
  `idPichanga` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(120) DEFAULT NULL,
  `precio` double DEFAULT NULL,
  `modoPago` varchar(45) DEFAULT NULL,
  `fechaInicio` datetime DEFAULT NULL,
  `fechaFin` datetime DEFAULT NULL,
  `idPersona` int(11) NOT NULL,
  `minIntegrantes` int(11) DEFAULT NULL,
  `maxIntegrantes` int(11) DEFAULT NULL,
  `observaciones` varchar(120) DEFAULT NULL,
  `lugar` varchar(200) DEFAULT NULL,
  `isPrivate` tinyint(1) DEFAULT NULL,
  `lat` varchar(20) DEFAULT NULL,
  `lng` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`idPichanga`),
  KEY `fk_Pichanga_Persona1_idx` (`idPersona`),
  CONSTRAINT `fk_Pichanga_Persona1` FOREIGN KEY (`idPersona`) REFERENCES `persona` (`idPersona`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pichanga`
--

LOCK TABLES `pichanga` WRITE;
/*!40000 ALTER TABLE `pichanga` DISABLE KEYS */;
INSERT INTO `pichanga` VALUES (2,'Pixanga VEC ',10,'Efectivo','2015-07-10 00:00:00','2015-07-10 01:00:00',4,10,15,'After Pixanga - Go Note','Circuito de playas, Lima 15074, Peru',0,'-12.121110350573964','-77.04450130462646'),(4,'Pichanga VEC 2',10,'Efectivo','2015-07-15 23:00:00','2015-07-16 01:00:00',2,10,15,'Costa Verde','Circuito de Playas 20, Lima 15074, Peru',0,'-12.121645322020157','-77.04497873783112'),(5,'Pichanga VEC 3.0',10,'Efectivo','2015-07-24 00:00:00','2015-07-24 01:00:00',2,10,16,'The schedule could be 6-8 if it isn\'t possible 7-8, please take the money and be early in costa verde','Circuito de Playas 20, Lima 15074, Peru',0,'-12.121466998323958','-77.04503774642944'),(7,'Pichanga VEC 4.0',10,'Efectivo','2015-07-31 00:00:00','2015-07-31 01:00:00',1,10,18,'Ya esta reservada la cancha','Circuito de Playas 20, Lima 15074, Peru',0,'-12.121645322020157','-77.04497873783112'),(8,'VEC 5',11,'Efectivo','2015-08-07 00:30:00','2015-08-07 02:00:00',1,9,18,'Donde siempre no mas. Go. La pichanga nunca muere','Circuito de Playas 20, Lima 15074, Peru',0,'-12.121645322020157','-77.04497873783112'),(9,'VEC 6.0.0.1',12,'Efectivo','2015-08-13 00:00:00','2015-08-13 01:30:00',1,10,18,'Magdalena','Circuito de Playas 20, Lima 15074, Peru',0,'-12.0721573','-77.1034934'),(11,'VEC 7.0',10,'Efectivo','2015-08-20 23:00:00','2015-08-21 00:00:00',1,10,18,'Magadalena (Date and location changed)','Circuito de Playas 20, Lima 15074, Peru',0,'12.121466998323958','-77.04503774642944'),(12,'vec 8',10,'Efectivo','2015-08-28 00:00:00','2015-08-28 01:00:00',1,8,16,'first time on web','Costa Verde',0,'-12.123145334275344','-77.03988790512085'),(13,'[VEC-09] pichanga go pro',10,'Efectivo','2015-09-03 23:00:00','2015-09-04 00:00:00',5,10,1,'vayan p','Circuito de Playas 20, Lima 15074, Peru',0,'-12.120355094941276','-77.04529523849487'),(14,'vec 10 in a row',10,'Efectivo','2015-09-11 00:00:00','2015-09-11 01:00:00',1,8,16,'10th aniversary','Costa Verde',0,'-12.123145334275344','-77.03988790512085');
/*!40000 ALTER TABLE `pichanga` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-09-04 17:42:33
