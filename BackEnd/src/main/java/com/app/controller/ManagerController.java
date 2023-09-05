package com.app.controller;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.custom_exceptions.account.AccountException;
import com.app.custom_exceptions.transaction.TransactionException;
import com.app.dto.ApiResponse;
import com.app.dto.CustomerDto;
import com.app.dto.ManagerCustomerDto;
import com.app.dto.UpdateCustomerDetails;
import com.app.entities.Clerk;
import com.app.entities.Manager;
import com.app.jwt_utils.JwtUtil;
import com.app.service.AccountService;
import com.app.service.ClerkService;
import com.app.service.CustomerService;
import com.app.service.ManagerService;
import com.app.service.TransactionService;

@RestController
@RequestMapping("/manager")
public class ManagerController {

	@Autowired
	private ManagerService managerService;

	@Autowired
	private CustomerService customerService;

	@Autowired
	private ClerkService clerkService;

	@Autowired
	private TransactionService transactionService;

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

	@GetMapping("/clerks")
	public ResponseEntity<?> getAllClerks() {
		List<Clerk> listOfClerks = clerkService.getAllClerks();
		if (listOfClerks.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No Clerks");
		} else {
			return ResponseEntity.status(HttpStatus.OK).body(listOfClerks);
		}
	}

	@GetMapping("/customers")
	public ResponseEntity<?> getAllCustomers() {
		List<CustomerDto> listOfCustomers = customerService.getAllCustomers();
		if (listOfCustomers.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No Customers");
		} else {
			return ResponseEntity.status(HttpStatus.OK).body(listOfCustomers);
		}
	}

	@PostMapping("/customer/update/{customerId}")
	public ResponseEntity<?> updateCustomerPhoneNoOrEmailId(@PathVariable("customerId") Long customerId,
			@RequestBody ManagerCustomerDto customer) {

		String updatedPhoneNumber = customer.getPhoneNumber();
		String updatedEmailId = customer.getEmail();

		boolean updateSuccessful = customerService.updateCustomerPhoneNoOrEmail(customerId, updatedPhoneNumber,
				updatedEmailId);

		if (updateSuccessful) {
			return ResponseEntity.ok("Customer details updated successfully.");
		} else {
			return ResponseEntity.badRequest().body("Failed to update customer details.");
		}
	}

	@GetMapping("/accounts")
	public ResponseEntity<?> getAllAccounts() {
		try {
			return ResponseEntity.status(HttpStatus.OK).body(accountService.getAllAccounts());
		} catch (AccountException ex) {
			return ResponseEntity.internalServerError().body(new ApiResponse(ex.getMessage()));
		}
	}

	@GetMapping("/transactions")
	public ResponseEntity<?> getAllTransactions() {
		try {
			return ResponseEntity.ok().body(transactionService.getAllTransactions());
		} catch (TransactionException ex) {
			return ResponseEntity.internalServerError().body(new ApiResponse(ex.getMessage()));
		}
	}
	
	/*
	 * @PostMapping("/login") public ResponseEntity<String> login(@RequestParam
	 * String email, @RequestParam String password) { Manager authenticatedManager =
	 * managerService.authenticateManager(email, password);
	 * 
	 * if (authenticatedManager != null) { return
	 * ResponseEntity.ok("Logged in successfully. Redirecting to dashboard..."); }
	 * else { return ResponseEntity.status(HttpStatus.UNAUTHORIZED).
	 * body("Wrong username or password. Please try again."); } }
	 */
}
