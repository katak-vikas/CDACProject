package com.app.dto;

import com.app.entities.enums.BeneficiaryBankName;
import com.app.entities.enums.Relation;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class BeneficiaryDto {
	
   
    private String name;

    
    private String accountNumber;

   
    private BeneficiaryBankName beneficiaryBankName;

    private Relation relation;

}
