package com.app.entities;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.app.entities.enums.LoanStatus;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "loans", indexes = {@Index(name = "idx_loan_id", columnList = "loanId")})

//@Table(name = "loans")
@Getter
@Setter
@NoArgsConstructor
public class Loan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long loanId;

    @Column(nullable = false)
    private double amount;

    @Column(nullable = false)
    private LocalDate applicationDate;

    @Column(nullable = false)
    private LocalDate approvalDate;

    @Column(nullable = false)
    private int durationMonths;

    @OneToOne (fetch = FetchType.LAZY)//mandatory , o.w hib throws MappingExc
	@JoinColumn(name="account_number")//optional : to specify name of FK col
	private Account account;
    
    @Column(nullable = false)
    private LoanStatus loanStatus = LoanStatus.ACTIVE;
    
    @Column(nullable = false)
    private int defaultedInstallments = 0;

    @OneToMany(mappedBy = "loan", cascade = CascadeType.ALL, orphanRemoval = true /* , fetch = FetchType.EAGER */ )
	private List<LoanPayment> loanPayments = new ArrayList<>();

    @OneToMany(mappedBy = "loan", cascade = CascadeType.ALL, orphanRemoval = true /* , fetch = FetchType.EAGER */ )
    private List<LoanInstallment> loanInstallments = new ArrayList<>();

    public Loan(double amount, int durationMonths, Account account) {
        super();
        this.amount = amount;
        this.durationMonths = durationMonths;
        this.applicationDate = LocalDate.now();
        this.account = account;
    }

	@Override
	public String toString() {
		return "Loan [loanId=" + loanId + ", amount=" + amount + ", applicationDate=" + applicationDate
				+ ", approvalDate=" + approvalDate + ", durationMonths=" + durationMonths + ", account=" + account
				+ ", loanStatus=" + loanStatus + ", defaultedInstallments=" + defaultedInstallments + "]";
	}

    // Rest of the class...
}

