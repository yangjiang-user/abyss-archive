package com.archive;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * 深渊档案 - SpringBoot启动类
 * 深海生物图鉴系统
 */
@SpringBootApplication
@MapperScan("com.archive.mapper") // 扫描Mapper接口
public class AbyssArchiveApplication {
    public static void main(String[] args) {
        SpringApplication.run(AbyssArchiveApplication.class, args);
        System.out.println("====== 深渊档案启动成功 ======");
    }
}
