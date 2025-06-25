package com.courrier.controllers;

import com.courrier.models.Courrier;
import com.courrier.repositories.CourrierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courriers")
public class CourrierController {

    @Autowired
    private CourrierRepository courrierRepository;

    @GetMapping
    public List<Courrier> getAllCourriers() {
        return courrierRepository.findAll();
    }

    @PostMapping
    public Courrier createCourrier(@RequestBody Courrier courrier) {
        return courrierRepository.save(courrier);
    }

    @GetMapping("/{id}")
    public Courrier getCourrierById(@PathVariable int id) {
        return courrierRepository.findById(id).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void deleteCourrier(@PathVariable int id) {
        courrierRepository.deleteById(id);
    }

    @PutMapping("/{id}")
    public Courrier updateCourrier(@PathVariable int id, @RequestBody Courrier details) {
        Courrier courrier = courrierRepository.findById(id).orElse(null);
        if (courrier != null) {
            courrier.setObjet(details.getObjet());
            courrier.setAnnotation(details.getAnnotation());
            courrier.setDate(details.getDate());
            courrier.setDestinataire(details.getDestinataire());
            courrier.setDestinateurSource(details.getDestinateurSource());
            courrier.setType(details.getType());
            courrier.setEmmeteur(details.getEmmeteur());
            courrier.setFichier(details.getFichier());
            courrier.setStatus(details.getStatus());
            courrier.setModifiedAt(details.getModifiedAt());
            courrier.setCreatedAt(details.getCreatedAt());
            courrier.setModiedBy(details.getModiedBy());
            courrier.setUser(details.getUser());
            return courrierRepository.save(courrier);
        }
        return null;
    }
}
