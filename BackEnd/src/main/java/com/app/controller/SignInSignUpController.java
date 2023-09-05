package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.JwtRequest;
import com.app.dto.JwtResponse;
import com.app.entities.enums.UserRole;
import com.app.jwt_utils.JwtUtil;
import com.app.security.CustomUserDetailsService;

@RestController
public class SignInSignUpController {
	@Autowired
	private PasswordEncoder enc;
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private JwtUtil jwtUtil;
	@Autowired
	private CustomUserDetailsService customUserDetailsService;

	@PostMapping("/login")
	public ResponseEntity<?> generateToken(@RequestBody JwtRequest jwtRequest) throws Exception {
		System.out.println("Hum yahan aa bhi rhe in jwt controller ke method pe");

		try {
			this.authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(jwtRequest.getUsername(), jwtRequest.getPassword()));

		} catch (UsernameNotFoundException e) {
			e.printStackTrace();
			throw new Exception("Itna kya hi bad hai credential");
		} catch (BadCredentialsException e) {
			e.printStackTrace();
			throw new Exception("Bad credential exception seriously");
		}

		UserDetails userDetails = this.customUserDetailsService.loadUserByUsername(jwtRequest.getUsername());

		String token = this.jwtUtil.generateToken(userDetails);
		System.out.println(token);
		UserRole role=this.customUserDetailsService.getUserRole(jwtRequest.getUsername());

		return ResponseEntity.ok(new JwtResponse(token,role));
	}
}
