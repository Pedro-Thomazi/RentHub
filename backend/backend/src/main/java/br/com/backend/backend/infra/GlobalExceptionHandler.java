package br.com.backend.backend.infra;

import br.com.backend.backend.exception.BusinessRuleException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BusinessRuleException.class)
    public ResponseEntity<Map<String, String>> handleBusinessRuleException(BusinessRuleException ex) {
        Map<String, String> res = new HashMap<>();
        res.put("error", ex.getMessage());

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Map<String, String>> handleDuplicateEmailException(DataIntegrityViolationException ex) {
        Map<String, String> response = new HashMap<>();

        if (ex.getMessage().contains("Duplicate entry")) {
            response.put("error", "E-mail já cadastrado. Tente outro!");
        } else {
            response.put("error", "Erro de integridade de dados.");
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
}
