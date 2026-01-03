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

        return ResponseEntity.ok(userInfo);
    }
}

@Data
class UserInfoDTO {
    private String username;
    private String email;
    private String profileImage;
    private String role;
    private String membershipType;
}
