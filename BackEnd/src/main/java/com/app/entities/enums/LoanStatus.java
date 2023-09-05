package com.app.entities.enums;

public enum LoanStatus {   
    ACTIVE, // Loan is active and being paid
    DEFAULT, // Loan is in default due to missed payments
    FULLY_PAID, // Loan has been fully paid off
    SETTLED, // Loan has been settled before the term completion
    PENDING_APPROVAL, // Loan application is pending approval
    REJECTED; // Loan application has been rejected
}
