package com.app.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exceptions.PendingForApprovalException;
import com.app.custom_exceptions.account.AccountException;
import com.app.custom_exceptions.account.AccountNotActiveException;
import com.app.custom_exceptions.customer.CustomerException;
import com.app.dto.AccountDto;
import com.app.dto.CustomerDto;
import com.app.dto.EmailDetails;
import com.app.dto.OpenNewAccountRequest;
import com.app.dto.RegisterCustomerDto;
import com.app.dto.UpdateCustomerDetails;
import com.app.entities.Account;
import com.app.entities.Address;
import com.app.entities.AdhaarCard;
import com.app.entities.Beneficiary;
import com.app.entities.Customer;
import com.app.entities.Transaction;
import com.app.entities.TransferFundsAccount;
import com.app.entities.enums.AccountStatus;
import com.app.entities.enums.CustomerStatus;
import com.app.entities.enums.TransactionMode;
import com.app.entities.enums.TransactionStatus;
import com.app.entities.enums.TransactionType;
import com.app.entities.enums.UserRole;
import com.app.repository.AccountRepository;
import com.app.repository.AddressRepository;
import com.app.repository.AdhaarCardRepository;
import com.app.repository.BeneficiaryRepository;
import com.app.repository.CustomerRepository;
import com.app.repository.TransactionRepository;
import com.app.repository.TransferFundsAccountRepository;

