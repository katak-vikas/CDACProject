package com.app.service;

import java.util.List;

import com.app.dto.CustomerDto;
import com.app.entities.Clerk;

public interface ClerkService {

	String updateCustomerStatus(String username);

	List<Clerk> getAllClerks();

	String approveCustomerAccount(String accoountNumber);

	List<CustomerDto> getNotActiveCustomers();
	
	

}
