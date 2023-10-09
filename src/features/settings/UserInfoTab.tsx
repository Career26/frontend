import { selectProfile } from '@apis/profileApi';
import { Profile } from '@datatypes/profile';
import { Paper, Tabs, TextInput, createStyles, rem } from '@mantine/core';
import { useAppSelector } from '@state/store';
import React from 'react';

const userTabStyles = createStyles({
  paper: {
    gap: rem(20),
    display: 'flex',
    flexDirection: 'column',
  },
});

const UniversitiesTab = ({ profile }: { profile: Profile }) => {
  const { classes } = userTabStyles();
  const universities = [profile.latestDegree, ...profile.additionalDegrees];
  return (
    <div className={classes.paper}>
      {universities.map((university) => (
        <Paper
          key={`experience-${university.university}`}
          shadow="md"
          radius="md"
          p="md"
          withBorder
        >
          <TextInput label="University Name" value={university.university} disabled />
          <TextInput label="Course Name" value={university.name} disabled />
          <TextInput label="Grade" value={university.grade} disabled />
          <TextInput label="Level" value={university.level} disabled />
        </Paper>
      ))}
    </div>
  );
};

const ExperiencesTab = ({ profile }: { profile: Profile }) => {
  const { classes } = userTabStyles();
  return (
    <div className={classes.paper}>
      {profile.previousWorkExperience.map((experience) => (
        <Paper
          key={`experience-${experience.companyName}`}
          shadow="md"
          radius="md"
          p="md"
          withBorder
        >
          <TextInput label="Company Name" value={experience.companyName} disabled />
          <TextInput label="Role" value={experience.role} disabled />
        </Paper>
      ))}
    </div>
  );
};

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