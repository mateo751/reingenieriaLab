package com.example.pos;
import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/health")
public class HealthController { @GetMapping public String ok(){ return "OK"; } }
