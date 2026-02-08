package com.expensetracker.expensetracker.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import com.expensetracker.expensetracker.enums.ExpenseType;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title cannot be empty")
    private String title;

    @Positive(message = "Amount must be greater than 0")
    private double amount;

    @Enumerated(EnumType.STRING)
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
