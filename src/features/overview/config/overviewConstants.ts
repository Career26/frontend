import {
  IconBarbell,
  IconBuildingBank,
  IconCalendarTime,
  IconReportSearch,
  IconTrendingUp,
  IconUsers,
} from '@tabler/icons-react';

export const overviewLinks = [
  { label: 'Role Summary', Icon: IconReportSearch, anchor: 'role' },
  { label: 'Sample Employers', Icon: IconUsers, anchor: 'employers' },
  { label: 'Career Progression', Icon: IconTrendingUp, anchor: 'progression' },
  { label: 'Preparation', Icon: IconBarbell, anchor: 'preparation' },
  { label: 'Application Timeline', Icon: IconCalendarTime, anchor: 'timeline' },
  { label: 'Similar Roles', Icon: IconBuildingBank, anchor: 'overlaps' },
];
