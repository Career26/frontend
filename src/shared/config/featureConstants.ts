import {
  IconCertificate,
  IconChecklist,
  IconReportSearch,
  IconUsersGroup,
  IconWorldSearch,
  TablerIconsProps,
} from '@tabler/icons-react';

import { urls } from './urlConstants';

export type FeatureTile = {
  title: string;
  description: string;
  Icon: (props: TablerIconsProps) => JSX.Element;
  link: string;
  disabled?: boolean;
};

export const featureTiles: FeatureTile[] = [
  {
    title: 'Career Paths',
    description: 'View your career path results and re-take the test',
    Icon: IconReportSearch,
    link: urls.careersTest,
  },
  {
    title: 'Industry Insights',
    description: 'Explore industry insights and discover the potential of your careers',
    Icon: IconWorldSearch,
    link: urls.overview,
  },
  {
    title: 'Interview Questions',
    description:
      'Practice interview questions and get instant feedback with our interactive assessor',
    Icon: IconCertificate,
    link: urls.questions,
  },
  {
    title: 'Mentor Network',
    description: 'Connect with professionals in your industry',
    Icon: IconUsersGroup,
    link: urls.mentors,
    disabled: true,
  },

  {
    title: 'CV Builder',
    description: 'Create and refine your CV for your new industry',
    Icon: IconChecklist,
    link: urls.mentors,
    disabled: true,
  },
];
