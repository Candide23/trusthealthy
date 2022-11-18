package com.example.demo.Repository;

import com.example.demo.model.ClinicalData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClinicalDataRepository extends JpaRepository <ClinicalData, Integer> {
}
