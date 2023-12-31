import { List, Text } from '@mantine/core';
import {
  IconChecklist,
  IconWorldSearch,
  IconCertificate,
  IconUsersGroup,
} from '@tabler/icons-react';

import { TextWithIconBlock } from '@shared/components/display/TextWithIconBlock';

import '@aws-amplify/ui-react/styles.css';
import styles from './account.module.css';

const benefits = [
  {
    title: 'Industry Insights',
    content: 'View industry-specific guidance based on your Career26 Test result',
    Icon: IconWorldSearch,
  },
  {
    title: 'Interactive Interviews',
    content: 'Access our interview question bank and get real-time feedback',
    Icon: IconCertificate,
  },
  {
    title: 'CV Building Tools',
    content: 'Build your CV in 5 minutes with tailored and refined content',
    Icon: IconChecklist,
  },
  {
    title: 'Global Mentor Network',
    content: 'Match with mentors who have similar backgrounds and career goals',
    Icon: IconUsersGroup,
  },
];

export const SignUpBenefits = () => (
  <List size="md" center>
    {benefits.map(({ title, content, Icon }) => (
      <TextWithIconBlock
        key={`benefit-${title}`}
        title={title}
        content={<Text className={styles.listContent}>{content}</Text>}
        Icon={<Icon />}
      />
    ))}
  </List>
);
