package com.app.dto;

import java.time.LocalDate;
import java.util.List;

import com.app.entities.Beneficiary;
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
public class CustomerDto {

	private String firstName;
	
	private String lastName;
	
	private String email;
	
	private String username;
	
	
	  private List<AccountDto> accounts;
	  
	  private CustomerType customerType;
	  
	  private AddressDto address;
	  
	  private CustomerStatus customerStatus;
	  
	  private String phoneNumber;
	  
	  private LocalDate dateOfBirth;
	  
	  private String panCardNumber;
	  
	  
	  private Gender gender;
	  
	  private AdhaarCardDto adhaarCard;
	  
	  private BeneficiaryDto beneficiary;
	 
   
}
