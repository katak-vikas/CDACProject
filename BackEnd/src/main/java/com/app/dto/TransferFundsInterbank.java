package com.app.dto;

import com.app.entities.TransferFundsAccount;
import com.app.entities.enums.TransactionMode;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class TransferFundsInterbank {

	private String senderAccountNumber;
	private TransferFundsAccount tfa;
	private double amount;
	private TransactionMode transactionMode;
}
