package com.app.service;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.custom_exceptions.account.AccountException;
import com.app.dto.CustomerDto;
import com.app.dto.EmailDetails;
import com.app.entities.Account;
import com.app.entities.Clerk;
import com.app.entities.Customer;
import com.app.entities.Transaction;
import com.app.entities.enums.AccountStatus;
import com.app.entities.enums.CustomerStatus;
import com.app.entities.enums.TransactionStatus;
import com.app.repository.AccountRepository;
import com.app.repository.ClerkRepository;
import com.app.repository.CustomerRepository;
import com.app.repository.TransactionRepository;

@Service
@Transactional
public class ClerkServiceImpl implements ClerkService {

	@Autowired
	private ClerkRepository clerkRepo;

	@Autowired
	private AccountRepository accountRepo;

	@Autowired
	private CustomerRepository customerRepo;

	@Autowired
	private EmailService emailService;
	
	@Autowired
	private TransactionRepository transactionRepo;

	@Autowired 
	private ModelMapper mapper;
//	@Transactional
//	@PostConstruct
//    public void populateClerks() {
//        try {
//            List<Clerk> clerks =ClerkGenerator.generateClerks();
//            clerkRepo.saveAll(clerks);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }

	@Override
	public String updateCustomerStatus(String username) {
		// Find the customer by ID, or throw an exception if not found
		Customer customer = customerRepo.findByUsername(username)
				.orElseThrow(() -> new ResourceNotFoundException("Customer not found."));

		// Update customer status to ACTIVE
		customer.setCustomerStatus(CustomerStatus.ACTIVE);
		customerRepo.save(customer);

		// Find the accounts associated with the customer
		List<Account> accounts = accountRepo.findByCustomerCustomerId(customer.getCustomerId());

		if (accounts.isEmpty()) {
			throw new ResourceNotFoundException("Trouble finding accounts for the customer.");
		}

		// Update account statuses to ACTIVE
		accounts.forEach(account -> {
			if(account.getAccountStatus()==AccountStatus.PENDING_APPROVAL) {
			account.setAccountStatus(AccountStatus.ACTIVE);
			accountRepo.save(account);
			List<Transaction> transactions = transactionRepo.findByFromAccountAccountNumber(account.getAccountNumber());
			transactions.forEach(transaction -> {
				account.setBalance(account.getBalance() + transaction.getAmount());
				account.setLockedBalance(account.getLockedBalance() - transaction.getAmount());
				transaction.setTransactionStatus(TransactionStatus.COMPLETED);
			});
			}
			else {
				account.setAccountStatus(AccountStatus.ACTIVE);
			}
		});
		
		EmailDetails emailDetails = new EmailDetails();
        emailDetails.setRecipient(customer.getEmail());
        emailDetails.setSubject("Your account has been approved");
        emailDetails.setMessageBody("Hello "+ customer.getFirstName() +" your account has been approved with our bank." );
        emailService.sendEmail(emailDetails);
		return "Customer " + customer.getFirstName() + " approved. Status updated successfully.";
	}

	@Override
	public List<Clerk> getAllClerks() {
		return clerkRepo.findAll();
	}

	@Override
	public String approveCustomerAccount(String accoountNumber) {
		Account account = accountRepo.findByAccountNumber(accoountNumber)
				.orElseThrow(() -> new AccountException("Account not found."));
		Customer customer = customerRepo.findByAccountsAccountNumber(account.getAccountNumber());

		if (customer.getCustomerStatus() == CustomerStatus.PENDING_APPROVAL)
			updateCustomerStatus(customer.getUsername());
		else {
			if (account.getAccountStatus() == AccountStatus.PENDING_APPROVAL) {
				account.setBalance(account.getLockedBalance());
				account.setLockedBalance(0);
				account.setAccountStatus(AccountStatus.ACTIVE);
				account.getTransactions()
						.forEach(transactions -> transactions.setTransactionStatus(TransactionStatus.COMPLETED));
			} else {
				account.setAccountStatus(AccountStatus.ACTIVE);
			}
		}
		EmailDetails emailDetails = new EmailDetails();
        emailDetails.setRecipient(customer.getEmail());
        emailDetails.setSubject("Welcome to Our Bank!");
        emailDetails.setMessageBody("Hello "+ customer.getFirstName() +" your account has been created with Account Number: "+account.getAccountNumber()+" ." );
        emailService.sendEmail(emailDetails);
		return account.getAccountNumber() + " approved. Status updated successfully.";
	}
	@Override
	public List<CustomerDto> getNotActiveCustomers(){
		List<Customer> customers=customerRepo.findAll();
		List<CustomerDto> customerDto=new ArrayList<>();
		customers.forEach((customer)->{
			if(customer.getCustomerStatus()!=CustomerStatus.ACTIVE)
				customerDto.add(mapper.map(customer,CustomerDto.class));
			
		});
		return customerDto;
	}

}
