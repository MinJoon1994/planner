package com.dotori.planner.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Configuration
public class DatabaseFixer {

    private static final Logger log = LoggerFactory.getLogger(DatabaseFixer.class);

    @Bean
    public CommandLineRunner fixDatabase(JdbcTemplate jdbcTemplate) {
        return args -> {
            try {
                // Remove the incorrect unique key that causes issues with multiple users
                // Error indicates constraint name: UKqso4839qj6cred8qb7iaa4wi2
                log.info(
                        "Attempting to drop incorrect unique constraint UKqso4839qj6cred8qb7iaa4wi2 on monthly_budget table...");
                jdbcTemplate.execute("ALTER TABLE monthly_budget DROP INDEX UKqso4839qj6cred8qb7iaa4wi2");
                log.info("Successfully dropped incorrect unique constraint.");
            } catch (Exception e) {
                // Constraint might not exist or already removed
                log.info("Did not drop constraint (it may not exist): " + e.getMessage());
            }
        };
    }
}
