package com.dotori.planner.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(uniqueConstraints = @UniqueConstraint(columnNames = { "budget_group_id", "budget_month" }))
public class MonthlyBudget {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "budget_group_id")
    private BudgetGroup budgetGroup;

    @Column(name = "budget_month", nullable = false)
    private String yearMonth; // Format: "2026-01"

    private Long totalAmount;

    @OneToMany(mappedBy = "monthlyBudget", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<FixedExpense> fixedExpenses = new ArrayList<>();

    public void addFixedExpense(FixedExpense expense) {
        fixedExpenses.add(expense);
        expense.setMonthlyBudget(this);
    }
}
