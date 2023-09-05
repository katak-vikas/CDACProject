package com.app.controller;

import static org.springframework.http.MediaType.IMAGE_GIF_VALUE;
import static org.springframework.http.MediaType.IMAGE_JPEG_VALUE;
import static org.springframework.http.MediaType.IMAGE_PNG_VALUE;

import java.io.IOException;
import java.time.LocalTime;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.custom_exceptions.account.AccountException;
import com.app.dto.AccountDto;
import com.app.dto.ApiResponse;
import com.app.dto.CustomerDto;
import com.app.dto.OpenNewAccountRequest;
import com.app.dto.RegisterCustomerDto;
import com.app.dto.UpdateCustomerDetails;
import com.app.jwt_utils.JwtUtil;
import com.app.service.CustomerService;
import com.app.service.ImageHandlingService;
import com.app.service.TransactionService;

@RestController
@CrossOrigin(origins = "http://localhost:3001")
@RequestMapping("/customer")
public class CustomerController {

	@Autowired
	private ModelMapper mapper;

	@Autowired
	private CustomerService customerService;

	@Autowired
	private ImageHandlingService imageService;

	@Autowired
	private TransactionService transactionService;
	
	@Autowired
	private JwtUtil jwtUtil;

//	@PostMapping("/register")
//	public ResponseEntity<?> registerCustomer(@RequestBody RegisterCustomerDto registerCustomerDto)
//			throws InterruptedException {
//		try {
//			LocalTime currentTime = LocalTime.now();
////			System.out.println(currentTime + "in register");
//			//Thread.sleep(2000);
////			currentTime = LocalTime.now();
////			System.out.println(currentTime + "in register");
//			ApiResponse responce = new ApiResponse(customerService.registerCustomer(registerCustomerDto));
//			return new ResponseEntity<>(responce, HttpStatus.CREATED);
//
//		} catch (RuntimeException e) {
//			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
//		}
//	}
	
	@GetMapping("/logout")
	public ResponseEntity<?> logout(HttpServletRequest request) {
		// Access the customer details from the session

		String authorizationHeader = request.getHeader("Authorization");
		String jwtToken = "login";

		// Check if the header is not null and starts with "Bearer "
		if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
			// Extract the JWT token by removing the "Bearer " prefix
			jwtToken = authorizationHeader.substring(7);
		}
		System.out.println("\n\n\n");
		System.out.println(jwtToken);

		String extractedUsername = jwtUtil.extractUsername(jwtToken);

//	       CustomerDto loggedInCustomer = (CustomerDto) httpSession.getAttribute("loggedInCustomer");
		return new ResponseEntity<>("logged out", HttpStatus.OK);
		
	}

	@GetMapping("/profile")
	public ResponseEntity<?> getProfile(HttpServletRequest request) {
		// Access the customer details from the session

		String authorizationHeader = request.getHeader("Authorization");
		String jwtToken = "login";

		// Check if the header is not null and starts with "Bearer "
		if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
			// Extract the JWT token by removing the "Bearer " prefix
			jwtToken = authorizationHeader.substring(7);
		}
		System.out.println("\n\n\n");
		System.out.println(jwtToken);

		String extractedUsername = jwtUtil.extractUsername(jwtToken);

