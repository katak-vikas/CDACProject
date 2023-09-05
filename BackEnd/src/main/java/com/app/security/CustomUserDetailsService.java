package com.app.security;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.entities.Clerk;
import com.app.entities.Customer;
import com.app.entities.Manager;
import com.app.entities.enums.UserRole;
import com.app.repository.ClerkRepository;
import com.app.repository.CustomerRepository;
import com.app.repository.ManagerRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final CustomerRepository customerRepo;
    private final ManagerRepository managerRepo;
    private final ClerkRepository clerkRepo;

    public CustomUserDetailsService(CustomerRepository customerRepo, ManagerRepository managerRepo, ClerkRepository clerkRepo) {
        this.customerRepo = customerRepo;
        this.managerRepo = managerRepo;
        this.clerkRepo = clerkRepo;
    }

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("In CustomUserDetailsService");

        Customer customer = customerRepo.findByUsername(username).orElse(null);
        if (customer != null) {
            System.out.println(customer);
            return new CustomUserDetails(customer);
        }

        Manager manager = managerRepo.findByEmailId(username).orElse(null);
        if (manager != null) {
            return new CustomEmployeeDetails(manager);
        }

        Clerk clerk = clerkRepo.findByEmailId(username).orElse(null);
        if (clerk != null) {
            return new CustomEmployeeDetails(clerk);
        }

        throw new UsernameNotFoundException("Invalid username");
    }
    
    @Transactional(readOnly = true)
    public UserRole getUserRole(String username) {
    	Customer customer = customerRepo.findByUsername(username).orElse(null);
        if (customer != null) {
            System.out.println(customer);
            return UserRole.ROLE_CUSTOMER;
        }

        Manager manager = managerRepo.findByEmailId(username).orElse(null);
        if (manager != null) {
            return UserRole.ROLE_MANAGER;
        }

        Clerk clerk = clerkRepo.findByEmailId(username).orElse(null);
        if (clerk != null) {
            return UserRole.ROLE_CLERK;
        }
        throw new UsernameNotFoundException("Invalid username");
    }
}


/*
 * 
 * 
 * import org.springframework.beans.factory.annotation.Autowired; import
 * org.springframework.security.core.userdetails.UserDetails; import
 * org.springframework.security.core.userdetails.UserDetailsService; import
 * org.springframework.security.core.userdetails.UsernameNotFoundException;
 * import org.springframework.stereotype.Service; import
 * org.springframework.transaction.annotation.Transactional;
 * 
 * import com.app.entities.Customer; import com.app.repository.ClerkRepository;
 * import com.app.repository.CustomerRepository; import
 * com.app.repository.ManagerRepository;
 * 
 * @Service
 * 
 * @Transactional public class CustomUserDetailsService implements
 * UserDetailsService {
 * 
 * @Autowired private CustomerRepository customerRepo;
 * 
 * @Autowired private ManagerRepository managerRepo;
 * 
 * @Autowired private ClerkRepository clerkRepo;
 * 
 * @Override public UserDetails loadUserByUsername(String username) throws
 * UsernameNotFoundException {
 * System.out.println("In CustomUserDetailsService");
 * 
 * Customer customer = customerRepo.findByUsername(username).orElse(null); if
 * (customer != null) { System.out.println(customer); return new
 * CustomUserDetails(customer); } throw new
 * UsernameNotFoundException("Invalid username"); } Employee employee =
 * managerRepo.findByEmailId(username).orElse(null); if (employee != null) {
 * return new CustomEmployeeDetails(employee); }
 * 
 * Clerk clerk = clerkRepo.findByEmailId(username).orElse(null); if (clerk !=
 * null) { return new CustomEmployeeDetails(clerk); }
 * 
 * throw new UsernameNotFoundException("Invalid username"); } }
 */