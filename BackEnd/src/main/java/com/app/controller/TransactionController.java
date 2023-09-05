package com.app.controller;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.custom_exceptions.account.AccountException;
import com.app.dto.ApiResponse;
import com.app.dto.TransactionDto;
import com.app.dto.TransactionsBetweenDatesAndInRangeDto;
import com.app.entities.Transaction;
import com.app.service.AccountService;
import com.app.service.TransactionService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/transaction")
public class TransactionController {
	
	@Autowired
	private ModelMapper mapper;
	
	@Autowired
	private TransactionService transactionService;
	
	@Autowired 
	private AccountService accountService;
	
	@GetMapping("/list")
	public ResponseEntity<?> getAllTransactions(
            @RequestParam(required = false) String accountNumber,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate,
            @RequestParam(required = false) Double startValue,
            @RequestParam(required = false) Double endValue) {
		try {
 
//			return new ResponseEntity<>(null);
			return new ResponseEntity<>(transactionService.getTransactionsBetweenDatesAndInRange(accountNumber, startDate, endDate, startValue, endValue), HttpStatus.OK);
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse(e.getMessage()));
		}

	}
	

	    // 8. Pagination demo
	
		// http://host:port/employees , method=GET
		// req params : pageNumber , def val 0 , optional
		// pageSize : def val 3 , optional

		@GetMapping("/transactionList")
			public ResponseEntity<?> getAllTransactionsPaginated(
					@RequestParam(defaultValue = "0", required = false) int pageNumber,
				    @RequestParam(defaultValue = "3", required = false) int pageSize)
	     {
				System.out.println("in get all transactions " +pageNumber+" "+pageSize);
				List<TransactionDto> list = transactionService.
						getAllTransactions(pageNumber,pageSize);
				if (list.isEmpty())
					return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
				// emps found
				return ResponseEntity.ok(list);
		}
		
	
//	@PostMapping("/account/transactionsN")
//    public ResponseEntity<?> getTransactionsByDateRange(@RequestBody TransactionsBetweenDatesAndInRangeDto transactionsBetweenDatesAndInRangeDto) {
//
//		try {
//			
//			System.out.println("\nDTo");
//			System.out.println(transactionsBetweenDatesAndInRangeDto);
//			
//			String accountNumber = transactionsBetweenDatesAndInRangeDto.getAccountNumber();
//			String startDate = transactionsBetweenDatesAndInRangeDto.getStartDate();
//			String endDate = transactionsBetweenDatesAndInRangeDto.getEndDate();
//			Double startValue = transactionsBetweenDatesAndInRangeDto.getStartValue();
//			Double endValue = transactionsBetweenDatesAndInRangeDto.getEndValue();
//
//	        
//	        List<TransactionDto> transactions = transactionService.getTransactionsBetweenDatesAndInRange(accountNumber, startDate, endDate, startValue, endValue);
//
//	        return new ResponseEntity<>(transactions, HttpStatus.OK);
//		}
//		 catch (AccountException e) {
//			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse(e.getMessage()));
//	    } catch (Exception e) {
//	    	return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));	    
//	    }
//	 }

}