//	       CustomerDto loggedInCustomer = (CustomerDto) httpSession.getAttribute("loggedInCustomer");
		CustomerDto loggedInCustomer = (CustomerDto) customerService.getProfile(extractedUsername);
		if (loggedInCustomer != null) {
			return new ResponseEntity<>(loggedInCustomer, HttpStatus.OK);
		} else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new ApiResponse("Log in to access profile"));
		}
	}

	@DeleteMapping("/delete")
	public ResponseEntity<?> deleteCustomer(HttpServletRequest request) {
		try {
			String authorizationHeader = request.getHeader("Authorization");
			String jwtToken = "login";

			// Check if the header is not null and starts with "Bearer "
			if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
				// Extract the JWT token by removing the "Bearer " prefix
				jwtToken = authorizationHeader.substring(7);
			}
			System.out.println("\n\n\n");
			System.out.println(jwtToken);

			String extractedUsername = jwtUtil.extractUsername(jwtToken);

			String deletionMessage = customerService.deleteCustomer(extractedUsername);
			// Clear the session and perform logout (if needed)
			ApiResponse response = new ApiResponse(deletionMessage);
			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (RuntimeException e) {
			// Handle unauthorized access here, if needed
			HttpHeaders headers = new HttpHeaders();
			headers.add(HttpHeaders.LOCATION, "/login"); // Replace with the actual login page URL
			return ResponseEntity.status(HttpStatus.SEE_OTHER).headers(headers)
					.body("Error deleting account: " + e.getMessage());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse(e.getMessage()));
		}

	}



	@PutMapping("/update")
	public ResponseEntity<?> updateCustomerStatus(HttpServletRequest request,
			@RequestBody UpdateCustomerDetails updateCustomerDetails) {
		try {
			String authorizationHeader = request.getHeader("Authorization");
			String jwtToken = "login";

			// Check if the header is not null and starts with "Bearer "
			if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
				// Extract the JWT token by removing the "Bearer " prefix
				jwtToken = authorizationHeader.substring(7);
			}
			System.out.println("\n\n\n");
			System.out.println(jwtToken);

			String extractedUsername = jwtUtil.extractUsername(jwtToken);

			String updateMessage = customerService.updateCustomerDetails(extractedUsername, updateCustomerDetails);

			System.out.println("After method update message: " + updateMessage);
			// Clear the session and perform logout (if needed)
			ApiResponse response = new ApiResponse(updateMessage);
			return new ResponseEntity<>(response, HttpStatus.OK);

		} catch (AccountException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Customer not found.");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}
	
	@PostMapping("/transactions/export/{accountNumber}")
	public ResponseEntity<?> getAllTransactionsThroughMail(@PathVariable String accountNumber){
		System.out.println(accountNumber);
		try {
			return ResponseEntity.ok().body(transactionService.getAllTransactionsThroughMail(accountNumber));
		}catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}


	@PostMapping("/newAccount")
	public ResponseEntity<?> createNewAccount(HttpServletRequest request,
			@RequestBody OpenNewAccountRequest openNewAccountRequest) {
		try {

			String authorizationHeader = request.getHeader("Authorization");
			String jwtToken = "login";

			// Check if the header is not null and starts with "Bearer "
			if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
				// Extract the JWT token by removing the "Bearer " prefix
				jwtToken = authorizationHeader.substring(7);
			}
			System.out.println("\n\n\n");
			System.out.println(jwtToken);

			String extractedUsername = jwtUtil.extractUsername(jwtToken);

			return new ResponseEntity<>(customerService.openNewAccount(extractedUsername, openNewAccountRequest),
					HttpStatus.OK);
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse(e.getMessage()));
		}

	}

	@PostMapping(value = "/uploadImages", consumes = "multipart/form-data")
	public ResponseEntity<?> uploadImage(@RequestParam MultipartFile image, HttpServletRequest request)
			throws IOException {
		String authorizationHeader = request.getHeader("Authorization");
		String jwtToken = "login";

		// Check if the header is not null and starts with "Bearer "
		if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
			// Extract the JWT token by removing the "Bearer " prefix
			jwtToken = authorizationHeader.substring(7);
		}
		System.out.println("\n\n\n");
		System.out.println(jwtToken);

		String extractedUsername = jwtUtil.extractUsername(jwtToken);

		System.out.println("in upload image " + extractedUsername);
		return ResponseEntity.status(HttpStatus.CREATED).body(imageService.uploadImage(extractedUsername, image));
	}

	@GetMapping(value = "/downloadImages", produces = { IMAGE_GIF_VALUE, IMAGE_JPEG_VALUE, IMAGE_PNG_VALUE })
	public ResponseEntity<?> downloadImage(HttpServletRequest request) throws IOException {
		String authorizationHeader = request.getHeader("Authorization");
		String jwtToken = "login";

		// Check if the header is not null and starts with "Bearer "
		if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
			// Extract the JWT token by removing the "Bearer " prefix
			jwtToken = authorizationHeader.substring(7);
		}
		System.out.println("\n\n\n");
		System.out.println(jwtToken);

		String extractedUsername = jwtUtil.extractUsername(jwtToken);
		System.out.println("in download image " + extractedUsername);
		return ResponseEntity.ok(imageService.serveImage(extractedUsername));
	}
	
	@GetMapping("/accounts")
	public ResponseEntity<?> getAllAccounts(HttpServletRequest request) {
		
		System.out.println("\n\n\nin customer/accounts");
		// Access the customer details from the session

		String authorizationHeader = request.getHeader("Authorization");
		String jwtToken = "login";

		// Check if the header is not null and starts with "Bearer "
		if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
			// Extract the JWT token by removing the "Bearer " prefix
			jwtToken = authorizationHeader.substring(7);
		}
		System.out.println("\n\n\n");
		System.out.println(jwtToken);

		String extractedUsername = jwtUtil.extractUsername(jwtToken);

