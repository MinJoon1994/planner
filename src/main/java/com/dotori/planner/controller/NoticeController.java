package com.dotori.planner.controller;

import com.dotori.planner.entity.Notice;
import com.dotori.planner.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/notices")
@RequiredArgsConstructor
public class NoticeController {
    private final NoticeRepository noticeRepository;

    @GetMapping
    public List<Notice> getAllNotices() {
        return noticeRepository.findAllByOrderByCreatedDateDesc();
    }

    @PostMapping
    public ResponseEntity<Notice> createNotice(@RequestBody Notice notice, Authentication auth) {
        notice.setCreatedDate(LocalDateTime.now());
        if (auth != null) {
            notice.setAuthor(auth.getName());
        }
        return ResponseEntity.ok(noticeRepository.save(notice));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotice(@PathVariable Long id) {
        noticeRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
