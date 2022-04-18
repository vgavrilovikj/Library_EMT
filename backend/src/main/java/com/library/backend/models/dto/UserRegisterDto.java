package com.library.backend.models.dto;

import com.library.backend.models.enumartions.Role;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class UserRegisterDto {
    @NotNull(message = "Email is required")
    String email;
    @NotNull(message = "Full Name is required")
    String name;
    @NotNull(message = "Password is required")
    String password;
}
