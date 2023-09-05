import { useEffect, useState } from 'react';

type NavScrollProps<T> = T & {
  navItems: { anchor: string }[];
};

export const useActiveNavScroll = <T>({ navItems }: NavScrollProps<T>) => {
  const [activeAnchor, setActiveAnchor] = useState<null | string>(navItems[0].anchor);
  const handleScroll = () => {
    const activeSection = navItems.reduce<{ anchor: string; top?: number }>(
      (agg, link) => {
        const section = document.getElementById(link.anchor);
        if (!section) {
          return agg;
        }
        const { top } = section.getBoundingClientRect();
        if (top < 0) {
          return agg;
        }
        if (!agg.top || top < agg.top) {
          return { anchor: link.anchor, top };
        }
        return agg;
      },
      { anchor: '' },
    );
    if (!activeSection.anchor) {
      setActiveAnchor(navItems[navItems.length - 1].anchor);
    } else {
      setActiveAnchor(activeSection.anchor);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { activeAnchor };
};
