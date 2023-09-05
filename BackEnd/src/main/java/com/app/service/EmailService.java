package com.app.service;

import com.app.dto.EmailDetails;

public interface EmailService {

	void sendEmail(EmailDetails emailDetails);

	void sendEmail(EmailDetails emailDetails, byte[] pdfContent, String pdfFileName);

}
