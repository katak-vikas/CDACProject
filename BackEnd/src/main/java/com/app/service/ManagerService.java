package com.app.service;

import java.util.List;

import com.app.dto.CustomerDto;
import com.app.entities.Clerk;
import com.app.entities.Manager;

public interface ManagerService {
	
	public Manager authenticateManager(String email, String password);

	public List<Clerk> getAllClerks();

//	public void saveManager();

}
