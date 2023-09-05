package com.app.custom_exceptions.account;

@SuppressWarnings("serial")
public class AccountNotActiveException extends RuntimeException{
	
	public AccountNotActiveException(String me) {
		super(me);
	}

}
