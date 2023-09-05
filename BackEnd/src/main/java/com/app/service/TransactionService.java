package com.app.service;

import java.time.LocalDate;
import java.util.List;

import com.app.dto.TransactionDto;
import com.app.dto.TransactionRequestDto;
import com.app.dto.TransactionResponseDto;
import com.app.entities.Account;
import com.app.entities.Transaction;
import com.app.entities.TransferFundsAccount;
import com.app.entities.enums.TransactionMode;

public interface TransactionService {

	

	public List<TransactionDto> getTransactionsBetweenDatesAndInRange(
            String accountNumber, String startDate, String endDate,
            Double startValue, Double endValue);

	public String transferFunds(String senderAccountNumber, String receiverAccountNumber, String receiverName, double amount, TransactionMode transactionMode);


	public String transferFundsInterbank(String senderAccountNumber, TransferFundsAccount tfa, double amount,
			TransactionMode trasactionMode);

	List<TransactionDto> getAllTransactions(int pageNumber, int pageSize);
	List<TransactionDto> getAllTransactions();
	TransactionDto approveTransaction(Long transactionId);

	public TransactionResponseDto depositAmount(TransactionRequestDto transactionDetails);
	
	public TransactionResponseDto withdrawAmount(TransactionRequestDto transactionDetails);

	List<Transaction> getPendingTransaction();

	public String getAllTransactionsThroughMail(String accountNumber);

//	public void addTransactionRecord(Account senderAccount, Account receiverAccount, double amount, TransactionMode transactionMode);
//
//	public List<TransactionDto> getAllTransactions(String accountNumber, String startDate, String endDate, Double startValue, Double endValue);

}
