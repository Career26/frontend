import { Badge, Card, Grid, Group, Image, Text } from '@mantine/core';
import { useEffect } from 'react';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '@state/store';
import { addIndustryColors, selectIndustryColors } from '@slices/sessionSlice';

import { mentorList } from '@mocks/mentorMocks';

import { getSrc } from './networkUtil';

import commonStyles from '@shared/styles/commonStyles.module.css';
import styles from './network.module.css';

export const MentorGrid = () => {
  const dispatch = useAppDispatch();
  const industryColors = useAppSelector(selectIndustryColors);

  useEffect(() => {
    const industries = mentorList.map((item) => item.industry);
    dispatch(addIndustryColors(industries));
  }, [mentorList]);

  return (
    <Grid py="sm" grow id="mentors-grid">
      {mentorList.map(({ id, gender, name, industry, reason, experience, img }) => (
        <Grid.Col span={{ md: 6 }} key={id}>
          <Card padding="sm" radius="md" withBorder h="100%">
            <Card.Section
              withBorder
              inheritPadding
              py="xs"
              className={classNames(commonStyles.lightNavyBg, styles.mentorHeader)}
            >
              <Text fw="bold">{name}</Text>
              <Badge>{experience.experienceName}</Badge>
            </Card.Section>
            <div className={styles.mentorCard}>
              <Group className={styles.left}>
                <Image src={getSrc(img, gender)} />
                <Badge color={industryColors[industry]}>{industry}</Badge>
              </Group>
              <Group className={styles.right}>
                <Badge size="lg" className={commonStyles.lightNavyBg}>
                  {experience.role}
                </Badge>
                <Text size="sm">{reason}</Text>
              </Group>
            </div>
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  );
};
