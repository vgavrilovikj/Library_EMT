package com.library.backend.services;

import com.library.backend.models.User;
import com.library.backend.models.dto.UserLoginDto;
import com.library.backend.models.dto.UserRegisterDto;
import com.library.backend.models.projections.UserProjection;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Optional;

public interface UserService extends UserDetailsService {
    UserDetails getUser();
    Optional<UserProjection> authenticate(UserLoginDto userLoginDto) throws Exception;
    Optional<User> findByEmail(String email);
    Optional<User> login(String email, String password);
    Optional<Boolean> save (UserRegisterDto userRegisterDto);
    void logout(User user);
}
