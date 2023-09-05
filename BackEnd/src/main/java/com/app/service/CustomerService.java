package com.app.service;

import java.util.List;

import com.app.dto.AccountDto;
import com.app.dto.CustomerDto;
import com.app.dto.OpenNewAccountRequest;
import com.app.dto.RegisterCustomerDto;
import com.app.dto.UpdateCustomerDetails;
import com.app.entities.Customer;

public interface CustomerService {

	String registerCustomer(RegisterCustomerDto registerCustomerDto);
	
	CustomerDto login(String username, String password);

	boolean updateCustomerPhoneNoOrEmail(Long customerId, String updatedPhoneNumber, String updatedEmailId);
	
//	String customerLogin(String username, String password);
//
//
	String deleteCustomer(String username);

	List<CustomerDto> getAllCustomers();

	public String updateCustomerDetails(String username, UpdateCustomerDetails updateCustomerDetails);

	CustomerDto getProfile(String username);

	AccountDto openNewAccount(String extractedUsername, OpenNewAccountRequest openNewAccountRequest);

	List<AccountDto> getAllAccounts(String extractedUsername);

	Customer findByEmail(String email);

	void save(Customer user);

	Customer findByUsername(String username);


}
