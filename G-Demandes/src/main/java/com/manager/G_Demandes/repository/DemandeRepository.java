package com.manager.G_Demandes.repository;

import com.manager.G_Demandes.dto.DemandeDTO;
import com.manager.G_Demandes.entity.Demande;
import com.manager.G_Demandes.entity.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;

//import java.util.List;

public interface DemandeRepository extends JpaRepository<Demande, Long> {

    Page<Demande> findByTitreContainingIgnoreCase(String titre, Pageable pageable);

    Page<Demande> findByStatus(Status status, Pageable pageable);
    

    // search: Issue1/1/""/ and it will be combined with default(Ouvert) or selected status for more efficient filtering
//21/4 just changed this method signature/naming to ...Status instead of Statut for JPA consistency
    Page<Demande> findByTitreContainingIgnoreCaseAndStatus(String titre, Status status, Pageable pageable);


    Page<Demande> findAll(Pageable pageable);
   /* I wanted to to add this for reporting after finishing the necessary requirements
    @Query("SELECT d.statut, COUNT(d) FROM Demande d GROUP BY d.statut")
    List<Object[]> countByStatut();
*/


}