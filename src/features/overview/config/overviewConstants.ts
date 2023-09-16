import {
  IconAtom,
  IconBuildingBank,
  IconCalendarTime,
  IconReportSearch,
  IconTrendingUp,
  IconUsers,
} from '@tabler/icons-react';

export const overviewLinks = [
  { label: 'Role Summary', Icon: IconReportSearch, anchor: 'role' },
  { label: 'Career Overlaps', Icon: IconBuildingBank, anchor: 'overlaps' },
  { label: 'Top Employers', Icon: IconUsers, anchor: 'employers' },
  { label: 'Career Progression', Icon: IconTrendingUp, anchor: 'progression' },
  { label: 'Typical Skills', Icon: IconAtom, anchor: 'skill' },
  { label: 'Application Timeline', Icon: IconCalendarTime, anchor: 'timeline' },
];
