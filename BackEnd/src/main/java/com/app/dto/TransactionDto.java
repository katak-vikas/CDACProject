package com.app.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class TransactionDto {

	private Long transactionId;
    private String transactionStatus;
    private String transactionType;
    private LocalDate transactionDate;
    private LocalTime transactionTime;
    private String fromAccountNumber;
    private String toAccountNumber;
    private double amount;
    private String transactionMode;
}
