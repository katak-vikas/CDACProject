package com.app.custom_exceptions;

public class PendingForApprovalException extends RuntimeException {

	public PendingForApprovalException(String me) {
		super(me);
	}
}
