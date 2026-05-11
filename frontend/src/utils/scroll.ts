import React from 'react';

export const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string, offsetDesktop = 100, offsetMobile = 60) => {
  e.preventDefault();
  const targetId = href.substring(1);
  const element = document.getElementById(targetId);

  if (element) {
    const isMobile = window.innerWidth < 1024;
    const offset = isMobile ? offsetMobile : offsetDesktop;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    // Stronger feedback for active selection on mobile
    if (isMobile && typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([15]);
    }

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};
