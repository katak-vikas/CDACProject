package com.app.entities;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.Table;

import com.app.entities.enums.BeneficiaryBankName;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "transfer_funds_accounts", indexes = {@Index(name = "idx_account_number", columnList = "accountNumber")})
//@Table(name = "transfer_funnds_accounts")
@Inheritance(strategy = InheritanceType.JOINED)
@Getter
@Setter
@NoArgsConstructor
@ToString
public class TransferFundsAccount implements Serializable{
	
	@Id
	@Column(nullable = false, unique = true)
	private String accountNumber;
	
	@Column
	private String accountHolderName;

	@Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private BeneficiaryBankName beneficiaryBankName;
	
	@Column
	private String IFSCCode;

	public TransferFundsAccount(String accountNumber, String accountHolderName) {
		super();
		this.accountNumber = accountNumber;
		this.accountHolderName = accountHolderName;
		this.beneficiaryBankName = BeneficiaryBankName.URVI_BANK;
		this.IFSCCode = "URVI1000";
	}

	public TransferFundsAccount(Account account) {
		this(account.getAccountNumber(), "SELF");
		
	}
	
	

	public TransferFundsAccount(String accountNumber, String accountHolderName, BeneficiaryBankName beneficiaryBankName,
			String iFSCCode) {
		super();
		this.accountNumber = accountNumber;
		this.accountHolderName = accountHolderName;
		this.beneficiaryBankName = beneficiaryBankName;
		IFSCCode = iFSCCode;
	}

	public TransferFundsAccount(Account receiverAccount, String receiverName) {
		this(receiverAccount);
		this.accountHolderName = receiverName;
	}
	
	
	


}




