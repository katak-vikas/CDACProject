package com.app.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exceptions.account.AccountException;
import com.app.dto.AccountDto;
import com.app.dto.PendingAccountDto;
import com.app.entities.Account;
import com.app.entities.enums.AccountStatus;
import com.app.repository.AccountRepository;

@Service
@Transactional
public class AccountServiceImpl implements AccountService {
	
	@Autowired
	private ModelMapper mapper;
	
	@Autowired
	private AccountRepository accountRepo;
	
	


	@Override
	public List<PendingAccountDto> getAccountsWithPendingApproval() {
		   List<Account> accounts = accountRepo.findByAccountStatus(AccountStatus.PENDING_APPROVAL);
		    if(accounts==null) {
		    	throw new AccountException("there are no accounts");
		    }
		    List<PendingAccountDto> accountDtos = accounts.stream()
		            .map(account -> mapper.map(account, PendingAccountDto.class))
		            .collect(Collectors.toList());
		    return accountDtos;
		
		
	}

	


//	@Override
//	public String deleteAccounts(Customer user) {
//	
//		List<Account> accounts = accountRepo.findByUser(user);
//		
//		accounts.forEach((acc) -> acc.setAccountStatus(AccountStatus.INACTIVE));
////		
//		accountRepo.saveAll(accounts);
//		
//		return "accounts of "+user.getFirstName()+" deleted ";
//	}

//	

	@Override
	public AccountDto getByAccountNumber(String accountNumber) {
		Account account = accountRepo.findByAccountNumber(accountNumber)
				.orElseThrow(()->new AccountException("account not found "));
		
		
		AccountDto accountDto = mapper.map(account, AccountDto.class);
		
		System.out.println(accountDto);
		
		return accountDto;
		
	}


	@Override
	public List<AccountDto> getAllAccounts() {
	    List<Account> accounts = accountRepo.findAll();
	    if(accounts==null) {
	    	throw new AccountException("there are no accounts");
	    }
	    List<AccountDto> accountDtos = accounts.stream()
	            .map(account -> mapper.map(account, AccountDto.class))
	            .collect(Collectors.toList());
	    return accountDtos;
	}




	@Override
	public String deleteAccount(String accountNumber) {
		Account account = accountRepo.findByAccountNumber(accountNumber)
				.orElseThrow(()->new AccountException("account not found "));
		
		account.setAccountStatus(AccountStatus.CLOSED);
		
		
		return account.getAccountNumber() + " closed";
	}


//	
}



