package com.app.custom_exceptions;

@SuppressWarnings("serial")
public class ErrorProcessingRequest extends RuntimeException {

	public ErrorProcessingRequest(String message) {
		super(message);
	}
}
