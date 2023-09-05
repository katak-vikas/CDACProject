package com.app.service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.JustTest.PDFEmailTest;
import com.app.custom_exceptions.account.AccountBalanceException;
import com.app.custom_exceptions.account.AccountException;
import com.app.custom_exceptions.account.AccountNotActiveException;
import com.app.custom_exceptions.transaction.TransactionException;
import com.app.dto.CustomerDto;
import com.app.dto.EmailDetails;
import com.app.dto.TransactionDto;
import com.app.dto.TransactionRequestDto;
import com.app.dto.TransactionResponseDto;
import com.app.entities.Account;
import com.app.entities.Customer;
import com.app.entities.Transaction;
import com.app.entities.TransferFundsAccount;
import com.app.entities.enums.AccountStatus;
import com.app.entities.enums.AccountType;
import com.app.entities.enums.TransactionMode;
import com.app.entities.enums.TransactionStatus;
import com.app.entities.enums.TransactionType;
import com.app.repository.AccountRepository;
import com.app.repository.CustomerRepository;
import com.app.repository.TransactionRepository;
import com.app.repository.TransferFundsAccountRepository;
import com.app.utils.PDFUtils;
import com.itextpdf.text.DocumentException;

@Service
@Transactional
public class TransactionServiceImpl implements TransactionService {
	
	@Autowired
	private ModelMapper mapper;
	
	@Autowired
	private EmailService emailService;
	
	@Autowired
	private CustomerRepository customerRepo;
	
	@Autowired
	private TransactionRepository transactionRepo;
	
//	@Autowired
//	private AccountService accountService;
	
	@Autowired
	private PDFUtils pdfutils;
	
	@Autowired
	private AccountRepository accountRepo;
	
	@Autowired
	private TransferFundsAccountRepository transferFundsAccountRepo;
	
	
	@Override
	public String transferFunds(String senderAccountNumber, String receiverAccountNumber, String receiverName, double amount, TransactionMode transactionMode) {
		Account sender = accountRepo.findByAccountNumber(senderAccountNumber)
				.orElseThrow(()->new AccountException("access denied to account"));
		Customer senderCust = sender.getCustomer();
		Account receiver = accountRepo.findByAccountNumber(receiverAccountNumber)
				.orElseThrow(()->new AccountException("receiver not found "));
		Customer receiverCust = receiver.getCustomer();
		
		if(sender.getAccountStatus() != AccountStatus.ACTIVE) {
			throw new AccountNotActiveException("Account is not active, contact bank");
		}
		if(sender.getAccountStatus() != AccountStatus.ACTIVE) {
			throw new AccountNotActiveException("could not proceed with transaction, Receiver's Account is not active, contact bank");
		}
		double min = 0;
		double limit = Double.MAX_VALUE;
		
		
		if(sender.getAccountType()==AccountType.SAVING) {
			min = AccountType.SAVING.getMinimumBalance();
			limit = AccountType.SAVING.getTransactionLimit();
		}
		if(sender.getAccountType()==AccountType.CURRENT) {
			min = AccountType.CURRENT.getMinimumBalance();
			limit = AccountType.CURRENT.getTransactionLimit();
		}
		if(sender.getAccountType()==AccountType.FIXED_DEPOSIT) {
			min = AccountType.FIXED_DEPOSIT.getMinimumBalance();
			limit = AccountType.FIXED_DEPOSIT.getTransactionLimit();
		}
		if(sender.getAccountType()==AccountType.RECURRING_DEPOSIT) {
			min = AccountType.RECURRING_DEPOSIT.getMinimumBalance();
			limit = AccountType.RECURRING_DEPOSIT.getTransactionLimit();
		}
		if(sender.getAccountType()==AccountType.TRADING) {
			min = AccountType.TRADING.getMinimumBalance();
			limit = AccountType.TRADING.getTransactionLimit();
		}
		
		if(limit >= amount) {
			if(sender.getBalance() - amount >= min ) {
				sender.setBalance(sender.getBalance() - amount);
				
				receiver.setBalance(receiver.getBalance() + amount);
				
				sender.setLastUpdateDate(LocalDate.now());
				receiver.setLastUpdateDate(LocalDate.now());
				
				accountRepo.save(sender);
				accountRepo.save(receiver);
				
				this.addTransactionRecord(sender, receiver, receiverName, amount, transactionMode);
			}else {
				throw new AccountBalanceException("transaction failed, Not enough balance");
			}
			
			EmailDetails emailDetails = new EmailDetails();
	        emailDetails.setRecipient(senderCust.getEmail());
	        emailDetails.setSubject("Money debited");
	        emailDetails.setMessageBody("Hello "+ senderCust.getFirstName() + " "+ amount +" was debited from your account " +sender+ " to "+receiver+" on "+LocalDateTime.now());
	        emailService.sendEmail(emailDetails);
				
	        EmailDetails emailDetails2 = new EmailDetails();
	        emailDetails.setRecipient(senderCust.getEmail());
	        emailDetails.setSubject("Money credited");
	        emailDetails.setMessageBody("Hello "+ receiverCust.getFirstName() + " "+ amount +" was credited to your account " +receiver+ " by "+sender+" on "+LocalDateTime.now());
	        emailService.sendEmail(emailDetails2);
	        
			return amount +" transfered successfully from "+senderAccountNumber+" to "+receiverAccountNumber;
		}
		
		throw new AccountException("could not proceed with transaction, maximum transfer limit is "+limit);
		
	}
	
