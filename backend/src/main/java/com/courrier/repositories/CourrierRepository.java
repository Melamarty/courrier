package com.courrier.repositories;

import com.courrier.models.Courrier;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourrierRepository extends JpaRepository<Courrier, Integer> {
}
