import { selectProfile } from '@apis/profileApi';
import { experienceOptions } from '@careerTest/config/formConstants';
import { Profile } from '@datatypes/profile';
import { Select, Tabs, TextInput, Textarea } from '@mantine/core';
import { useAppSelector } from '@state/store';
import React from 'react';
import commonStyles from '@shared/styles/commonStyles.module.scss';

const UniversitiesTab = ({ profile }: { profile: Profile }) => {
  const universities = [profile.latestDegree, ...profile.additionalDegrees];
  return (
    <div>
      {universities.map((university) => (
        <div key={`experience-${university.university}`}>
          <div className={commonStyles.row}>
            <TextInput w="50%" label="University Name" value={university.university} disabled />
            <TextInput w="50%" label="Course Name" value={university.name} disabled />
          </div>
          <div className={commonStyles.row}>
            <TextInput w="50%" label="Achieve/Expected Grade" value={university.grade} disabled />
            <TextInput w="50%" label="Level" value={university.level} disabled />
          </div>
          <TextInput label="Course Summary" value={university.ratingReason} disabled />
        </div>
      ))}
    </div>
  );
};

const ExperiencesTab = ({ profile }: { profile: Profile }) => (
  <div>
    {profile.previousWorkExperience.map((experience) => (
      <div key={`experience-${experience.experienceName}`}>
        <TextInput label="Company Name" value={experience.experienceName} disabled />
        <Select
          label="Experience Type"
          value={experience.experienceType}
          data={experienceOptions}
          disabled
        />
        <TextInput label="Role" value={experience.role} disabled />
        <Textarea label="Experience summaey" value={experience.ratingReason} disabled />
      </div>
    ))}
  </div>
);

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
