package com.expensetracker.expensetracker.auth.service;

import com.expensetracker.expensetracker.auth.dto.LoginRequest;
import com.expensetracker.expensetracker.auth.dto.UserRegisterRequest;
import com.expensetracker.expensetracker.auth.dto.UserResponse;
import com.expensetracker.expensetracker.auth.model.User;

public interface UserService {

    UserResponse register(UserRegisterRequest request);

    User validateLogin(LoginRequest request);
}
