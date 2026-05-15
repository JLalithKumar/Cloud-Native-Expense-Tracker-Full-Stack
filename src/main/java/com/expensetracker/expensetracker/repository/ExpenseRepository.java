package com.expensetracker.expensetracker.repository;

import com.expensetracker.expensetracker.auth.model.User;
import com.expensetracker.expensetracker.model.Expense;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ExpenseRepository
        extends JpaRepository<Expense, Long>,
        JpaSpecificationExecutor<Expense> {

    // ===== User-scoped queries =====

    List<Expense> findAllByUser(User user);

    Page<Expense> findAllByUser(User user, Pageable pageable);

    Optional<Expense> findByIdAndUser(Long id, User user);

    // ===== Analytics queries (user-scoped) =====

    @Query("SELECT COALESCE(SUM(e.amount), 0) FROM Expense e WHERE e.type = 'INCOME' AND e.user = :user")
    Double getTotalIncome(@Param("user") User user);

    @Query("SELECT COALESCE(SUM(e.amount), 0) FROM Expense e WHERE e.type = 'EXPENSE' AND e.user = :user")
    Double getTotalExpense(@Param("user") User user);

    @Query("""
        SELECT e.category, SUM(e.amount)
        FROM Expense e
        WHERE e.type = 'EXPENSE' AND e.user = :user
        GROUP BY e.category
    """)
    List<Object[]> getCategoryWiseExpense(@Param("user") User user);

    @Query("""
    SELECT MONTH(e.date), SUM(e.amount)
    FROM Expense e
    WHERE e.date BETWEEN :start AND :end
      AND e.type = 'EXPENSE'
      AND e.user = :user
    GROUP BY MONTH(e.date)
    ORDER BY MONTH(e.date)
""")
    List<Object[]> findMonthlyTrend(
            @Param("start") LocalDate start,
            @Param("end") LocalDate end,
            @Param("user") User user
    );

    @Query("""
    SELECT MONTH(e.date),
           SUM(CASE WHEN e.type = 'INCOME' THEN e.amount ELSE 0 END),
           SUM(CASE WHEN e.type = 'EXPENSE' THEN e.amount ELSE 0 END)
    FROM Expense e
    WHERE e.date BETWEEN :start AND :end
      AND e.user = :user
    GROUP BY MONTH(e.date)
    ORDER BY MONTH(e.date)
""")
    List<Object[]> findMonthlyIncomeExpense(
            @Param("start") LocalDate start,
            @Param("end") LocalDate end,
            @Param("user") User user
    );

}
