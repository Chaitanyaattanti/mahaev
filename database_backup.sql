-- MySQL dump 10.13  Distrib 5.7.24, for osx11.1 (x86_64)
--
-- Host: localhost    Database: cur
-- ------------------------------------------------------
-- Server version	8.3.0

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
-- Table structure for table `datasets`
--

DROP TABLE IF EXISTS `datasets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `datasets` (
  `dataset_id` int NOT NULL AUTO_INCREMENT,
  `dataset_name` varchar(255) NOT NULL,
  `dataset_description` text,
  `dataset_source` varchar(255) DEFAULT NULL,
  `dataset_url` text NOT NULL,
  `added_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`dataset_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `datasets`
--

LOCK TABLES `datasets` WRITE;
/*!40000 ALTER TABLE `datasets` DISABLE KEYS */;
INSERT INTO `datasets` VALUES (6,'LG 18650HG2 Li-ion Battery Data','High-precision lithium-ion battery testing data from McMaster University featuring a 3Ah LG HG2 cell tested in controlled thermal conditions. Includes charge-discharge cycles, voltage-current measurements with 0.1% accuracy, and deep feedforward neural network (FNN) scripts for SOC estimation. Data supports battery management system development, state-of-charge prediction, and xEV battery research with complete data acquisition and training examples.','Kollmeyer et al. (2020), Mendeley Data V3, doi: 10.17632/cp3473x7xv.3','dataset1.zip','2026-01-24 14:29:18'),(7,'Mechanically Induced Thermal Runaway for Li-ion Batteries','Comprehensive safety testing data examining thermal runaway behavior in Li-ion batteries across various applications (mobile phones, EVs, energy storage systems). Features standardized single-side indentation test protocol with time-series measurements of cell voltage, compressive load, indenter stroke, and temperature. Includes 100+ battery records with thermal runaway severity scores (0-100), complete cell parameters (dimensions, mass, chemistry, SOC, capacity), and calculation schemes for risk assessment and safety analysis.','Lin et al. (2024), Mendeley Data V2, doi: 10.17632/sn2kv34r4h.2','dataset2.zip','2026-01-24 14:29:18'),(8,'Mechanically Induced Thermal Runaway for Li-ion Batteries (V1)','Initial version of comprehensive safety testing data examining thermal runaway behavior in Li-ion batteries across various applications (mobile phones, EVs, energy storage systems). Features standardized single-side indentation test protocol with time-series measurements of cell voltage, compressive load, indenter stroke, and temperature. Includes 100+ battery records with thermal runaway severity scores (0-100), complete cell parameters, and calculation schemes for risk assessment.','Lin et al. (2023), Mendeley Data V1, doi: 10.17632/sn2kv34r4h.1','dataset3.zip','2026-01-24 14:29:18'),(10,'CALCE Battery Data','Battery testing datasets and related resources from the CALCE (Center for Advanced Life Cycle Engineering) Battery Data repository.','CALCE, University of Maryland','https://calce.umd.edu/battery-data','2026-01-28 16:37:38');
/*!40000 ALTER TABLE `datasets` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-05 14:11:19
