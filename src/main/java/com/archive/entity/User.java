package com.archive.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import java.time.LocalDateTime;

/**
 * 用户实体类
 * 对应数据库表 user
 */
@Data
@TableName("user")
public class User {
    /** 主键ID，自增 */
    @TableId(type = IdType.AUTO)
    private Integer id;

    /** 用户名，唯一 */
    private String username;

    /** 密码（加密存储） */
    private String password;

    /** 角色：admin管理员，user普通用户 */
    private String role;

    /** 创建时间 */
    private LocalDateTime createTime;
}
