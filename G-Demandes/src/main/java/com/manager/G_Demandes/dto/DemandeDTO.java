package com.manager.G_Demandes.dto;

import com.manager.G_Demandes.entity.Status;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;
public record DemandeDTO(
        Long id,
        @NotNull @Size(min = 3, max = 100, message = "Le titre doit avoir entre 3 et 100 caractères")
        String titre,
        @Size(max = 300, message = "votre texte de description est trop long")
        String description,
        @NotNull Status status,
        @NotNull
        LocalDateTime dateCreation,
        @NotNull @Email(message = "L'email doit être valide")
        String demandeurEmail

) {}