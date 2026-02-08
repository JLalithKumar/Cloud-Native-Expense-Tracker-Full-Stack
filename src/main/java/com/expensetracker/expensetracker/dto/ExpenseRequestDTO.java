package com.expensetracker.expensetracker.dto;

import com.expensetracker.expensetracker.enums.ExpenseType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.time.LocalDate;

@Data
public class ExpenseRequestDTO {

    @NotBlank(message = "Title cannot be empty")
    private String title;

    @Positive(message = "Amount must be greater than 0")
    private double amount;

    @NotNull(message = "Expense type is required")
    private ExpenseType type;

    @NotBlank(message = "Category cannot be empty")
    private String category;

    @NotNull(message = "Date cannot be null")
    private LocalDate date;

    @NotBlank(message = "Payment mode cannot be empty")
    private String paymentMode;

    private String notes;
}
