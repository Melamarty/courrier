package com.courrier.controllers;

import com.courrier.models.Courrier;
import com.courrier.repositories.CourrierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/courriers")
public class CourrierController {

    @Autowired
    private CourrierRepository courrierRepository;

    /* ---------- READ all ---------- */
    @GetMapping
    public List<Courrier> getAllCourriers() {
        return courrierRepository.findAll();
    }

    /* ---------- CREATE ---------- */
    @PostMapping
    public Courrier createCourrier(@RequestBody Courrier courrier) {
        return courrierRepository.save(courrier);
    }

    /* ---------- READ one ---------- */
    @GetMapping("/{id}")
    public Courrier getCourrierById(@PathVariable Integer id) {
        return courrierRepository.findById(id).orElse(null);
    }

    /* ---------- DELETE ---------- */
    @DeleteMapping("/{id}")
    public void deleteCourrier(@PathVariable Integer id) {
        courrierRepository.deleteById(id);
    }

    /* ---------- UPDATE ---------- */
    @PutMapping("/{id}")
    public Courrier updateCourrier(@PathVariable Integer id,
                                   @RequestBody Courrier details) {

        return courrierRepository.findById(id).map(courrier -> {
            /* align with the new fields */
            courrier.setInternalRef(details.getInternalRef());
            courrier.setNumeroCourrier(details.getNumeroCourrier());
            courrier.setDate(details.getDate());
            courrier.setDestinateur(details.getDestinateur());
            courrier.setInterne(details.isInterne());
            courrier.setExterne(details.isExterne());
            courrier.setDiffusionInterne(details.isDiffusionInterne());
            courrier.setReferenceExterne(details.getReferenceExterne());
            courrier.setModifiedAt(details.getModifiedAt());   // if you keep manual auditing
            courrier.setUser(details.getUser());

            return courrierRepository.save(courrier);
        }).orElse(null);
    }
}
