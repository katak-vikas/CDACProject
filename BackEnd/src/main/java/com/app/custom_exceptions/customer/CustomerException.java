package com.app.custom_exceptions.customer;

@SuppressWarnings("serial")
public class CustomerException extends RuntimeException {
	
	public CustomerException(String me) {
		super(me);
	}

}