//	       CustomerDto loggedInCustomer = (CustomerDto) httpSession.getAttribute("loggedInCustomer");
		List<AccountDto> accounts =  customerService.getAllAccounts(extractedUsername);
		if (accounts != null) {
			return new ResponseEntity<>(accounts, HttpStatus.OK);
		} else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new ApiResponse("Log in to access profile"));
		}
	}
	
	
	@PostMapping(value="/register",consumes =
		  {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE})
public ResponseEntity<?> registerCustomer(@RequestPart RegisterCustomerDto registerCustomerDto,@RequestPart MultipartFile image)
		throws IOException {
	try {
		LocalTime currentTime = LocalTime.now();
		System.out.println(currentTime + "in register");
	//	Thread.sleep(20000);
		currentTime = LocalTime.now();
		System.out.println(currentTime + "in register");
		ApiResponse responce = new ApiResponse(customerService.registerCustomer(registerCustomerDto));
	     imageService.uploadImage(registerCustomerDto.getUsername(), image);
		return new ResponseEntity<>(responce, HttpStatus.CREATED);

	} catch (RuntimeException e) {
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
	} catch (IOException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
	}
	
}
	
	/* ================================================================= */
	/*
	 * // 9. Upload emp details along with image //
	 * http://host:port/employees/images , method=POST
	 * 
	 * @PostMapping(value = "/emp_images", consumes =
	 * {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE})
	 * public ResponseEntity<?> uploadEmpAndImage (@RequestPart MultipartFile image)
	 * throws IOException { System.out.println("in upload emp details n image " +
	 * emp + " " + image); return
	 * ResponseEntity.ok().body(imageService.addNewEmployeeWithImage(emp, image));
	 */
