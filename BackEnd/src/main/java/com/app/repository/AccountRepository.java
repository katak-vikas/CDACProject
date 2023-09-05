package com.app.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.app.entities.Account;
import com.app.entities.Customer;
import com.app.entities.enums.AccountStatus;

@Repository
public interface AccountRepository extends JpaRepository<Account, String>{

//
//	Optional<Account> findByAccountNumberAndUser(String accountNumber, Customer user);
//
//	
//	List<Account> findByUser(User user);
//
//
	Optional<Account> findByAccountNumber(String senderAccountNumber);
	
	List<Account> findByCustomerCustomerId(Long customerId);

	List<Account> findByCustomer(Customer customer);

	List<Account> findByAccountStatus(AccountStatus pendingApproval);

	Customer findCustomerByAccountNumber(String accountNumber);

	
	//for pdf 
//	List<Account> findByAccountStatus(AccountStatus accountStatus);
//	 @Query("SELECT a.customerId FROM Account a WHERE a.accountNumber = :accountNumber")
//	    Long findCustomerIdWhereAccountNumber(@Param("accountNumber") String accountNumber);
//	
	//Optional<Customer> findByAccountsAccountNumber(String accountNumber);

}
