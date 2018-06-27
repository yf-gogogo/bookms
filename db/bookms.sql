/*
Navicat MySQL Data Transfer

Source Server         : 209
Source Server Version : 50722
Source Host           : 111.230.89.209:3306
Source Database       : bookms

Target Server Type    : MYSQL
Target Server Version : 50722
File Encoding         : 65001

Date: 2018-06-27 11:36:18
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for book
-- ----------------------------
DROP TABLE IF EXISTS `book`;
CREATE TABLE `book` (
  `book_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '书籍id',
  `book_name` varchar(50) DEFAULT NULL COMMENT '书名',
  `book_writer` varchar(50) DEFAULT NULL COMMENT '作者',
  `pub_company` varchar(50) DEFAULT NULL COMMENT '出版社',
  `current_num` int(11) DEFAULT NULL COMMENT '剩余数量',
  `book_des` varchar(1000) DEFAULT NULL COMMENT '书籍描述',
  `pub_date` date DEFAULT NULL COMMENT '出版日期',
  `book_cover` varchar(255) DEFAULT NULL COMMENT '封面图片',
  PRIMARY KEY (`book_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of book
-- ----------------------------
INSERT INTO `book` VALUES ('1', '习近平的七年知青岁月', '中央党校采访实录编辑室', '中共中央党校出版社', '73', '1969年1月，习近平总书记15岁时来到陕西省延川县文安驿公社梁家河大队插队落户，直至1975年10月。这组采访实录共采访了29人，其中既有同他一起插队的北京知青，又有同他朝夕相处的当地村民，还有当年同他相知相交的各方面人士。这些受访者通过自己的亲身经历，用真实的历史细节讲述了习近平总书记当年“苦其心志、劳其筋骨、饿其体肤、空乏其身”的历练故事，再现了习近平总书记知青时期的艰苦生活和成长历程。', '2017-08-01', 'http://img3m2.ddimg.cn/37/0/25146532-1_b_1.jpg');
INSERT INTO `book` VALUES ('2', 'Java编程思想（第4版） [thinking in java]', '[美] Bruce Eckel 著；陈昊鹏 译', '机械工业出版社', '4727', '《计算机科学丛书：Java编程思想（第4版）》赢得了全球程序员的广泛赞誉，即使是最晦涩的概念，在BruceEckel的文字亲和力和小而直接的编程示例面前也会化解于无形。', '2018-04-06', 'https://images-cn.ssl-images-amazon.com/images/I/51lMLob62AL._AA218_.jpg');
INSERT INTO `book` VALUES ('3', '从你的全世界路过 [I belonged to you]', '张嘉佳 著', '湖南文艺出版社', '10', '《从你的全世界路过：让所有人心动的故事》是新媒体时代的写故事高手张嘉佳的短篇小说集。读过睡前故事的人会知道，这是一本精彩纷呈的书。书中讲述了发生在我们身边的爱情故事，故事里的人物嘴贱心善，真实得就像身边的哥儿们和闺密，在深夜和你掏心掏肺地讲述，讲述他走过的千山万水，经历过的爱恨情仇。那么多的故事，情节曲折，细节动人，有温暖的，有明亮的，有落单的，有疯狂的，有无聊的，有胡说八道的；有念念不忘的美好，有爱而不得的疼痛，有生离死别的遗憾，有一再错过的宿命，也有喧嚣之后的回归和温暖。当你辗转失眠时，当你需要安慰时，当你赖床慵懒时，当你等待列车时……无论何时何地你都能翻开这本书，找到一篇好看的故事。总有那么一些瞬间，你会在张嘉佳的故事里看到自己，也总有那么一些瞬间，你会因为这些故事，而想到某个人，某段爱情。《从你的全世界路过：让所有人心动的故事》注定会在你的记忆里，留下印记，刻下痕迹，因为这本书，是关于你的故事。', '2018-04-03', 'https://img3.doubanio.com/lpic/s27102925.jpg');
INSERT INTO `book` VALUES ('4', '信息简史', '格雷克', '人民邮电出版社', '1', '一部“简”史怎么这么厚?你或许会问。那只是因为人与信息遭遇的历史由来已久,而信息的存储、获取、操纵和传递又与我们息息相关,尤其是在一个所谓“信息社会”、“信息时代”里。科普畅销书作家詹姆斯·格雷克(其《混沌》一书销售已超过百万册)从这段厚重的历史中精选出几个关键片段,为我们勾勒出了信息的过去、现在与未来,并给我们提供了一个看待信息的全新框架,从而让我们意识到信息是定义现代社会的特征,也是我们理解这个时代的关键。', '2013-12-01', 'http://image12.bookschina.com/2013/20131217/B6394052.jpg');
INSERT INTO `book` VALUES ('5', '浪潮之巅-下册-第二版', '吴军', '人民邮电出版社', '0', '这不是一本科技产业发展历史集，而是在这个数字时代，一本it人非读不可，而非it人也应该阅读的作品。     一个企业的发展与崛起，绝非只是空有领导强人即可达成。任何的决策、同期的商业环境，都在都影响着企业的兴衰。《浪潮之巅》不只是一本历史书，除了讲述科技顶尖企业的发展规律，对于华尔街如何左右科技公司，以及金融风暴对科技产业的冲击，也多有着墨。此外，这本书也着力讲述很多尚在普及或将要发生的，比如微博和云计算，以及对下一代互联网科技产业浪潮的判断和预测。因为在极度商业化的今天，科技的进步和商机是分不开的。      诚如作者所言：“人的商业知识和眼光不是天生的，需要不断地、有心地学习。经过多年的学习、思考和实践，我认定这样一个规律，就是：科技的发展不是均匀的，而是以浪潮的形式出现。每一个人都应该看清楚浪潮，赶上浪潮，如此，便不枉此生。” ', '2013-07-01', 'http://image12.bookschina.com/2014/20140306/B5914840.jpg');
INSERT INTO `book` VALUES ('6', '浪潮之巅-上册-第二版', '吴军', '人民邮电出版社', '0', '这不是一本科技产业发展历史集，而是在这个数字时代，一本it人非读不可，而非it人也应该阅读的作品。     一个企业的发展与崛起，绝非只是空有领导强人即可达成。任何的决策、同期的商业环境，都在都影响着企业的兴衰。《浪潮之巅》不只是一本历史书，除了讲述科技顶尖企业的发展规律，对于华尔街如何左右科技公司，以及金融风暴对科技产业的冲击，也多有着墨。此外，这本书也着力讲述很多尚在普及或将要发生的，比如微博和云计算，以及对下一代互联网科技产业浪潮的判断和预测。因为在极度商业化的今天，科技的进步和商机是分不开的。     诚如作者所言：“人的商业知识和眼光不是天生的，需要不断地、有心地学习。经过多年的学习、思考和实践，我认定这样一个规律，就是：科技的发展不是均匀的，而是以浪潮的形式出现。每一个人都应该看清楚浪潮，赶上浪潮，如此，便不枉此生。” ', '2013-07-01', 'http://image12.bookschina.com/2013/20131111/B5914831.jpg');
INSERT INTO `book` VALUES ('7', '机器学习', '[英] 弗拉赫（Peter Flach） 著，段菲 译 ', '人民邮电出版社', '1', '《机器学习》是全面的机器学习教材之一。书中首先介绍了机器学习的构成要素（任务、模型、特征）和机器学习任务，接着详细分析了逻辑模型（树模型、规则模型）、几何模型（线性模型和基于距离的模型）和概率模型，然后讨论了特征、模型的集成，以及被机器学习研究者称为“实验”的方法。作者不仅使用了已有术语，还引入了一些新的概念，同时提供了大量精选的示例和插图解说。', '2016-01-01', 'http://img3m0.ddimg.cn/53/22/23829650-1_b_1.jpg');
INSERT INTO `book` VALUES ('8', '深度学习', '[美]Ian Goodfellow（伊恩·古德费洛）', '人民邮电出版社', '0', '《深度学习》由全球知名的三位专家Ian Goodfellow、Yoshua Bengio 和Aaron Courville撰写，是深度学习领域奠基性的经典教材。全书的内容包括3个部分：第1部分介绍基本的数学工具和机器学习的概念，它们是深度学习的预备知识；第2部分系统深入地讲解现今已成熟的深度学习方法和技术；第3部分讨论某些具有前瞻性的方向和想法，它们被公认为是深度学习未来的研究重点。 《深度学习》适合各类读者阅读，包括相关专业的大学生或研究生，以及不具有机器学习或统计背景、但是想要快速补充深度学习知识，以便在实际产品或平台中应用的软件工程师。', '2017-07-01', 'http://img3m2.ddimg.cn/32/0/25111382-1_l_3.jpg');

-- ----------------------------
-- Table structure for borrow_record
-- ----------------------------
DROP TABLE IF EXISTS `borrow_record`;
CREATE TABLE `borrow_record` (
  `borrow_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '借阅id',
  `user_id` int(11) DEFAULT NULL COMMENT '用户id',
  `book_id` int(11) DEFAULT NULL COMMENT '图书id',
  `borrow_date` varchar(255) DEFAULT NULL COMMENT '借阅日期',
  `return_date` varchar(255) DEFAULT NULL COMMENT '归还日期',
  `borrow_status` enum('5','4','3','2','1','0') DEFAULT '0' COMMENT '0：申请借书，1：同意借书，2：借书完成，3：申请还书，4：同意还书，5：还书完成',
  `form_id` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`borrow_id`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of borrow_record
-- ----------------------------
INSERT INTO `borrow_record` VALUES ('33', '1', '1', '2018-5-30 11:11:06', null, '5', '1527651957998', null, null);
INSERT INTO `borrow_record` VALUES ('34', '2', '7', '2018-5-30 11:19:37', '19', '5', '1527650548872', null, null);
INSERT INTO `borrow_record` VALUES ('35', '1', '1', '2018-5-30 11:49:48', null, '5', '1527652442742', null, null);
INSERT INTO `borrow_record` VALUES ('41', '1', '3', '2018-5-31 09:48:18', null, '5', '1527731489459', null, null);
INSERT INTO `borrow_record` VALUES ('42', '1', '3', '2018-5-31 09:51:44', null, '5', '1527733233644', null, null);
INSERT INTO `borrow_record` VALUES ('43', '1', '4', '2018-5-31 10:20:56', null, '5', '1527733497914', null, null);
INSERT INTO `borrow_record` VALUES ('44', '1', '1', '2018-5-31 10:25:46', null, '5', '1527734258427', null, null);
INSERT INTO `borrow_record` VALUES ('52', '2', '1', '2018-6-8 14:36:19', null, '5', '1528439880464', null, null);
INSERT INTO `borrow_record` VALUES ('53', '2', '1', '2018-6-8 14:48:02', null, '5', '1528441024476', null, null);
INSERT INTO `borrow_record` VALUES ('54', '2', '1', '2018-6-8 15:01:01', null, '5', '1528441340445', null, null);
INSERT INTO `borrow_record` VALUES ('67', '3', '8', '2018-6-25 07:53:33', null, '2', '1529913212445', '2018-06-25 07:53:33', '2018-06-25 07:54:47');
INSERT INTO `borrow_record` VALUES ('71', '8', '1', '2018-6-26 01:40:03', null, '5', '1529977771672', '2018-06-26 01:40:03', '2018-06-26 01:50:39');
INSERT INTO `borrow_record` VALUES ('72', '10', '7', '2018-6-26 01:44:02', null, '5', 'c623ffc545325bb0542e93c694d6dd98', '2018-06-26 01:44:02', '2018-06-26 01:50:35');

-- ----------------------------
-- Table structure for order_record
-- ----------------------------
DROP TABLE IF EXISTS `order_record`;
CREATE TABLE `order_record` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `book_id` int(11) DEFAULT NULL,
  `order_date` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of order_record
-- ----------------------------
INSERT INTO `order_record` VALUES ('4', '2', '7', '2018-05-30');
INSERT INTO `order_record` VALUES ('5', '10', '8', '2018-6-26 01:43:51');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `user_name` varchar(255) DEFAULT NULL COMMENT '用户姓名',
  `user_cardid` varchar(20) DEFAULT NULL COMMENT '校园卡号',
  `user_phone` varchar(20) DEFAULT NULL COMMENT '手机号',
  `is_admin` enum('1','0') DEFAULT '0' COMMENT '是否为管理员',
  `user_email` varchar(255) DEFAULT NULL COMMENT '邮箱',
  `user_nickname` varchar(255) DEFAULT NULL,
  `session_key` varchar(50) DEFAULT NULL,
  `openid` varchar(50) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '马燕峰', '110', '', '1', '1140357028@qq.com', null, '2NxVU9JJYyySaCJScKOECQ==', 'ofn2t4ilorJDG2X4xelxF_U1VyDQ', null, null);
INSERT INTO `user` VALUES ('2', null, null, null, '0', null, null, '3P6W1AGKWAUUM5HG95z1YA==', 'ofn2t4nBzrLgWcxwATK1l5xL_6hc', '2018-06-25 06:23:55', '2018-06-25 06:23:55');
INSERT INTO `user` VALUES ('3', '林炳', '2016112863', '13297920692', '0', '1542721301@qq.com', null, 'a5CMXon7CrFA3XsAQVx65w==', 'ofn2t4n5iJbAImlPKjhggzjztb0k', '2018-06-25 07:51:53', '2018-06-25 07:53:24');
INSERT INTO `user` VALUES ('4', null, null, null, '0', null, null, 'lUYRK4wnIMNcV5R8CtUNSA==', 'ofn2t4mv-6zoM0VqA3E_45aCeRDY', '2018-06-25 08:01:50', '2018-06-25 08:01:50');
INSERT INTO `user` VALUES ('5', '张凡', '2016112892', '18696192239', '0', '734278852@qq.com', null, 'AEksvhvF7r0dR6gx3Fkctg==', 'ofn2t4tMZG1MsIDPg1wGhm8ZHFXo', '2018-06-25 08:05:52', '2018-06-25 08:07:05');
INSERT INTO `user` VALUES ('6', null, null, null, '0', null, null, 'L+znASTdlPSIGNqQSX+Qgw==', 'ofn2t4tF5MPhvHfKy1RYDeZ-o9FI', '2018-06-25 08:10:23', '2018-06-25 08:10:23');
INSERT INTO `user` VALUES ('7', '储相瑞', '2016112869', '', '0', '1946242833@qq.com', null, 'HCybkcoK+Pe1sxHzK1oxnQ==', 'ofn2t4sNgrEkHtRfqrL3YN7YIg-w', '2018-06-25 08:27:57', '2018-06-25 08:29:36');
INSERT INTO `user` VALUES ('8', '林正英', '120', '', '0', '1131542953@qq.com', null, 'uhl3e40wvq8ALa+a07UTBA==', 'ofn2t4pirVpilrzHK0qaQgT1-gYU', '2018-06-25 08:45:24', '2018-06-25 08:46:55');
INSERT INTO `user` VALUES ('9', null, null, null, '0', null, null, 'e+FpdrXgiSk+7hvpC1s1/Q==', 'ofn2t4vihoPpFiHD7UJe1Lhgy4qg', '2018-06-26 01:25:46', '2018-06-26 01:25:46');
INSERT INTO `user` VALUES ('10', '张晓彤', '2017113207', '', '0', '625909925@qq.com', null, 'RP/2ArgkODIlBSn2qjjf2Q==', 'ofn2t4rTb_R8XQkg2f3nCJtC74uk', '2018-06-26 01:42:18', '2018-06-26 01:43:24');
INSERT INTO `user` VALUES ('11', '敖俊杰', '2015111234', '', '0', 'aoao.et@qq.com ', null, '4b1C0f3hilkokOhjlVxCJw==', 'ofn2t4sLCwm0FQ-lo58qqsZGuIHY', '2018-06-26 08:09:22', '2018-06-26 08:23:07');

-- ----------------------------
-- Table structure for user_action
-- ----------------------------
DROP TABLE IF EXISTS `user_action`;
CREATE TABLE `user_action` (
  `action_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL COMMENT '用户id',
  `action_type` enum('1','2','3') DEFAULT '1' COMMENT '用户行为，1代表借书，2代表还书，3代表预定',
  `action_date` date DEFAULT NULL COMMENT '日期',
  PRIMARY KEY (`action_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_action
-- ----------------------------
INSERT INTO `user_action` VALUES ('1', '2', '1', '2018-04-17');

-- ----------------------------
-- Procedure structure for test
-- ----------------------------
DROP PROCEDURE IF EXISTS `test`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `test`()
BEGIN
update book set current_num=4 where book_id = 2;
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for test1
-- ----------------------------
DROP PROCEDURE IF EXISTS `test1`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `test1`()
BEGIN
update book set current_num=current_num+1 where book_id = 2;
END
;;
DELIMITER ;

-- ----------------------------
-- Event structure for event1
-- ----------------------------
DROP EVENT IF EXISTS `event1`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` EVENT `event1` ON SCHEDULE EVERY 10 SECOND STARTS '2018-06-12 19:33:34' ON COMPLETION NOT PRESERVE ENABLE DO CALL test1()
;;
DELIMITER ;
