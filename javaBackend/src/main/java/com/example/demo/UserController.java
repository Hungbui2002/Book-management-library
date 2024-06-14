package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User loginRequest) {
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();

        User user = userRepository.findByUsername(username);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }

        if (!password.equals(user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
        if (user.isAdmin()) {
            return ResponseEntity.ok("Login successful as admin");
        }

        return ResponseEntity.ok("Login successful");
    }
    @GetMapping("/checkUsername/{username}")
    public ResponseEntity<Boolean> checkUsernameExist(@PathVariable String username) {
      User user = userRepository.findByUsername(username);
      boolean isUsernameExist = (user != null);
      return ResponseEntity.ok(isUsernameExist);
    }
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        if (userRepository.findByUsername(user.getUsername()) != null) {
            return new ResponseEntity<>("Username already exists", HttpStatus.BAD_REQUEST);
        }
        
        try {
            userRepository.save(user);
            return new ResponseEntity<>("Registration successful", HttpStatus.CREATED);
        } catch(Exception e) {
            return new ResponseEntity<>("An error has occurred", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
