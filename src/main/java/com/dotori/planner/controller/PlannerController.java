package com.dotori.planner.controller;

import com.dotori.planner.entity.*;
import com.dotori.planner.repository.BudgetGroupRepository;
import com.dotori.planner.repository.MonthlyBudgetRepository;
import com.dotori.planner.repository.TransactionRepository;
import com.dotori.planner.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Allow requests from frontend
public class PlannerController {

    private final TransactionRepository transactionRepository;
    private final MonthlyBudgetRepository monthlyBudgetRepository;
    private final UserRepository userRepository;
    private final BudgetGroupRepository budgetGroupRepository;

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // --- Budget Group & Migration Logic ---

    private BudgetGroup ensureDefaultBudgetGroup(User user) {
        List<BudgetGroup> groups = budgetGroupRepository.findAllByUserOrderByCreatedDateAsc(user);
        if (!groups.isEmpty()) {
            return groups.get(0);
        }

        // Migration: No groups found, create default and move existing orphan data
        BudgetGroup defaultGroup = new BudgetGroup("기본 예산안", user);
        defaultGroup = budgetGroupRepository.save(defaultGroup);

        List<Transaction> orphans = transactionRepository.findByUserIdAndBudgetGroupIsNull(user.getId());
        for (Transaction tx : orphans) {
            tx.setBudgetGroup(defaultGroup);
            transactionRepository.save(tx);
        }

        List<MonthlyBudget> orphanBudgets = monthlyBudgetRepository.findByUserIdAndBudgetGroupIsNull(user.getId());
        for (MonthlyBudget mb : orphanBudgets) {
            mb.setBudgetGroup(defaultGroup);
            monthlyBudgetRepository.save(mb);
        }

        return defaultGroup;
    }

    private BudgetGroup getBudgetGroup(User user, Long budgetGroupId) {
        if (budgetGroupId == null) {
            return ensureDefaultBudgetGroup(user);
        }
        return budgetGroupRepository.findById(budgetGroupId)
                .filter(bg -> bg.getUser().getId().equals(user.getId()))
                .orElseThrow(() -> new RuntimeException("Invalid Budget Group ID"));
    }

    @GetMapping("/budget-groups")
    public List<BudgetGroup> getBudgetGroups() {
        User user = getCurrentUser();
        ensureDefaultBudgetGroup(user); // Ensure at least one exists
        return budgetGroupRepository.findAllByUserOrderByCreatedDateAsc(user);
    }

    @PostMapping("/budget-groups")
    public org.springframework.http.ResponseEntity<?> createBudgetGroup(@RequestBody BudgetGroup budgetGroup) {
        User user = getCurrentUser();

        // Enforce Limits
        long count = budgetGroupRepository.countByUser(user);
        int limit = user.getMembershipType() == User.MembershipType.PRO ? 30 : 2;

        if (count >= limit) {
            return org.springframework.http.ResponseEntity.status(403).body("Membership limit reached");
        }

        budgetGroup.setUser(user);
        budgetGroup.setCreatedDate(java.time.LocalDateTime.now());
        return org.springframework.http.ResponseEntity.ok(budgetGroupRepository.save(budgetGroup));
    }

    @PostMapping("/user/upgrade")
    public void upgradeMembership() {
        User user = getCurrentUser();
        user.setMembershipType(User.MembershipType.PRO);
        userRepository.save(user);
    }

    @PutMapping("/budget-groups/{id}")
    public BudgetGroup updateBudgetGroup(@PathVariable Long id, @RequestBody BudgetGroup details) {
        User user = getCurrentUser();
        BudgetGroup group = budgetGroupRepository.findById(id)
                .filter(bg -> bg.getUser().getId().equals(user.getId()))
                .orElseThrow(() -> new RuntimeException("Budget Group not found"));

        group.setName(details.getName());
        return budgetGroupRepository.save(group);
    }

    @DeleteMapping("/budget-groups/{id}")
    @org.springframework.transaction.annotation.Transactional
    public void deleteBudgetGroup(@PathVariable Long id) {
        User user = getCurrentUser();
        BudgetGroup group = budgetGroupRepository.findById(id)
                .filter(bg -> bg.getUser().getId().equals(user.getId()))
                .orElseThrow(() -> new RuntimeException("Budget Group not found"));

        // Cascade delete
        transactionRepository.deleteByBudgetGroupId(id);
        monthlyBudgetRepository.deleteByBudgetGroupId(id);
        budgetGroupRepository.deleteById(id);
    }

    // --- Transactions ---

    @GetMapping("/transactions")
    public List<Transaction> getTransactions(@RequestParam int year, @RequestParam int month,
            @RequestParam(required = false) Long budgetGroupId) {
        User currentUser = getCurrentUser();
        BudgetGroup group = getBudgetGroup(currentUser, budgetGroupId);

        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = YearMonth.of(year, month).atEndOfMonth();
        return transactionRepository.findByBudgetGroupIdAndDateBetween(group.getId(), startDate, endDate);
    }

