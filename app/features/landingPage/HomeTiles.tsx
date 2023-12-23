import { useNavigate } from '@remix-run/react';
import { Card, Container, Grid, Group, Text, Tooltip } from '@mantine/core';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '@state/store';
import { selectCareerPaths, selectProfile } from '@apis/profileApi';
import { useAuthUser } from '@shared/hooks/useAuthUser';
import { setCareerTestModal, setDiversityModal } from '@slices/sessionSlice';

import { urls } from '@shared/constants/urlConstants';
import { featureTiles } from '@shared/constants/featureConstants';

import commonStyles from '@shared/styles/commonStyles.module.css';
import styles from './landingPage.module.css';

export const HomeTiles = () => {
  const dispatch = useAppDispatch();
  const { authenticated } = useAuthUser();
  const navigate = useNavigate();
  const profile = useAppSelector(selectProfile);
  const careerPaths = useAppSelector(selectCareerPaths);

  const handleClick = (link: string) => {
    if (link === urls.careersTest) {
      if (!careerPaths) {
        dispatch(setCareerTestModal({ open: true, noProfile: false }));
      }
      navigate(link);
      return;
    }
    if (!authenticated) {
      dispatch(setCareerTestModal({ open: true, noProfile: true }));
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
    navigate(link);
  };

  return (
    <Container py={0}>
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
