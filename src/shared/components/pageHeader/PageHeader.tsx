import React from 'react';
import { Header, Group, Button, Burger, Text, Transition, Paper } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { usePageNavigation } from '@shared/hooks/usePageNavigation';
import classNames from 'classnames';
import { urls } from '@shared/config/urlConstants';
import { useAppSelector } from '@state/store';
import { selectCareerPaths, selectSelectedCareerPathId } from '@slices/userSlice';
import { CareerPath } from '@datatypes/career';

import { LoginModal } from '../login/LoginModal';
import { pageHeaderStyles } from './pageHeaderStyles';

type HeaderLink = { link: string; label: string; active?: boolean };

const getLinks = ({
  basePath,
  careerPaths,
  selectedCareerPathId,
}: {
  basePath: string;
  selectedCareerPathId?: string;
  careerPaths?: { [key: string]: CareerPath };
}): HeaderLink[] => {
  if (new RegExp(urls.overview).test(basePath) && careerPaths) {
    return Object.entries(careerPaths).map(([careerId, { title }]) => ({
      label: title,
      link: careerId,
      active: selectedCareerPathId === careerId,
    }));
  }
  return [
    { label: 'Features', link: `#features` },
    { label: 'Pricing', link: `#pricing` },
  ];
};

export const PageHeader = () => {
  const { classes, cx } = pageHeaderStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const { goToCareerTest, clickLogo } = usePageNavigation();
  const { basePath } = usePageNavigation();
  const careerPaths = useAppSelector(selectCareerPaths);
  const selectedCareerPathId = useAppSelector(selectSelectedCareerPathId);

  const links = getLinks({ basePath, careerPaths, selectedCareerPathId });

  const MenuItems = links?.map(({ link, active, label }) => (
    <a
      key={label}
      href={link}
      className={classNames(cx(classes.mobileLink), { [classes.active]: active })}
      onClick={toggle}
    >
      {label}
    </a>
  ));

  const HeaderItems = links?.map(({ label, active, link }) => (
    <a key={label} className={classNames(classes.link, { [classes.active]: active })} href={link}>
      {label}
    </a>
  ));

  return (
    <Header
      height="auto"
      py="xs"
      withBorder
      style={{ position: 'fixed' }}
      className={classes.inner}
    >
      <LoginModal />
      <Group>
        {links?.length && (
          <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
        )}
        <Text className={classes.logo} onClick={clickLogo}>
          LOGO HERE
        </Text>
      </Group>

      {links?.length && (
        <Group spacing={5} className={classes.links}>
          {HeaderItems}
        </Group>
      )}

      <Group>
        <Button variant="default">Login</Button>
        <Button variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} onClick={goToCareerTest}>
          Get Started
        </Button>
      </Group>

      {links?.length && (
        <Transition transition="pop-top-left" duration={200} mounted={opened}>
          {(styles) => (
            <Paper withBorder style={styles} sx={{ position: 'fixed', width: '100%' }} mt="xs">
              {MenuItems}
            </Paper>
          )}
        </Transition>
      )}
    </Header>
  );
};
