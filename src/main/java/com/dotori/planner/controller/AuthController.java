package com.dotori.planner.controller;

import com.dotori.planner.entity.User;
import com.dotori.planner.repository.UserRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest request) {
        Map<String, String> response = new HashMap<>();

        // Validate input
        if (request.getUsername() == null || request.getUsername().trim().isEmpty()) {
            response.put("message", "사용자 이름은 필수입니다.");
            return ResponseEntity.badRequest().body(response);
        }

        if (request.getPassword() == null || request.getPassword().length() < 6) {
            response.put("message", "비밀번호는 최소 6자 이상이어야 합니다.");
            return ResponseEntity.badRequest().body(response);
        }

        if (request.getEmail() == null || !request.getEmail().contains("@")) {
            response.put("message", "유효한 이메일 주소를 입력하세요.");
            return ResponseEntity.badRequest().body(response);
        }

        // Check if username already exists
        if (userRepository.existsByUsername(request.getUsername())) {
            response.put("message", "이미 사용 중인 사용자 이름입니다.");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }

        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            response.put("message", "이미 사용 중인 이메일입니다.");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }

        // Create new user
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());
        user.setRole("ROLE_USER");
        user.setEnabled(true);

        userRepository.save(user);

        response.put("message", "회원가입이 완료되었습니다!");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/check-username")
    public ResponseEntity<?> checkUsername(@RequestParam String username) {
        Map<String, Boolean> response = new HashMap<>();
        response.put("available", !userRepository.existsByUsername(username));
        return ResponseEntity.ok(response);
    }

    @GetMapping("/check-email")
    public ResponseEntity<?> checkEmail(@RequestParam String email) {
        Map<String, Boolean> response = new HashMap<>();
        response.put("available", !userRepository.existsByEmail(email));
        return ResponseEntity.ok(response);
    }

    @GetMapping("/status")
    public ResponseEntity<?> checkStatus(org.springframework.security.core.Authentication authentication) {
        Map<String, Object> response = new HashMap<>();
        boolean isLoggedIn = authentication != null && authentication.isAuthenticated()
                && !(authentication instanceof org.springframework.security.authentication.AnonymousAuthenticationToken);
        response.put("loggedIn", isLoggedIn);
        if (isLoggedIn) {
            response.put("username", authentication.getName());
            response.put("roles", authentication.getAuthorities().stream()
                    .map(org.springframework.security.core.GrantedAuthority::getAuthority)
                    .collect(java.util.stream.Collectors.toList()));
        }
        return ResponseEntity.ok(response);
    }
}

@Data
class RegisterRequest {
    private String username;
    private String password;
    private String email;
}
