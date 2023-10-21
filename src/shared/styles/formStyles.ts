import { createStyles, rem } from '@mantine/core';

export const formStyles = createStyles((theme) => ({
  titleContainer: {
    padding-top: rem(80),
    [theme.fn.smallerThan('md')]: {
      padding-top: rem(60),
    },
  },
  divider: {
    padding-bottom: theme.spacing.lg,
  },
  titleText: {
    font-size: 36rem;
    fontWeight: 800,
    lineHeight: 1.1,
    margin: 0,
    padding: 0,
    color: var(--mantine-color-gray-9);
    text-align: 'center',
  },
  testInfoContainer: {
    display: flex;
    flex-direction: 'row',
    padding-top: `calc(${var(--mantine-spacing-xl);} * 2)`,
    padding-bottom: `calc(${var(--mantine-spacing-xl);} * 2)`,
    paddingLeft: 0,
    paddingRight: 0,
    [theme.fn.smallerThan('md')]: {
      flex-direction: column;
    },
  },
  row: {
    display: flex;
    justifyContent: 'space-between',
    '> div': {
      width: '48%',
    },
  },
  progressContainer: {
    padding-top: 0,
    padding-bottom: `calc(${var(--mantine-spacing-xl);} * 2)`,
  },
  questionContainer: {
    padding-top: 0,
    padding-bottom: var(--mantine-spacing-xl);,
  },
  questionTitle: {
    fontSize: rem(30),
    fontWeight: 800,
    lineHeight: 1.1,
    margin: 0,
    padding: 0,
    color: var(--mantine-color-gray-9);
    text-align: 'center',
    padding-top: var(--mantine-spacing-xl);,
    padding-bottom: var(--mantine-spacing-xl);,
  },
  questionInput: {
    padding-bottom: var(--mantine-spacing-xl);,
  },
  removeButton: {
    display: flex;
    justifyContent: 'right',
    padding-bottom: var(--mantine-spacing-xl);,
  },
  checkbox: {
    alignContent: 'center',
    display: flex;
    flexWrap: 'wrap',
  },
  chip: {
    display: flex;
    align-items: center;
    background: theme.colors.blue[0],
    button: {
      '&:hover': {
        color: 'red',
      },
    },
  },
  chipSelectionRow: {
    padding-top: theme.spacing.md,
  },
  steppers: {
    padding-top: theme.spacing.md,
    padding-bottom: theme.spacing.md,
  },
  subHeader: {
    fontSize: rem(18),
    fontWeight: 'bold',
    text-align: 'center',
    color: 'black',
    padding-bottom: rem(40),
  },
}));