	public void addTransactionRecord(Account senderAccount, Account receiverAccount, String receiverName, double amount, TransactionMode transactionMode) {
		try {
			
			TransferFundsAccount tfa1 = new TransferFundsAccount(receiverAccount, receiverName);
			TransferFundsAccount tfa2 = new TransferFundsAccount(senderAccount, "sender");
			transferFundsAccountRepo.save(tfa1);
			transferFundsAccountRepo.save(tfa2);
			Transaction transaction1 = new Transaction(senderAccount, tfa1, amount);
			Transaction transaction2 = new Transaction(receiverAccount, tfa2, amount);
			
			transaction1.setTransactionMode(transactionMode);
			transaction2.setTransactionMode(transactionMode);
			
			transaction1.setTransactionType(TransactionType.DEBIT);
			transaction2.setTransactionType(TransactionType.CREDIT);
			transaction1.setTransactionStatus(TransactionStatus.COMPLETED);
			transaction2.setTransactionStatus(TransactionStatus.COMPLETED);
			
			transactionRepo.save(transaction1);
			transactionRepo.save(transaction2);
			
		}catch(Exception e) {
			throw new TransactionException("could not add trancation record");
		}
		
	}
	
	
	
	@Override
	public String transferFundsInterbank(String senderAccountNumber, TransferFundsAccount tfa, double amount,
			TransactionMode transactionMode) {
		Account sender = accountRepo.findByAccountNumber(senderAccountNumber)
				.orElseThrow(()->new AccountException("access denied to account"));
		Customer senderCust=sender.getCustomer();
		if(sender.getAccountStatus() != AccountStatus.ACTIVE) {
			throw new AccountNotActiveException("Account is not active, contact bank");
		}
		
		double min = 0;
		double limit = Double.MAX_VALUE;
		
		
		if(sender.getAccountType()==AccountType.SAVING) {
			min = AccountType.SAVING.getMinimumBalance();
			limit = AccountType.SAVING.getTransactionLimit();
		}
		if(sender.getAccountType()==AccountType.CURRENT) {
			min = AccountType.CURRENT.getMinimumBalance();
			limit = AccountType.CURRENT.getTransactionLimit();
		}
		if(sender.getAccountType()==AccountType.FIXED_DEPOSIT) {
			min = AccountType.FIXED_DEPOSIT.getMinimumBalance();
			limit = AccountType.FIXED_DEPOSIT.getTransactionLimit();
		}
		if(sender.getAccountType()==AccountType.RECURRING_DEPOSIT) {
			min = AccountType.RECURRING_DEPOSIT.getMinimumBalance();
			limit = AccountType.RECURRING_DEPOSIT.getTransactionLimit();
		}
		if(sender.getAccountType()==AccountType.TRADING) {
			min = AccountType.TRADING.getMinimumBalance();
			limit = AccountType.TRADING.getTransactionLimit();
		}
		
		if(amount > limit) {
			throw new AccountException("could not proceed with transaction, maximum transfer limit is "+limit);
		}
				
		if(sender.getBalance() - amount >= min ) {
			sender.setBalance(sender.getBalance() - amount);
			
			//receiver.setBalance(receiver.getBalance() + amount);
			
			sender.setLastUpdateDate(LocalDate.now());
			//receiver.setLastUpdateDate(LocalDate.now());
			
			accountRepo.save(sender);
			//accountRepo.save(receiver);
			
			this.addTransactionRecord(sender, tfa, amount, transactionMode);
		}else {
			throw new AccountBalanceException("Not enough balance");
		}
			
		EmailDetails emailDetails = new EmailDetails();
        emailDetails.setRecipient(senderCust.getEmail());
        emailDetails.setSubject("Money debited");
        emailDetails.setMessageBody("Hello "+ senderCust.getFirstName() + " "+ amount +" was debited from your account " +sender+ " to "+tfa.getAccountNumber()+" on "+LocalDateTime.now());
        emailService.sendEmail(emailDetails);
        
		return amount +" transfered successfully from "+senderAccountNumber+" to "+tfa.getAccountNumber() +" of "+tfa.getAccountHolderName();
	}
	

