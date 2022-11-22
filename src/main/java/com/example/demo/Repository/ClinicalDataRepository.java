package com.example.demo.Repository;

import com.example.demo.model.ClinicalData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClinicalDataRepository extends JpaRepository <ClinicalData, Integer> {


    @Query(value = "SELECT id, name,patient_id, value,measured_date_time FROM clinicaldata WHERE patient_id=? AND name=? ORDER BY measured_date_time ASC " , nativeQuery=true)
    List<ClinicalData> findByPatientIdAndNameOrderByMeasuredDateTime(int patientId, String name);

    /*SELECT id, name,value, measured_date_time
    FROM clinicaldata
    WHERE patient_id=1 AND name= "bp";*/

}
