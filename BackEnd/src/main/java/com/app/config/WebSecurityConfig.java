package com.app.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import com.app.filter.JwtRequestFilter;
import com.app.security.CustomUserDetailsService;

@EnableWebSecurity
@Configuration// Tells SC that this class contains web security config.
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private CustomUserDetailsService customUserDetailsService;

	@Autowired
	private JwtRequestFilter jwtFilter;

	// for configuring authentication , override below method
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		System.out.println(1);
		// since there is no out-of-box imple for JPA based auth , u have to create a
		// custom class implementation of UserDetailsService n pass it here.
		// javadocs : Add authentication based upon the custom UserDetailsService that
		// is passed in.
		// It then returns a DaoAuthenticationConfigurer to allow customization of the
		// authentication.
		auth.userDetailsService(customUserDetailsService);
	}

	// for configuring authorization , override below method
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		System.out.println(3);
		// specify our own config
		// enable cors n disable CSRF
		http.cors().and().csrf().disable().

				authorizeRequests()// authorize all requests
				.antMatchers("/token", "/login","/account/**", "/customer/register", "/swagger*/**", "/v*/api-docs/**","/clerk/**","/urvi/**").permitAll()
				.antMatchers("/customer/**").hasRole("CUSTOMER")
				//.antMatchers("/clerk/**").hasRole("CLERK")
				.antMatchers("/manager/**").hasRole("MANAGER")
			
				// always start with most restrictive of the patterns at the top n then go on to
				// lesser restrictive patterns
				// NOTE : argument of hasRole should NOT start with "ROLE_" as this is
				// automatically inserted.
				// .antMatchers("/admin/**").hasRole("ADMIN").
				// antMatchers("/users/**").hasRole("USER").
				// antMatchers("/student/**").hasRole("STUDENT")
				// .antMatchers("/faculty/**").hasRole("FACULTY")
				// .antMatchers("/","static/js","static/css").permitAll()
				// antMatchers("/", "/api/**").permitAll().
				// allow any HTTP OPTIONS request (which is typically a pre flight request
				// coming from react like
				// front end : it's not required for testing it with postman
				// antMatchers(HttpMethod.OPTIONS, "/**").permitAll().and().
				// To tell Spring Security NEVER create an HttpSession & use HttpSession to
				// obtain the
				// SecurityContext
				.anyRequest().authenticated().and().sessionManagement()
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		// adding custom jwt filter before a filter for processing an authentication
		// form submission.
		http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

	}

	// From Spring sec 5 onwards MUST configure a password encoder bean , otherwise
	// : java.lang.IllegalArgumentException: There is no PasswordEncoder mapped

//	@Bean // To configure a spring bean (return type of this method will be a spring bean
	// after configuring password encoder bean : u will have to supply encoded
	// password in auth config
	// o.w : Encoded password does not look like BCrypt : warning (& authentication
	// does not work
	// : equivalent to <bean id ...> tag in xml)
	/*
	 * public PasswordEncoder encoder() { System.out.println(2); return new
	 * BCryptPasswordEncoder(); }
	 */
	// below code is required from Spring Boot 2.x onwards , earlier it used to
	// inject automatically AuthenticationManager created from
	// configure(AuthenticationManagerBuilder) method
	// Now MUST override this method to expose the AuthenticationManager from
	// configure(AuthenticationManagerBuilder) to be exposed as a Bean.

	/*
	 * public PasswordEncoder encoder() { System.out.println(2); return
	 * NoOpPasswordEncoder.getInstance(); }
	 */

	@Override
	@Bean
	public AuthenticationManager authenticationManagerBean() throws Exception {

		return super.authenticationManagerBean();
	}
	 @Bean
	    public CorsFilter corsFilter() {
	        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	        CorsConfiguration config = new CorsConfiguration();
	        config.addAllowedOrigin("*"); // Allow all origins. You can restrict it to specific origins.
	        config.addAllowedMethod("*"); // Allow all HTTP methods.
	        config.addAllowedHeader("*"); // Allow all headers.
	        source.registerCorsConfiguration("/**", config);
	        return new CorsFilter(source);
	    }

}
