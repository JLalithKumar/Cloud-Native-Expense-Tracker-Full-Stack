package com.expensetracker.expensetracker.auth.controller;

import com.expensetracker.expensetracker.auth.dto.LoginRequest;
import com.expensetracker.expensetracker.auth.dto.LoginResponse;
import com.expensetracker.expensetracker.auth.dto.UserRegisterRequest;
import com.expensetracker.expensetracker.auth.dto.UserResponse;
import com.expensetracker.expensetracker.auth.model.User;
import com.expensetracker.expensetracker.auth.repository.UserRepository;
import com.expensetracker.expensetracker.auth.service.UserService;
import com.expensetracker.expensetracker.security.JwtUtil;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse register(@Valid @RequestBody UserRegisterRequest request) {
        return userService.register(request);
    }

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest request) {

        User user = userService.validateLogin(request);
        String token = jwtUtil.generateToken(user.getEmail());

        return new LoginResponse(token, user.getName(), user.getEmail());
    }

    @GetMapping("/me")
    public UserResponse getCurrentUser(Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .build();
    }
}
