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
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.Email;

import com.app.entities.enums.AccountType;
import com.app.entities.enums.CustomerStatus;
import com.app.entities.enums.CustomerType;
import com.app.entities.enums.Gender;
import com.app.entities.enums.UserRole;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "customers", indexes = {@Index(name = "idx_customer_id", columnList = "customerId")})
//@Table(name = "customers")
@Inheritance(strategy = InheritanceType.JOINED)
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Customer implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long customerId;

    @Column(nullable = false)
    protected String firstName;

    @Column(nullable = false)
    protected String lastName;

    @Column(nullable = false, unique = true)
    @Email(message = "Invalid email format")
    protected String email;
    
    @Column(nullable = false, unique = true)
    protected String username;
    
    @Column(nullable = false)
    protected String password;
    
    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Account> accounts=new ArrayList<>();

    @OneToOne(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    private Address address;
    
  //@Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private CustomerStatus customerStatus;
    
    
    private String imagePath;
  //@Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private CustomerType customerType;

    //@Column(nullable = false)
    private String phoneNumber;

   // @Column(nullable = false)
    private LocalDate dateOfBirth;
    
 // @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Gender gender;


	 //one to one association Employee ----> AdharCard
    @OneToOne(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
	private AdhaarCard adhaarCard;
    
    @Column(nullable = false, unique=true)
    private String panCardNumber;

    @Enumerated(EnumType.STRING)
    private UserRole role;
    
    @OneToOne(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    private Beneficiary beneficiary;
    
    
	public Customer(String firstName, String lastName, String email, String username, String password) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.username = username;
		this.password = password;
		//this.userStatus = UserStatus.ACTIVE;
	}
    

	@Override
	public String toString() {
		return "Customer [customerId=" + customerId + ", firstName=" + firstName + ", lastName=" + lastName + ", email="
				+ email + ", username=" + username + ", password=" + password + ", customerStatus=" + customerStatus + ", customerType="
				+ customerType + ", phoneNumber=" + phoneNumber + ", dateOfBirth=" + dateOfBirth + ", gender=" + gender
				+ ", panCardNumber=" + panCardNumber + "]";
	}

	private void addAccount(Account account) {
		this.accounts.add(account);
		
	}

	public Account createAccountForCustomer(Customer customer, AccountType accountType, double deposite) {
		Account account = new Account(customer, accountType, deposite);
	
		customer.addAccount(account);
		return account;
		
	}

}

