import { Group, Text } from '@mantine/core';

import { useMobileStyles } from '@shared/hooks/useMobileStyles';

import commonStyles from '@shared/styles/commonStyles.module.css';

interface TextWithIconBlockProps {
  title: string;
  content: React.ReactNode;
  Icon: React.ReactNode;
}

export const TextWithIconBlock = ({ title, content, Icon }: TextWithIconBlockProps) => {
  const { isMobile } = useMobileStyles();
  return (
    <div>
      <Group className={commonStyles.row}>
        {Icon}
        <Text fw={800} size={isMobile ? '1rem' : '1.5rem'} py="md">
          {title}
        </Text>
      </Group>
      {content}
    </div>
  );
};
