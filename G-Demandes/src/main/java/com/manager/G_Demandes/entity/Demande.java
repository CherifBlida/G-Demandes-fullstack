package com.manager.G_Demandes.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;
@Entity
public class Demande {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull // added to handle null before we hit the database and manage exceptions
    @Column(nullable = false)// added for safety puReposes and scalability (multiple frontend/manual database ops
    @Size(min = 3, max = 100, message = "Le Titre ne doit pas etre trop long ou trop court")
    private String titre;

    @Size(max=300,message=" votre texte description est trop long")
    private String description;

    @Enumerated(EnumType.STRING)
    @NotNull
    @Column(nullable = false)
    private Status status;


    @NotNull
    @Column(nullable = false)
    //
    private LocalDateTime dateCreation;

    @ManyToOne
    @JoinColumn(name = "demandeur_id", nullable = false)
    @NotNull
    private Demandeur demandeur;
    public LocalDateTime getDateCreation() {
        return dateCreation;
    }

    public void setDateCreation(LocalDateTime dateCreation) {
        this.dateCreation = dateCreation;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Demandeur getDemandeur() {
        return demandeur;
    }

    public void setDemandeur(Demandeur demandeur) {
        this.demandeur = demandeur;
    }

}