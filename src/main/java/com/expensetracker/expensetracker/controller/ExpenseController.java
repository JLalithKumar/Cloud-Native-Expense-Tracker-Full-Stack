package com.expensetracker.expensetracker.controller;

import com.expensetracker.expensetracker.dto.ExpenseRequestDTO;
import com.expensetracker.expensetracker.dto.ExpenseResponseDTO;
import com.expensetracker.expensetracker.service.ExpenseService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    // ✅ ADD EXPENSE
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ExpenseResponseDTO addExpense(
            @Valid @RequestBody ExpenseRequestDTO dto
    ) {
        return expenseService.addExpense(dto);
    }

    // ✅ UPDATE EXPENSE
    @PutMapping("/{id}")
    public ExpenseResponseDTO updateExpense(
            @PathVariable Long id,
            @Valid @RequestBody ExpenseRequestDTO dto
    ) {
        return expenseService.updateExpense(id, dto);
    }

    // ✅ DELETE EXPENSE
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteExpense(@PathVariable Long id) {
        expenseService.deleteExpense(id);
    }

    // ✅ PAGED EXPENSES (FIXES TABLE NOT SHOWING)
    @GetMapping("/paged")
    public Page<ExpenseResponseDTO> getPagedExpenses(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "date") String sortBy
    ) {
        return expenseService.getPagedExpenses(page, size, sortBy);
    }

    // ✅ OPTIONAL: get all (fallback)
    @GetMapping
    public java.util.List<ExpenseResponseDTO> getAllExpenses() {
        return expenseService.getAllExpenses();
    }
}
