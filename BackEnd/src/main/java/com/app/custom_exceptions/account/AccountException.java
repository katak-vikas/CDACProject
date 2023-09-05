package com.app.custom_exceptions.account;

@SuppressWarnings("serial")
public class AccountException extends RuntimeException {

	public AccountException(String me) {
		super(me);
	}
}
