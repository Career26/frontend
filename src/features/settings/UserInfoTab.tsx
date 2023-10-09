import { selectProfile } from '@apis/profileApi';
import { Profile } from '@datatypes/profile';
import { Tabs, TextInput } from '@mantine/core';
import { useAppSelector } from '@state/store';
import React from 'react';

const UniversitiesTab = ({ profile }: { profile: Profile }) => {
  const universities = [profile.latestDegree, ...profile.additionalDegrees];
  return universities.map((university) => (
    <div key={`university-${university.university}`}>
      <TextInput label="University Name" value={university.university} disabled />
      <TextInput label="Course Name" value={university.name} disabled />
      <TextInput label="Grade" value={university.grade} disabled />
      <TextInput label="Level" value={university.level} disabled />
    </div>
  ));
};

const ExperiencesTab = ({ profile }: { profile: Profile }) =>
  profile.previousWorkExperience.map((experience) => (
    <div key={`experience-${experience.companyName}`}>
      <TextInput label="Company Name" value={experience.companyName} disabled />
      <TextInput label="Role" value={experience.role} disabled />
    </div>
  ));

const tabs = [
  { label: 'Universities', Component: UniversitiesTab },
  { label: 'Experiences', Component: ExperiencesTab },
];

export const UserInfoTab = () => {
  const profile = useAppSelector(selectProfile);
  if (!profile) {
    return null;
  }
  return (
    <Tabs defaultValue={tabs[0].label}>
      <Tabs.List>
        {tabs.map(({ label }) => (
          <Tabs.Tab key={`tab-${label}`} value={label}>
            {label}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      {tabs.map(({ label, Component }) => (
        <Tabs.Panel key={`panel=${label}`} value={label} pt="md">
          <Component profile={profile} />
        </Tabs.Panel>
      ))}
    </Tabs>
  );
};
