package br.com.backend.backend.controller;

import br.com.backend.backend.exception.BusinessRuleException;
import br.com.backend.backend.model.Authentication.DataToken;
import br.com.backend.backend.model.User.*;
import br.com.backend.backend.service.TokenService;
import br.com.backend.backend.service.UserService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;

    public UserController(UserService userService, AuthenticationManager authenticationManager, TokenService tokenService) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
    }

    @GetMapping("/my-details")
    public ResponseEntity<DataGetUser> getUserDetails(@AuthenticationPrincipal User logado) {
        var user = userService.getMyDetails(logado);
        return ResponseEntity.ok(new DataGetUser(user));
    }

    @PostMapping("/register")
    public ResponseEntity createUser(@Valid @RequestBody DataCreateUser data) {
        var user = userService.create(data);
        try {
            var token = new UsernamePasswordAuthenticationToken(data.email(), data.password());
            var authentication = authenticationManager.authenticate(token);
            String tokenAccess = tokenService.createToken((User) authentication.getPrincipal());
            return ResponseEntity.ok(new DataGetUserAndToken(user, tokenAccess));
        } catch (Exception e) {
            System.out.println("Erro ao criar o usuário: " + e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity login(@Valid @RequestBody DataLogin data) {
        if (data.email() == null || data.email().isEmpty()) {
            throw new BusinessRuleException("O e-mail é obrigatório");
        }
        if (data.password() == null || data.password().isEmpty()) {
            throw new BusinessRuleException("Senha e confirmação de senha são diferentes.");
        }
        try {
            var token = new UsernamePasswordAuthenticationToken(data.email(), data.password());
            var authentication = authenticationManager.authenticate(token);
            String tokenAccess = tokenService.createToken((User) authentication.getPrincipal());
            return ResponseEntity.ok(new DataToken(tokenAccess));
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Erro no login: " + e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Transactional
    @PutMapping("/update-user")
    public ResponseEntity updateUser(@Valid @RequestBody DataUpdateUser data, @AuthenticationPrincipal User logado) {
        var user = userService.updateUser(data, logado);
        return ResponseEntity.ok(new DataGetUser(user));
    }

    @Transactional
    @DeleteMapping("/delete-user")
    public ResponseEntity deleteUser(@AuthenticationPrincipal User logado) {
        userService.desativateUser(logado);
        return ResponseEntity.ok().body("Usuário desativado.");
    }
}
