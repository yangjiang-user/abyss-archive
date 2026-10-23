package com.archive.service;

import com.archive.entity.User;

/**
 * 用户服务接口
 */
public interface UserService {
    /** 根据用户名查询用户 */
    User findByUsername(String username);

    /** 用户注册，成功返回true，用户名已存在返回false */
    boolean register(String username, String password);

    /** 用户登录，成功返回用户对象，失败返回null */
    User login(String username, String password);
}
