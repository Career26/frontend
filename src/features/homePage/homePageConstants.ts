import { urls } from '@shared/config/urlConstants';
import {
  IconCertificate,
  IconUsersGroup,
  IconWorldSearch,
  TablerIconsProps,
} from '@tabler/icons-react';

export type FeatureTile = {
  title: string;
  description: string;
  Icon: (props: TablerIconsProps) => JSX.Element;
  link: string;
  disabled?: boolean;
};

export const featureTiles: FeatureTile[] = [
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
    link: urls.interviews,
  },
  {
    title: 'Mentor Network',
    description: 'Connect with professionals in your industry',
    Icon: IconUsersGroup,
    link: urls.mentors,
    disabled: true,
  },
];
