	package com.app.service;
	import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import org.springframework.stereotype.Service;

import com.app.dto.EmailDetails;
	
	@Service
	public class EmailServiceImpl implements EmailService {
	
	    private final String senderEmail = "easybank101@gmail.com";
	    private final String senderPassword = "ljxlqcjtvarrbhbv";
	
	  
		@Override
		public void sendEmail(EmailDetails emailDetails) {
	        Properties props = new Properties();
	        props.put("mail.smtp.auth", "true");
	        props.put("mail.smtp.starttls.enable", "true");
	        props.put("mail.smtp.host", "smtp.gmail.com");
	        props.put("mail.smtp.port", "587");
	
	        Session session = Session.getInstance(props, new Authenticator() {
	            @Override
	            protected PasswordAuthentication getPasswordAuthentication() {
	                return new PasswordAuthentication(senderEmail, senderPassword);
	            }
	        });
	
	        try {
	            Message message = new MimeMessage(session);
	            message.setFrom(new InternetAddress(senderEmail));
	            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(emailDetails.getRecipient()));
	            message.setSubject(emailDetails.getSubject());
	            message.setText(emailDetails.getMessageBody());
	
	            Transport.send(message);
	
	            System.out.println("Email sent successfully!");
	        } catch (MessagingException e) {
	            e.printStackTrace();
	            System.err.println("Failed to send email: " + e.getMessage());
	        }
	    }
		
		
	
		@Override
		    public void sendEmail(EmailDetails emailDetails, byte[] pdfContent, String pdfFileName) {
		        Properties props = new Properties();
		        props.put("mail.smtp.auth", "true");
		        props.put("mail.smtp.starttls.enable", "true");
		        props.put("mail.smtp.host", "smtp.gmail.com");
		        props.put("mail.smtp.port", "587");

		        Session session = Session.getInstance(props, new Authenticator() {
		            @Override
		            protected PasswordAuthentication getPasswordAuthentication() {
		                return new PasswordAuthentication(senderEmail, senderPassword);
		            }
		        });

		        try {
		            Message message = new MimeMessage(session);
		            message.setFrom(new InternetAddress(senderEmail));
		            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(emailDetails.getRecipient()));
		            message.setSubject(emailDetails.getSubject());

		            // Create a multipart message
		            MimeMultipart multipart = new MimeMultipart();

		            // Create and add text content
		            MimeBodyPart textPart = new MimeBodyPart();
		            textPart.setText(emailDetails.getMessageBody());
		            multipart.addBodyPart(textPart);

		            // Create and add PDF attachment
		            MimeBodyPart pdfAttachmentPart = new MimeBodyPart();
		            pdfAttachmentPart.setContent(pdfContent, "application/pdf");
		            pdfAttachmentPart.setFileName(pdfFileName);
		            multipart.addBodyPart(pdfAttachmentPart);

		            // Set the multipart content to the message
		            message.setContent(multipart);

		            // Send the message
		            Transport.send(message);

		            System.out.println("Email with PDF attachment sent successfully!");
		        } catch (MessagingException e) {
		            e.printStackTrace();
		            System.err.println("Failed to send email: " + e.getMessage());
		        }
		    }


	}
	
