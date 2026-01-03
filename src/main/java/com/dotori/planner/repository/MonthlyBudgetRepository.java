package com.dotori.planner.repository;

import com.dotori.planner.entity.MonthlyBudget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MonthlyBudgetRepository extends JpaRepository<MonthlyBudget, Long> {
    Optional<MonthlyBudget> findByYearMonth(String yearMonth);

    Optional<MonthlyBudget> findByUserIdAndYearMonth(Long userId, String yearMonth);

    Optional<MonthlyBudget> findByBudgetGroupIdAndYearMonth(Long budgetGroupId, String yearMonth);

    // For Migration
    java.util.List<MonthlyBudget> findByUserIdAndBudgetGroupIsNull(Long userId);

    void deleteByBudgetGroupId(Long budgetGroupId);
}
