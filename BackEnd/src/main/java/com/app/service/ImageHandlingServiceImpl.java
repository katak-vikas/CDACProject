package com.app.service;

import static org.apache.commons.io.FileUtils.readFileToByteArray;
import static org.apache.commons.io.FileUtils.writeByteArrayToFile;

import java.io.File;
import java.io.IOException;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dto.ApiResponse;
import com.app.entities.Customer;
import com.app.repository.CustomerRepository;

@Service
@Transactional
public class ImageHandlingServiceImpl implements ImageHandlingService {
	@Value("${file.upload.location}")
	private String uploadFolder;

	@Autowired
	private CustomerRepository customerRepo;

	@PostConstruct
	public void init() throws IOException {
		// check if folder exists continue
		File folder = new File(uploadFolder);
		if (folder.exists()) {
			System.out.println("folder exists already !");
		} else {
			// no--create a folder
			folder.mkdir();
			System.out.println("created a folder! ");
		}
	}

	@Override
	public ApiResponse uploadImage(String extractedUsername, MultipartFile image) throws IOException {
		// TODO Auto-generated method stub
		Customer customer = customerRepo.findByUsername(extractedUsername)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Username"));
		// customer found persistent
		// store image on server side folder
		String path = uploadFolder.concat(image.getOriginalFilename());
		System.out.println(path);
		// Use File Utils Method:Write byte to file
		writeByteArrayToFile(new File(path), image.getBytes());
		// set image path

		customer.setImagePath(path);

		return new ApiResponse("Image file uploaded successfully for customer name " + extractedUsername);
	}

	@Override
	public byte[] serveImage(String extractedUsername) throws IOException {
		// TODO Auto-generated method stub
		// get customer by id
		Customer customer = customerRepo.findByUsername(extractedUsername)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid USername"));
		// customer found -->persistent
		String path = customer.getImagePath();
		if (path != null) {
			// path-->File-->byte[]
			return readFileToByteArray(new File(path));
			// or from db ;;retrn customer.getImage

		} else {
			throw new ResourceNotFoundException("Image not yet assigned !!!");
		}

	}

}
