# 深渊档案 - 深海生物图鉴系统

## 项目简介
基于 SpringBoot + MyBatis-Plus + Thymeleaf + MySQL 的深海生物图鉴网站，包含用户注册登录、深海生物展示等功能。

## 技术栈
- SpringBoot 2.7.15
- MyBatis-Plus 3.5.3.1
- Thymeleaf（服务端渲染）
- MySQL 8.0
- Lombok

## 项目结构
```
abyss-archive/
├── pom.xml
├── sql/init.sql              # 数据库初始化脚本
└── src/main/
    ├── java/com/archive/
    │   ├── AbyssArchiveApplication.java  # 启动类
    │   ├── controller/UserController.java # 用户控制器
    │   ├── entity/User.java              # 用户实体
    │   ├── mapper/UserMapper.java        # 用户Mapper
    │   └── service/
    │       ├── UserService.java          # 用户服务接口
    │       └── impl/UserServiceImpl.java # 用户服务实现
    └── resources/
        ├── application.yml               # 配置文件
        ├── static/css/style.css          # 样式
        └── templates/                    # Thymeleaf页面
            ├── index.html                # 首页（生物列表）
            ├── login.html                # 登录页
            └── register.html             # 注册页
```

## 快速开始

### 1. 初始化数据库
```bash
mysql -u root -p < sql/init.sql
```

### 2. 修改配置
编辑 `src/main/resources/application.yml`，修改数据库密码：
```yaml
spring:
  datasource:
    password: 你的MySQL密码  # ⚠️ 默认root，请修改
```

### 3. 启动项目
```bash
mvn spring-boot:run
```
访问 http://localhost:8080

## 测试账号
| 账号 | 密码 | 角色 |
|------|------|------|
| admin | admin123 | 管理员 |
| test | test | 普通用户 |

## 功能说明
- 用户注册：用户名+密码，密码MD5加密存储
- 用户登录：session管理登录状态
- 登录拦截：未登录访问首页自动跳转登录页
- 首页展示：8种深海生物信息卡片
- 退出登录：清除session

## 静态预览版
本仓库 gh-pages 分支托管了纯静态预览版（21种深海生物+登录注册），可直接访问：
https://yangjiang-user.github.io/abyss-archive/
