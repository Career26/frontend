import { selectFirstName, selectLastName } from '@slices/userSlice';
import React from 'react';
import { useSelector } from 'react-redux';

export const UserPage = () => {
  const firstName = useSelector(selectFirstName);
  const lastName = useSelector(selectLastName);
  return (
    <div>
      Hello {firstName} {lastName}
    </div>
  );
};
