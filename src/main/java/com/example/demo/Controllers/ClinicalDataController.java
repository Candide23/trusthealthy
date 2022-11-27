package com.example.demo.Controllers;

import com.example.demo.Repository.ClinicalDataRepository;
import com.example.demo.Repository.PatientRepository;
import com.example.demo.model.ClinicalData;
import com.example.demo.model.Patient;
import com.example.demo.model.dto.ClinicalDataRequest;
import com.example.demo.utility.BMICalculator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class ClinicalDataController {

    @Autowired
   private  ClinicalDataRepository clinicalDataRepository;

    @Autowired
    private PatientRepository patientRepository;



//
    @RequestMapping(value="/clinicals", method = RequestMethod.POST)
    public ClinicalData saveClinicalData(@RequestBody ClinicalDataRequest request) {

        //So in the incoming request, we have the patient I.D, the name and value
        // We are fetching the patient using that information to create a clinical
        // data record for him and we are returning that record back
        Patient patient =  patientRepository.findById(request.getPatientId()).get();
        ClinicalData clinicalData = new ClinicalData();
        clinicalData.setName(request.getName());
        clinicalData.setValue(request.getValue());
        clinicalData.setMeasuredDateTime(request.getMeasuredDateTime());
        clinicalData.setPatient(patient);
        return clinicalDataRepository.save(clinicalData);
    }

    @RequestMapping(value="/clinicals/{patientId}/{name}", method = RequestMethod.GET)
    public List<ClinicalData> getClinicalData(@PathVariable("patientId") int patientId, @PathVariable("name") String name) {


        if(name.equals("bmi")) {
            name = "hw";
        }

        List<ClinicalData> clinicalData  = clinicalDataRepository.findByPatientIdAndNameOrderByMeasuredDateTime(patientId,name);
        List<ClinicalData> duplicateClinicalData  = new ArrayList<>(clinicalData);

        for(ClinicalData eachEntry:duplicateClinicalData) {
            BMICalculator.calculateBMI(clinicalData, eachEntry);
        }

        return clinicalData;


    }
}
