package com.library.backend.controllers;

import com.library.backend.models.dto.UserLoginDto;
import com.library.backend.models.projections.JwtProjection;
import com.library.backend.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login")
public class LoginController {
    private final UserService userService;

    public LoginController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<JwtProjection> login (@RequestBody UserLoginDto userLoginDto) throws Exception {
        return this.userService.authenticate(userLoginDto)
                .map(user -> ResponseEntity.ok().body(user))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }
}
