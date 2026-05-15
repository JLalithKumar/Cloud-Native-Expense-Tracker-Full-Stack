package com.expensetracker.expensetracker.service;

import com.expensetracker.expensetracker.auth.model.User;
import com.expensetracker.expensetracker.auth.repository.UserRepository;
import com.expensetracker.expensetracker.repository.ExpenseRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class AnalyticsServiceImpl implements AnalyticsService {

    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;

    public AnalyticsServiceImpl(ExpenseRepository expenseRepository, UserRepository userRepository) {
        this.expenseRepository = expenseRepository;
        this.userRepository = userRepository;
    }

    // 🔐 Get the currently authenticated user
    private User getAuthenticatedUser() {
        String email = SecurityContextHolder.getContext()
                .getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public Double getTotalIncome() {
        return expenseRepository.getTotalIncome(getAuthenticatedUser());
    }

    @Override
    public Double getTotalExpense() {
        return expenseRepository.getTotalExpense(getAuthenticatedUser());
    }

    @Override
    public Double getBalance() {
        return getTotalIncome() - getTotalExpense();
    }

    @Override
    public Map<String, Double> getCategoryWiseExpense() {
        Map<String, Double> result = new HashMap<>();

        List<Object[]> rows = expenseRepository.getCategoryWiseExpense(getAuthenticatedUser());
        for (Object[] row : rows) {
            String category = (String) row[0];
            Double amount = (Double) row[1];
            result.put(category, amount);
        }

        return result;
    }

    @Override
    public Map<Integer, Double> getMonthlyExpense(int year) {

        LocalDate start = LocalDate.of(year, 1, 1);
        LocalDate end = LocalDate.of(year, 12, 31);

        Map<Integer, Double> result = new LinkedHashMap<>();

        List<Object[]> rows =
                expenseRepository.findMonthlyTrend(start, end, getAuthenticatedUser());

        for (Object[] row : rows) {
            Integer month = (Integer) row[0]; // 1 = Jan, 2 = Feb
            Double amount = (Double) row[1];
            result.put(month, amount);
        }

        return result;
    }

    @Override
    public Map<Integer, Map<String, Double>> getMonthlyIncomeExpense(int year) {

        LocalDate start = LocalDate.of(year, 1, 1);
        LocalDate end = LocalDate.of(year, 12, 31);

        Map<Integer, Map<String, Double>> result = new LinkedHashMap<>();

        List<Object[]> rows =
                expenseRepository.findMonthlyIncomeExpense(start, end, getAuthenticatedUser());

        for (Object[] row : rows) {
            Integer month = (Integer) row[0];
            Double income = (Double) row[1];
            Double expense = (Double) row[2];

            Map<String, Double> values = new HashMap<>();
            values.put("income", income);
            values.put("expense", expense);

            result.put(month, values);
        }

        return result;
    }
}