    @PostMapping("/transactions")
    public Transaction createTransaction(@RequestBody Transaction transaction,
            @RequestParam(required = false) Long budgetGroupId) {
        User currentUser = getCurrentUser();
        BudgetGroup group = getBudgetGroup(currentUser, budgetGroupId);

        transaction.setUser(currentUser);
        transaction.setBudgetGroup(group);
        return transactionRepository.save(transaction);
    }

    @PutMapping("/transactions/{id}")
    public Transaction updateTransaction(@PathVariable Long id, @RequestBody Transaction details) {
        User currentUser = getCurrentUser();
        Transaction tx = transactionRepository.findById(id).orElseThrow();

        if (!tx.getUser().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        tx.setDate(details.getDate());
        tx.setDescription(details.getDescription());
        tx.setAmount(details.getAmount());
        tx.setCategory(details.getCategory());
        tx.setPaymentMethod(details.getPaymentMethod());
        tx.setType(details.getType());
        return transactionRepository.save(tx);
    }

    @DeleteMapping("/transactions/{id}")
    public void deleteTransaction(@PathVariable Long id) {
        User currentUser = getCurrentUser();
        Transaction tx = transactionRepository.findById(id).orElseThrow();

        if (!tx.getUser().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        transactionRepository.deleteById(id);
    }

    // --- Budget ---

    @GetMapping("/budget")
    public MonthlyBudget getBudget(@RequestParam int year, @RequestParam int month,
            @RequestParam(required = false) Long budgetGroupId) {
        User currentUser = getCurrentUser();
        BudgetGroup group = getBudgetGroup(currentUser, budgetGroupId);

        String key = String.format("%d-%02d", year, month);
        return monthlyBudgetRepository.findByBudgetGroupIdAndYearMonth(group.getId(), key)
                .orElse(new MonthlyBudget());
    }

    @PostMapping("/budget/{year}/{month}/copy")
    public MonthlyBudget copyFixedExpenses(@PathVariable int year, @PathVariable int month,
            @RequestParam(required = false) Long budgetGroupId) {
        User currentUser = getCurrentUser();
        BudgetGroup group = getBudgetGroup(currentUser, budgetGroupId);
        String currentKey = String.format("%d-%02d", year, month);

        // Calculate previous month
        int prevYear = year;
        int prevMonth = month - 1;
        if (prevMonth == 0) {
            prevMonth = 12;
            prevYear--;
        }
        String prevKey = String.format("%d-%02d", prevYear, prevMonth);

        // Find previous budget
        MonthlyBudget prevBudget = monthlyBudgetRepository.findByBudgetGroupIdAndYearMonth(group.getId(), prevKey)
                .orElseThrow(() -> new RuntimeException("지난달 데이터가 없습니다."));

        // Find or Create current budget
        MonthlyBudget currentBudget = monthlyBudgetRepository.findByBudgetGroupIdAndYearMonth(group.getId(), currentKey)
                .orElse(new MonthlyBudget());

        if (currentBudget.getId() == null) {
            currentBudget.setUser(currentUser);
            currentBudget.setBudgetGroup(group);
            currentBudget.setYearMonth(currentKey);
            currentBudget.setTotalAmount(0L); // 예산은 복사하지 않고 0으로 초기화
        }

        // Copy Fixed Expenses
        if (prevBudget.getFixedExpenses() != null) {
            for (FixedExpense fe : prevBudget.getFixedExpenses()) {
                FixedExpense newFe = new FixedExpense();
                newFe.setName(fe.getName());
                newFe.setAmount(fe.getAmount());
                newFe.setCategory(fe.getCategory());
                newFe.setPaymentMethod(fe.getPaymentMethod());
                currentBudget.addFixedExpense(newFe);
            }
        }

        return monthlyBudgetRepository.save(currentBudget);
    }

    @PostMapping("/budget")
    public MonthlyBudget setBudget(@RequestBody MonthlyBudget budget,
            @RequestParam(required = false) Long budgetGroupId) {
        User currentUser = getCurrentUser();
        BudgetGroup group = getBudgetGroup(currentUser, budgetGroupId);

        // Check if exists
        MonthlyBudget existing = monthlyBudgetRepository
                .findByBudgetGroupIdAndYearMonth(group.getId(), budget.getYearMonth())
                .orElse(null);

        if (existing != null) {
            existing.setTotalAmount(budget.getTotalAmount());
            existing.getFixedExpenses().clear();
            if (budget.getFixedExpenses() != null) {
                budget.getFixedExpenses().forEach(fe -> {
                    fe.setId(null); // ID 초기화로 다른 월의 데이터 이동 방지 (항상 신규 생성)
                    existing.addFixedExpense(fe);
                });
            }
            return monthlyBudgetRepository.save(existing);
        } else {
            // New budget
            budget.setUser(currentUser);
            budget.setBudgetGroup(group);
            if (budget.getFixedExpenses() != null) {
                budget.getFixedExpenses().forEach(fe -> {
                    fe.setId(null); // ID 초기화로 안전성 확보
                    fe.setMonthlyBudget(budget);
                });
            }
            return monthlyBudgetRepository.save(budget);
        }
    }
}
