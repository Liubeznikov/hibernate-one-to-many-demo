package com.example.jpa.controller;

import com.example.jpa.exception.UserNotFoundExeption;
import com.example.jpa.model.User;
import com.example.jpa.repository.UserRepo;
import org.springframework.beans.BeanUtils;
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

    @GetMapping("{name}")
    public List<User> getListByName(@PathVariable("name") String name){
        return userRepo.findByName(name);
    }

    @GetMapping("login/{login}")
    public User getOne(@PathVariable("login") String login){
        return userRepo.findByLogin(login).stream().findFirst().orElse(null);
    }

    @PostMapping
    public User saveUser(@Valid @RequestBody User user){
        return userRepo.save(user);
    }

    @PostMapping("/list")
    public void saveUserList(@Valid @RequestBody List<User> users){
         users.forEach(user ->userRepo.save(user));
    }

    @DeleteMapping("{login}")
    public void deleteUser(@PathVariable("login") String login){
         userRepo.delete(getOne(login));
    }

    @PutMapping("{login}")
    public User userSave(@Valid @RequestBody User user, @PathVariable("login") String login){
        User userFromDb;
        userFromDb = getOne(login);
        BeanUtils.copyProperties(user,userFromDb,"login");
        return userRepo.save(userFromDb);
    }

}
