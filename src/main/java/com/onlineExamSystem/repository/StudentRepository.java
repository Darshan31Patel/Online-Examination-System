package com.onlineExamSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onlineExamSystem.entity.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {

}
