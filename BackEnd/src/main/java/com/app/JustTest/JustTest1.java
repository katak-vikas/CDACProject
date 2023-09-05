package com.app.JustTest;

import java.util.UUID;

public class JustTest1 {

	public static String generateUniqueDebitCardNumber() {
        UUID uniqueId = UUID.randomUUID();
        System.out.println(uniqueId);
        String cardNumber = "6" + uniqueId.toString().replaceAll("[^0-9]", "").substring(0, 15);
        return cardNumber;
    }

    public static void main(String[] args) {
        String debitCardNumber = generateUniqueDebitCardNumber();
        System.out.println("Generated Unique Debit Card Number: " + debitCardNumber);
    }
    
    
    
    
    

}
