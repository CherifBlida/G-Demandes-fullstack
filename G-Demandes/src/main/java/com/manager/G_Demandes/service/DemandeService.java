package com.manager.G_Demandes.service;

import com.manager.G_Demandes.dto.DemandeDTO;
import com.manager.G_Demandes.entity.*;
import com.manager.G_Demandes.repository.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class DemandeService {
    private final DemandeRepository demandeRepository;
    private final DemandeurRepository demandeurRepository;

    public DemandeService(DemandeRepository demandeRepository, DemandeurRepository demandeurRepository) {
        this.demandeRepository = demandeRepository;
        this.demandeurRepository = demandeurRepository;
    }

    public DemandeDTO createDemande(DemandeDTO dto) {
        Demandeur demandeur = demandeurRepository.findByEmail(dto.demandeurEmail())
                .orElseGet(() -> {
                    Demandeur newDemandeur = new Demandeur();
                    newDemandeur.setNom(dto.demandeurEmail().split("@")[0]); // Fallback name
                    newDemandeur.setEmail(dto.demandeurEmail());
                    return demandeurRepository.save(newDemandeur);
                });

        Demande demande = new Demande();
        demande.setTitre(dto.titre());
        demande.setDescription(dto.description());
        demande.setStatus(dto.status());
        demande.setDateCreation(LocalDateTime.now()); // Server-side timestamp
        demande.setDemandeur(demandeur);

        return toDTO(demandeRepository.save(demande));
    }

    public DemandeDTO updateDemande(Long id, DemandeDTO dto) {
        Demande demande = demandeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Demande non trouvée"));

        if (!isValidStatusTransition(demande.getStatus(), dto.status())) {
            throw new IllegalStateException("Transition de statut invalide");
        }

        Demandeur demandeur = demandeurRepository.findByEmail(dto.demandeurEmail())
                .orElseThrow(() -> new IllegalArgumentException("Demandeur non trouvé"));

        demande.setTitre(dto.titre());
        demande.setDescription(dto.description());
        demande.setStatus(dto.status());
        demande.setDemandeur(demandeur);

        return toDTO(demandeRepository.save(demande));
    }
    public DemandeDTO getDemandeById(Long id) {
        Demande demande = demandeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Demande non trouvée"));
        return toDTO(demande);
    }


    public Page<DemandeDTO> getDemandes(Pageable pageable) {
        return demandeRepository.findAll(pageable).map(this::toDTO);
    }

    public Page<DemandeDTO> findByTitre(String titre, Pageable pageable) {
        return demandeRepository.findByTitreContainingIgnoreCase(titre, pageable).map(this::toDTO);
    }

    public Page<DemandeDTO> findByStatus(Status status, Pageable pageable) {
        return demandeRepository.findByStatus(status, pageable).map(this::toDTO);
    }

    public Page<DemandeDTO> findByTitreAndStatus(String titre, Status status, Pageable pageable) {
        return demandeRepository.findByTitreContainingIgnoreCaseAndStatus(titre, status, pageable).map(this::toDTO);
    }

   /* public List<Object[]> getStatusStats() {
        return demandeRepository.countByStatus();
    }
*/
    private DemandeDTO toDTO(Demande demande) {
        return new DemandeDTO(
                demande.getId(),
                demande.getTitre(),
                demande.getDescription(),
                demande.getStatus(),
                demande.getDateCreation(),
                demande.getDemandeur().getEmail()
        );
    }

    private boolean isValidStatusTransition(Status current, Status next) {
        if (current == Status.OUVERT && (next == Status.EN_COURS || next == Status.FERME)) return true;
        if (current == Status.EN_COURS && next == Status.FERME) return true;
        return false;
    }
}