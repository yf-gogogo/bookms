/*
Navicat MySQL Data Transfer

Source Server         : 119.29.245.143
Source Server Version : 50721
Source Host           : 119.29.245.143:3306
Source Database       : bookms

Target Server Type    : MYSQL
Target Server Version : 50721
File Encoding         : 65001

Date: 2018-05-06 11:25:19
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of book
-- ----------------------------
INSERT INTO `book` VALUES ('1', '习近平的七年知青岁月', '中央党校采访实录编辑室', '中共中央党校出版社', '27', '1969年1月，习近平总书记15岁时来到陕西省延川县文安驿公社梁家河大队插队落户，直至1975年10月。这组采访实录共采访了29人，其中既有同他一起插队的北京知青，又有同他朝夕相处的当地村民，还有当年同他相知相交的各方面人士。这些受访者通过自己的亲身经历，用真实的历史细节讲述了习近平总书记当年“苦其心志、劳其筋骨、饿其体肤、空乏其身”的历练故事，再现了习近平总书记知青时期的艰苦生活和成长历程。', '2017-08-01', 'http://119.29.245.143/images/xijinping.jpg');
INSERT INTO `book` VALUES ('2', 'Java编程思想（第4版） [thinking in java]', '[美] Bruce Eckel 著；陈昊鹏 译', '机械工业出版社', '0', '《计算机科学丛书：Java编程思想（第4版）》赢得了全球程序员的广泛赞誉，即使是最晦涩的概念，在BruceEckel的文字亲和力和小而直接的编程示例面前也会化解于无形。', '2018-04-06', 'https://images-cn.ssl-images-amazon.com/images/I/51lMLob62AL._AA218_.jpg');
INSERT INTO `book` VALUES ('3', '从你的全世界路过 [I belonged to you]', '张嘉佳 著', '湖南文艺出版社', '19', '《从你的全世界路过：让所有人心动的故事》是新媒体时代的写故事高手张嘉佳的短篇小说集。读过睡前故事的人会知道，这是一本精彩纷呈的书。书中讲述了发生在我们身边的爱情故事，故事里的人物嘴贱心善，真实得就像身边的哥儿们和闺密，在深夜和你掏心掏肺地讲述，讲述他走过的千山万水，经历过的爱恨情仇。那么多的故事，情节曲折，细节动人，有温暖的，有明亮的，有落单的，有疯狂的，有无聊的，有胡说八道的；有念念不忘的美好，有爱而不得的疼痛，有生离死别的遗憾，有一再错过的宿命，也有喧嚣之后的回归和温暖。当你辗转失眠时，当你需要安慰时，当你赖床慵懒时，当你等待列车时……无论何时何地你都能翻开这本书，找到一篇好看的故事。总有那么一些瞬间，你会在张嘉佳的故事里看到自己，也总有那么一些瞬间，你会因为这些故事，而想到某个人，某段爱情。《从你的全世界路过：让所有人心动的故事》注定会在你的记忆里，留下印记，刻下痕迹，因为这本书，是关于你的故事。', '2018-04-03', 'https://img3.doubanio.com/lpic/s27102925.jpg');
INSERT INTO `book` VALUES ('5', '浪潮之巅-下册-第二版', '吴军', '人民邮电出版社', '30', '这不是一本科技产业发展历史集，而是在这个数字时代，一本it人非读不可，而非it人也应该阅读的作品。     一个企业的发展与崛起，绝非只是空有领导强人即可达成。任何的决策、同期的商业环境，都在都影响着企业的兴衰。《浪潮之巅》不只是一本历史书，除了讲述科技顶尖企业的发展规律，对于华尔街如何左右科技公司，以及金融风暴对科技产业的冲击，也多有着墨。此外，这本书也着力讲述很多尚在普及或将要发生的，比如微博和云计算，以及对下一代互联网科技产业浪潮的判断和预测。因为在极度商业化的今天，科技的进步和商机是分不开的。      诚如作者所言：“人的商业知识和眼光不是天生的，需要不断地、有心地学习。经过多年的学习、思考和实践，我认定这样一个规律，就是：科技的发展不是均匀的，而是以浪潮的形式出现。每一个人都应该看清楚浪潮，赶上浪潮，如此，便不枉此生。” ', '2013-07-01', 'http://image12.bookschina.com/2014/20140306/B5914840.jpg');
INSERT INTO `book` VALUES ('6', '浪潮之巅-上册-第二版', '吴军', '人民邮电出版社', '0', '这不是一本科技产业发展历史集，而是在这个数字时代，一本it人非读不可，而非it人也应该阅读的作品。     一个企业的发展与崛起，绝非只是空有领导强人即可达成。任何的决策、同期的商业环境，都在都影响着企业的兴衰。《浪潮之巅》不只是一本历史书，除了讲述科技顶尖企业的发展规律，对于华尔街如何左右科技公司，以及金融风暴对科技产业的冲击，也多有着墨。此外，这本书也着力讲述很多尚在普及或将要发生的，比如微博和云计算，以及对下一代互联网科技产业浪潮的判断和预测。因为在极度商业化的今天，科技的进步和商机是分不开的。     诚如作者所言：“人的商业知识和眼光不是天生的，需要不断地、有心地学习。经过多年的学习、思考和实践，我认定这样一个规律，就是：科技的发展不是均匀的，而是以浪潮的形式出现。每一个人都应该看清楚浪潮，赶上浪潮，如此，便不枉此生。” ', '2013-07-01', 'http://image12.bookschina.com/2013/20131111/B5914831.jpg');

-- ----------------------------
-- Table structure for borrow_record
-- ----------------------------
DROP TABLE IF EXISTS `borrow_record`;
CREATE TABLE `borrow_record` (
  `borrow_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '借阅id',
  `user_id` int(11) DEFAULT NULL COMMENT '用户id',
  `book_id` int(11) DEFAULT NULL COMMENT '图书id',
  `borrow_date` datetime DEFAULT NULL COMMENT '借阅日期',
  `return_date` datetime DEFAULT NULL COMMENT '归还日期',
  `borrow_status` enum('1','0') DEFAULT '0' COMMENT '0:审核中，1：审核通过',
  PRIMARY KEY (`borrow_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of borrow_record
-- ----------------------------
INSERT INTO `borrow_record` VALUES ('1', '1', '1', '2018-04-22 02:56:44', null, '0');

-- ----------------------------
-- Table structure for order_record
-- ----------------------------
DROP TABLE IF EXISTS `order_record`;
CREATE TABLE `order_record` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `book_id` int(11) DEFAULT NULL,
  `order_date` datetime DEFAULT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of order_record
-- ----------------------------
INSERT INTO `order_record` VALUES ('1', '1', '2', '2018-04-22 02:58:43');
INSERT INTO `order_record` VALUES ('2', '1', '6', '2018-04-23 01:16:25');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `user_name` varchar(20) DEFAULT NULL COMMENT '用户姓名',
  `user_cardid` varchar(20) DEFAULT NULL COMMENT '校园卡号',
  `user_phone` varchar(20) DEFAULT NULL COMMENT '手机号',
  `is_admin` enum('1','0') DEFAULT '0' COMMENT '是否为管理员',
  `user_email` varchar(20) DEFAULT NULL COMMENT '邮箱',
  `user_nickname` varchar(20) DEFAULT NULL,
  `session_key` varchar(50) DEFAULT NULL,
  `openid` varchar(50) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '马燕峰', '2017100208', '', '0', 'lxtx2013@foxmail.com', null, 'CI/9dKL6aNIMDx+CDekXJg==', 'ofn2t4ilorJDG2X4xelxF_U1VyDQ');
INSERT INTO `user` VALUES ('2', null, null, null, '0', null, null, 'i+9rN70yAGWrTr93ZORbmA==', 'ofn2t4sGgfmBDmTWjt__FhMoHXpE');
INSERT INTO `user` VALUES ('3', null, null, null, '0', null, null, 'fjs612gqur/3uwtdnb9Acw==', 'ofn2t4vrmNho1Dp7r7gwzR9Ck2lc');

-- ----------------------------
-- Table structure for user_action
-- ----------------------------
DROP TABLE IF EXISTS `user_action`;
CREATE TABLE `user_action` (
  `action_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL COMMENT '用户id',
  `action_type` enum('1','2','3') DEFAULT '1' COMMENT '用户行为，1代表借书，2代表还书，3代表预定',
  `action_date` datetime DEFAULT NULL COMMENT '日期',
  PRIMARY KEY (`action_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_action
-- ----------------------------
INSERT INTO `user_action` VALUES ('1', '2', '1', '2018-04-17 00:00:00');
