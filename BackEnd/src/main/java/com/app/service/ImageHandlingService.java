package com.app.service;
import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.app.dto.ApiResponse;
public interface ImageHandlingService {
ApiResponse uploadImage(String extractedUsername, MultipartFile image) throws IOException;
byte[] serveImage(String extractedUsername) throws IOException;
}
