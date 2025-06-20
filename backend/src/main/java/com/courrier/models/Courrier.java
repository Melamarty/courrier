package com.courrier.models;

import jakarta.persistence.*;
import java.time.LocalDate;

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
    private String modified_at;
    private String created_at;
    private String emmeteur;
    private String fichier;
    private int modied_by

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Courrier() {}


    public int getid() { return id; }
    public void setid(int num) { this.id = id; }

    public String getObjet() { return objet; }
    public void setObjet(String objet) { this.objet = objet; }

    public String getAnnotation() { return annotation; }
    public void setAnnotation(String annotation) { this.annotation = annotation; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public String getDestinataire() { return destinataire; }
    public void setDestinataire(String destinataire) { this.destinataire = destinataire; }

    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }

    public String getEmmeteur() { return emmeteur; }
    public void setEmmeteur(String emmeteur) { this.emmeteur = emmeteur; }

    public String getFichier() { return fichier; }
    public void setFichier(String fichier) { this.fichier = fichier; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
