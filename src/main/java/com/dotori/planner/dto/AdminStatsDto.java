package com.dotori.planner.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminStatsDto {
    private long totalUsers;
    private long totalBudgetGroups;
    private long totalTransactions;
    private long totalTransactionVolume; // Sum of all transaction amounts
}
