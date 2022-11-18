package com.example.demo.Controllers;

import com.example.demo.Repository.PatientRepository;
import com.example.demo.model.Patient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PatientController {

    @Autowired
    private PatientRepository patientRepository;

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
}
