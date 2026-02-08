package com.expensetracker.expensetracker.repository;

import com.expensetracker.expensetracker.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface ExpenseRepository
        extends JpaRepository<Expense, Long>,
        JpaSpecificationExecutor<Expense> {

    @Query("SELECT COALESCE(SUM(e.amount), 0) FROM Expense e WHERE e.type = 'INCOME'")
    Double getTotalIncome();

    @Query("SELECT COALESCE(SUM(e.amount), 0) FROM Expense e WHERE e.type = 'EXPENSE'")
    Double getTotalExpense();

    @Query("""
        SELECT e.category, SUM(e.amount)
        FROM Expense e
        WHERE e.type = 'EXPENSE'
        GROUP BY e.category
    """)
    List<Object[]> getCategoryWiseExpense();

    @Query("""
    SELECT MONTH(e.date), SUM(e.amount)
    FROM Expense e
    WHERE e.date BETWEEN :start AND :end
      AND e.type = 'EXPENSE'
    GROUP BY MONTH(e.date)
    ORDER BY MONTH(e.date)
""")
    List<Object[]> findMonthlyTrend(
            @Param("start") LocalDate start,
            @Param("end") LocalDate end
    );

    @Query("""
    SELECT MONTH(e.date),
           SUM(CASE WHEN e.type = 'INCOME' THEN e.amount ELSE 0 END),
           SUM(CASE WHEN e.type = 'EXPENSE' THEN e.amount ELSE 0 END)
    FROM Expense e
    WHERE e.date BETWEEN :start AND :end
    GROUP BY MONTH(e.date)
    ORDER BY MONTH(e.date)
""")
    List<Object[]> findMonthlyIncomeExpense(
            @Param("start") LocalDate start,
            @Param("end") LocalDate end
    );

}
