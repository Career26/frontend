import { NavLink } from '@mantine/core';

import { useActiveNavScroll } from '@shared/hooks/useActiveNavScroll';

import { overviewLinks } from '@shared/constants/overviewConstants';

export const OverviewNavBar = () => {
  const { activeAnchor } = useActiveNavScroll({ navItems: overviewLinks });
  return overviewLinks.map(({ label, Icon, anchor }) => (
    <NavLink
      href={`#${anchor}`}
      key={`link-${label}`}
      active={activeAnchor === anchor}
      label={label}
      leftSection={<Icon />}
    />
  ));
};
