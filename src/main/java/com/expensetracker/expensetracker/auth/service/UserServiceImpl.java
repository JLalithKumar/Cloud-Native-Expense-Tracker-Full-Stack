package com.expensetracker.expensetracker.auth.service;

import com.expensetracker.expensetracker.auth.dto.LoginRequest;
import com.expensetracker.expensetracker.auth.dto.UserRegisterRequest;
import com.expensetracker.expensetracker.auth.dto.UserResponse;
import com.expensetracker.expensetracker.auth.model.User;
import com.expensetracker.expensetracker.auth.repository.UserRepository;
import com.expensetracker.expensetracker.exception.EmailAlreadyExistsException;
import com.expensetracker.expensetracker.exception.InvalidCredentialsException;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserResponse register(UserRegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new EmailAlreadyExistsException("Email already registered");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();

        User saved = userRepository.save(user);

        return UserResponse.builder()
                .id(saved.getId())
                .name(saved.getName())
                .email(saved.getEmail())
                .build();
    }

    @Override
    public User validateLogin(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new InvalidCredentialsException("Invalid email or password")
                );

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Invalid email or password");
        }

        return user;
    }
}
