package com.app.controller;

import javax.security.auth.login.AccountException;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.AccountDto;
import com.app.dto.ApiResponse;
import com.app.dto.TransferFundsInterbank;
import com.app.dto.TransferFundsIntrabank;
import com.app.entities.TransferFundsAccount;
import com.app.entities.enums.AccountStatus;
import com.app.entities.enums.TransactionMode;
import com.app.service.AccountService;
import com.app.service.TransactionService;

@CrossOrigin("*")
@RestController
@RequestMapping("/account")
public class AccountController {

	@Autowired
	private ModelMapper mapper;

	@Autowired
	private AccountService accountService;

	@Autowired
	private TransactionService transactionService;

	@GetMapping("/details/{accountNumber}")
	public ResponseEntity<?> getAccountDetails(@PathVariable String accountNumber) {
		try {

			AccountDto accountDto = accountService.getByAccountNumber(accountNumber);

			if (accountDto.getAccountStatus() != AccountStatus.ACTIVE) {
				throw new AccountException("Account not active, contact bank");
			}

			return new ResponseEntity<>(accountDto, HttpStatus.OK);
		} catch (RuntimeException | AccountException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
		}

	}

	@DeleteMapping("/{accountNumber}")
	public ResponseEntity<?> deleteAccount(@PathVariable String accountNumber) {
		try {

			String message = accountService.deleteAccount(accountNumber);

			return new ResponseEntity<>(message, HttpStatus.OK);
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
		}

	}

//    
	@PostMapping("/transfer/intrabank")
	public ResponseEntity<?> transferFundsfer(@RequestBody TransferFundsIntrabank request) {
		try {
			String senderAccountNumber = request.getSenderAccountNumber();
			String receiverAccountNumber = request.getReceiverAccountNumber();
			String receiverName = request.getReceiverName();
			double amount = request.getAmount();
			TransactionMode trasactionMode = request.getTransactionMode();

			String res = transactionService.transferFunds(senderAccountNumber, receiverAccountNumber, receiverName,
					amount, trasactionMode);

			return new ResponseEntity<>(new ApiResponse(res), HttpStatus.OK);

//			return new ResponseEntity<>(new ApiResponce(trasactionService.transferFunds(senderAccountNumber, receiverAccountNumber, receiverName, amount, trasactionMode)), HttpStatus.OK);

		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}

	}

	@PostMapping("/transfer/interbank")
	public ResponseEntity<?> transferFundsfer(@RequestBody TransferFundsInterbank request) {
		try {
			System.out.println("\n\n"+request);
			String senderAccountNumber = request.getSenderAccountNumber();
			TransferFundsAccount tfa = request.getTfa();
			double amount = request.getAmount();
			TransactionMode trasactionMode = request.getTransactionMode();

			String res = transactionService.transferFundsInterbank(senderAccountNumber, tfa, amount, trasactionMode);

			return new ResponseEntity<>(new ApiResponse(res), HttpStatus.OK);

//			return new ResponseEntity<>(new ApiResponce(trasactionService.transferFunds(senderAccountNumber, receiverAccountNumber, receiverName, amount, trasactionMode)), HttpStatus.OK);

		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}

	}

}
