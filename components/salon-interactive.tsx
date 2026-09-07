/* oxlint-disable next/no-img-element -- Pre-optimized WebP assets also serve as direct links without JavaScript. */
/* oxlint-disable react/react-compiler -- Effects intentionally initialize session-only intro and progressive enhancement after server hydration. */
'use client';
import { useEffect, useState } from 'react';
import { ArrowUpRight, X, Menu } from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetClose,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ContactAction } from '@/components/contact-action';
import { salon } from '@/lib/salon';
import { beforeAfterPairs } from '@/lib/gallery';
import { Brand, LogoMark } from '@/components/brand';

export function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    ['Služby', 'sluzby'],
    ['Cenník', 'cennik'],
    ['Galéria', 'galeria'],
    ['O nás', 'o-nas'],
    ['Kontakt', 'kontakt'],
  ];
  useEffect(() => {
    const update = () => {
      if (window.innerWidth > 1100) setOpen(false);
    };
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  function follow(id: string) {
    setOpen(false);
    history.replaceState(null, '', `#${id}`);
    requestAnimationFrame(() =>
      document.getElementById(id)?.scrollIntoView({
        behavior: matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'instant'
          : 'smooth',
      }),
    );
  }
  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand />
        <nav aria-label="Hlavná navigácia">
          {links.map(([name, id]) => (
            <a href={`#${id}`} key={id}>
              {name}
            </a>
          ))}
        </nav>
        <a className="button header-book" href="#kontakt">
          Objednať sa <ArrowUpRight size={17} />
        </a>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="menu-trigger" aria-label="Otvoriť menu">
            <Menu size={23} />
            <span>Menu</span>
          </SheetTrigger>
          <SheetContent className="mobile-menu" showCloseButton={false}>
            <div className="mobile-menu-top">
              <SheetTitle className="menu-title">
                <span className="menu-brand">
                  <LogoMark />
                  <span>{salon.name}</span>
                </span>
              </SheetTitle>
              <SheetClose className="icon-button" aria-label="Zatvoriť menu">
                <X size={27} />
              </SheetClose>
            </div>
            <SheetDescription className="menu-description">
              VLASY & NECHTOVÝ DIZAJN · {salon.city}
            </SheetDescription>
            <nav aria-label="Mobilná navigácia">
              {links.map(([name, id], i) => (
                <a
                  href={`#${id}`}
                  key={id}
                  onClick={(e) => {
                    e.preventDefault();
                    follow(id);
                  }}
                >
                  <span>0{i + 1}</span>
                  {name}
                  <ArrowUpRight size={28} />
                </a>
              ))}
            </nav>
            <a
              className="button"
              href="#kontakt"
              onClick={(e) => {
                e.preventDefault();
                follow('kontakt');
              }}
            >
              Objednať sa <ArrowUpRight size={20} />
            </a>
            <p>
              Dve kreslá. Dve kaderníčky.
              <br />
              Priestor pre vás.
            </p>
            <div className="menu-socials">
              <a
                href={salon.facebook!}
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook ↗
              </a>
              <a
                href={salon.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram ↗
              </a>
            </div>
          </SheetContent>
        </Sheet>
        <noscript>
          <a className="noscript-menu" href="#kontakt">
            Kontakt ↓
          </a>
        </noscript>
      </div>
    </header>
  );
}

export function Motion() {
  const [intro, setIntro] = useState(false);
  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      if (!reduced.matches && !sessionStorage.getItem('atelier-intro-seen')) {
        sessionStorage.setItem('atelier-intro-seen', '1');
        setIntro(true);
        document.documentElement.classList.add('intro-playing');
        timer = setTimeout(() => {
          setIntro(false);
          document.documentElement.classList.remove('intro-playing');
        }, 2300);
      }
    } catch {
      /* Content stays visible when storage is unavailable. */
    }
    const animated: Animation[] = [];
    let observer: IntersectionObserver | undefined;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (!reduced.matches) {
                animated.push(
                  entry.target.animate(
                    [
                      {
                        opacity: 0,
                        transform: 'translateY(25px)',
                        clipPath: 'inset(0 0 12% 0)',
                      },
                      {
                        opacity: 1,
                        transform: 'translateY(0)',
                        clipPath: 'inset(0 0 0 0)',
                      },
                    ],
                    { duration: 700, easing: 'cubic-bezier(.2,.7,.2,1)' },
                  ),
                );
              }
              observer?.unobserve(entry.target);
            }
          }),
        { threshold: 0.12 },
      );
      document
        .querySelectorAll('.section h2,.detail-photo,.interior')
        .forEach((el) => observer?.observe(el));
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      document
        .querySelector('.site-header')
        ?.classList.toggle('scrolled', scrollY > 35);
      const photo = document.querySelector<HTMLElement>('.detail-photo img');
      if (photo)
        photo.style.transform =
          !reduced.matches && innerWidth > 1000
            ? `translateY(${Math.max(-9, Math.min(9, (photo.getBoundingClientRect().top - innerHeight / 2) * 0.025))}px)`
            : 'none';
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const preference = () => {
      if (reduced.matches) {
        setIntro(false);
        document.documentElement.classList.remove('intro-playing');
        animated.forEach((a) => a.cancel());
      }
      update();
    };
    window.addEventListener('scroll', scroll, { passive: true });
    window.addEventListener('resize', scroll);
    reduced.addEventListener('change', preference);
    update();
    return () => {
      clearTimeout(timer);
      observer?.disconnect();
      animated.forEach((a) => a.cancel());
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scroll);
      window.removeEventListener('resize', scroll);
      reduced.removeEventListener('change', preference);
      document.documentElement.classList.remove('intro-playing');
    };
  }, []);
  if (!intro) return null;
  return (
    <div className="intro" aria-hidden="true">
      <svg viewBox="0 0 1440 1000" preserveAspectRatio="none">
        <defs>
          <mask id="strand-mask">
            <rect width="1440" height="1000" fill="white" />
            <path
              className="strand-mask"
              d="M 690 -100 C 350 130, 1000 310, 710 580 S 1100 960, 740 1100"
              fill="none"
              stroke="black"
            />
          </mask>
        </defs>
        <rect
          width="1440"
          height="1000"
          fill="#F3EFE8"
          mask="url(#strand-mask)"
        />
        <path
          className="strand-line"
          d="M 690 -100 C 350 130, 1000 310, 710 580 S 1100 960, 740 1100"
          fill="none"
          stroke="#643A40"
          strokeWidth="1"
          pathLength="1"
        />
      </svg>
      <span>
        <LogoMark />
        {salon.name}
        <small>KADERNÍCKY ATELIÉR</small>
      </span>
    </div>
  );
}

export { Gallery } from './gallery';
export function MobileContactBar() {
  return (
    <div className="mobile-contact-bar" aria-label="Rýchly kontakt">
      <ContactAction kind="phone" compact hero />
      <span aria-hidden="true" />
      <ContactAction kind="facebook" compact hero />
    </div>
  );
}
export function BeforeAfter() {
  return (
    <>
      {beforeAfterPairs
        .filter((pair) => pair.verified)
        .map((pair) => (
          <div className="before-after" key={pair.id}>
            <h3>{pair.caption}</h3>
            <div>
              <figure>
                <img
                  src={pair.before}
                  alt={`Pred úpravou: ${pair.alt}`}
                  loading="lazy"
                  width="800"
                  height="1000"
                />
                <figcaption>Pred</figcaption>
              </figure>
              <figure>
                <img
                  src={pair.after}
                  alt={`Po úprave: ${pair.alt}`}
                  loading="lazy"
                  width="800"
                  height="1000"
                />
                <figcaption>Po</figcaption>
              </figure>
            </div>
          </div>
        ))}
    </>
  );
}
