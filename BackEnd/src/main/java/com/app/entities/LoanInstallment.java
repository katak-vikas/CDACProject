package com.app.entities;

import java.time.LocalDate;

import javax.persistence.*;

import com.app.entities.enums.LoanInstallmentStatus;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "loan_installments")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class LoanInstallment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long loanInstallmentId;

    @Column(nullable = false)
    private double amount;

    @Column(nullable = false)
    private LocalDate dueDate;
    
    
    @Column(nullable = false)
    private LoanInstallmentStatus loanInstallmentStatus;
    
    @ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "loan_id")
	private Loan loan;
    // Constructors, getters, setters, etc.
}
