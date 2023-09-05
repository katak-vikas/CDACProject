package com.app.utils;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.stereotype.Service;

import com.app.dto.CustomerDto;
import com.app.dto.TransactionDto;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Font;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

@Service
public class PDFUtils {
	 public static void designStatement(ByteArrayOutputStream pdfOutputStream,List<TransactionDto> transactions,CustomerDto customer) throws DocumentException, IOException {
//       List<TransactionDto> transactions;
//       transactions = populateList();
//       CustomerDto customer = new CustomerDto();
//       customer.setFirstName("John");
//       customer.setLastName("Doe");
//       customer.setEmail("john.doe@example.com");
//       customer.setUsername("johndoe");
//       customer.setPhoneNumber("1234567890");
//       customer.setDateOfBirth(LocalDate.of(1990, 5, 15));
//       customer.setAadharCardNumber("1234-5678-9012");
//       customer.setNationality("Indian");
		 Rectangle statementSize = new Rectangle(PageSize.A4);
       Document document = new Document(statementSize);
       PdfWriter.getInstance(document, pdfOutputStream);

       document.open();

       // Add bank info
       PdfPTable bankInfoTable = new PdfPTable(1);
       bankInfoTable.setWidthPercentage(100);
       
       Font bankNameFont = getBoldFont(24); // Increased font size
       PdfPCell bankName = new PdfPCell(new Phrase("EasyBank", bankNameFont));
       bankName.setBorder(0);
       bankName.setHorizontalAlignment(PdfPCell.ALIGN_CENTER);
       
       PdfPCell bankLocation = new PdfPCell(new Phrase("Panchwati, Pune", getNormalFont()));
       bankLocation.setBorder(0);
       bankLocation.setHorizontalAlignment(PdfPCell.ALIGN_CENTER);
       bankLocation.setPaddingBottom(10f);

       bankInfoTable.addCell(bankName);
       bankInfoTable.addCell(bankLocation);

       // Add customer details
       PdfPCell customerName = new PdfPCell(new Phrase("Customer Name: " + customer.getFirstName() + " " + customer.getLastName(), getBoldFont(14)));
       customerName.setBorder(0);
       customerName.setHorizontalAlignment(PdfPCell.ALIGN_LEFT);
       customerName.setPaddingBottom(10f);

       PdfPCell customerPhone = new PdfPCell(new Phrase("Phone: " + customer.getPhoneNumber(), getBoldFont(14)));
       customerPhone.setBorder(0);
       customerPhone.setHorizontalAlignment(PdfPCell.ALIGN_LEFT);
       customerPhone.setPaddingBottom(10f);

       PdfPCell customerEmail = new PdfPCell(new Phrase("Email: " + customer.getEmail(), getBoldFont(14)));
       customerEmail.setBorder(0);
       customerEmail.setHorizontalAlignment(PdfPCell.ALIGN_LEFT);
       customerEmail.setPaddingBottom(10f);

       bankInfoTable.addCell(customerName);
       bankInfoTable.addCell(customerPhone);
       bankInfoTable.addCell(customerEmail);

       document.add(bankInfoTable);

       // Add current date and time
       DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
       String currentDateTime = LocalDateTime.now().format(dateTimeFormatter);
       PdfPCell dateTimeCell = new PdfPCell(new Phrase("Date & Time: " + currentDateTime, getNormalFont()));
       dateTimeCell.setBorder(0);
       dateTimeCell.setHorizontalAlignment(PdfPCell.ALIGN_CENTER);
       dateTimeCell.setPaddingBottom(10f);

       // Add transactions table
       PdfPTable transactionTable = new PdfPTable(9);
       transactionTable.setWidthPercentage(100);
       addTableHeader(transactionTable);
       addTransactionDetails(transactionTable, transactions);

       // Add content to document
       document.add(dateTimeCell);
       document.add(transactionTable);

       System.out.println("PDF created successfully!");

       document.close();
   }

   // Helper method to create a bold font with custom size
   private static Font getBoldFont(float size) throws DocumentException, IOException {
       BaseFont baseFont = BaseFont.createFont(BaseFont.HELVETICA_BOLD, BaseFont.CP1252, BaseFont.NOT_EMBEDDED);
       return new Font(baseFont, size);
   }

   // Helper method to create a normal font
   private static Font getNormalFont() throws DocumentException, IOException {
       BaseFont baseFont = BaseFont.createFont(BaseFont.HELVETICA, BaseFont.CP1252, BaseFont.NOT_EMBEDDED);
       return new Font(baseFont, 12);
   }

   // Helper method to add table header
// Helper method to add table header
   private static void addTableHeader(PdfPTable table) throws DocumentException, IOException {
	    float headerFontSize = 11; // Adjust the font size as needed

	    table.addCell(new PdfPCell(new Phrase("Transaction ID", getBoldFont(headerFontSize))));
	    table.addCell(new PdfPCell(new Phrase("Status", getBoldFont(headerFontSize))));
	    table.addCell(new PdfPCell(new Phrase("Type", getBoldFont(headerFontSize))));
	    table.addCell(new PdfPCell(new Phrase("Date", getBoldFont(headerFontSize))));
	    table.addCell(new PdfPCell(new Phrase("Time", getBoldFont(headerFontSize))));
	    table.addCell(new PdfPCell(new Phrase("From Account", getBoldFont(headerFontSize))));
	    table.addCell(new PdfPCell(new Phrase("To Account", getBoldFont(headerFontSize))));
	    table.addCell(new PdfPCell(new Phrase("Amount", getBoldFont(headerFontSize))));
	    table.addCell(new PdfPCell(new Phrase("Mode", getBoldFont(headerFontSize))));
	}


   private static void addTransactionDetails(PdfPTable table, List<TransactionDto> transactions) throws DocumentException, IOException {
	    Font smallFont = getNormalFont(8); // Adjust the font size here

	    for (TransactionDto transaction : transactions) {
	        table.addCell(new PdfPCell(new Phrase(transaction.getTransactionId().toString(), smallFont)));
	        table.addCell(new PdfPCell(new Phrase(transaction.getTransactionStatus(), smallFont)));
	        table.addCell(new PdfPCell(new Phrase(transaction.getTransactionType(), smallFont)));
	        table.addCell(new PdfPCell(new Phrase(transaction.getTransactionDate().toString(), smallFont)));
	        table.addCell(new PdfPCell(new Phrase(transaction.getTransactionTime().toString(), smallFont)));
	        table.addCell(new PdfPCell(new Phrase(transaction.getFromAccountNumber(), smallFont)));
	        table.addCell(new PdfPCell(new Phrase(transaction.getToAccountNumber(), smallFont)));
	        table.addCell(new PdfPCell(new Phrase(String.valueOf(transaction.getAmount()), smallFont)));
	        table.addCell(new PdfPCell(new Phrase(transaction.getTransactionMode(), smallFont)));
	    }
	}
   private static Font getNormalFont(float size) throws DocumentException, IOException {
	    BaseFont baseFont = BaseFont.createFont(BaseFont.HELVETICA, BaseFont.CP1252, BaseFont.NOT_EMBEDDED);
	    return new Font(baseFont, size);
	}




}
