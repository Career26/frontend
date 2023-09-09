import { createStyles, rem } from '@mantine/core';

export const loginStyles = createStyles({
  title: {
    '.mantine-Modal-title': {
      fontWeight: 'bold',
      fontSize: '20px',
    },
  },
  accountSwitch: {
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    '> div': {
      paddingTop: rem(20),
    },
  },
  name: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  footer: {
    paddingTop: rem(20),
    display: 'flex',
    justifyContent: 'space-between',
  },
  inputField: {
    paddingTop: rem(10),
  },
});
