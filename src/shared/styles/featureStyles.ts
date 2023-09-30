import { createStyles } from '@mantine/core';

import { NAVBAR_WIDTH } from './navStyles';
import { HEADER_HEIGHT } from './headerStyles';

export const featureStyles = createStyles((theme) => ({
  wrapper: {
    '.mantine-AppShell-main': {
      [theme.fn.smallerThan('md')]: {
        '> div': {
          paddingLeft: '0 !important',
        },
      },
    },
  },
  content: {
    height: '420vh',
    flexDirection: 'column',
    paddingLeft: `${NAVBAR_WIDTH} !important`,
    paddingTop: HEADER_HEIGHT,
  },
}));
