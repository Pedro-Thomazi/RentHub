package br.com.backend.backend.service;

import br.com.backend.backend.exception.BusinessRuleException;
import br.com.backend.backend.model.User.User;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {

    public String createToken(User user) {
        try {
            Algorithm algorithm = Algorithm.HMAC256("12345678");
            return JWT.create()
                    .withIssuer("renthub")
                    .withSubject(user.getUsername())
                    .withExpiresAt(expiration(120))
                    .sign(algorithm);
        } catch (JWTCreationException ex) {
            throw new BusinessRuleException("Erro ao gerar token JWT");
        }
    }

    public String validateToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256("12345678");
            return JWT.require(algorithm)
                    .withIssuer("renthub")
                    .build()
                    .verify(token)
                    .getSubject();
        } catch (JWTCreationException ex) {
            throw new BusinessRuleException("Erro ao verificar o token JWT");
        }
    }

    private Instant expiration(Integer minutes) {
        return LocalDateTime.now().plusMinutes(minutes).toInstant(ZoneOffset.of("-03:00"));
    }
}
