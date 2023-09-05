package com.app.dto;

import java.time.LocalDate;

import com.app.entities.enums.AccountType;
import com.app.entities.enums.CustomerStatus;
import com.app.entities.enums.CustomerType;
import com.app.entities.enums.Gender;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class RegisterCustomerDto {
	
	private String firstName;
	
	private String lastName;
	
	private String email;
	
	private String username;
	
	private String password;
	
	private CustomerType customerType;
	  
    private AddressDto address;
    
//    private CustomerStatus customerStatus;
    
    private String phoneNumber;

    private LocalDate dateOfBirth;
    
    private Gender gender;

	private AdhaarCardDto adhaarCard;
    
    private String panCardNumber;

    private BeneficiaryDto beneficiary;
    
    private AccountType accountType;

	private double deposite;

}
