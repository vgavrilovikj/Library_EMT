package com.library.backend.models.projections;

import com.library.backend.models.enumartions.Role;
import lombok.Data;

@Data
public class UserProjection {
    private String email;
    private String name;
    private Role role;

    public UserProjection(String email, String name, Role role) {
        this.email = email;
        this.name = name;
        this.role = role;
    }
}
