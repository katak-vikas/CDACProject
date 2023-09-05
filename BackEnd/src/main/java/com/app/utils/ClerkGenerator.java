package com.app.utils;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.app.entities.Clerk;

public class ClerkGenerator {
    private static final String[] FIRST_NAMES = {"Rahul", "Amit", "Sonia", "Neha", "Ankur", "Deepak", "Raj", "Sunita", "Kavita", "Manish"};
    private static final String[] LAST_NAMES = {"Kumar", "Verma", "Singh", "Sharma", "Agarwal", "Gupta", "Patel", "Choudhary", "Jain", "Saxena"};

    public static List<Clerk> generateClerks() {
        List<Clerk> clerks = new ArrayList<>();

        clerks.add(new Clerk("Rahul", "Kumar", "rahul.kumar@example.com", "password", 50000, LocalDate.of(2021, 5, 15)));
        clerks.add(new Clerk("Amit", "Verma", "amit.verma@example.com", "password", 45000, LocalDate.of(2022, 2, 10)));
        clerks.add(new Clerk("Sonia", "Singh", "sonia.singh@example.com", "password", 48000, LocalDate.of(2020, 8, 25)));
        clerks.add(new Clerk("Neha", "Sharma", "neha.sharma@example.com", "password", 52000, LocalDate.of(2023, 1, 5)));
        clerks.add(new Clerk("Ankur", "Agarwal", "ankur.agarwal@example.com", "password", 55000, LocalDate.of(2021, 9, 12)));
        clerks.add(new Clerk("Deepak", "Gupta", "deepak.gupta@example.com", "password", 46000, LocalDate.of(2022, 11, 30)));
        clerks.add(new Clerk("Raj", "Patel", "raj.patel@example.com", "password", 49000, LocalDate.of(2023, 6, 18)));
        clerks.add(new Clerk("Sunita", "Choudhary", "sunita.choudhary@example.com", "password", 47000, LocalDate.of(2020, 4, 7)));
        clerks.add(new Clerk("Kavita", "Jain", "kavita.jain@example.com", "password", 51000, LocalDate.of(2022, 7, 22)));
        clerks.add(new Clerk("Manish", "Saxena", "manish.saxena@example.com", "password", 53000, LocalDate.of(2021, 3, 3)));

        return clerks;
    }
}
