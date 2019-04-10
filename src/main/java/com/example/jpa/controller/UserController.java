package com.example.jpa.controller;

import com.example.jpa.model.User;
import com.example.jpa.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("users")
public class UserController {
    @Autowired
    private UserRepo userRepo;

    @GetMapping
    public List<User> getAllUsers(){
      return userRepo.findAll();
    }

    @PostMapping
    public User saveUser(@Valid @RequestBody User user){
        return userRepo.save(user);
    }

}
