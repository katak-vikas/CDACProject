package com.app.dto;

import javax.persistence.Column;

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
public class AdhaarCardDto {
	
	private String adhaarCardNumber;
	
//	@Column(name = "image_data", columnDefinition = "BLOB")
//    private byte[] imageData;
	
	

}