	private void addTransactionRecord(Account senderAccount, TransferFundsAccount tfa, double amount,
			TransactionMode transactionMode) {
		try {
			transferFundsAccountRepo.save(tfa);
			Transaction transaction1 = new Transaction(senderAccount, tfa, amount);
			//Transaction transaction2 = new Transaction(receiverAccount, senderAccount, "sender", amount);
			
			transaction1.setTransactionMode(transactionMode);
			
			
			transaction1.setTransactionType(TransactionType.DEBIT);
			
			transaction1.setTransactionStatus(TransactionStatus.COMPLETED);
			
			transactionRepo.save(transaction1);
		}catch(Exception e) {
			throw new TransactionException("could not add trancation record");
		}
		
	}


	@Override
	public TransactionResponseDto depositAmount(TransactionRequestDto transactionDetails){
        // Validate depositDetails, handle exceptions, etc.
		System.out.println(transactionDetails.getAccountNumber());
        // Assuming you have an Account entity
        Account account = accountRepo.findByAccountNumber(transactionDetails.getAccountNumber())
                .orElseThrow(() -> new TransactionException("Account not found"));
        Customer senderCust=account.getCustomer();
        
        if(account.getAccountStatus() != AccountStatus.ACTIVE) {
			throw new AccountNotActiveException("Account is not active, contact bank");
		}

        // Perform the deposit logic
        double currentBalance = account.getBalance();
        double depositAmount = transactionDetails.getAmount();
        double newBalance = currentBalance + depositAmount;

        // Update the account balance
        account.setBalance(newBalance);
        accountRepo.save(account);

        this.addTransactionRecord(account, transactionDetails, TransactionType.DEPOSIT, TransactionMode.CASH);
        // Create a DepositResultDto
        TransactionResponseDto resultDto = new TransactionResponseDto("Deposit successful", newBalance);
        
        EmailDetails emailDetails = new EmailDetails();
        emailDetails.setRecipient(senderCust.getEmail());
        emailDetails.setSubject("Money debited");
        emailDetails.setMessageBody("Hello "+ senderCust.getFirstName() + ", "+ depositAmount +" was deposited to your account on "+LocalDateTime.now());
        emailService.sendEmail(emailDetails);
        
        return resultDto;
    }
	
		
	private void addTransactionRecord(Account account, TransactionRequestDto transactionDetails, TransactionType transactionType, TransactionMode transactionMode) {
		try {
			
			TransferFundsAccount tfa1 = new TransferFundsAccount(transactionDetails.getAccountNumber(), "SELF");
			
			transferFundsAccountRepo.save(tfa1);
			
			Transaction transaction1 = new Transaction(account, tfa1, transactionDetails.getAmount());
			
			transaction1.setTransactionMode(transactionMode);
						
			transaction1.setTransactionType(transactionType);
			transaction1.setTransactionStatus(TransactionStatus.COMPLETED);
			
			
			transactionRepo.save(transaction1);
			
			
		}catch(Exception e) {
			throw new TransactionException("could not add trancation record");
		}

	}

	
	
	
	@Override
	public TransactionResponseDto withdrawAmount(TransactionRequestDto transactionDetails) {
		System.out.println(transactionDetails);
		System.out.println(transactionDetails.getAccountNumber());
		Account account = accountRepo.findByAccountNumber(transactionDetails.getAccountNumber())
				
				//.findById(transactionDetails.getAccountNumber())
                .orElseThrow(() -> new TransactionException("Account not found"));
		
		Customer senderCust=account.getCustomer();
		if(account.getAccountStatus() != AccountStatus.ACTIVE) {
			throw new AccountNotActiveException("Account is not active, contact bank");
		}


        // Perform the deposit logic
		
        double currentBalance = account.getBalance();
        double withdrawAmount = transactionDetails.getAmount();
        
        double newBalance = currentBalance - withdrawAmount;
        if(newBalance < account.getAccountType().getMinimumBalance()) {
        	throw new TransactionException("Cannot withdraw, balance is low ");
        }
        // Update the account balance
        account.setBalance(newBalance);
        accountRepo.save(account);
        
        this.addTransactionRecord(account, transactionDetails, TransactionType.WITHDRAWAL, TransactionMode.CASH);

        // Create a DepositResultDto
        TransactionResponseDto resultDto = new TransactionResponseDto("Withdraw successful", newBalance);
        
        EmailDetails emailDetails = new EmailDetails();
        emailDetails.setRecipient(senderCust.getEmail());
        emailDetails.setSubject("Money debited");
        emailDetails.setMessageBody("Hello "+ senderCust.getFirstName() + ", "+ withdrawAmount +" was withdrawn from your account on "+LocalDateTime.now());
        emailService.sendEmail(emailDetails);
        
        return resultDto;
	}
	
	
	
	
	
//
	@Override
	public List<TransactionDto> getTransactionsBetweenDatesAndInRange(
            String accountNumber, String startDate, String endDate,
            Double startValue, Double endValue) {
		
		System.out.println(accountNumber);
		
		Account account = accountRepo.findByAccountNumber(accountNumber)
				.orElseThrow(()->new AccountException("account not found "));
		
		if(account.getAccountStatus() != AccountStatus.ACTIVE) {
			throw new AccountNotActiveException("Account is not active, contact bank");
		}
		
		System.out.println(account);
		
		System.out.println("Before");
		System.out.println(startDate);
		System.out.println(endDate);
		System.out.println(startValue);
		System.out.println(endDate);

        LocalDate parsedStartDate = startDate != null ? LocalDate.parse(startDate) : account.getOpenDate();
        


        LocalDate parsedEndDate = endDate != null ? LocalDate.parse(endDate) : LocalDate.now();
        
        LocalDateTime parsedStartDateTime = parsedStartDate.atStartOfDay();
        LocalDateTime parsedEndDateTime = parsedEndDate.atTime(23, 59, 59, 999999999);


        Double effectiveStartValue = startValue != null ? startValue : 0.0;
        Double effectiveEndValue = endValue != null ? endValue : Double.MAX_VALUE;
        
        
        
        
        System.out.println("After");
		System.out.println(parsedStartDate);
		System.out.println(parsedEndDate);
		System.out.println(effectiveStartValue);
		System.out.println(effectiveEndValue);

        List<Transaction> transactions = transactionRepo
            .findByAccountNumberAndTransactionDateBetweenAndTransactionValueBetween(
                accountNumber, parsedStartDate, parsedEndDate, effectiveStartValue, effectiveEndValue
            );

        return transactions.stream()
            .map(this::convertToDto)
            .collect(Collectors.toList());
        
      
    }




