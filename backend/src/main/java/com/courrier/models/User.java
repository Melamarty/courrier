package com.courrier.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;


@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String login;
    private String modeDePass;
    private String nom;
    private String prenom;
    private String role;
    private String service;

    @Column(name = "dateDernierConnexion")
    private LocalDateTime dateDernierConnexion;

    @OneToMany(mappedBy = "user",
               cascade = CascadeType.ALL,
               fetch   = FetchType.LAZY)
    @JsonManagedReference 
    private List<Courrier> courriers;

    public User() {}


    public int getId() { return id; }
    public void setId(int id) { this.id = id; }


    public String getModeDePass() { return modeDePass; }
    public void setModeDePass(String modeDePass) { this.modeDePass = modeDePass; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getPrenom() { return prenom; }
    public void setPrenom(String prenom) { this.prenom = prenom; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getService() { return service; }
    public void setService(String service) { this.service = service; }


    public LocalDateTime getDateDernierConnexion() { return dateDernierConnexion; }
    public void setDateDernierConnexion(LocalDateTime dateDernierConnexion) { this.dateDernierConnexion = dateDernierConnexion; }

    public List<Courrier> getCourriers() { return courriers; }
    public void setCourriers(List<Courrier> courriers) { this.courriers = courriers; }
}
