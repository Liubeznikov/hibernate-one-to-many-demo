package com.example.jpa.repository;


import com.example.jpa.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;


public interface MessageRepo extends JpaRepository<Message, Long> {
}
