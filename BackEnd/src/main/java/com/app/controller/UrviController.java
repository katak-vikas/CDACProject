package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.custom_exceptions.customer.CustomerException;
import com.app.dto.ApiResponse;
import com.app.dto.ResetPasswordRequest;
import com.app.entities.Customer;
import com.app.service.CustomerService;
import com.app.service.OtpService;

@RestController
@RequestMapping("/urvi")
public class UrviController {
	
	@Autowired
	private PasswordEncoder enc;

	@Autowired
	private CustomerService userService;

    @Autowired
    private OtpService otpService; // You need to implement this

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody String email) {
        Customer user = userService.findByEmail(email);

        if (user == null) {
            return ResponseEntity.badRequest().body("User not found with provided email");
        }

        // Generate an OTP and send it via email
        String otp = otpService.generateOtp();
        
        otpService.sendOtpByEmail(user.getEmail(), otp);
        otpService.storeOtp(user.getEmail(), otp);
        

        return ResponseEntity.ok("OTP sent to your email");
    }
    
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {
        String email = request.getEmail();

        Customer user = userService.findByEmail(email);

        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }

        // Verify the OTP
        if (!otpService.verifyOtp(user.getEmail(), request.getOtp())) {
            return ResponseEntity.badRequest().body("Invalid OTP");
        }

        // Hash the new password using BCrypt
        System.out.println("new password "+request.getNewPassword());
        String hashedPassword = enc.encode(request.getNewPassword());
        user.setPassword(hashedPassword);
        System.out.println("set password "+hashedPassword);
        try {
        	
        	userService.save(user);
        	
        	System.out.println("user saved");
        	
        }catch(CustomerException e) {
        	return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ApiResponse("failed to change the password"));
        	
        }
        

        return ResponseEntity.ok("Password reset successfully");
    }
    
    @PostMapping("/send-OTP")
    public ResponseEntity<?> sendOTP(@RequestBody String email) {
        Customer user = userService.findByEmail(email);

        if (user == null) {
            return ResponseEntity.badRequest().body("User not found with provided email");
        }

        // Generate an OTP and send it via email
        String otp = otpService.generateOtp();
        
        otpService.sendOtpByEmail(user.getEmail(), otp);
        otpService.storeOtp(user.getEmail(), otp);
        

        return ResponseEntity.ok("OTP sent to your email");
    }
    
    @PostMapping("/verify-OTP")
    public ResponseEntity<?> verifyOTP(@RequestBody String email, @RequestBody String otp) {
       

        Customer user = userService.findByEmail(email);

        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }

        // Verify the OTP
        if (!otpService.verifyOtp(user.getEmail(), otp)) {
            return ResponseEntity.badRequest().body("Invalid OTP");
        }

        
       
        

        return ResponseEntity.ok("verified successfully");
    }
}

