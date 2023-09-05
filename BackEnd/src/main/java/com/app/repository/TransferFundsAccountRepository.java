package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.TransferFundsAccount;

public interface TransferFundsAccountRepository extends JpaRepository<TransferFundsAccount, String> {

}
