package com.courrier.models;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "courriers")
public class Courrier {

    /* ---------- Primary key ---------- */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;                           // DB surrogate key (not shown in the form)

    /* ---------- 1. Référence interne ---------- */
    @Column(name = "internal_ref")
    private String internalRef;                   // <input id="search-ref">

    /* ---------- 2. Numéro courrier ---------- */
    @Column(name = "numero_courrier")
    private String numeroCourrier;                // <input id="num-courrier">

    /* ---------- 3. Date ---------- */
    private LocalDate date;                       // <input id="date" type="date">

    /* ---------- 4. Destinateur (Sous‑direction) ---------- */
    private String destinateur;                   // <input id="destinateur">

    /* ---------- 5. Destinataire : interne / externe ---------- */
    private boolean interne;                      // <input id="interne" type="checkbox">
    private boolean externe;                      // <input id="externe" type="checkbox">

    /* ---------- 6. Diffusion interne ? ---------- */
    @Column(name = "diffusion_interne")
    private boolean diffusionInterne;             // <input id="diffusion" type="checkbox">

    /* ---------- 7. Référence externe ---------- */
    @Column(name = "reference_externe")
    private String referenceExterne;              // <input id="ref-ext">

    /* ---------- Audit columns (kept from your original model) ---------- */
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "modified_at")
    private LocalDateTime modifiedAt;

    /* ---------- Author / owner relation (unchanged) ---------- */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;

    /* ---------- Constructors ---------- */
    public Courrier() {}

    /* ---------- Getters & setters ---------- */
    public Integer getId() { return id; }

    public String getInternalRef() { return internalRef; }
    public void setInternalRef(String internalRef) { this.internalRef = internalRef; }

    public String getNumeroCourrier() { return numeroCourrier; }
    public void setNumeroCourrier(String numeroCourrier) { this.numeroCourrier = numeroCourrier; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public String getDestinateur() { return destinateur; }
    public void setDestinateur(String destinateur) { this.destinateur = destinateur; }

    public boolean isInterne() { return interne; }
    public void setInterne(boolean interne) { this.interne = interne; }

    public boolean isExterne() { return externe; }
    public void setExterne(boolean externe) { this.externe = externe; }

    public boolean isDiffusionInterne() { return diffusionInterne; }
    public void setDiffusionInterne(boolean diffusionInterne) { this.diffusionInterne = diffusionInterne; }

    public String getReferenceExterne() { return referenceExterne; }
    public void setReferenceExterne(String referenceExterne) { this.referenceExterne = referenceExterne; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getModifiedAt() { return modifiedAt; }
    public void setModifiedAt(LocalDateTime modifiedAt) { this.modifiedAt = modifiedAt; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
