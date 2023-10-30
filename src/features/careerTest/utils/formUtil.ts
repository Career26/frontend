const getPrefix = (rating: string) => {
  switch (rating) {
    case 'I hated it':
      return 'Why did you hate it?';
    case 'I disliked it':
      return 'Why did you dislike it?';
    case 'I liked it':
      return 'Why did you like it?';
    case 'I loved it':
      return 'Why did you love it?';
    default:
      return 'Provide a reason for this rating';
  }
};

export const getRatingLabel = (rating: string, answerLength: number) => {
  const prefix = getPrefix(rating);
  return `${prefix} (${500 - answerLength} characters remaining)`;
};