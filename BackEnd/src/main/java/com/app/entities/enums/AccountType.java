package com.app.entities.enums;

public enum AccountType {

	SAVING(1000, 5.0, 200000),
    CURRENT(10000, 0.0, Double.MAX_VALUE),
    FIXED_DEPOSIT(20000, 7.0, Double.MAX_VALUE),
    RECURRING_DEPOSIT(5000, 4.0, Double.MAX_VALUE),
    TRADING(5000, 0.0, Double.MAX_VALUE);
    
    
    private double minimumBalance;
    private double interestRate;
    private double transactionLimit;

    
 // Constructor for setting values (optional)
    private AccountType(double minimumBalance, double interestRate, double transactionLimit) {
        this.minimumBalance = minimumBalance;
        this.interestRate = interestRate;
        this.transactionLimit = transactionLimit;
    }

    AccountType() {
	// TODO Auto-generated constructor stub
    }

	public double getMinimumBalance() {
        return minimumBalance;
    }

    public void setMinimumBalance(double minimumBalance) {
        this.minimumBalance = minimumBalance;
    }

    public double getInterestRate() {
        return interestRate;
    }

    public void setInterestRate(double interestRate) {
        this.interestRate = interestRate;
    }

    public double getTransactionLimit() {
        return transactionLimit;
    }

    public void setTransactionLimit(double transactionLimit) {
        this.transactionLimit = transactionLimit;
    }
}
