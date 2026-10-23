package com.archive.service.impl;

import com.archive.entity.User;
import com.archive.mapper.UserMapper;
import com.archive.service.UserService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import java.time.LocalDateTime;

/**
 * 用户服务实现类
 */
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    /**
     * 根据用户名查询用户
     */
    @Override
    public User findByUsername(String username) {
        QueryWrapper<User> wrapper = new QueryWrapper<>();
        wrapper.eq("username", username);
        return userMapper.selectOne(wrapper);
    }

    /**
     * 用户注册
     * 密码使用MD5加密（演示用，生产环境建议BCrypt）
     */
    @Override
    public boolean register(String username, String password) {
        // 检查用户名是否已存在
        if (findByUsername(username) != null) {
            return false;
        }
        User user = new User();
        user.setUsername(username);
        // MD5加密密码
        user.setPassword(DigestUtils.md5DigestAsHex(password.getBytes()));
        user.setRole("user"); // 默认普通用户
        user.setCreateTime(LocalDateTime.now());
        userMapper.insert(user);
        return true;
    }

    /**
     * 用户登录
     */
    @Override
    public User login(String username, String password) {
        User user = findByUsername(username);
        if (user == null) {
            return null;
        }
        // 比对MD5加密后的密码
        String encrypted = DigestUtils.md5DigestAsHex(password.getBytes());
        if (encrypted.equals(user.getPassword())) {
            return user;
        }
        return null;
    }
}
