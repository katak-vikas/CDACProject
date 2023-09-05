package com.app.JustTest;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

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

public class PDFEmailTest {

    private static final String FILE = "MyStatement1.pdf";

    private static void designStatement() throws DocumentException, IOException {
        List<TransactionDto> transactions;
        transactions = populateList();
        CustomerDto customer = new CustomerDto();
        customer.setFirstName("John");
        customer.setLastName("Doe");
        customer.setEmail("john.doe@example.com");
        customer.setUsername("johndoe");
       // customer.setPhoneNumber("1234567890");
        //customer.setDateOfBirth(LocalDate.of(1990, 5, 15));
//        customer.setAadharCardNumber("1234-5678-9012");
//        customer.setNationality("Indian");

        Rectangle statementSize = new Rectangle(PageSize.A4);

        Document document = new Document(statementSize);

        FileOutputStream outputStream = new FileOutputStream(FILE);
        PdfWriter.getInstance(document, outputStream);

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

        PdfPCell customerPhone = new PdfPCell(new Phrase("Phone: "  //customer.getPhoneNumber(), getBoldFont(14)
        ));
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
        PdfPTable transactionTable = new PdfPTable(4);
        transactionTable.setWidthPercentage(100);
        addTableHeader(transactionTable);
        addTransactionDetails(transactionTable, transactions);

        // Add content to document
        document.add(dateTimeCell);
        document.add(transactionTable);

        System.out.println("PDF created successfully!");
        String absoluteFilePath = new File(FILE).getAbsolutePath();
        System.out.println("PDF will be saved at: " + absoluteFilePath);
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
    private static void addTableHeader(PdfPTable table) throws DocumentException, IOException {
        table.addCell(new PdfPCell(new Phrase("Transaction ID", getBoldFont(14))));
        table.addCell(new PdfPCell(new Phrase("Amount", getBoldFont(14))));
        table.addCell(new PdfPCell(new Phrase("Status", getBoldFont(14))));
        table.addCell(new PdfPCell(new Phrase("Mode", getBoldFont(14))));
    }

    // Helper method to add transaction details
    private static void addTransactionDetails(PdfPTable table, List<TransactionDto> transactions) throws DocumentException, IOException {
        for (TransactionDto transaction : transactions) {
            table.addCell(new PdfPCell(new Phrase(transaction.getTransactionId().toString(), getNormalFont())));
            table.addCell(new PdfPCell(new Phrase(String.valueOf(transaction.getAmount()), getNormalFont())));
            table.addCell(new PdfPCell(new Phrase(transaction.getTransactionStatus(), getNormalFont())));
            table.addCell(new PdfPCell(new Phrase(transaction.getTransactionMode(), getNormalFont())));
        }
    }

    public static List<TransactionDto> populateList() {
        // ... (your populateList method implementation)
    	List<TransactionDto> transactions = new ArrayList<>();

        // Create and add 10 instances to the list
        for (int i = 1; i <= 90; i++) {
            TransactionDto transaction = new TransactionDto();
            transaction.setTransactionId((long) i);
            transaction.setTransactionStatus("COMPLETED");
            transaction.setTransactionType("CREDIT");
            transaction.setFromAccountNumber("1234567890");
            transaction.setToAccountNumber("9876543210");
            transaction.setAmount(100.50 + i * 10);
            transaction.setTransactionMode("DEBIT_CARD");
            transactions.add(transaction);
        }

        return transactions;
    }

    public static void main(String[] args) throws IOException {
        try {
            designStatement();
        } catch (FileNotFoundException | DocumentException e) {
            e.printStackTrace();
        }
    }
}