@SuppressWarnings("unused")
@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {
	
	@Autowired
	private ModelMapper mapper;
	
	@Autowired
	private CustomerRepository customerRepo;
	
	@Autowired
	private AccountRepository accountRepo;
	
	@Autowired
	private AddressRepository addressRepo;
	
	@Autowired
	private AdhaarCardRepository adhaarCardRepo;
	
	@Autowired
	private BeneficiaryRepository beneficiaryRepo;
	
	@Autowired
	private TransactionRepository transactionRepo;

	@Autowired
	private TransferFundsAccountRepository transferFundsAccountRepo;
	
	@Autowired
	private EmailService emailService;
	
	@Autowired
	private PasswordEncoder enc;
	

	@Override
	public String registerCustomer(RegisterCustomerDto registerCustomerDto) {
		
		System.out.println("\n\n\nbefore mapping ");
		System.out.println(registerCustomerDto);
		
		Address address = mapper.map(registerCustomerDto.getAddress(), Address.class);
		AdhaarCard adhaarCard = mapper.map(registerCustomerDto.getAdhaarCard(), AdhaarCard.class);
		Beneficiary beneficiary = mapper.map(registerCustomerDto.getBeneficiary(), Beneficiary.class);
		
		
				
		Customer customer = mapper.map(registerCustomerDto, Customer.class);
		System.out.println("After mapping");
		System.out.println(customer);
		
		customer.setPassword(enc.encode(registerCustomerDto.getPassword()));
		customer.setRole(UserRole.ROLE_CUSTOMER);
		
		
		customer.setAddress(null);
		customer.setAdhaarCard(null);
		customer.setBeneficiary(null);
		customer.setCustomerStatus(CustomerStatus.PENDING_APPROVAL);
		
		System.out.println("After null");
		System.out.println(customer);
		
		Customer persistentCustomer = customerRepo.save(customer);
		
		address.setCustomer(persistentCustomer);
		adhaarCard.setCustomer(persistentCustomer);
		beneficiary.setCustomer(persistentCustomer);
		
		System.out.println("After save ");
		System.out.println(customer);
		
		System.out.println("After save per ");
		System.out.println(persistentCustomer);
		
		System.out.println("the big three");
		System.out.println(address);
		System.out.println(adhaarCard);
		System.out.println(beneficiary);
		System.out.println("fine");
		

		double deposite = registerCustomerDto.getDeposite();
		System.out.println("fine");
		Account account = persistentCustomer.createAccountForCustomer(customer, registerCustomerDto.getAccountType(), deposite);
		System.out.println("fine");
		account.setAccountStatus(AccountStatus.PENDING_APPROVAL);
		System.out.println("account 1 ");
		System.out.println(account);
		
		
		if(deposite > 0) {
			TransferFundsAccount tfa = new TransferFundsAccount(account);
			System.out.println(tfa);
			transferFundsAccountRepo.save(tfa);
			
			Transaction transaction = new Transaction(account, tfa, deposite, TransactionMode.CASH, TransactionType.DEPOSIT);
			transaction.setTransactionStatus(TransactionStatus.PENDING);
			//transaction.set
			account.addTransaction(transaction);
			System.out.println(transaction);
			transactionRepo.save(transaction);
		}
		
		System.out.println("account after deposite ");
		System.out.println(account);
		
		System.out.println("\n\n\nAfter mapping "+customer);
		System.out.println("\n\n\nAfter mapping "+persistentCustomer);
		
		persistentCustomer.setAddress(address);
		persistentCustomer.setAdhaarCard(adhaarCard);
		persistentCustomer.setBeneficiary(beneficiary);
		System.out.println("customer added ");
		EmailDetails emailDetails = new EmailDetails();
        emailDetails.setRecipient(persistentCustomer.getEmail());
        emailDetails.setSubject("Welcome to Our Bank!");
        emailDetails.setMessageBody("Thank you "+ persistentCustomer.getFirstName() + " for creating an account with us. Your will receive an account number once it is approved.");
        emailService.sendEmail(emailDetails);
		return registerCustomerDto.getFirstName()+"'s account with account number "+ account.getAccountNumber() +" has been created!!!!";
	}


	@Override
	public CustomerDto login(String username, String password) {
	    Customer customer = customerRepo.findByUsernameAndPassword(username, password);
	    
	    String errMessage = "";

	    if (customer == null) {
	        throw new CustomerException("Invalid username or password.");
	    }
	    

	    if (customer.getCustomerStatus() == CustomerStatus.ACTIVE) {
	        CustomerDto customerDto = mapper.map(customer, CustomerDto.class);

	        System.out.println("\n\n");
	        System.out.println(customerDto);
	      //  customerDto.getAccounts().forEach(acc -> System.out.println(acc));

	        // Save customer details in the session if needed
	        // HttpSession session = ...

	        return customerDto;
	    } else  {
	    	if(customer.getCustomerStatus() == CustomerStatus.PENDING_APPROVAL) {
	    		
	    		errMessage = "Application is pending for approval. Contact the bank.";
	    		throw new PendingForApprovalException("Application is pending for approval. Contact the bank.");
	    	}
	    	if(customer.getCustomerStatus() != CustomerStatus.ACTIVE){
	    		
	    		errMessage = "Customer is not active";
	    		throw new AccountNotActiveException(errMessage);
	    	}
	    	
	    	
	    	
	    } 
//	    
	    return null;
	    
	}
	
	@Override
	public CustomerDto getProfile(String username) {
		Customer customer = customerRepo.findByUsername(username)
				.orElseThrow(()-> new CustomerException("Customer not found"));
		if(customer.getCustomerStatus()==CustomerStatus.ACTIVE) {
			CustomerDto customerDto= mapper.map(customer, CustomerDto.class);
			return customerDto;
		}
		throw new CustomerException("Customer is not active, Contact bank");
	}


	@Override
	public String deleteCustomer(String username) {
		Customer customer = customerRepo.findByUsername(username)
				.orElseThrow(()->new AccountException("incorrect username"));
		
		List<Account> accounts = accountRepo.findByCustomer(customer);
		
		accounts.forEach((acc) -> acc.setAccountStatus(AccountStatus.INACTIVE));
//		
		accountRepo.saveAll(accounts);
		
		
		customer.setCustomerStatus(CustomerStatus.INACTIVE);
		
		return customer.getFirstName()+" deleted successfully.";
	}
	
	
	@Override
	public String updateCustomerDetails(String loginUsername, UpdateCustomerDetails updateCustomerDetails) {
		
		String message;
		Customer customer = customerRepo.findByUsername(loginUsername)
				.orElseThrow(()->new AccountException("account not found"));
		
		
		
		System.out.println("\n\n original customer\n"+customer);
		
		System.out.println("\n\n to update customer\n"+updateCustomerDetails);
		
		if(customer.getCustomerStatus()==CustomerStatus.ACTIVE) {
			try {
				
				// Update the customer details based on the DTO if not null
		        if (updateCustomerDetails.getFirstName() != null) {
		        	System.out.println("in update first name");
		            customer.setFirstName(updateCustomerDetails.getFirstName());
		        }
		        if (updateCustomerDetails.getLastName() != null) {
		        	System.out.println("in update last name");
		            customer.setLastName(updateCustomerDetails.getLastName());
		        }
		        if (updateCustomerDetails.getEmail() != null) {
		        	System.out.println("in update email");
		            customer.setEmail(updateCustomerDetails.getEmail());
		        }
		        
		        if (updateCustomerDetails.getPhoneNumber() != null) {
		        	System.out.println("in update phoneNumber");
		            customer.setPhoneNumber(updateCustomerDetails.getPhoneNumber());
		        }
		        if (updateCustomerDetails.getDateOfBirth() != null) {
		        	System.out.println("in update DOB");
		            customer.setDateOfBirth(updateCustomerDetails.getDateOfBirth());
		        }

		        if (updateCustomerDetails.getPanCardNumber() != null) {
		        	System.out.println("in update pancard");
		            customer.setPanCardNumber(updateCustomerDetails.getPanCardNumber());
		        }
		        
		        
		        System.out.println("\n\n changed customer\n"+customer);
		        
		        // Save the updated customer entity
		        customerRepo.save(customer);
		        
		        System.out.println("\n\n after save \n"+customer);
		        message = customer.getFirstName() + " updated ";
				
			}catch(Exception e) {
				message = "failed to update details";
				System.out.println(message);
				throw new CustomerException("failed to update details");
			}
			
			
	        
	        return message;
		}
		throw new CustomerException("Customer is not active, Contact bank");
		
	}


	
	@Override
	public boolean updateCustomerPhoneNoOrEmail(Long customerId, String updatedPhoneNumber, String updatedEmailId) {
		try {
	        Customer customer = customerRepo.findById(customerId).orElse(null);

	        if (customer != null) {
	            // Update phone number and email if provided
	            if (updatedPhoneNumber != null) {
	                customer.setPhoneNumber(updatedPhoneNumber);
	            }
	            if (updatedEmailId != null) {
	                customer.setEmail(updatedEmailId);
	            }

	            customerRepo.save(customer); // Save the updated customer

	            return true; // Update successful
	        } else {
	            return false; // Customer with the given ID not found
	        }
	    } catch (Exception e) {
	        // Handle any exceptions that might occur during the update process
	        return false;
	    }
	}
	
	public List<CustomerDto> getAllCustomers() {
	    List<Customer> customers = customerRepo.findAll();
	    return customers.stream()
	        .map(customer -> mapper.map(customer, CustomerDto.class))
	        .collect(Collectors.toList());
	}


	@Override
	public AccountDto openNewAccount(String username, OpenNewAccountRequest openNewAccountRequest) {
		Customer customer = customerRepo.findByUsername(username)
				.orElseThrow(()->new AccountException("incorrect username"));
		
		Account account = customer.createAccountForCustomer(customer, openNewAccountRequest.getAccountType(), openNewAccountRequest.getDeposite());
		
		System.out.println("fine");
		account.setAccountStatus(AccountStatus.PENDING_APPROVAL);
		System.out.println("account 1 ");
		System.out.println(account);
		
		
		if(openNewAccountRequest.getDeposite() > 0) {
			TransferFundsAccount tfa = new TransferFundsAccount(account);
			System.out.println(tfa);
			transferFundsAccountRepo.save(tfa);
			
			Transaction transaction = new Transaction(account, tfa, openNewAccountRequest.getDeposite(), TransactionMode.CASH, TransactionType.DEPOSIT);
			transaction.setTransactionStatus(TransactionStatus.PENDING);
			//transaction.set
			account.addTransaction(transaction);
			System.out.println(transaction);
			transactionRepo.save(transaction);
		}
		
		System.out.println("account after deposite ");
		System.out.println(account);
		
		System.out.println("\n\n\nAfter mapping "+customer);
		
		
		
		return mapper.map(account, AccountDto.class);
	}


	@Override
	public List<AccountDto> getAllAccounts(String username) {
		Customer customer = customerRepo.findByUsername(username)
				.orElseThrow(()->new CustomerException("incorrect username"));		
		
		List<Account> accounts = accountRepo.findByCustomerCustomerId(customer.getCustomerId());
		
		if(accounts == null) {
			throw new AccountException("No accounts for customer "+customer.getFirstName());
		}
		

		accounts.forEach(ac -> System.out.println(ac));
		
		List<AccountDto> dtos = new ArrayList<AccountDto>();
		
		accounts.forEach(ac -> {
			if(ac.getAccountStatus()== AccountStatus.ACTIVE) {
				dtos.add(mapper.map(ac, AccountDto.class));
			}
		});
		
		if(dtos == null) {
			throw new AccountException("No active accounts for customer "+customer.getFirstName());
		}
		
		return dtos;
        
      
    }


	private AccountDto convertToDto(Account account) {
        AccountDto dto = mapper.map(account, AccountDto.class);
        
        return dto;
    }



	@Override
	public Customer findByEmail(String email) {
		// TODO Auto-generated method stub
//		String stringWithoutFirstAndLast = email.substring(1, email.length() - 1);
//        System.out.println("Modified string: " + stringWithoutFirstAndLast);
		System.out.println(email);
		Customer customer = customerRepo.findByEmail(email)
				.orElseThrow(()->new AccountException("incorrect username"));
		return customer;
	}


	@Override
	public void save(Customer user) {
		
		try {
			customerRepo.save(user);

			
		}catch(Exception e) {
			throw new CustomerException("Customer not saved ...");
		}

				
		
		
	}


	@Override
	public Customer findByUsername(String username) {
		System.out.println(username);
		Customer customer = customerRepo.findByUsername(username)
				.orElseThrow(()->new AccountException("incorrect username"));
		return customer;
		
	}


	

	
	

//	@Override
//	public String customerLogin(String username, String password) {
//		Customer customer = customerRepo.findByUsernameAndPassword(username, password)
//				.orElseThrow(()->new ResourceNotFoundException("incorrect username or password"));
//		
//		return customer.getFirstName()+" successfully logged in.";
//	}
//
//	@Override
//	public String deleteCustomer(String username) {
//		Customer customer = customerRepo.findByUsername(username)
//				.orElseThrow(()->new ResourceNotFoundException("incorrect username"));
//		//TODO: delect all accounts
//		String message = accountService.deleteAccounts(customer);
//		System.out.println(message);
//		customer.setUserStatus(CustomerStatus.INACTIVE);
//		
//		return customer.getFirstName()+" deleted successfully.";
//	}
//
	
//
//	@Override
//	public List<CustomerDto> getAllCustomers() {
//		List<Customer> list = customerRepo.findAll();
//		List<CustomerDto> customers = new ArrayList();
//		list.forEach(cust -> customers.add(mapper.map(cust, CustomerDto.class)));
//		
//		customers.forEach(custdto->System.out.println(custdto));
//		return customers;
//	}

//	@Override
//	public String customerLogin(String username, String password) {
//		Customer user = customerRepo.findByUsernameAndPassword(username, password)
//				.orElseThrow(()->new ResourceNotFoundException("incorrect username or password"));
//		return user.getFirstName()+" successfully logged in.";
//	}
//
//	@Override
//	public String deleteCustomer(String username) {
//		Customer user = customerRepo.findByUsername(username)
//				.orElseThrow(()->new ResourceNotFoundException("incorrect username"));
//		customerRepo.delete(user);
//		
//		return user.getFirstName()+" deleted successfully.";
//	}
//
//
//	@Override
//	public Double updateBalance(String username, String accountNumber, double balance) {
//		
//		Customer user = customerRepo.findByUsername(username)
//				.orElseThrow(()->new ResourceNotFoundException("incorrect username"));
//		
//		Account account = accountRepo.findByAccountNumberAndAccountHolder(accountNumber, user)
//				.orElseThrow(()->new ResourceNotFoundException("incorrect account number"));
//		
//		account.setBalance(account.getBalance()-balance);
//		
//		String message =  account.getBalance()+" debited from "+user.getFirstName()+"'s account";
//		
//		System.out.println(message);
//		
//		return account.getBalance();
//	}

}
