package com.app.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.app.entities.Transaction;
import com.app.entities.enums.TransactionStatus;

@Repository
public interface TransactionRepository  extends JpaRepository<Transaction, Long>{
	
	@Query("SELECT t FROM Transaction t WHERE (t.fromAccount.accountNumber = :accountNumber OR t.toAccount.accountNumber = :accountNumber) AND t.transactionDate BETWEEN :startDate AND :endDate")
	List<Transaction> findTransactionsByAccountAndDateRange(@Param("accountNumber") Long accountNumber, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

	List<Transaction> findByFromAccountAccountNumber(String accountNumber);


	@Query("SELECT t FROM Transaction t WHERE t.fromAccount.accountNumber = :accountNumber " +
            "AND t.transactionDate BETWEEN :startDate AND :endDate " +
            "AND t.amount BETWEEN :startValue AND :endValue")
      List<Transaction> findByAccountNumberAndTransactionDateBetweenAndTransactionValueBetween(String accountNumber,
                                                  LocalDate startDate, LocalDate endDate,
                                                 Double startValue, Double endValue);
//	
//	@Query("SELECT t FROM Transaction t WHERE t.senderAccount.accountNumber = :accountNumber")
//	List<Transaction> getTransactionsByAccountNumber(@Param("accountNumber") String accountNumber);

	Transaction findByTransactionId(Long transactionId);


	List<Transaction> findByTransactionStatus(TransactionStatus pending);

	List<Transaction> findByFromAccount(String accountNumber);

}
