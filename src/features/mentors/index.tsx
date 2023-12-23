import { Container } from '@mantine/core';

import { Shell } from '@shared/components/shell/Shell';
import { MentorFilter } from './MentorFilter';
import { MentorGrid } from './MentorGrid';
import { MentorSearch } from './MentorSearch';

const Index = () => (
  <Shell navbar={<MentorFilter />}>
    <Container>
      <MentorSearch />
      <MentorGrid />
    </Container>
  </Shell>
);

export default Index;
