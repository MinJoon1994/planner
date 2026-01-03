package com.dotori.planner.repository;

import com.dotori.planner.entity.BudgetGroup;
import com.dotori.planner.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BudgetGroupRepository extends JpaRepository<BudgetGroup, Long> {
    List<BudgetGroup> findAllByUser(User user);

    List<BudgetGroup> findAllByUserOrderByCreatedDateAsc(User user);

    long countByUser(User user);
}
