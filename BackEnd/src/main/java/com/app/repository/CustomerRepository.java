package com.app.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.dto.CustomerDto;
import com.app.entities.Customer;
import com.app.entities.enums.CustomerStatus;

public interface CustomerRepository extends JpaRepository<Customer, Long>{
//	
//	Optional<Customer> findByUsernameAndPassword(String username, String password);
//	
	Optional<Customer> findByUsername(String username);
//
//	Optional<Customer> findByAccountsAccountNumber(String accountNumber);
	
//	Optional<Customer> findByCustomerId(Long customerId); 
	
	List<Customer> findAll();
	
	List<CustomerDto> findByCustomerStatus(CustomerStatus customerStatus);

	Customer findByUsernameAndPassword(String username, String password);

	Customer findByAccountsAccountNumber(String accountNumber);

	Optional<Customer> findByEmail(String email);

}
