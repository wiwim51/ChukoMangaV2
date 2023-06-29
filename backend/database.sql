-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: chukomanga
-- ------------------------------------------------------
-- Server version	8.0.31
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!50503 SET NAMES utf8 */
;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */
;
/*!40103 SET TIME_ZONE='+00:00' */
;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */
;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */
;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */
;
--
-- Table structure for table `adress`
--

DROP TABLE IF EXISTS `adress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `adress` (
  `id` int NOT NULL AUTO_INCREMENT,
  `adress` varchar(255) DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`, `user_id`),
  KEY `fk_adress_user1_idx` (`user_id`),
  CONSTRAINT `fk_adress_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `adress`
--

LOCK TABLES `adress` WRITE;
/*!40000 ALTER TABLE `adress` DISABLE KEYS */
;
INSERT INTO `adress`
VALUES (1, '4016 Strother Street Alabaster 35007', 2);
/*!40000 ALTER TABLE `adress` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nb_product` int DEFAULT NULL,
  `total_price` decimal(4, 2) DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`, `user_id`),
  KEY `fk_cart_user1_idx` (`user_id`),
  CONSTRAINT `fk_cart_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */
;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `favorite`
--

DROP TABLE IF EXISTS `favorite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `favorite` (
  `product_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`product_id`, `user_id`),
  KEY `fk_product_has_user_user1_idx` (`user_id`),
  KEY `fk_product_has_user_product1_idx` (`product_id`),
  CONSTRAINT `fk_product_has_user_product1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `fk_product_has_user_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `favorite`
--

LOCK TABLES `favorite` WRITE;
/*!40000 ALTER TABLE `favorite` DISABLE KEYS */
;
/*!40000 ALTER TABLE `favorite` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `genre`
--

DROP TABLE IF EXISTS `genre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `genre` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 11 DEFAULT CHARSET = utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `genre`
--

LOCK TABLES `genre` WRITE;
/*!40000 ALTER TABLE `genre` DISABLE KEYS */
;
INSERT INTO `genre`
VALUES (1, 'Award Winning'),
  (2, 'Drama'),
  (3, 'Romance'),
  (4, 'Slice of Life'),
  (5, 'Sports'),
  (6, 'Fantasy'),
  (7, 'Adventure'),
  (8, 'Action'),
  (9, 'Horror'),
  (10, 'Supernatural');
/*!40000 ALTER TABLE `genre` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tome_id` int NOT NULL,
  `user_id` int NOT NULL,
  `etat` varchar(255) DEFAULT NULL,
  `price` decimal(4, 2) DEFAULT NULL,
  `creation_date` date DEFAULT NULL,
  PRIMARY KEY (`id`, `tome_id`, `user_id`),
  KEY `fk_product_tome1_idx` (`tome_id`),
  KEY `fk_product_user1_idx` (`user_id`),
  CONSTRAINT `fk_product_tome1` FOREIGN KEY (`tome_id`) REFERENCES `tome` (`id`),
  CONSTRAINT `fk_product_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 33 DEFAULT CHARSET = utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */
;
INSERT INTO `product`
VALUES (1, 1, 2, 'Bon', 2.95, '2023-02-01'),
  (2, 2, 2, 'Neuf', 4.80, '2023-02-02'),
  (3, 3, 2, 'Très bon', 3.99, '2023-02-03'),
  (4, 4, 2, 'Neuf', 4.99, '2023-02-04'),
  (5, 5, 2, 'Satisfaisant', 1.50, '2023-02-05'),
  (6, 6, 2, 'Bon', 2.45, '2023-02-06'),
  (7, 7, 2, 'Satisfaisant', 1.90, '2023-02-07'),
  (8, 8, 2, 'Bon', 3.10, '2023-02-08'),
  (9, 9, 2, 'Neuf', 4.99, '2023-02-09'),
  (10, 10, 2, 'Bon', 2.90, '2023-02-10'),
  (11, 11, 2, 'Très bon', 3.99, '2023-02-11'),
  (12, 12, 2, 'Neuf', 4.99, '2023-02-12'),
  (13, 13, 2, 'Bon', 2.50, '2023-02-13'),
  (14, 14, 2, 'Très bon', 3.75, '2023-02-14'),
  (15, 15, 2, 'Neuf', 4.49, '2023-02-15'),
  (16, 1, 2, 'Satisfaisant', 3.00, '2023-02-16'),
  (17, 2, 2, 'Très bon', 3.85, '2023-02-17'),
  (18, 3, 2, 'Neuf', 4.25, '2023-02-18'),
  (19, 4, 2, 'Très bon', 3.95, '2023-02-19'),
  (20, 5, 2, 'Neuf', 4.50, '2023-02-20'),
  (31, 8, 2, 'Très bon', 1.00, '2023-03-23'),
  (32, 14, 2, 'Très bon', 96.00, '2023-03-23');
