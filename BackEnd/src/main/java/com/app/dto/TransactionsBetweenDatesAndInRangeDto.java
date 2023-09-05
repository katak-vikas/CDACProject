package com.app.dto;

public class TransactionsBetweenDatesAndInRangeDto {

	
	private String accountNumber;
	
	private String startDate;
	
	private String endDate;
	
	private Double startValue;
	
	private Double endValue;
	
	

	public TransactionsBetweenDatesAndInRangeDto() {
		super();
	}

	public TransactionsBetweenDatesAndInRangeDto(String accountNumber, String startDate, String endDate,
			Double startValue, Double endValue) {
		super();
		this.accountNumber = accountNumber;
		this.startDate = startDate;
		this.endDate = endDate;
		this.startValue = startValue;
		this.endValue = endValue;
	}
	
	

	@Override
	public String toString() {
		return "TransactionsBetweenDatesAndInRangeDto [accountNumber=" + accountNumber + ", startDate=" + startDate
				+ ", endDate=" + endDate + ", startValue=" + startValue + ", endValue=" + endValue + "]";
	}

	public String getAccountNumber() {
		return accountNumber;
	}

	public void setAccountNumber(String accountNumber) {
		this.accountNumber = accountNumber;
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public Double getStartValue() {
		return startValue;
	}

	public void setStartValue(Double startValue) {
		this.startValue = startValue;
	}

	public Double getEndValue() {
		return endValue;
	}

	public void setEndValue(Double endValue) {
		this.endValue = endValue;
	}
	
	
	
	
	
	
}
