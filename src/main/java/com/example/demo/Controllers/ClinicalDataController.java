package com.example.demo.Controllers;

import com.example.demo.Repository.ClinicalDataRepository;
import com.example.demo.Repository.PatientRepository;
import com.example.demo.model.ClinicalData;
import com.example.demo.model.Patient;
import com.example.demo.model.dto.ClinicalDataRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ClinicalDataController {

    @Autowired
   private  ClinicalDataRepository clinicalDataRepository;

    @Autowired
    private PatientRepository patientRepository;




    @RequestMapping(value="/clinicals", method = RequestMethod.POST)
    public ClinicalData saveClinicalData(@RequestBody ClinicalDataRequest request) {

        Patient patient =  patientRepository.findById(request.getPatientId()).get();
        ClinicalData clinicalData = new ClinicalData();
        clinicalData.setName(request.getName());
        clinicalData.setValue(request.getValue());
        clinicalData.setPatient(patient);
        return clinicalDataRepository.save(clinicalData);
    }
}
