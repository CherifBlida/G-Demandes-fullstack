package com.manager.G_Demandes.controllers;

import com.manager.G_Demandes.dto.DemandeDTO;
import com.manager.G_Demandes.entity.Status;
import com.manager.G_Demandes.service.DemandeService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/demandes")
@CrossOrigin(origins = "*") // allow frontend access
public class DemandeController {

    private final DemandeService demandeService;

    public DemandeController(DemandeService demandeService) {
        this.demandeService = demandeService;
    }

    @PostMapping
    public DemandeDTO createDemande(@Valid @RequestBody DemandeDTO demandeDTO) {
        return demandeService.createDemande(demandeDTO);
    }

    @PutMapping("/{id}")
    public DemandeDTO updateDemande(@PathVariable Long id, @Valid @RequestBody DemandeDTO demandeDTO) {
        return demandeService.updateDemande(id, demandeDTO);
    }

    @GetMapping
    public Page<DemandeDTO> getDemandes(Pageable pageable,
                                        @RequestParam(required = false) String titre,
                                        @RequestParam(required = false) Status status) {
        if (titre != null && status != null) {
            return demandeService.findByTitreAndStatus(titre, status, pageable);
        } else if (titre != null) {
            return demandeService.findByTitre(titre, pageable);
        } else if (status != null) {
            return demandeService.findByStatus(status, pageable);
        } else {
            return demandeService.getDemandes(pageable);
        }
    }
}
