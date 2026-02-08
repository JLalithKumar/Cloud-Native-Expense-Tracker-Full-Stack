package com.expensetracker.expensetracker.dto;

import com.expensetracker.expensetracker.enums.ExpenseType;
import lombok.Data;

import java.time.LocalDate;

@Data
public class ExpenseResponseDTO {

    private Long id;
    private String title;
    private double amount;
    private ExpenseType type;
    private String category;
    private LocalDate date;
    private String paymentMode;
    private String notes;
}
