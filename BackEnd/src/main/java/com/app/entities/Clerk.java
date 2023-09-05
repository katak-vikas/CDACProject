package com.app.entities;

import java.time.LocalDate;

import javax.persistence.Entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Entity
public class Clerk extends Employee{
	
	public Clerk(String firstName, String lastName, String emailId, String password, int salary, LocalDate joinDate) {
        super(firstName, lastName, emailId, password, salary, joinDate);
    }
	
}
