import { Container } from '@mantine/core';

import { useAppSelector } from '@state/store';
import { selectNetworkView } from '@slices/sessionSlice';

import { Shell } from '@shared/components/shell/Shell';
import { NetworkSearch } from './NetworkSearch';
import { NetworkToggle } from './NetworkToggle';
import { NetworkFilter } from './NetworkFilter';
import { NetworkGrid } from './NetworkGrid';

import styles from '../network.module.css';

interface NetworkContainerProps {
  children?: React.ReactNode;
}

export const NetworkContainer = ({ children }: NetworkContainerProps) => {
  const view = useAppSelector(selectNetworkView);
  return (
    <Shell navbar={children ? undefined : <NetworkFilter />}>
      <Container>
        <div style={{ position: 'sticky', top: 0 }} className={styles.header}>
          <NetworkToggle view={view} />
          <NetworkSearch />
        </div>
        {children || <NetworkGrid />}
      </Container>
    </Shell>
  );
};