/*!40000 ALTER TABLE `product` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `product_cart`
--

DROP TABLE IF EXISTS `product_cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `product_cart` (
  `product_id` int NOT NULL,
  `cart_id` int NOT NULL,
  PRIMARY KEY (`product_id`, `cart_id`),
  KEY `fk_product_cart_cart1_idx` (`cart_id`),
  CONSTRAINT `fk_product_cart_cart1` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`),
  CONSTRAINT `fk_product_cart_product1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `product_cart`
--

LOCK TABLES `product_cart` WRITE;
/*!40000 ALTER TABLE `product_cart` DISABLE KEYS */
;
/*!40000 ALTER TABLE `product_cart` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `product_image`
--

DROP TABLE IF EXISTS `product_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `product_image` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image` longtext,
  `product_id` int NOT NULL,
  PRIMARY KEY (`id`, `product_id`),
  KEY `fk_product_image_product1_idx` (`product_id`),
  CONSTRAINT `fk_product_image_product1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 28 DEFAULT CHARSET = utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `product_image`
--

LOCK TABLES `product_image` WRITE;
/*!40000 ALTER TABLE `product_image` DISABLE KEYS */
;
INSERT INTO `product_image`
VALUES (
    1,
    'https://d29xot63vimef3.cloudfront.net/image/berserk/1-1.jpg',
    1
  ),
  (
    2,
    'https://d29xot63vimef3.cloudfront.net/image/berserk/2-1.jpg',
    2
  ),
  (
    3,
    'https://d29xot63vimef3.cloudfront.net/image/berserk/3-1.jpg',
    3
  ),
  (
    4,
    'https://d29xot63vimef3.cloudfront.net/image/one-piece/1-1.jpg',
    4
  ),
  (
    5,
    'https://d29xot63vimef3.cloudfront.net/image/one-piece/2-1.jpg',
    5
  ),
  (
    6,
    'https://d29xot63vimef3.cloudfront.net/image/one-piece/3-1.jpg',
    6
  ),
  (
    7,
    'https://m.media-amazon.com/images/I/51PVfxNg0dL._SX334_BO1,204,203,200_.jpg',
    7
  ),
  (
    8,
    'https://m.media-amazon.com/images/I/517G4sTzXdL._SY291_BO1,204,203,200_QL40_ML2_.jpg',
    8
  ),
  (
    9,
    'https://m.media-amazon.com/images/I/41110KFb2XL._SY291_BO1,204,203,200_QL40_ML2_.jpg',
    9
  ),
  (
    10,
    'https://www.nautiljon.com/images/manga_volumes/00/75/mini/6457.webp?11547302997',
    10
  ),
  (
    11,
    'https://www.nautiljon.com/images/manga_volumes/00/46/mini/6964.webp?11557732324',
    11
  ),
  (
    12,
    'https://www.nautiljon.com/images/manga_volumes/00/15/mini/18651.webp?11557732328',
    12
  ),
  (
    13,
    'https://m.media-amazon.com/images/I/5131GcTh02L._SY291_BO1,204,203,200_QL40_ML2_.jpg',
    13
  ),
  (
    14,
    'https://m.media-amazon.com/images/I/51XY8XVHMNL._SY291_BO1,204,203,200_QL40_ML2_.jpg',
    14
  ),
  (
    15,
    'https://m.media-amazon.com/images/I/51OvkZ5O6bL._SY291_BO1,204,203,200_QL40_ML2_.jpg',
    15
  ),
  (
    16,
    'https://d29xot63vimef3.cloudfront.net/image/berserk/1-1.jpg',
    16
  ),
  (
    17,
    'https://d29xot63vimef3.cloudfront.net/image/berserk/2-1.jpg',
    17
  ),
  (
    18,
    'https://d29xot63vimef3.cloudfront.net/image/berserk/3-1.jpg',
    18
  ),
  (
    19,
    'https://d29xot63vimef3.cloudfront.net/image/one-piece/1-1.jpg',
    19
  ),
  (
    20,
    'https://d29xot63vimef3.cloudfront.net/image/one-piece/2-1.jpg',
    20
  ),
  (
    26,
    'http://localhost:4242/uploads/9e0217dc-a262-4b3d-b19a-deca8e882fe3-cat background.jpg',
    31
  ),
  (
    27,
    'http://localhost:4242/uploads/2608b2fb-6ef3-4097-9add-03bc28beebf4-bluelotus.png',
    32
  );
