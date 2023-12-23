import { Card, Grid, Text } from '@mantine/core';

import type { RoleSummary } from '@datatypes/overview';

import commonStyles from '@shared/styles/commonStyles.module.css';

export const RoleSummaryTile = ({
  responsibilities,
  dayToDay,
  skills,
  personalityType,
}: RoleSummary) => (
  <Grid py="sm" grow id="role">
    {[
      { content: responsibilities, title: 'Responsibilities' },
      { content: dayToDay, title: 'Day to Day' },
      { content: skills, title: 'Skills' },
      { content: personalityType, title: 'Personality Type' },
    ].map(({ title, content }) => (
      <Grid.Col span={{ md: 6 }} key={`role-${title}`}>
        <Card padding="lg" radius="md" withBorder h="100%">
          <Card.Section withBorder inheritPadding py="xs" className={commonStyles.lightNavyBg}>
            <Text fw="bold">{title}</Text>
          </Card.Section>
          <Text py="md">{content}</Text>
        </Card>
      </Grid.Col>
    ))}
  </Grid>
);
