import React from 'react';
import { useHistory } from 'react-router-dom';
import { Header, Container, Group, createStyles, rem } from '@mantine/core';
import { urls } from '@shared/config/urlConstants';

const careerPathNavigationStyles = createStyles((theme) => ({
  header: { background: theme.colors.gray[0] },
  inner: {
    height: rem(40),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  links: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },
  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
    '&:hover': {
      backgroundColor: theme.colors.blue[0],
    },
  },
}));

type CareerPathNavigationProps = {
  careerPaths?: Array<{ title: string; id: string }>;
};

export const CareerPathNavigation = ({ careerPaths }: CareerPathNavigationProps) => {
  const history = useHistory();
  const { classes } = careerPathNavigationStyles();

  const onClickCareerPath = (id: string) => {
    history.push(`${urls.home}/${id}`);
  };

  return (
    <Header height="auto" py="xs" withBorder className={classes.header}>
      <Container className={classes.inner}>
        <Group spacing={5} className={classes.links}>
          {careerPaths?.map((careerPath) => (
            <a
              href={careerPath.id}
              key={`career-path-${careerPath.id}`}
              onClick={() => onClickCareerPath(careerPath.id)}
              className={classes.link}
            >
              {careerPath.title}
            </a>
          ))}
        </Group>
      </Container>
    </Header>
  );
};
