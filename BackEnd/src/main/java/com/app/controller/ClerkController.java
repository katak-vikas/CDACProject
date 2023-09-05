package com.app.controller;

import java.time.LocalTime;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.custom_exceptions.account.AccountException;
import com.app.custom_exceptions.account.AccountNotActiveException;
import com.app.custom_exceptions.transaction.TransactionException;
import com.app.dto.ApiResponse;
import com.app.dto.PendingAccountDto;
import com.app.dto.TransactionRequestDto;
import com.app.jwt_utils.JwtUtil;
import com.app.service.AccountService;
import com.app.service.ClerkService;
import com.app.service.CustomerService;
import com.app.service.TransactionService;

@RestController
@RequestMapping("/clerk")
public class ClerkController {

	@Autowired
	private CustomerService customerService;

	@Autowired
	private TransactionService transactionService;

	@Autowired
	private ClerkService clerkService;

	@Autowired
	private AccountService accountService;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@GetMapping("/logout")
	public ResponseEntity<?> logout(HttpServletRequest request) {
		// Access the customer details from the session


//	       CustomerDto loggedInCustomer = (CustomerDto) httpSession.getAttribute("loggedInCustomer");
		return new ResponseEntity<>("logged out", HttpStatus.OK);
		
	}

	@GetMapping("/customers")
	public ResponseEntity<?> getAllCustomers() {
		try {
			LocalTime curr = LocalTime.now();
			System.out.println(curr + "in get");
			return ResponseEntity.ok().body(customerService.getAllCustomers());
		} catch (Exception ex) {
			return ResponseEntity.badRequest().body(new ApiResponse(ex.getMessage()));
		}
	}

	// get all trasaction,
	@GetMapping("/transactions")
	public ResponseEntity<?> getAllTransactions() {
		try {
			return ResponseEntity.status(HttpStatus.OK).body(transactionService.getAllTransactions());
		} catch (Exception ex) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(ex.getMessage()));
		}
	}

	@GetMapping("/accounts")
	public ResponseEntity<?> getAllAccounts() {
		try {
			return ResponseEntity.ok().body(accountService.getAllAccounts());
		} catch (ResourceNotFoundException e) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new ApiResponse(e.getMessage()));
		}
	}

	@GetMapping("/customers/pending-approval")
	public ResponseEntity<?> getAccountsWithPendingApproval() {
		try {
			List<PendingAccountDto> pendingCustomers = accountService.getAccountsWithPendingApproval();
			return ResponseEntity.ok().body(pendingCustomers);
		} catch (AccountException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}
	
	@GetMapping("/customer/notActive")
	public ResponseEntity<?> getNotActiveCustomers() {
		try {
			return ResponseEntity.status(HttpStatus.OK).body(clerkService.getNotActiveCustomers());
		} catch (TransactionException ex) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(ex.getMessage()));
		}
	}
	
	@PostMapping("/customer/deposit")
	public ResponseEntity<?> depositAmount(@RequestBody TransactionRequestDto transactionDetails) {
		try {
			return ResponseEntity.ok().body(transactionService.depositAmount(transactionDetails));
		} catch (TransactionException te) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(te.getMessage()));
		}catch (AccountNotActiveException te) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(te.getMessage()));
		}
	}


	@PostMapping("/customer/withdraw")
	public ResponseEntity<?> withdrawAmount(@RequestBody TransactionRequestDto transactionDetails) {
		try {
			return ResponseEntity.ok().body(transactionService.withdrawAmount(transactionDetails));
		} catch (TransactionException te) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse("An error occurred."));
		}
	}


	@GetMapping("/account/approve/{accountNumber}")
	public ResponseEntity<?> accountApprove(@PathVariable String accountNumber) {
		System.out.println("I am in accpount no. osmething");
		try {
			String result = clerkService.approveCustomerAccount(accountNumber);
			return ResponseEntity.ok(accountService.getAccountsWithPendingApproval());
		} catch (ResourceNotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Customer not found.");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred.");
		}
	}
	


	
	// this method is not working for some reason, correct it latter.
	// should be working now
	@PutMapping("/customer/approveStatus/{username}")
	public ResponseEntity<String> updateCustomerStatus(@PathVariable String username) {
		try {
			String result = clerkService.updateCustomerStatus(username);
			return ResponseEntity.ok(result);
		} catch (ResourceNotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Customer not found.");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred.");
		}
	}
	
	
	
	/*
	 * @PutMapping("/transaction/approve/{transactionId}") public ResponseEntity<?>
	 * approveTransaction(@PathVariable Long transactionId) { try { return
	 * ResponseEntity.status(HttpStatus.OK).body(transactionService.
	 * approveTransaction(transactionId)); } catch (TransactionException ex) {
	 * return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new
	 * ApiResponse(ex.getMessage())); } }
	 */
	/*
	 * @GetMapping("/transaction/approve") public ResponseEntity<?>
	 * getPendingTransactions() { try { return
	 * ResponseEntity.status(HttpStatus.OK).body(transactionService.
	 * getPendingTransaction()); } catch (TransactionException ex) { return
	 * ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new
	 * ApiResponse(ex.getMessage())); } }
	 */


}
