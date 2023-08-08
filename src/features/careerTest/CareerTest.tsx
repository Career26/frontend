import React from 'react';

// external
import { useHistory } from 'react-router-dom';
import { createStyles } from '@mantine/core';

// shared
import { PageHeader } from '@shared/components/pageHeader/PageHeader';

// config
import { urls } from '@shared/config/urlConstants';
import { Shell } from '@shared/components/shell/Shell';

const useStyles = createStyles((theme) => ({}));

export const CareerTest = () => {
  const { classes } = useStyles();

  const history = useHistory();

  const takeTest = () => history.push(urls.careersTest);

  return (
    <Shell header={<PageHeader getStarted={takeTest} />}>
      <></>
    </Shell>
  );
};
