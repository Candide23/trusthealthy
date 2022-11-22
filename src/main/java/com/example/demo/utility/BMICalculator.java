package com.example.demo.utility;

import com.example.demo.model.ClinicalData;

import java.util.List;

public class BMICalculator {

    public static void calculateBMI(List<ClinicalData> clinicalData, ClinicalData eachEntry) {


        if(eachEntry.getName().equals("hw")) {
            String[] heightAndWeight =  eachEntry.getValue().split("/");
            if(heightAndWeight != null && heightAndWeight.length >1){
                float heightInMeters = Float.parseFloat(heightAndWeight[0]) * 0.4536F;
                float bmi = Float.parseFloat(heightAndWeight[1])/(heightInMeters*heightInMeters);
                ClinicalData bmiData = new ClinicalData();
                bmiData.setName("bmi");
                bmiData.setValue(Float.toString(bmi));
                clinicalData.add(bmiData);
            }

        }

    }

    }

