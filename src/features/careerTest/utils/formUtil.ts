export const getRatingLabel = (rating: string) => {
  switch (rating) {
    case '1':
      return 'Why did you hate it?';
    case '2':
      return 'Why did you dislike it?';
    case '4':
      return 'Why did you like it?';
    case '5':
      return 'Why did you love it?';
    default:
      return 'Provide a reason for this rating';
  }
};
