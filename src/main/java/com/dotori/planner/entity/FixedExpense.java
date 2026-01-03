package com.dotori.planner.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class FixedExpense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Long amount;
    private String paymentMethod = "CARD";

    @Enumerated(EnumType.STRING)
    private FixedCategory category = FixedCategory.OTHER;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "monthly_budget_id")
    @JsonBackReference
    private MonthlyBudget monthlyBudget;

    public FixedExpense(String name, Long amount) {
        this.name = name;
        this.amount = amount;
    }
}
