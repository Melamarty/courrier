package com.courrier.models;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;


@Entity
@Table(name = "courriers")
public class Courrier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idCourrier;

    private String objet;
    private String annotation;
    private LocalDate date;
    private String destinataire;
    private String destinateurSource;
    private String type;
    private String status;
    private LocalDateTime modified_at;
    private LocalDateTime created_at;
    private String emmeteur;
    private String fichier;
    private int modied_by;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonBackReference  
    private User user;

    public Courrier() {}


    public int getid() { return idCourrier; }
    public void setid(int num) { this.idCourrier = num; }

    public String getObjet() { return objet; }
    public void setObjet(String objet) { this.objet = objet; }

    public String getAnnotation() { return annotation; }
    public void setAnnotation(String annotation) { this.annotation = annotation; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public String getDestinataire() { return destinataire; }
    public void setDestinataire(String destinataire) { this.destinataire = destinataire; }

    public String getDestinateurSource() { return destinateurSource; }
    public void setDestinateurSource(String destinateurSource) { this.destinateurSource = destinateurSource; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getEmmeteur() { return emmeteur; }
    public void setEmmeteur(String emmeteur) { this.emmeteur = emmeteur; }

    public String getFichier() { return fichier; }
    public void setFichier(String fichier) { this.fichier = fichier; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public int getModiedBy() { return modied_by; }
    public void setModiedBy(int modied_by) { this.modied_by = modied_by; }

    public LocalDateTime getModifiedAt() { return modified_at; }
    public void setModifiedAt(LocalDateTime modified_at) { this.modified_at = modified_at; }

    public LocalDateTime getCreatedAt() { return created_at; }
    public void setCreatedAt(LocalDateTime created_at) { this.created_at = created_at; }


    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
