package com.manager.G_Demandes.repository;

import com.manager.G_Demandes.entity.Demandeur;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DemandeurRepository extends JpaRepository<Demandeur, Long> {
    Optional<Demandeur> findByEmail(String email);
}
