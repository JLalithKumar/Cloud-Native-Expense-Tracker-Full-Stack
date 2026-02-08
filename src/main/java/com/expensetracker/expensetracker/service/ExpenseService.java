package com.expensetracker.expensetracker.service;

import com.expensetracker.expensetracker.dto.ExpenseRequestDTO;
import com.expensetracker.expensetracker.dto.ExpenseResponseDTO;
import com.expensetracker.expensetracker.model.Expense;
import com.expensetracker.expensetracker.repository.ExpenseRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;

    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    // ✅ ADD EXPENSE
    public ExpenseResponseDTO addExpense(ExpenseRequestDTO dto) {

        Expense expense = Expense.builder()
                .title(dto.getTitle())
                .amount(dto.getAmount())
                .type(dto.getType())
                .category(dto.getCategory())
                .date(dto.getDate()) // IMPORTANT: keep LocalDate as-is
                .paymentMode(dto.getPaymentMode())
                .notes(dto.getNotes())
                .build();

        return toResponse(expenseRepository.save(expense));
    }

    // ✅ PAGED EXPENSES (THIS FIXES TABLE ISSUE)
    public Page<ExpenseResponseDTO> getPagedExpenses(
            int page,
            int size,
            String sortBy
    ) {
        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(Sort.Direction.DESC, sortBy)
        );

        return expenseRepository
                .findAll(pageable)
                .map(this::toResponse);
    }

    // ✅ ALL EXPENSES (fallback / optional)
    public List<ExpenseResponseDTO> getAllExpenses() {
        return expenseRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    // ✅ MONTHLY EXPENSE (DATE BUG FIXED)
    public List<Object[]> getMonthlyExpense(int year) {
        LocalDate start = LocalDate.of(year, 1, 1);
        LocalDate end = LocalDate.of(year, 12, 31);

        return expenseRepository.findMonthlyTrend(start, end);
    }

    // ✅ MONTHLY INCOME vs EXPENSE (DATE BUG FIXED)
    public List<Object[]> getMonthlyIncomeExpense(int year) {
        LocalDate start = LocalDate.of(year, 1, 1);
        LocalDate end = LocalDate.of(year, 12, 31);

        return expenseRepository.findMonthlyIncomeExpense(start, end);
    }

    // 🔁 Mapper
    private ExpenseResponseDTO toResponse(Expense e) {
        ExpenseResponseDTO dto = new ExpenseResponseDTO();
        dto.setId(e.getId());
        dto.setTitle(e.getTitle());
        dto.setAmount(e.getAmount());
        dto.setType(e.getType());
        dto.setCategory(e.getCategory());
        dto.setDate(e.getDate());
        dto.setPaymentMode(e.getPaymentMode());
        dto.setNotes(e.getNotes());
        return dto;
    }
}
