import { Container } from '@mantine/core';

import { useAppSelector } from '@state/store';
import { selectNetworkView } from '@slices/sessionSlice';

import { Shell } from '@shared/components/shell/Shell';
import { NetworkFilter } from './NetworkFilter';
import { MentorGrid } from './MentorGrid';
import { NetworkSearch } from './NetworkSearch';
import { NetworkToggle } from './NetworkToggle';

import { NetworkView } from '@datatypes/network';

import { headerHeight } from '@shared/constants/appConstants';

import styles from './network.module.css';

const Index = () => {
  const view = useAppSelector(selectNetworkView);

  return (
    <Shell navbar={<NetworkFilter />}>
      <Container>
        <div style={{ position: 'sticky', top: headerHeight }} className={styles.header}>
          <NetworkSearch />
          <NetworkToggle view={view} />
        </div>
        <div style={{ paddingTop: headerHeight }}>
          {view === NetworkView.MENTOR ? <>Coming Soon...</> : <MentorGrid />}
        </div>
      </Container>
    </Shell>
  );
};

export default Index;
