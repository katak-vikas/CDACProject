package com.app.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Clerk;
import com.app.entities.Customer;

public interface ClerkRepository extends JpaRepository<Clerk,Long>{

	List<Clerk> findAll();

	Optional<Clerk> findByEmailId(String emailid);
	
}
