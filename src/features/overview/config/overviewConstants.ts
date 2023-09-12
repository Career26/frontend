import {
  IconAtom,
  IconBuildingBank,
  IconCalendarTime,
  IconReportSearch,
  IconTrendingUp,
  IconUsers,
} from '@tabler/icons-react';

export const overviewLinks = [
  { label: 'Role Overview', Icon: IconReportSearch, anchor: 'role' },
  { label: 'Industry Overlaps', Icon: IconBuildingBank, anchor: 'overlaps' },
  { label: 'Top Employers', Icon: IconUsers, anchor: 'employers' },
  { label: 'Career Progression', Icon: IconTrendingUp, anchor: 'progression' },
  { label: 'Typical Skills', Icon: IconAtom, anchor: 'skill' },
  { label: 'Application Timeline', Icon: IconCalendarTime, anchor: 'timeline' },
];
