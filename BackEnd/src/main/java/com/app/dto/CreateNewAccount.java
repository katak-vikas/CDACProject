package com.app.dto;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.app.entities.Customer;
import com.app.utils.AccountUtils;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@ToString
public class CreateNewAccount {

	private String accountNumber;
	
	private double balance;
	
	private LocalDate openDate;

	public CreateNewAccount() {
		super();
		accountNumber = AccountUtils.generateAccountNumber();
		balance = 0;
		openDate = LocalDate.now();
	}
	
	//private AccountType accountType;
	

	
	
	
}
