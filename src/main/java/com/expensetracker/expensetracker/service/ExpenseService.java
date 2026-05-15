package com.expensetracker.expensetracker.service;

import com.expensetracker.expensetracker.auth.model.User;
import com.expensetracker.expensetracker.auth.repository.UserRepository;
import com.expensetracker.expensetracker.dto.ExpenseRequestDTO;
import com.expensetracker.expensetracker.dto.ExpenseResponseDTO;
import com.expensetracker.expensetracker.exception.ExpenseNotFoundException;
import com.expensetracker.expensetracker.model.Expense;
import com.expensetracker.expensetracker.repository.ExpenseRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;

    public ExpenseService(ExpenseRepository expenseRepository, UserRepository userRepository) {
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

    // ✅ ADD EXPENSE
    public ExpenseResponseDTO addExpense(ExpenseRequestDTO dto) {

        User user = getAuthenticatedUser();

        Expense expense = Expense.builder()
                .title(dto.getTitle())
                .amount(dto.getAmount())
                .type(dto.getType())
                .category(dto.getCategory())
                .date(dto.getDate()) // IMPORTANT: keep LocalDate as-is
                .paymentMode(dto.getPaymentMode())
                .notes(dto.getNotes())
                .user(user)
                .build();

        return toResponse(expenseRepository.save(expense));
    }

    // ✅ UPDATE EXPENSE
    public ExpenseResponseDTO updateExpense(Long id, ExpenseRequestDTO dto) {

        User user = getAuthenticatedUser();

        Expense expense = expenseRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ExpenseNotFoundException("Expense not found with id: " + id));

        expense.setTitle(dto.getTitle());
        expense.setAmount(dto.getAmount());
        expense.setType(dto.getType());
        expense.setCategory(dto.getCategory());
        expense.setDate(dto.getDate());
        expense.setPaymentMode(dto.getPaymentMode());
        expense.setNotes(dto.getNotes());

        return toResponse(expenseRepository.save(expense));
    }

    // ✅ DELETE EXPENSE
    public void deleteExpense(Long id) {
        User user = getAuthenticatedUser();

        Expense expense = expenseRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ExpenseNotFoundException("Expense not found with id: " + id));

        expenseRepository.delete(expense);
    }

    // ✅ PAGED EXPENSES (THIS FIXES TABLE ISSUE)
    public Page<ExpenseResponseDTO> getPagedExpenses(
            int page,
            int size,
            String sortBy
    ) {
        User user = getAuthenticatedUser();

        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(Sort.Direction.DESC, sortBy)
        );

        return expenseRepository
                .findAllByUser(user, pageable)
                .map(this::toResponse);
    }

    // ✅ ALL EXPENSES (fallback / optional)
    public List<ExpenseResponseDTO> getAllExpenses() {
        User user = getAuthenticatedUser();

        return expenseRepository.findAllByUser(user)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    // ✅ MONTHLY EXPENSE (DATE BUG FIXED)
    public List<Object[]> getMonthlyExpense(int year) {
        User user = getAuthenticatedUser();

        LocalDate start = LocalDate.of(year, 1, 1);
        LocalDate end = LocalDate.of(year, 12, 31);

        return expenseRepository.findMonthlyTrend(start, end, user);
    }

    // ✅ MONTHLY INCOME vs EXPENSE (DATE BUG FIXED)
    public List<Object[]> getMonthlyIncomeExpense(int year) {
        User user = getAuthenticatedUser();

        LocalDate start = LocalDate.of(year, 1, 1);
        LocalDate end = LocalDate.of(year, 12, 31);

        return expenseRepository.findMonthlyIncomeExpense(start, end, user);
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
