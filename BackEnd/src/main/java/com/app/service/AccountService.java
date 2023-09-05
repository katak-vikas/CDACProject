package com.app.service;

import java.util.List;

import com.app.dto.AccountDto;
import com.app.dto.PendingAccountDto;
import com.app.dto.TransactionRequestDto;
import com.app.dto.TransactionResponseDto;

public interface AccountService {

//	Account getAccountById(Long accountId);
//
//	String deleteAccount(Customer user);
//
//	Double transferFunds(String senderAccountNumber, String receiverAccountNumber, double amount, TransactionMode transactionMode);

	AccountDto getByAccountNumber(String accountNumber);
//
//	String deposit(TransactionRequestDto transactionRequest);
//
//	String withdraw(TransactionRequestDto transactionRequest);

	List<AccountDto> getAllAccounts();

//	TransactionResponseDto depositAmount(TransactionRequestDto transactionDetails);

	List<PendingAccountDto> getAccountsWithPendingApproval();

	String deleteAccount(String accountNumber);



//	TransactionResponseDto withdrawAmount(TransactionRequestDto transactionDetails);

	
}
