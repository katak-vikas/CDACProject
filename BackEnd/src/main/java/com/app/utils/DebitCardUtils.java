package com.app.utils;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Random;

public interface DebitCardUtils {
	
	static String generateCardNumberNormal() {
			
			LocalDateTime now = LocalDateTime.now();
	        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddhhmmss");
	        String formattedDateTime = now.format(formatter);
			return "DB"+formattedDateTime;
		}
	
	
	
	public static String generateDebitCardNumber() throws NoSuchAlgorithmException {
	    // Generate random IIN (6 digits)
	    String iin = generateRandomNumber(600000, 609999);
	
	    // Generate unique account identifier based on current time and random value
	    String accountIdentifier = generateUniqueAccountIdentifier();
	
	    // Combine IIN and account identifier
	    String partialNumber = iin + accountIdentifier;
	
	    // Calculate and append Luhn check digit
	    int luhnCheckDigit = calculateLuhnCheckDigit(partialNumber);
	    String fullNumber = partialNumber + luhnCheckDigit;
	
	    return fullNumber;
	}
	
	private static String generateRandomNumber(int min, int max) {
	    Random random = new Random();
	    int randomNumber = random.nextInt(max - min + 1) + min;
	    return String.format("%06d", randomNumber);
	}
	
	private static String generateUniqueAccountIdentifier() throws NoSuchAlgorithmException {
	    long currentTime = System.currentTimeMillis();
	    int randomValue = new Random().nextInt(1000000); // Add additional randomness
	    String dataToHash = currentTime + "-" + randomValue;
	
	    MessageDigest md = MessageDigest.getInstance("SHA-256");
	    byte[] hashBytes = md.digest(dataToHash.getBytes());
	
	    StringBuilder accountIdentifier = new StringBuilder();
	    for (byte b : hashBytes) {
	        accountIdentifier.append(Math.abs(b % 10)); // Ensure valid numeric character
	        if (accountIdentifier.length() >= 9) {
	            break; // Stop if length reaches 9 digits
	        }
	    }
	
	    // Ensure total length is 9 digits
	    while (accountIdentifier.length() < 9) {
	        accountIdentifier.insert(0, "0"); // Add leading zeros if needed
	    }
	
	    return accountIdentifier.toString();
	}
	
	private static int calculateLuhnCheckDigit(String number) {
	    int sum = 0;
	    boolean alternate = false;
	
	    for (int i = number.length() - 1; i >= 0; i--) {
	        int digit = Integer.parseInt(number.substring(i, i + 1));
	        if (alternate) {
	            digit *= 2;
	            if (digit > 9) {
	                digit -= 9;
	            }
	        }
	        sum += digit;
	        alternate = !alternate;
	    }
	
	    int mod = sum % 10;
	    return (mod == 0) ? 0 : 10 - mod;
	}
	
	
	
	public static int generatedebbitCardCVV() {
        Random random = new Random();
        return random.nextInt(900)+100; // Generates a random number between 0 (inclusive) and 1000 (exclusive)
    }

}
