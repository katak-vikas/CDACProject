package com.app.entities;

import javax.persistence.*;

import com.app.entities.enums.BeneficiaryBankName;
import com.app.entities.enums.Relation;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "beneficiaries")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Beneficiary {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long beneficiaryId;
    
    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String accountNumber;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private BeneficiaryBankName beneficiaryBankName;

    @Enumerated(EnumType.STRING)
    private Relation relation;

//    @OneToOne(mappedBy = "beneficiary", cascade = CascadeType.ALL, orphanRemoval = true)
//    private Customer customer;
    
    @OneToOne (fetch = FetchType.LAZY)//mandatory , o.w hib throws MappingExc
	@JoinColumn(name="customer_id")//optional : to specify name of FK col
	@MapsId  //optional BUT reco : to use shared PK between Emp n Address
	private Customer customer;


    public Beneficiary(String name, String accountNumber, BeneficiaryBankName bankName, Relation relation) {
        this.name = name;
        this.accountNumber = accountNumber;
        this.beneficiaryBankName = bankName;
        this.relation = relation;
    }
}

