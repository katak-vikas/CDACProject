package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.AdhaarCard;

public interface AdhaarCardRepository extends JpaRepository<AdhaarCard, Long> {

}