/*!40000 ALTER TABLE `product_image` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `purchase`
--

DROP TABLE IF EXISTS `purchase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `purchase` (
  `id` int NOT NULL AUTO_INCREMENT,
  `purchase_nb` int DEFAULT NULL,
  `date` date DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`, `user_id`),
  KEY `fk_order_user1_idx` (`user_id`),
  CONSTRAINT `fk_order_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `purchase`
--

LOCK TABLES `purchase` WRITE;
/*!40000 ALTER TABLE `purchase` DISABLE KEYS */
;
/*!40000 ALTER TABLE `purchase` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `request`
--

DROP TABLE IF EXISTS `request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `request` (
  `id` int NOT NULL AUTO_INCREMENT,
  `condition` varchar(255) DEFAULT NULL,
  `price` decimal(4, 2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `request`
--

LOCK TABLES `request` WRITE;
/*!40000 ALTER TABLE `request` DISABLE KEYS */
;
/*!40000 ALTER TABLE `request` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `seller_pro`
--

DROP TABLE IF EXISTS `seller_pro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `seller_pro` (
  `id` int NOT NULL AUTO_INCREMENT,
  `siret` int DEFAULT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`, `user_id`),
  KEY `fk_seller_pro_user1_idx` (`user_id`),
  CONSTRAINT `fk_seller_pro_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `seller_pro`
--

LOCK TABLES `seller_pro` WRITE;
/*!40000 ALTER TABLE `seller_pro` DISABLE KEYS */
;
INSERT INTO `seller_pro`
VALUES (1, 2, 'VendeurDeReve', 2),
  (2, 5, 'VendeurDeReveTESTUPDATE', 5);