    private TransactionDto convertToDto(Transaction transaction) {
        TransactionDto dto = mapper.map(transaction, TransactionDto.class);
        
        if (transaction.getFromAccount() != null) {
            dto.setFromAccountNumber(transaction.getFromAccount().getAccountNumber());
            
            
        }
        
        if (transaction.getToAccount() != null) {
            dto.setToAccountNumber(transaction.getToAccount().getAccountNumber());
        }
        
        return dto;
    }

    @Override
	public List<TransactionDto> getAllTransactions() {
		List<Transaction> transactions=transactionRepo.findAll();
		if(transactions==null) {
			throw new TransactionException("No transactions found");
		}else {
			//List<Transaction> transactionEnt=transactionRepo.findByFromAccountAccountNumber(accountNumber);
			List<TransactionDto> transactionDto=transactions.stream()
		            .map(this::convertToDto)
		            .collect(Collectors.toList());
			return transactionDto;
		}
	}

	@Override
	public TransactionDto approveTransaction(Long transactionId) {
		Transaction transaction=transactionRepo.findByTransactionId(transactionId);
		if(transaction==null) {
			throw new TransactionException("Trouble approving transaction status");
		}
		transaction.setTransactionStatus(TransactionStatus.COMPLETED);
		return mapper.map(transaction, TransactionDto.class);
	}

