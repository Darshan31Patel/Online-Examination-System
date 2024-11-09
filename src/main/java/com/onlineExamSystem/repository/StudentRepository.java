package com.onlineExamSystem.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onlineExamSystem.entity.Admin;
import com.onlineExamSystem.entity.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {
	Optional<Student> findByEmail(String email);
	List<Student> findByAdminNameAdminId(Long adminId);
}
