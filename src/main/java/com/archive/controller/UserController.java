package com.archive.controller;

import com.archive.entity.User;
import com.archive.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpSession;

/**
 * 用户控制器
 * 处理页面路由、登录、注册
 */
@Controller
public class UserController {

    @Autowired
    private UserService userService;

    /** 首页 - 展示深海生物列表（需登录） */
    @GetMapping("/")
    public String index(HttpSession session, Model model) {
        User loginUser = (User) session.getAttribute("loginUser");
        if (loginUser == null) {
            return "redirect:/login"; // 未登录跳转到登录页
        }
        model.addAttribute("username", loginUser.getUsername());
        model.addAttribute("role", loginUser.getRole());
        return "index";
    }

    /** 登录页面 */
    @GetMapping("/login")
    public String loginPage() {
        return "login";
    }

    /** 注册页面 */
    @GetMapping("/register")
    public String registerPage() {
        return "register";
    }

    /** 处理登录表单提交 */
    @PostMapping("/login")
    public String doLogin(@RequestParam String username,
                          @RequestParam String password,
                          HttpSession session,
                          Model model) {
        User user = userService.login(username, password);
        if (user != null) {
            session.setAttribute("loginUser", user); // 登录状态存入session
            return "redirect:/";
        }
        model.addAttribute("error", "用户名或密码错误");
        return "login";
    }

    /** 处理注册表单提交 */
    @PostMapping("/register")
    public String doRegister(@RequestParam String username,
                             @RequestParam String password,
                             @RequestParam String confirmPassword,
                             Model model) {
        if (!password.equals(confirmPassword)) {
            model.addAttribute("error", "两次输入的密码不一致");
            return "register";
        }
        if (password.length() < 6) {
            model.addAttribute("error", "密码至少6位");
            return "register";
        }
        boolean success = userService.register(username, password);
        if (success) {
            model.addAttribute("success", "注册成功，请登录");
            return "login";
        } else {
            model.addAttribute("error", "用户名已存在");
            return "register";
        }
    }

    /** 退出登录 */
    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate(); // 清除session
        return "redirect:/login";
    }
}