// 9. Upload emp details along with image
	/*
	 * // http://host:port/employees/images , method=POST
	 * 
	 * @PostMapping(value = "/uploadImages", consumes ="multipart/form-data" )
	 * public ResponseEntity<?> uploadEmpAndImage (@RequestParam MultipartFile
	 * image,HttpServletRequest request) throws IOException { String
	 * authorizationHeader = request.getHeader("Authorization"); String jwtToken =
	 * "login";
	 * 
	 * // Check if the header is not null and starts with "Bearer " if
	 * (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
	 * // Extract the JWT token by removing the "Bearer " prefix jwtToken =
	 * authorizationHeader.substring(7); } System.out.println("\n\n\n");
	 * System.out.println(jwtToken);
	 * 
	 * String extractedUsername = jwtUtil.extractUsername(jwtToken);
	 * System.out.println("in upload emp details n image " + extractedUsername + " "
	 * + image); return
	 * ResponseEntity.ok().body(imageService.uploadImage(extractedUsername, image));
	 * }
	 */
	/*
	 * @PostMapping("/login") public ResponseEntity<?> customerLogin(@RequestBody
	 * CustomerLoginDto customerLoginDto, HttpSession httpSession) { try {
	 * 
	 * String username = customerLoginDto.getUsername(); String password =
	 * customerLoginDto.getPassword(); CustomerDto customerDto =
	 * customerService.login(username, password);
	 * 
	 * httpSession.setAttribute("loggedInCustomer", customerDto);
	 * 
	 * return new ResponseEntity<>(customerDto, HttpStatus.OK); } catch
	 * (AccountException e) { return
	 * ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new
	 * ApiResponse(e.getMessage())); } catch (Exception e) { return
	 * ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new
	 * ApiResponse(e.getMessage())); }
	 * 
	 * }
	 */
	/*
	 * @PutMapping("/update2") public ResponseEntity<String>
	 * updateCustomerStatus2(@RequestBody UpdateCustomerDetails
	 * updateCustomerDetails, HttpSession httpSession) { try { CustomerDto
	 * loggedInCustomer = (CustomerDto)
	 * httpSession.getAttribute("loggedInCustomer");
	 * System.out.println("in update customer \n" + loggedInCustomer); if
	 * (loggedInCustomer.equals(null)) { HttpHeaders headers = new HttpHeaders();
	 * headers.add(HttpHeaders.LOCATION, "/login"); // Replace with the actual login
	 * page URL return new ResponseEntity<>(headers, HttpStatus.SEE_OTHER); }
	 * 
	 * String updateMessage =
	 * customerService.updateCustomerDetails(loggedInCustomer.getUsername(),
	 * updateCustomerDetails);
	 * 
	 * System.out.println("After method update message: " + updateMessage); // Clear
	 * the session and perform logout (if needed) HttpHeaders headers = new
	 * HttpHeaders(); headers.add(HttpHeaders.LOCATION, "/profile"); // Replace with
	 * the actual login page URL
	 * 
	 * return ResponseEntity.status(HttpStatus.SEE_OTHER).headers(headers).body(
	 * updateMessage);
	 * 
	 * } catch (AccountException e) { return
	 * ResponseEntity.status(HttpStatus.NOT_FOUND).body("Customer not found."); }
	 * catch (Exception e) { return
	 * ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
	 * } }
	 */
	/*
	 * @DeleteMapping("/delete2") public ResponseEntity<?>
	 * deleteCustomer2(HttpSession httpSession) { try { CustomerDto loggedInCustomer
	 * = (CustomerDto) httpSession.getAttribute("loggedInCustomer");
	 * System.out.println("in d customer \n" + loggedInCustomer); if
	 * (loggedInCustomer.equals(null)) { HttpHeaders headers = new HttpHeaders();
	 * headers.add(HttpHeaders.LOCATION, "/login"); // Replace with the actual login
	 * page URL return new ResponseEntity<>(headers, HttpStatus.SEE_OTHER); }
	 * 
	 * String deletionMessage =
	 * customerService.deleteCustomer(loggedInCustomer.getUsername()); // Clear the
	 * session and perform logout (if needed) HttpHeaders headers = new
	 * HttpHeaders(); headers.add(HttpHeaders.LOCATION, "/login"); // Replace with
	 * the actual login page URL
	 * 
	 * return ResponseEntity.status(HttpStatus.SEE_OTHER).headers(headers).body(
	 * deletionMessage); } catch (RuntimeException e) { // Handle unauthorized
	 * access here, if needed HttpHeaders headers = new HttpHeaders();
	 * headers.add(HttpHeaders.LOCATION, "/login"); // Replace with the actual login
	 * page URL return ResponseEntity.status(HttpStatus.SEE_OTHER).headers(headers)
	 * .body("Error deleting account: " + e.getMessage()); } catch (Exception e) {
	 * return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new
	 * ApiResponse(e.getMessage())); }
	 * 
	 * }
	 */

}
