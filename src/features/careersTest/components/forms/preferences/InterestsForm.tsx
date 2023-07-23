import { PreferencesFormValues } from '@careersTest/types/careersFormTypes';
import { FormikContextType } from 'formik';
import React from 'react';
import { InterestsSelector } from './InterestsSelector';
import Divider from '@mui/material/Divider';

type PreferencesFormProps = {
  formik: FormikContextType<PreferencesFormValues>;
};

export const InterestsForm = ({ formik }: PreferencesFormProps) => (
  <>
    <div className="header">Areas of Interest</div>
    <Divider />
    <div className="row">
      <div className="subHeader">Add up to three interests</div>
    </div>
    <div className="row">
      <div className="column">
        <InterestsSelector formik={formik} />
      </div>
    </div>
  </>
);
