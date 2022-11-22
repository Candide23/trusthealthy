package com.example.demo.Controllers;

import com.example.demo.Repository.PatientRepository;
import com.example.demo.model.ClinicalData;
import com.example.demo.model.Patient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class PatientController {

    @Autowired
    private PatientRepository patientRepository;

    Map<String, String> filters = new HashMap<>();

    //
    @RequestMapping(value="/patients", method= RequestMethod.GET)
    public List<Patient> getPatient() {
        return patientRepository.findAll();
    }



    //So this is a place holder whatever id what ever id client passes in
    // the URL that will come in to this ID will then bind that id to this integer
    // value here and we do that at path variable annotation
    @RequestMapping(value = "/patients/{id}", method = RequestMethod.GET)
    public Patient getPatient(@PathVariable("id") int id) {
        return patientRepository.findById(id).get();
    }

    @RequestMapping(value = "/patients", method = RequestMethod.POST)
    //Spring will bind this or the incoming Json
    public Patient savePatient(@RequestBody Patient patient) {
        return patientRepository.save(patient);
    }

    @RequestMapping(value = "/patients/analyze/{id}", method = RequestMethod.GET)
    public Patient analyze(@PathVariable("id") int id) {
        // We get the patient ID take it fetch the information from the patient
        // information get the clinical data, we hava created a duplicate list while
        // looping throught that we are going to manipulate the "clinicalData"

     Patient patient =  patientRepository.findById(id).get();
     List<ClinicalData> clinicalData  = patient.getClinicalData();
      List<ClinicalData> duplicateClinicalData  = new ArrayList<>(clinicalData);
        // So while looping through the each clinical entry we are getting
        // the height and weight only if it is height and weight we are
        // it's always a good pratice to add some null checks here
        // So just before we convert the height into meter here if Height and weight != null...
        // adding the special logic of calculating the BMI we first converted the height
        // From feet to meters and then we have taken the weight divided by height square
        // then we have created a new clinical data record and we are adding
        // it to the clinical data that will go back in that response.
      for(ClinicalData eachEntry:duplicateClinicalData) {

          // So we are checking if for example each component name if it is BP
          // We are checking if the filters already has already BP initially the
          // filters will be empty: if it does contain so if the filter contains
          // BP that means BP has already been processed.

          if(filters.containsKey(eachEntry.getName())) {
              clinicalData.remove(eachEntry);
              continue;
          } else {
              filters.put(eachEntry.getName(), null);
          }

          if(eachEntry.getName().equals("hw")) {
              String[] heightAndWeight =  eachEntry.getValue().split("/");
              if(heightAndWeight != null && heightAndWeight.length >1){
              float heightInMeters = Float.parseFloat(heightAndWeight[0]) * 0.4536F;
              float bmi = Float.parseFloat(heightAndWeight[1])/(heightInMeters*heightInMeters);
               ClinicalData bmiData = new ClinicalData();
               bmiData.setName("bmi");
               bmiData.setValue(Float.toString(bmi));
               clinicalData.add(bmiData);
                  patient.getClinicalData().add(bmiData);
              }

          }

      }

      // Just before we return the patient we will filters.clear otherwise from the
        // second time we will get an empty clinical data back because the filters will have
        // commponents added
      filters.clear();

     return patient;

    }
}
