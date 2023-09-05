package com.app.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@ToString
public class ApiResponse {
	
	private String message;
	
	private LocalDateTime timestamp;

	public ApiResponse(String message) {
		super();
		this.message = message;
		timestamp = LocalDateTime.now();
	}
	
	

}
