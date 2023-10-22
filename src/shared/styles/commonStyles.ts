import { createStyles, rem } from '@mantine/core';

export const boxShadow =
  '0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 1.25rem 1.5625rem -0.3125rem, rgba(0, 0, 0, 0.04) 0 0.625rem 0.625rem -0.3125rem';

export const commonStyles = createStyles({
  hoverItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: rem(15),
    '&:hover': {
      boxShadow: '0 3px 10px rgba(0,0,0,.2)',
      transform: 'translate3d(0,-2px,0)',
      cursor: 'pointer',
    },
  },
  hoverIcon: {
    '&:hover': {
      cursor: 'pointer',
      boxShadow,
    },
  },
});