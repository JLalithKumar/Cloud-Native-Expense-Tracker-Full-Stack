package com.expensetracker.expensetracker.controller;

import com.expensetracker.expensetracker.service.AnalyticsService;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    public AnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    @GetMapping("/summary")
    public Map<String, Double> getSummary() {
        Map<String, Double> response = new HashMap<>();
        response.put("income", analyticsService.getTotalIncome());
        response.put("expense", analyticsService.getTotalExpense());
        response.put("balance", analyticsService.getBalance());
        return response;
    }

    @GetMapping("/category")
    public Map<String, Double> getCategoryWiseExpense() {
        return analyticsService.getCategoryWiseExpense();
    }

    @GetMapping("/monthly/{year}")
    public Map<Integer, Double> getMonthlyExpense(
            @PathVariable int year) {
        return analyticsService.getMonthlyExpense(year);
    }

    @GetMapping("/monthly/stacked/{year}")
    public Map<Integer, Map<String, Double>> getMonthlyIncomeExpense(
            @PathVariable int year) {
        return analyticsService.getMonthlyIncomeExpense(year);
    }

}
