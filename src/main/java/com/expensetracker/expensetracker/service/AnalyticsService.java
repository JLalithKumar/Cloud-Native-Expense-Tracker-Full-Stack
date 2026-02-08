package com.expensetracker.expensetracker.service;

import java.util.Map;

public interface AnalyticsService {

    Double getTotalIncome();

    Double getTotalExpense();

    Double getBalance();

    Map<String, Double> getCategoryWiseExpense();

    Map<Integer, Double> getMonthlyExpense(int year);

    Map<Integer, Map<String, Double>> getMonthlyIncomeExpense(int year);
}
