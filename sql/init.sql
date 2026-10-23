-- ============================================
-- 深渊档案 - 数据库初始化脚本
-- 深海生物图鉴系统
-- ============================================

-- 创建数据库
CREATE DATABASE IF NOT EXISTS abyss_archive DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE abyss_archive;

-- ============================================
-- 用户表
-- ============================================
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
    `id` INT NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    `username` VARCHAR(50) NOT NULL COMMENT '用户名',
    `password` VARCHAR(100) NOT NULL COMMENT '密码（MD5加密）',
    `role` VARCHAR(20) DEFAULT 'user' COMMENT '角色：admin管理员，user普通用户',
    `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';

-- ============================================
-- 深海生物表
-- ============================================
DROP TABLE IF EXISTS `creature`;
CREATE TABLE `creature` (
    `id` INT NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    `name_cn` VARCHAR(100) NOT NULL COMMENT '中文名',
    `name_en` VARCHAR(100) COMMENT '英文名',
    `scientific_name` VARCHAR(150) COMMENT '学名',
    `min_depth` INT COMMENT '最小栖息深度（米）',
    `max_depth` INT COMMENT '最大栖息深度（米）',
    `size` VARCHAR(100) COMMENT '体型',
    `habitat` VARCHAR(200) COMMENT '栖息地',
    `features` TEXT COMMENT '外形特征',
    `abilities` TEXT COMMENT '特殊能力',
    `description` TEXT COMMENT '详细介绍',
    `image_path` VARCHAR(255) COMMENT '图片路径',
    `discover_year` INT COMMENT '发现年份',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='深海生物表';

-- ============================================
-- 初始化用户数据
-- admin/admin123（密码MD5加密：0192023a7bbd73250516f069df18b500）
-- ============================================
INSERT INTO `user` (`username`, `password`, `role`) VALUES
('admin', '0192023a7bbd73250516f069df18b500', 'admin'),
('test', '098f6bcd4621d373cade4e832627b4f6', 'user'); -- test/test

-- ============================================
-- 初始化深海生物数据（8种示例）
-- ============================================
INSERT INTO `creature` (`name_cn`, `name_en`, `scientific_name`, `min_depth`, `max_depth`, `size`, `habitat`, `features`, `abilities`, `description`, `image_path`, `discover_year`) VALUES
('大王乌贼', 'Giant Squid', 'Architeuthis dux', 300, 1000, '体长可达13米', '全球深海', '巨大的触腕和眼睛', '动物界最大的眼睛，直径25厘米', '大王乌贼是世界上最大的无脊椎动物之一，长期以来被认为是传说中的海怪。', 'giant_squid.jpg', 1857),
('桶眼鱼', 'Barreleye Fish', 'Macropinna microstoma', 600, 800, '体长约15厘米', '北太平洋深海', '完全透明的头部，绿色管状眼睛', '眼睛可向上或向前旋转', '桶眼鱼最惊人的特征是完全透明的头部，可以直接看到里面的大脑和眼睛。', 'barreleye.jpg', 1939),
('水滴鱼', 'Blobfish', 'Psychrolutes marcidus', 600, 1200, '体长约30厘米', '澳大利亚深海', '凝胶状身体，忧伤表情', '适应高压环境的低密度身体', '水滴鱼在深海中看起来像普通鱼，被捞出水面后因压力变化才变成"忧伤"的样子。', 'blobfish.jpg', 1926),
('幽灵蛸', 'Vampire Squid', 'Vampyroteuthis infernalis', 600, 1200, '体长约30厘米', '全球温带深海', '红色眼睛，斗篷状触腕', '生物发光，喷射发光粘液', '幽灵蛸其实不吸血，它以海洋雪为食，是深海中的清道夫。', 'vampire_squid.jpg', 1903),
('小飞象章鱼', 'Dumbo Octopus', 'Grimpoteuthis', 3000, 7000, '体长20-30厘米', '全球深海', '耳状鳍，形似大象耳朵', '深海最深的章鱼', '小飞象章鱼因鳍形似迪士尼卡通形象小飞象而得名，生活在极深的海域。', 'dumbo_octopus.jpg', 1883),
('深海鮟鱇鱼', 'Deep Sea Anglerfish', 'Melanocetus johnsonii', 1000, 4000, '雌性体长可达18厘米', '全球深海', '头顶发光诱饵，大嘴尖牙', '生物发光诱捕猎物', '鮟鱇鱼的雄性会寄生在雌性身上，永久融合共享血液系统。', 'anglerfish.jpg', 1864),
('巨型等足虫', 'Giant Isopod', 'Bathynomus giganteus', 170, 2140, '体长可达36-50厘米', '大西洋深海', '巨大的甲壳，复眼', '可以绝食数年存活', '巨型等足虫是深海中最耐饿的生物之一，与陆地上的潮虫是近亲。', 'giant_isopod.jpg', 1879),
('皱鳃鲨', 'Frilled Shark', 'Chlamydoselachus anguineus', 270, 1300, '体长可达3-4米', '全球深海', '鳗鱼状身体，六对鳃裂', '怀孕期长达3.5年', '皱鳃鲨被称为"活化石"，是现存最原始的鲨鱼之一。', 'frilled_shark.jpg', 1884);
