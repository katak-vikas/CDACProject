package com.app.entities;

import javax.persistence.Entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@Entity
public class Manager extends Employee{
	   

	public Manager(String firstName, String lastName, String emailId, String password) {
		super(firstName,lastName,emailId,password);
	}

	
}