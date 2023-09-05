package com.app.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NegativeOrZero;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="adhaar_cards")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class AdhaarCard {
	
	@Id
	@Column(name="card_number",length = 12,unique = true)
	private String adhaarCardNumber;
	
	@Column(name = "image_data", columnDefinition = "BLOB")
    private byte[] imageData;
	
	
	
	@OneToOne (fetch = FetchType.LAZY)//mandatory , o.w hib throws MappingExc
	@JoinColumn(name="customer_id")//optional : to specify name of FK co
	private Customer customer;



	public AdhaarCard(String adhaarCardNumber) {
		super();
		this.adhaarCardNumber = adhaarCardNumber;
	}



	public AdhaarCard(String adhaarCardNumber, Customer customer) {
		super();
		this.adhaarCardNumber = adhaarCardNumber;
		this.customer = customer;
	}
	
	

}
