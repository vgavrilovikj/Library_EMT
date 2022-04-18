package com.library.backend.services.impl;

import com.library.backend.models.User;
import com.library.backend.models.dto.UserLoginDto;
import com.library.backend.models.dto.UserRegisterDto;
import com.library.backend.models.enumartions.Role;
import com.library.backend.models.projections.UserProjection;
import com.library.backend.repositories.UserRepository;
import com.library.backend.services.UserService;
import com.library.backend.utils.JwtUtil;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public UserServiceImpl(UserRepository userRepository, @Lazy BCryptPasswordEncoder passwordEncoder, @Lazy AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public UserDetails getUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof UserDetails) {
            return (UserDetails) principal;
        }

        return null;
    }

    @Override
    public Optional<UserProjection> authenticate(UserLoginDto userLoginDto) throws Exception {
        try {
            this.authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(userLoginDto.getEmail(), userLoginDto.getPassword())
            );
        } catch (BadCredentialsException e) {
            throw new Exception("Incorrect credentials", e);
        }

        final UserDetails userDetails = this.loadUserByUsername(userLoginDto.getEmail());
        final String jwt = this.jwtUtil.generateToken(userDetails);

        return Optional.of(new UserProjection(jwt));
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return Optional.ofNullable(this.userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User with that email doesn't exist.")));
    }

    @Override
    public Optional<User> login(String email, String password) {
        return this.userRepository
                .findByEmail(email)
                .filter(user -> Objects.equals(password, user.getPassword()));
    }

    @Override
    public Optional<Boolean> save(UserRegisterDto userRegisterDto) {
        User user = new User(userRegisterDto.getEmail(),
                userRegisterDto.getName(),
                passwordEncoder.encode(userRegisterDto.getPassword()),
                Role.ROLE_LIBRARIAN);

        this.userRepository.save(user);
        return Optional.of(true);
    }

    @Override
    public void logout(User user) {
        //TODO: WHAT TO DO HERE???
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = this.findByEmail(username).get();

        return new org.springframework.security.core.userdetails.User(user.getEmail(),
                user.getPassword(),
                Collections.singleton(new SimpleGrantedAuthority(user.getRole().getAuthority())));
    }
}
