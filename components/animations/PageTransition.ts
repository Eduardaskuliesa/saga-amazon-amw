import gsap from 'gsap';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export const animatePageIn = () => {
  const transitionElement = document.getElementById('transition-element');
  const logoSpinner = document.getElementById('logo-spinner');

  if (transitionElement) {
    const tl = gsap.timeline();

    tl.set(transitionElement, {
      yPercent: 0,
    })
      .to(transitionElement, {
        yPercent: -100,
        duration: 0.4,
        delay: 0.2,
        onComplete: () => {
          logoSpinner?.classList.remove('loading-spinner-logo');
        },
      })
      .to(
        transitionElement,
        {
          duration: 0.4,
        },
        '<',
      );
  }
};

export const animatePageOut = (href: string, router: AppRouterInstance) => {
  const animationWrapper = document.getElementById('transition-element');
  const logoSpinner = document.getElementById('logo-spinner');

  if (animationWrapper) {
    const tl = gsap.timeline();

    tl.set(animationWrapper, {
      yPercent: 100,
    })
      .to(animationWrapper, {
        yPercent: 0,
        duration: 0.4,
        onComplete: () => {
          router.push(href);
          logoSpinner?.classList.add('loading-spinner-logo');
        },
      })
      .to(
        animationWrapper,
        {
          duration: 0.8,
        },
        '<',
      );
  }
};
