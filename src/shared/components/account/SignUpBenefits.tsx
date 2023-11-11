import React from 'react';
import { Container, List, Text } from '@mantine/core';
import {
  IconChecklist,
  IconWorldSearch,
  IconCertificate,
  IconUsersGroup,
} from '@tabler/icons-react';
import { TextWithIconBlock } from '@features/interview/TextWithIconBlock';
import '@aws-amplify/ui-react/styles.css';

const benefits = [
  {
    title: 'Industry Insights and Guidance',
    content: 'View industry-specific guidance based on your Career26 Test result',
    Icon: IconWorldSearch,
  },
  {
    title: 'CV and CL Building Tools',
    content: 'Build your CV and CL in 5 minutes with tailored and refined content',
    Icon: IconChecklist,
  },
  {
    title: 'Interactive Interview Preparations',
    content: 'Access our interview question bank, and get real-time feedback',
    Icon: IconCertificate,
  },
  {
    title: 'Global Mentor Network',
    content: 'Match with mentors who have similar backgrounds and career goals',
    Icon: IconUsersGroup,
  },
];

export const SignUpBenefits = () => (
  <Container>
    <Text fw="bold" size="2.5rem" py="sm">
      Save your results
    </Text>
    <Text fw="bold" size="2.5rem" c="navy">
      Get access to
    </Text>
    <List size="md" center py="lg">
      {benefits.map(({ title, content, Icon }) => (
        <TextWithIconBlock
          key={`benefit-${title}`}
          title={title}
          content={content}
          Icon={<Icon />}
        />
      ))}
    </List>
  </Container>
);
