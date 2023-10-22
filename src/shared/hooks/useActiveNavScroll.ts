import { useEffect, useState } from 'react';

type NavScrollProps<T> = T & {
  navItems: { anchor: string }[];
  headerHeight?: number;
};

export const useActiveNavScroll = <T>({ navItems, headerHeight = 150 }: NavScrollProps<T>) => {
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

  const scrollToTargetAdjusted = (targetId: string) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: targetPosition - headerHeight,
        behavior: 'smooth',
      });
    }
  };

  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute('href')?.substring(1);
      if (!targetId) {
        return;
      }
      scrollToTargetAdjusted(targetId);
    });
  });

  return { activeAnchor };
};
