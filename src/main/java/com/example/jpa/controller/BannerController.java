package com.example.jpa.controller;

import com.example.jpa.model.Banner;
import com.example.jpa.repository.BannerRepo;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("banner")
public class BannerController {
private BannerRepo bannerRepo;

@Autowired
    public BannerController(BannerRepo bannerRepo) {
        this.bannerRepo = bannerRepo;
    }

    @GetMapping
    public List<Banner> list(){
    return bannerRepo.findAll();
    }

    @GetMapping("{id}")
    public Banner getOne(@PathVariable("id") Long id){
        return bannerRepo.getOne(id);
    }

    @PostMapping
    public Banner create(@Valid @RequestBody Banner banner){
     return bannerRepo.save(banner);
    }

    @PutMapping("{id}")

    public Banner update(@PathVariable("id") Banner bannerFromDb,
                         @RequestBody Banner banner){
        BeanUtils.copyProperties(banner,bannerFromDb,"id");
        return bannerRepo.save(bannerFromDb);

    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Banner banner){
        bannerRepo.delete(banner);
    }

}
