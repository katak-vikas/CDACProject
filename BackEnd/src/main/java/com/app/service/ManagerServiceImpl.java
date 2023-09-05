package com.app.service;

import java.util.List;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.entities.Clerk;
import com.app.entities.Manager;
import com.app.repository.ClerkRepository;
import com.app.repository.CustomerRepository;
import com.app.repository.ManagerRepository;

@Service
@Transactional
public class ManagerServiceImpl implements ManagerService {
	@Autowired
	private ManagerRepository managerRepo;

	@Autowired
	private ModelMapper mapper;
	@Autowired
	private EntityManager entityManager;
	
	@Autowired
	private ClerkRepository clerkRepo;
	
	@Autowired
	private CustomerRepository customerRepo;
	
	
	@Override
	public Manager authenticateManager(String email, String password) {
        return managerRepo.findByEmailIdAndPassword(email, password);
    }
	
	@Override
	public List<Clerk> getAllClerks() {
		return clerkRepo.findAll();
	}
	
//	@Transactional
//	@PostConstruct // This annotation ensures that this method is executed during application startup
//	public void saveManager() {
//	    try {
//	    	Manager manager = new Manager("Tom", "Jerry", "tom@gmail.com", "jerry@123"); // Assuming you have a static method getInstance() in your Manager class
//	        managerRepo.save(manager);
//	    } catch (Exception e) {
//	        e.printStackTrace();
//	    }
//	}
}
