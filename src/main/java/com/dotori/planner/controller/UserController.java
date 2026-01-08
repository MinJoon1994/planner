package com.dotori.planner.controller;

import com.dotori.planner.entity.User;
import com.dotori.planner.repository.UserRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {

    private final UserRepository userRepository;

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated() ||
                authentication.getPrincipal().equals("anonymousUser")) {
            return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
        }

        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserInfoDTO userInfo = new UserInfoDTO();
        userInfo.setUsername(user.getUsername());
        userInfo.setEmail(user.getEmail());
        userInfo.setProfileImage("🐿️"); // 기본 다람쥐 이모지
        userInfo.setRole(user.getRole());
        userInfo.setMembershipType(user.getMembershipType().toString());
        userInfo.setBudgetStartDay(user.getBudgetStartDay());

        return ResponseEntity.ok(userInfo);
    }

    @PutMapping("/settings")
    public ResponseEntity<?> updateSettings(@RequestBody Map<String, Object> settings) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (settings.containsKey("budgetStartDay")) {
            int day = Integer.parseInt(settings.get("budgetStartDay").toString());
            // Validate day (1-31)
            if (day < 1 || day > 31) {
                return ResponseEntity.badRequest().body("Invalid day");
            }
            user.setBudgetStartDay(day);
        }

        userRepository.save(user);
        return ResponseEntity.ok(Map.of("message", "Settings updated"));
    }
}

@Data
class UserInfoDTO {
    private String username;
    private String email;
    private String profileImage;
    private String role;
    private String membershipType;
    private Integer budgetStartDay;
}
