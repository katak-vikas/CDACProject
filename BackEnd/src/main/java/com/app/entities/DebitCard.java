package com.app.entities;

import java.security.NoSuchAlgorithmException;
import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.app.custom_exceptions.NumberGeneratorException;
import com.app.utils.DebitCardUtils;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Entity
@Table(name = "debit_cards", indexes = {@Index(name = "idx_debit_card_id", columnList = "debitCardid")})
//@Table(name = "debit_cards")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class DebitCard {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long debitCardid;

    @Column(nullable = false, unique = true)
    private String debitCardNumber;
    
    @Column(nullable = false, length = 3)
    private int CVV;

    @Column(nullable = false)
    private LocalDate expirationDate;

    @OneToOne (fetch = FetchType.LAZY)//mandatory , o.w hib throws MappingExc
	@JoinColumn(name="account_number")//optional : to specify name of FK col
	private Account account;
    
  
    private double transactionLimit;

	public DebitCard(Account account) {
		super();
		
		try {
			this.debitCardNumber = DebitCardUtils.generateDebitCardNumber();
		} catch (NoSuchAlgorithmException e) {
			throw new NumberGeneratorException("could not generate debit card number");
		}
		
		try {
			this.CVV = DebitCardUtils.generatedebbitCardCVV();
		} catch (Exception e) {
			throw new NumberGeneratorException("could not generate debit card CVV");
		}
		this.transactionLimit = 50000;
		this.expirationDate = LocalDate.now().plusYears(5);
		this.account = account;
	}
	
	
	public DebitCard(Account account, double transactionLimit) {
		this(account);
		this.setTransactionLimit(transactionLimit);
	}
    
    
}
