import { FormikContextType } from 'formik';
import React from 'react';
import { CareersTestFormValues } from '../../careersTestTypes';
import { Divider, TextField } from '@mui/material';
import { FormText } from '@shared/forms/FormText';

type EdicationFormProps = {
  formik: FormikContextType<CareersTestFormValues>;
};

export const EducationForm = ({ formik }: EdicationFormProps) => {
  console.log(formik.values, formik.errors);
  return (
    <>
      <FormText<CareersTestFormValues> label="First Name" field="firstName" formik={formik} />
      <FormText<CareersTestFormValues> label="Last Name" field="lastName" formik={formik} />
      <Divider />
      University Details
      {/* <FormText<CareersTestFormValues> label="University Na" field="lastName" formik={formik} /> */}
    </>
  );
};

/*
What is your latest degree (or the one you are pursuing), in what subject?
Which university did you attend / are you currently at? 
This information is not used in chatGPT, but to hard-code on top of GPT response to sweet-talk to users. i.e., You have an excellent academic background with your [%s] background. 
Do you have any other degrees you have previous achieved (undergraduate / master / PhD / PostDoc)

*/

/*
import React, { useState } from 'react';
import Step1Form from './Step1Form';
import Step2Form from './Step2Form';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleStepSubmit = (data) => {
    setFormData((prevFormData) => ({ ...prevFormData, ...data }));
    setStep((prevStep) => prevStep + 1);
  };

  const handleSubmit = () => {
    // Do something with the complete form data
    console.log('Complete form data:', formData);
  };

  return (
    <div>
      {step === 1 && <Step1Form onSubmit={handleStepSubmit} initialValues={{ firstName: formData.firstName, lastName: formData.lastName }} />}
      {step === 2 && <Step2Form onSubmit={handleSubmit} initialValues={{ email: formData.email, password: formData.password }} />}
    </div>
  );
};

export default MultiStepForm;

*/
