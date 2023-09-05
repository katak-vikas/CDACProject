package com.app.utils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public interface AccountUtils {
	
	static String generateAccountNumber() {
		
		LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddhhmmss");
        String formattedDateTime = now.format(formatter);
		return "SA"+formattedDateTime;
	}
	
		
//		public Account(String accountNumber, double balance, LocalDate openDate) {
//			super();
//			this.accountNumber = accountNumber;
//			this.balance = balance;
//			this.openDate = openDate;
//		}
	

//	static Account createNewAccount() {
//		String accountNumber = AccountUtils.generateAccountNumber();
//		Account account = new SavingAccount(accountNumber, 0, LocalDate.now());
//		
//		return account;
//	}

}
