import { em } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

export const useMobileStyles = () => {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  return {
    isMobile,
    mobileWidth: 'sm',
  };
};
