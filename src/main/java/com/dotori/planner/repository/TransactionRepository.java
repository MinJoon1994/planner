package com.dotori.planner.repository;

import com.dotori.planner.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByDateBetween(LocalDate startDate, LocalDate endDate);

    List<Transaction> findByUserIdAndDateBetween(Long userId, LocalDate startDate, LocalDate endDate);

    List<Transaction> findByBudgetGroupIdAndDateBetween(Long budgetGroupId, LocalDate startDate, LocalDate endDate);

    // For Migration
    List<Transaction> findByUserIdAndBudgetGroupIsNull(Long userId);

    void deleteByBudgetGroupId(Long budgetGroupId);
}
