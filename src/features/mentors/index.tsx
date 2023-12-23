import { Container } from '@mantine/core';

import { Shell } from '@shared/components/shell/Shell';
import { MentorFilter } from './MentorFilter';
import { MentorGrid } from './MentorGrid';

const Index = () => (
  <Shell navbar={<MentorFilter />}>
    <Container>
      <MentorGrid />
    </Container>
  </Shell>
);

export default Index;
