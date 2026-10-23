package com.archive.mapper;

import com.archive.entity.User;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
 * 用户Mapper接口
 * 继承MyBatis-Plus的BaseMapper，自带CRUD方法
 */
@Mapper
public interface UserMapper extends BaseMapper<User> {
    // 无需手写SQL，BaseMapper已提供insert/delete/update/select等方法
}
