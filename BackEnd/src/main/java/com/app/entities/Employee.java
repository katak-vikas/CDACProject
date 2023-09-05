package com.app.entities;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

import com.app.entities.enums.UserRole;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@MappedSuperclass
public abstract class Employee {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(nullable = false, unique = true)
	private Long employeeId;
	private String firstName;
	private String lastName;
	@Column(nullable = false, unique = true)
	private String emailId;
	private String password;
	private int salary;
	private LocalDate joinDate;
    @Enumerated(EnumType.STRING)
	private UserRole role;
	
	public Employee(String firstName, String lastName, String emailId, String password) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.emailId = emailId;
		this.password = password;
	}
	
	public Employee(String firstName, String lastName, String emailId, String password,int salary,LocalDate joinDate){ 
		this(firstName,lastName,emailId,password);
		this.salary=salary;
		this.joinDate=joinDate;
	
	}
}
