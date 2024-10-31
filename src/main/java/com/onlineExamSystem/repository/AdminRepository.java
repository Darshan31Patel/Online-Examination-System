package com.onlineExamSystem.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onlineExamSystem.entity.Admin;
import java.util.List;


public interface AdminRepository extends JpaRepository<Admin, Long>{
	Optional<Admin> findByEmail(String email);
}