/*!40000 ALTER TABLE `seller_pro` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `serie`
--

DROP TABLE IF EXISTS `serie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `serie` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `image` longtext,
  `description` longtext,
  `nb_volumes` int DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `launch` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `serie`
--

LOCK TABLES `serie` WRITE;
/*!40000 ALTER TABLE `serie` DISABLE KEYS */
;
INSERT INTO `serie`
VALUES (
    1,
    'Berserk',
    'https://cdn.myanimelist.net/images/manga/1/157897.jpg',
    'Guts, a former mercenary now known as the \"Black Swordsman,\" is out for revenge. After a tumultuous childhood, he finally finds someone he respects and believes he can trust, only to have everything fall apart when this person takes away everything important to Guts for the purpose of fulfilling his own desires. Now marked for death, Guts becomes condemned to a fate in which he is relentlessly pursued by demonic beings.',
    41,
    'Miura Kentarou',
    '1989-08-25'
  ),
  (
    2,
    'One Piece',
    'https://cdn.myanimelist.net/images/manga/2/253146.jpg',
    'Gol D. Roger, a man referred to as the \"Pirate King,\" is set to be executed by the World Government. But just before his demise, he confirms the existence of a great treasure, One Piece, located somewhere within the vast ocean known as the Grand Line. Announcing that One Piece can be claimed by anyone worthy enough to reach it, the Pirate King is executed and the Great Age of Pirates begins.',
    105,
    'Oda Eiichiro',
    '1997-07-22'
  ),
  (
    3,
    'Fullmetal Alchemist	',
    'https://cdn.myanimelist.net/images/manga/3/243675.jpg',
    'Alchemists are knowledgeable and naturally talented individuals who can manipulate and modify matter due to their art. Yet despite the wide range of possibilities, alchemy is not as all-powerful as most would believe. Human transmutation is strictly forbidden, and whoever attempts it risks severe consequences. Even so, siblings Edward and Alphonse Elric decide to ignore this great taboo and bring their mother back to life. Unfortunately, not only do they fail in resurrecting her, they also pay an extremely high price for their arrogance: Edward loses his left leg and Alphonse his entire body. Furthermore, Edward also gives up his right arm in order to seal his brother\'s soul into a suit of armor.',
    27,
    'Arakawa Hiromu',
    '2001-07-12'
  ),
  (
    4,
    'Haikyuu!!',
    'https://cdn.myanimelist.net/images/manga/2/258225.jpg',
    'The whistle blows. The ball is up. A dig. A set. A spike.',
    45,
    'Furudate Haruichi',
    '2012-02-20'
  ),
  (
    5,
    'Nana',
    'https://cdn.myanimelist.net/images/manga/1/262324.jpg',
    'Nana Komatsu is a naive, unmotivated girl who spends her high school days chasing one crush after the other. Despite continually facing failure in her quest for love, her spirits have never dampened. At the age of 20, she finds herself on a train to Tokyo with hopes of reuniting with her current boyfriend.',
    21,
    'Yazawa Ai ',
    '2000-05-26'
  );
/*!40000 ALTER TABLE `serie` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `serie_genre`
--

DROP TABLE IF EXISTS `serie_genre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `serie_genre` (
  `serie_id` int NOT NULL,
  `genre_id` int NOT NULL,
  PRIMARY KEY (`serie_id`, `genre_id`),
  KEY `fk_serie_genre_serie1_idx` (`serie_id`),
  KEY `fk_serie_genre_genre` (`genre_id`),
  CONSTRAINT `fk_serie_genre_genre` FOREIGN KEY (`genre_id`) REFERENCES `genre` (`id`),
  CONSTRAINT `fk_serie_genre_serie1` FOREIGN KEY (`serie_id`) REFERENCES `serie` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `serie_genre`
--

LOCK TABLES `serie_genre` WRITE;
/*!40000 ALTER TABLE `serie_genre` DISABLE KEYS */
;
INSERT INTO `serie_genre`
VALUES (1, 1),
  (1, 2),
  (1, 6),
  (1, 7),
  (1, 8),
  (1, 9),
  (1, 10),
  (2, 6),
  (2, 7),
  (2, 8),
  (3, 1),
  (3, 2),
  (3, 6),
  (3, 7),
  (3, 8),
  (4, 1),
  (4, 5),
  (5, 1),
  (5, 2),
  (5, 3),
  (5, 4);
