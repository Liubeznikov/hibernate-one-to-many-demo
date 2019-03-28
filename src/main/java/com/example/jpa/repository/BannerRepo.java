package com.example.jpa.repository;

import com.example.jpa.model.Banner;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BannerRepo extends JpaRepository<Banner,Long> {
}
