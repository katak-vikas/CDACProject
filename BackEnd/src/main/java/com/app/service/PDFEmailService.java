package com.app.service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.app.dto.CustomerDto;
import com.app.dto.EmailDetails;
import com.app.dto.TransactionDto;
import com.app.utils.PDFUtils;
import com.itextpdf.text.DocumentException;
@Service
public class PDFEmailService {

   

    @Autowired
    private JavaMailSender javaMailSender;

    public void sendEmailWithPDFAttachment(EmailDetails emailDetails, List<TransactionDto> transactions, CustomerDto customer) throws MessagingException, IOException, DocumentException {
        try (ByteArrayOutputStream pdfOutputStream = new ByteArrayOutputStream()) {
            PDFUtils.designStatement(pdfOutputStream, transactions, customer);
            
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(emailDetails.getRecipient());
            helper.setSubject(emailDetails.getSubject());
            helper.setText(emailDetails.getMessageBody());

            // Attach the PDF file
            helper.addAttachment("MyStatement.pdf", new InputStreamResource(new ByteArrayInputStream(pdfOutputStream.toByteArray())));

            javaMailSender.send(message);
        }
    }

    // Rest of your code for designing the statement remains the same

//    public static void main(String[] args) throws IOException {
//        PDFEmailService pdfEmailService = new PDFEmailService(/* Inject JavaMailSender here */);
//        try {
//            pdfEmailService.sendEmailWithPDFAttachment("recipient@example.com", "PDF Attachment Test", "Hello, please find the attached PDF document.", populateList(), createCustomerDto());
//            System.out.println("Email sent successfully with PDF attachment.");
//        } catch (MessagingException e) {
//            e.printStackTrace();
//        }
//    }
}