/*!40000 ALTER TABLE `serie_genre` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `tome`
--

DROP TABLE IF EXISTS `tome`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `tome` (
  `id` int NOT NULL AUTO_INCREMENT,
  `serie_id` int NOT NULL,
  `image` longtext,
  `number` int DEFAULT NULL,
  `tome_release` date DEFAULT NULL,
  PRIMARY KEY (`id`, `serie_id`),
  KEY `fk_tome_serie1_idx` (`serie_id`),
  CONSTRAINT `fk_tome_serie1` FOREIGN KEY (`serie_id`) REFERENCES `serie` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 16 DEFAULT CHARSET = utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `tome`
--

LOCK TABLES `tome` WRITE;
/*!40000 ALTER TABLE `tome` DISABLE KEYS */
;
INSERT INTO `tome`
VALUES (
    1,
    1,
    'https://d29xot63vimef3.cloudfront.net/image/berserk/1-1.jpg',
    1,
    '1990-11-26'
  ),
  (
    2,
    1,
    'https://d29xot63vimef3.cloudfront.net/image/berserk/2-1.jpg',
    2,
    '1991-02-26'
  ),
  (
    3,
    1,
    'https://d29xot63vimef3.cloudfront.net/image/berserk/3-1.jpg',
    3,
    '1991-10-25'
  ),
  (
    4,
    2,
    'https://d29xot63vimef3.cloudfront.net/image/one-piece/1-1.jpg',
    1,
    '1997-12-24'
  ),
  (
    5,
    2,
    'https://d29xot63vimef3.cloudfront.net/image/one-piece/2-1.jpg',
    2,
    '1998-04-03'
  ),
  (
    6,
    2,
    'https://d29xot63vimef3.cloudfront.net/image/one-piece/3-1.jpg',
    3,
    '1998-06-04'
  ),
  (
    7,
    3,
    'https://m.media-amazon.com/images/I/51PVfxNg0dL._SX334_BO1,204,203,200_.jpg',
    1,
    '2002-01-22'
  ),
  (
    8,
    3,
    'https://m.media-amazon.com/images/I/517G4sTzXdL._SY291_BO1,204,203,200_QL40_ML2_.jpg',
    2,
    '2002-05-22'
  ),
  (
    9,
    3,
    'https://m.media-amazon.com/images/I/41110KFb2XL._SY291_BO1,204,203,200_QL40_ML2_.jpg',
    3,
    '2002-09-13'
  ),
  (
    10,
    4,
    'https://www.nautiljon.com/images/manga_volumes/00/75/mini/6457.webp?11547302997',
    1,
    '2012-06-04'
  ),
  (
    11,
    4,
    'https://www.nautiljon.com/images/manga_volumes/00/46/mini/6964.webp?11557732324',
    2,
    '2012-08-03'
  ),
  (
    12,
    4,
    'https://www.nautiljon.com/images/manga_volumes/00/15/mini/18651.webp?11557732328',
    3,
    '2012-10-04'
  ),
  (
    13,
    5,
    'https://m.media-amazon.com/images/I/5131GcTh02L._SY291_BO1,204,203,200_QL40_ML2_.jpg',
    1,
    '2000-05-15'
  ),
  (
    14,
    5,
    'https://m.media-amazon.com/images/I/51XY8XVHMNL._SY291_BO1,204,203,200_QL40_ML2_.jpg',
    2,
    '2000-12-11'
  ),
  (
    15,
    5,
    'https://m.media-amazon.com/images/I/51OvkZ5O6bL._SY291_BO1,204,203,200_QL40_ML2_.jpg',
    3,
    '2001-05-15'
  );
/*!40000 ALTER TABLE `tome` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pseudo` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `pwd` varchar(255) NOT NULL,
  `pwd_forget` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `avatar` longtext,
  `rating` decimal(2, 1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */
;
INSERT INTO `user`
VALUES (
    2,
    'Abdou',
    'Pipeau',
    'Jean',
    'flute',
    NULL,
    'abdou@flute.com',
    'https://avatars.githubusercontent.com/u/9848478?v=4',
    4.2
  ),
  (
    5,
    'Test',
    'Pipeau',
    'Jean',
    'flute',
    NULL,
    'Test@flute.com',
    'https://allworldpm.com/wp-content/uploads/2016/10/230x230-avatar-dummy-profile-pic.jpg',
    4.2
  );
/*!40000 ALTER TABLE `user` ENABLE KEYS */
;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */
;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */
;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */
;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */
;
-- Dump completed on 2023-03-23 15:46:07