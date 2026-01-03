package com.dotori.planner.controller;

import com.dotori.planner.dto.AdminStatsDto;
import com.dotori.planner.entity.Transaction;
import com.dotori.planner.repository.BudgetGroupRepository;
import com.dotori.planner.repository.TransactionRepository;
import com.dotori.planner.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserRepository userRepository;
    private final BudgetGroupRepository budgetGroupRepository;
    private final TransactionRepository transactionRepository;

    @GetMapping("/stats")
    public AdminStatsDto getStats() {
        long totalUsers = userRepository.count();
        long totalBudgetGroups = budgetGroupRepository.count();
        long totalTransactions = transactionRepository.count();

        List<Transaction> allTransactions = transactionRepository.findAll();
        long totalVolume = allTransactions.stream()
                .mapToLong(Transaction::getAmount)
                .sum();

        return new AdminStatsDto(totalUsers, totalBudgetGroups, totalTransactions, totalVolume);
    }
}
