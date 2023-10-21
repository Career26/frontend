import { TablerIconsProps } from '@tabler/icons-react';
import React, { ReactNode } from 'react';

import styles from './overviewStyles.module.scss';

export const OverviewSection = ({
  label,
  anchor,
  Icon,
  children,
}: {
  label: string;
  anchor: string;
  Icon: (props: TablerIconsProps) => JSX.Element;
  children: ReactNode;
}) => (
  <div className={styles.section} id={anchor}>
    <div className={styles.header}>
      <Icon size={50} />
      <h2>{label}</h2>
    </div>
    <div className={styles.body}>{children}</div>
  </div>
);
