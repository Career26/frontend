import { createStyles, rem } from '@mantine/core';

export const questionFormStyles = createStyles((theme) => ({
  titleContainer: {
    paddingTop: rem(80),
    [theme.fn.smallerThan('md')]: {
      paddingTop: rem(60),
    },
  },
  divider: {
    paddingBottom: theme.spacing.lg,
  },
  titleText: {
    fontSize: rem(36),
    fontWeight: 800,
    lineHeight: 1.1,
    margin: 0,
    padding: 0,
    color: theme.colors.gray[9],
    textAlign: 'center',
  },
  testInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    paddingBottom: `calc(${theme.spacing.xl} * 2)`,
    paddingLeft: 0,
    paddingRight: 0,
    [theme.fn.smallerThan('md')]: {
      flexDirection: 'column',
    },
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    '> div': {
      width: '48%',
    },
  },
  progressContainer: {
    paddingTop: 0,
    paddingBottom: `calc(${theme.spacing.xl} * 2)`,
  },
  questionContainer: {
    paddingTop: 0,
    paddingBottom: theme.spacing.xl,
  },
  questionTitle: {
    fontSize: rem(30),
    fontWeight: 800,
    lineHeight: 1.1,
    margin: 0,
    padding: 0,
    color: theme.colors.gray[9],
    textAlign: 'center',
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },
  questionInput: {
    paddingBottom: theme.spacing.xl,
  },
  removeButton: {
    display: 'flex',
    justifyContent: 'right',
    paddingBottom: theme.spacing.xl,
  },
  checkbox: {
    alignContent: 'center',
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    display: 'flex',
    alignItems: 'center',
    background: theme.colors.blue[0],
    button: {
      '&:hover': {
        color: 'red',
      },
    },
  },
  chipSelectionRow: {
    paddingTop: theme.spacing.md,
  },
  steppers: {
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },
  subHeader: {
    fontSize: rem(20),
    // fontWeight: 'bold',
    color: theme.colors.gray[7],
    paddingBottom: rem(40),
  },
}));
