package com.expensetracker.expensetracker.dto;

import java.util.Map;

public class MonthlyExpenseSummaryDTO {

    private int year;
    private String month;
    private double totalSpent;
    private Map<String, Double> categoryBreakdown;

    public MonthlyExpenseSummaryDTO(
            int year,
            String month,
            double totalSpent,
            Map<String, Double> categoryBreakdown
    ) {
        this.year = year;
        this.month = month;
        this.totalSpent = totalSpent;
        this.categoryBreakdown = categoryBreakdown;
    }

    public int getYear() {
        return year;
    }

    public String getMonth() {
        return month;
    }

    public double getTotalSpent() {
        return totalSpent;
    }

    public Map<String, Double> getCategoryBreakdown() {
        return categoryBreakdown;
    }
}
