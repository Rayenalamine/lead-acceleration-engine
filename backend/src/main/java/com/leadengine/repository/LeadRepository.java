package com.leadengine.repository;

import com.leadengine.domain.Lead;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LeadRepository extends JpaRepository<Lead, UUID> {
}
