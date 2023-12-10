import { Card, Container, Grid, Group, Text, Tooltip } from '@mantine/core';
import { featureTiles } from '@shared/config/featureConstants';
import classNames from 'classnames';
import React from 'react';
import commonStyles from '@shared/styles/commonStyles.module.scss';
import { urls } from '@shared/config/urlConstants';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@state/store';
import { selectCareerPaths, selectProfile } from '@apis/profileApi';
import { useAuthUser } from '@shared/hooks/useAuthUser';
import { setCareerTestModal, setDiversityModal, setLoginModal } from '@slices/sessionSlice';

import styles from './homePageStyles.module.scss';

export const HomeTiles = () => {
  const dispatch = useAppDispatch();
  const { authenticated } = useAuthUser();
  const history = useHistory();
  const profile = useAppSelector(selectProfile);
  const careerPaths = useAppSelector(selectCareerPaths);

  const handleClick = (link: string) => {
    if (link === urls.careersTest) {
      dispatch(setCareerTestModal({ open: true, noProfile: false }));
      history.push(link);
      return;
    }
    if (!authenticated) {
      dispatch(setLoginModal({ open: true, initialState: 'signUp' }));
      return;
    }
    if ([urls.mentors, urls.jobs].includes(link) && !profile?.diversity) {
      dispatch(setDiversityModal({ open: true }));
      return;
    }
    if ([urls.overview, urls.questions].includes(link) && !careerPaths) {
      dispatch(setCareerTestModal({ open: true, noProfile: true }));
      return;
    }
    history.push(link);
  };

  return (
    <Container>
      <Grid py="sm" id="mentors-grid">
        {featureTiles.map(({ title, Icon, link, description, disabled }) => (
          <Tooltip
            label={`${title} Coming Soon`}
            key={`home-tile-${title}`}
            id={`home-tile-${title}`}
            disabled={!disabled}
          >
            <Grid.Col span={{ md: 6 }}>
              <Card
                onClick={() => !disabled && handleClick(link)}
                padding="sm"
                radius="md"
                withBorder
                h="100%"
                className={classNames(commonStyles.hoverItem, {
                  [commonStyles.disabled]: disabled,
                })}
              >
                <Card.Section
                  withBorder
                  inheritPadding
                  py="xs"
                  className={commonStyles.lightNavyBg}
                >
                  <Text fw="bold">{title}</Text>
                </Card.Section>
                <div className={styles.homeTile}>
                  <Group className={styles.left}>
                    <Icon size={80} stroke={1} />
                  </Group>
                  <Group className={styles.right}>
                    <Text size="sm">{description}</Text>
                  </Group>
                </div>
              </Card>
            </Grid.Col>
          </Tooltip>
        ))}
      </Grid>
    </Container>
  );
};
