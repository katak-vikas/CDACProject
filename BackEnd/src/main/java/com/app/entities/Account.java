package com.app.entities;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Version;

import com.app.entities.enums.AccountStatus;
import com.app.entities.enums.AccountType;
import com.app.utils.AccountUtils;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "accounts", indexes = {@Index(name = "idx_account_number", columnList = "accountNumber")})
//@Table(name = "accounts")
@Inheritance(strategy = InheritanceType.JOINED)
@Getter
@Setter
@NoArgsConstructor
public class Account implements Serializable{
	
	@Id
	@Column(nullable = false, unique = true)
	private String accountNumber;
	
	@Version
	private Long versionId;
	
	@Column(nullable = false)
	private double balance;
	
	@Column(nullable = false)
	private double lockedBalance=0.0;

    @Column(nullable = false)
    private LocalDate openDate;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private AccountStatus accountStatus;
    
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private AccountType accountType;
    
    
    @OneToMany(mappedBy = "fromAccount", cascade = CascadeType.ALL, orphanRemoval = true /* , fetch = FetchType.EAGER */ )
	private List<Transaction> transactions = new ArrayList<>();


    private LocalDate lastUpdateDate;

	@ManyToOne
	@JoinColumn(name = "customer_id")
	private Customer customer;

	
	@OneToOne(mappedBy = "account", cascade = CascadeType.ALL, orphanRemoval = true)
	private DebitCard debitCard;
	
	@OneToOne(mappedBy = "account", cascade = CascadeType.ALL, orphanRemoval = true)
	private Loan loan;
	
	public Account(Customer customer) {
		super();
		this.accountNumber = AccountUtils.generateAccountNumber();
		this.openDate = LocalDate.now();		
		this.customer = customer;
		this.lastUpdateDate = LocalDate.now();
		
	}

	public Account(Customer customer, double deposit) {
		super();
		this.accountNumber = AccountUtils.generateAccountNumber();
		this.openDate = LocalDate.now();
		this.customer = customer;
		balance = deposit;
		this.lastUpdateDate = LocalDate.now();
	}



	public Account(Customer customer, String accountNumber, double balance, LocalDate openDate) {
		super();
		this.accountNumber = accountNumber;
		this.balance = balance;
		this.openDate = openDate;
		this.customer = customer;
		this.lastUpdateDate = LocalDate.now();
	}

//	@Override
//	public String toString() {
//		return "Account [accountNumber=" + accountNumber + ", balance=" + balance + ", openDate=" + openDate
//				+ ", accountStatus=" + accountStatus + ", accountType=" + accountType + ", lastUpdateDate=" + lastUpdateDate
//				+ ", customer=" + customer + "]";
//	}
	
//	@Override
//	public String toString() {
//		return "Account [accountNumber=" + accountNumber + ", balance=" + balance ;
//	}

	public Account(Customer customer2, AccountType accountType2, double deposite) {
		this(customer2);
		this.lockedBalance = deposite;
		this.accountType = accountType2;
	}

	public void addTransaction(Transaction transaction) {
		this.transactions.add(transaction);		
	}

	@Override
	public String toString() {
		return "Account [accountNumber=" + accountNumber + ", versionId=" + versionId + ", balance=" + balance
				+ ", lockedBalance=" + lockedBalance + ", openDate=" + openDate + ", accountStatus=" + accountStatus
				+ ", accountType=" + accountType + ", lastUpdateDate=" + lastUpdateDate + "]";
	}
	
}




