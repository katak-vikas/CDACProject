package com.app.custom_exceptions.account;

@SuppressWarnings("serial")
public class AccountBalanceException extends AccountException {

	public AccountBalanceException(String me) {
		super(me);
	}
}
