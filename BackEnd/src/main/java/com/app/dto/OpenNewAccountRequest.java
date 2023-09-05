package com.app.dto;

import com.app.entities.enums.AccountType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class OpenNewAccountRequest {
	
	private AccountType accountType;
	
	private double deposite;

}
