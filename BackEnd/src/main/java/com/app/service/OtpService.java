package com.app.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.EmailDetails;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Service
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class OtpService {
	
	@Autowired
	private EmailService emailService;
	
	
	private Map<String, String> otpStore = new HashMap<>();

    public String generateOtp() {
        // Generate a random OTP (e.g., using a library like java.util.Random)
    	String otp = generateRandomOTP(6);
        return otp; // Example OTP, generate as needed
    }
    
    public void storeOtp(String email, String otp) {
    	
        otpStore.put(email, otp);
        System.out.println("OTP stored is "+otp);
        String storedOtp = otpStore.get(email);
        System.out.println("OTP stored with email "+email+" is "+storedOtp);
    }

    public void sendOtpByEmail(String email, String otp) {
        // Send the OTP via email
        // Implement this part according to your email sending logic
    	EmailDetails emailDetails = new EmailDetails();
        emailDetails.setRecipient(email);
        emailDetails.setSubject("[Sensitive Information]");
        emailDetails.setMessageBody("OTP to change password of your URVI Bank account is "+ otp);
        
        emailService.sendEmail(emailDetails);
    }
    
    public boolean verifyOtp(String email, String userProvidedOtp) {
        String storedOtp = otpStore.get(email);
        System.out.println("Got OTP stored on email "+email+" is "+storedOtp);
        System.out.println("user provided otp "+userProvidedOtp);
        if (storedOtp != null && storedOtp.equals(userProvidedOtp)) {
            // Remove the OTP from the store after successful verification
        	System.out.println("otp verified");
            otpStore.remove(email);
            return true;
        }
        return false;
    }
    
    public static String generateRandomOTP(int length) {
        String characters = "0123456789"; // You can also include letters for a more complex OTP
        
        StringBuilder otp = new StringBuilder();
        Random random = new Random();

        for (int i = 0; i < length; i++) {
            int index = random.nextInt(characters.length());
            char randomChar = characters.charAt(index);
            otp.append(randomChar);
        }

        return otp.toString();
    }
}