	@Override
	public List<TransactionDto> getAllTransactions(int pageNumber, int pageSize) {
		// TODO Auto-generated method stub
		//Creates a PageRequest(imple class of Pageable : i/f for pagination)
				//based upon page no n size
				Pageable pageable = PageRequest.of(pageNumber, pageSize);
				//fetches the Page of Emps --> getContent() --> List<Emp>
				List<Transaction> transactionList = transactionRepo.findAll(pageable).getContent();
				return transactionList.stream().
						map((transaction) -> mapper.map(transaction, TransactionDto.class))
						.collect(Collectors.toList());
	
	}

	@Override
	public List<Transaction> getPendingTransaction() {
		// TODO Auto-generated method stub
		List<Transaction> transactions=transactionRepo.findByTransactionStatus(TransactionStatus.PENDING);
		if(transactions==null) {
			throw new TransactionException("No transactions found");
		}else {
			return transactions;
		}
		
	}
	
	
	@Override
	public String getAllTransactionsThroughMail(String accountNumber) {
		//System.out.println("control is in imp method");
		Account account = accountRepo.findByAccountNumber(accountNumber)
	            .orElseThrow(() -> new AccountException("There was some issue fetching account details"));
		System.out.println("account fetched");
	    Customer customer = account.getCustomer();

        //System.out.println("customer extracted");
		if (customer == null) {
		    throw new AccountException("No customer found for the provided account number");
		}
		//Customer customer=accountRepo.findBy
//		if(AccountStatus.INACTIVE.equals(account.getAccountStatus())) {
//			throw new AccountNotActiveException("the account doesnt seem to be active");
//		}
		List<Transaction> transactionEnt=transactionRepo.findByFromAccountAccountNumber(accountNumber);
		List<TransactionDto> transactions=transactionEnt.stream()
	            .map(this::convertToDto)
	            .collect(Collectors.toList());
		ByteArrayOutputStream pdfOutputStream = new ByteArrayOutputStream();
		try {
			PDFUtils.designStatement(pdfOutputStream, transactions, mapper.map(customer, CustomerDto.class));
		} catch (DocumentException e) {
			
		} catch (IOException e) {
			
		}
		byte[] pdfContent = pdfOutputStream.toByteArray();
		String pdfFileName = "MyStatement.pdf";

		EmailDetails emailDetails = new EmailDetails();
		emailDetails.setRecipient(customer.getEmail());
		emailDetails.setSubject("Transaction statement");
		emailDetails.setMessageBody("Hello "+customer.getFirstName()+", please find the attached PDF document consisting of your transaction statement for your account number : "+account.getAccountNumber()+".");
		emailService.sendEmail(emailDetails, pdfContent, pdfFileName);
		return "email sent successfully";
	}
//	finish this later
//	@Override
//	public String getAllTransactionsThroughMail(String accountNumber) {
		
//	    try {
//	        // Fetch the Account object using the accountNumber
//	        Account account = accountRepo.findByAccountNumber(accountNumber)
//	                .orElseThrow(() -> new AccountException("Unable to find the account"));
//
//	        // Get transactions from repository using the Account object
//	        List<TransactionDto> transactions = transactionRepo.findByFromAccountAccountNumber(accountNumber)
//	                .stream()
//	                .map((transaction) -> mapper.map(transaction, TransactionDto.class))
//	                .collect(Collectors.toList());
//
//	        // Get customer details directly from the fetched account
//	        CustomerDto customer = mapper.map(account.getCustomer(), CustomerDto.class);
//
//	        // Prepare email details
//	        EmailDetails emailDetails = new EmailDetails();
//	        emailDetails.setRecipient(customer.getEmail());
//	        emailDetails.setSubject("Previous Transactions PDF");
//	        emailDetails.setMessageBody("Hello " + customer.getFirstName() +
//	                ",\nPlease find attached a copy of transactions from your account " + accountNumber + ".");
//
//	        // Send email with PDF attachment
//	        try {
//				pdfEmailService.sendEmailWithPDFAttachment(emailDetails, transactions, customer);
//				System.out.println("mail sent");
//			} catch (MessagingException | IOException | DocumentException e) {
//				
//				e.printStackTrace();
//			}
//
//	        return "PDF sent successfully";
//	    } catch (AccountException | CustomerException e) {
//	        return "Trouble sending PDF through email: " + e.getMessage();
//	    }
//	}

	

	
}
