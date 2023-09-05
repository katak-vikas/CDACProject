package com.app.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.app.jwt_utils.JwtUtil;
import com.app.security.CustomUserDetailsService;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {
	// auto wire jwt utils
	@Autowired
	private JwtUtil jwtUtils;
	// auto wire dao based user details service
	@Autowired
	private CustomUserDetailsService customUserDetailsService;
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String requestTokenHeader=request.getHeader("Authorization");
		String username=null;
		String jwtToken=null;
		System.out.println("In authenticate method jwt filter");
		if(requestTokenHeader!=null &&requestTokenHeader.startsWith("Bearer") ) {
			jwtToken=requestTokenHeader.substring(7);
			try {
				username=this.jwtUtils.extractUsername(jwtToken);
				System.out.println(username);
			}catch(Exception e) {
								e.printStackTrace();
								System.out.println("ho chuka");
			}
			
			UserDetails userDetails=this.customUserDetailsService.loadUserByUsername(username);
			System.out.println(userDetails);
			if(username!=null && SecurityContextHolder.getContext().getAuthentication()==null) {
			UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());	
			
			usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
			
			 SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
			}else {
				System.out.println("username not validated");
			}
			
		}
		System.out.println("if hi nhi chala");
		
		filterChain.doFilter(request, response);
		
		
	}

	/*
	 * @Override protected void doFilterInternal(HttpServletRequest request,
	 * HttpServletResponse response, FilterChain filterChain) throws
	 * ServletException, IOException { try { System.out.println("in filter ");
	 * String authHeader = request.getHeader("Authorization"); if (authHeader !=
	 * null && authHeader.startsWith("Bearer ")) {
	 * System.out.println("contains JWT " + authHeader); String jwt =
	 * authHeader.substring(7);// extracting jwt token value from auth header //
	 * validate JWT if (jwtUtils.validateToken(jwt, null)){//.validateJwtToken(jwt))
	 * { // In case of validated token : get user's identity n add it in security
	 * ctx // holder. // 1 . get user name from validated JWT (there is no pwd or
	 * authorities in the // token) UserDetails userDetails = userDetailsService
	 * .loadUserByUsername(jwtUtils.extractUsername(jwt));//.getUserNameFromJwtToken
	 * (jwt)); // if the authentication object is already not available from sec ctx
	 * if (SecurityContextHolder.getContext().getAuthentication() == null) {
	 * System.out.println("4"); // create a new Authentication object //
	 * UsernamePasswordAuthenticationToken : implements Authentication // An
	 * implementation that is designed for simple presentation of a username and //
	 * password. UsernamePasswordAuthenticationToken authentication = new
	 * UsernamePasswordAuthenticationToken( userDetails.getUsername(),
	 * userDetails.getPassword(), userDetails.getAuthorities()); //
	 * authentication.setDetails(new
	 * WebAuthenticationDetailsSource().buildDetails(request));
	 * SecurityContextHolder.getContext().setAuthentication(authentication); } } }
	 * 
	 * } finally { filterChain.doFilter(request, response); } }
	 */
}
