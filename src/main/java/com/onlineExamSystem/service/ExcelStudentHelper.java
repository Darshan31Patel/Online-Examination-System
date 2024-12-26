package com.onlineExamSystem.service;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.multipart.MultipartFile;

import com.onlineExamSystem.entity.Student;

public class ExcelStudentHelper {
	
	public static boolean checkExcelFormat(MultipartFile file) {
        String contentType = file.getContentType();
        return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet".equals(contentType);
    }
	
	public static List<Student> convertExcelToList(InputStream is) {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(16);
		
        List<Student> list = new ArrayList<>();
        try (XSSFWorkbook workbook = new XSSFWorkbook(is)) {
            XSSFSheet sheet = workbook.getSheetAt(0);
            Iterator<Row> iterator = sheet.iterator();
            int rowNumber = 0;

            while (iterator.hasNext()) {
                Row row = iterator.next();
                if (rowNumber == 0) { 
                    rowNumber++;
                    continue;
                }

                Iterator<Cell> cells = row.iterator();
                Student student = new Student();
                int cid = 0;

                while (cells.hasNext()) {
                    Cell cell = cells.next();
                    switch (cid) {
                        case 0 -> student.setName(cell.getStringCellValue());
                        case 1 -> student.setEmail(cell.getStringCellValue());
                        case 2 -> student.setRollNo(cell.getStringCellValue());
                        case 3 -> student.setPassword(encoder.encode(cell.getStringCellValue()));
                        default -> throw new IllegalStateException("Unexpected cell index: " + cid);
                    }
                    cid++;
                }
                list.add(student);
            }
        } catch (Exception e) {
            System.err.println("Error reading Excel file: " + e.getMessage());
            e.printStackTrace();
        }
        return list;
    }
}
