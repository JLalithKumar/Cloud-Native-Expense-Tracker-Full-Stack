package com.expensetracker.expensetracker.repository.specification;

import com.expensetracker.expensetracker.model.Expense;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;

public class ExpenseSpecification {

    public static Specification<Expense> hasTitle(String title) {
        return (root, query, cb) ->
                title == null ? null :
                        cb.like(cb.lower(root.get("title")),
                                "%" + title.toLowerCase() + "%");
    }

    public static Specification<Expense> hasCategory(String category) {
        return (root, query, cb) ->
                category == null ? null :
                        cb.equal(root.get("category"), category);
    }

    public static Specification<Expense> hasPaymentMode(String paymentMode) {
        return (root, query, cb) ->
                paymentMode == null ? null :
                        cb.equal(root.get("paymentMode"), paymentMode);
    }

    public static Specification<Expense> dateBetween(
            LocalDate fromDate,
            LocalDate toDate
    ) {
        if (fromDate == null || toDate == null) return null;

        return (root, query, cb) ->
                cb.between(root.get("date"), fromDate, toDate);
    }
}
