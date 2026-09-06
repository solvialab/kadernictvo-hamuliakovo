/* oxlint-disable next/no-img-element -- Pre-optimized WebP assets also serve as direct links without JavaScript. */
/* oxlint-disable react/react-compiler -- Effects intentionally initialize session-only intro and progressive enhancement after server hydration. */
'use client';
import { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  X,
  Plus,
  Menu,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
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
import { galleryPhotos, beforeAfterPairs } from '@/lib/gallery';

export function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    ['Služby', 'sluzby'],
    ['Galéria', 'galeria'],
    ['O nás', 'o-nas'],
    ['Kontakt', 'kontakt'],
  ];
  useEffect(() => {
    const update = () => {
      if (window.innerWidth > 760) setOpen(false);
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
      <a className="brand" href="#obsah" aria-label={`${salon.name} – úvod`}>
        <span>{salon.name}</span>
        <small>KADERNÍCKY ATELIÉR</small>
      </a>
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
            <SheetTitle className="menu-title">{salon.name}</SheetTitle>
            <SheetClose className="icon-button" aria-label="Zatvoriť menu">
              <X size={27} />
            </SheetClose>
          </div>
          <SheetDescription className="menu-description">
            KADERNÍCKY ATELIÉR · {salon.city}
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
        </SheetContent>
      </Sheet>
      <noscript>
        <a className="noscript-menu" href="#kontakt">
          Kontakt ↓
        </a>
      </noscript>
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
        }, 1400);
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
        {salon.name}
        <small>KADERNÍCKY ATELIÉR</small>
      </span>
    </div>
  );
}

export function Gallery() {
  const [filter, setFilter] = useState('Všetko');
  const [current, setCurrent] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const origin = useRef<HTMLAnchorElement | null>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const grid = useRef<HTMLDivElement | null>(null);
  useEffect(() => setReady(true), []);
  const categories = [
    'Všetko',
    ...['Strihy', 'Farby', 'Balayage', 'Styling'].filter((category) =>
      galleryPhotos.some((p) => p.category === category),
    ),
  ];
  const visible = galleryPhotos.filter(
    (p) => filter === 'Všetko' || p.category === filter,
  );
  const index = visible.findIndex((p) => p.id === current);
  const photo = visible[index];
  const step = (direction: number) => {
    if (visible.length) {
      setCurrent(
        visible[(index + direction + visible.length) % visible.length].id,
      );
      setFailed(false);
    }
  };
  useEffect(() => {
    if (!ready || matchMedia('(prefers-reduced-motion: reduce)').matches)
      return;
    grid.current?.animate(
      [
        { opacity: 0.3, transform: 'translateY(8px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ],
      { duration: 350, easing: 'ease-out' },
    );
  }, [filter, ready]);
  useEffect(() => {
    if (!ready || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            if (!matchMedia('(prefers-reduced-motion: reduce)').matches)
              e.target.animate(
                [
                  { opacity: 0.35, transform: 'translateY(18px)' },
                  { opacity: 1, transform: 'translateY(0)' },
                ],
                { duration: 650, easing: 'ease-out' },
              );
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.08 },
    );
    grid.current
      ?.querySelectorAll('figure')
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ready, filter]);
  return (
    <>
      <div className="gallery-tools">
        <fieldset
          className="gallery-filters"
          aria-label="Filtrovať galériu"
          hidden={!ready}
        >
          {categories.map((c) => (
            <button
              key={c}
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
            >
              {c}
            </button>
          ))}
        </fieldset>
        <p className="gallery-count" aria-live="polite">
          {String(visible.length).padStart(2, '0')}{' '}
          {visible.length === 1
            ? 'fotografia'
            : visible.length >= 2 && visible.length <= 4
              ? 'fotografie'
              : 'fotografií'}
        </p>
      </div>
      <div
        className={`gallery-grid ${filter !== 'Všetko' ? 'filtered' : ''}`}
        ref={grid}
      >
        {visible.map((p, i) => (
          <figure key={p.id}>
            <a
              href={`/images/${p.id}.webp`}
              onClick={(e) => {
                e.preventDefault();
                origin.current = e.currentTarget;
                setCurrent(p.id);
                setFailed(false);
              }}
              aria-label={`Otvoriť fotografiu: ${p.title}`}
            >
              <img
                src={`/images/${p.id}.webp`}
                srcSet={`/images/${p.id}-small.webp 640w, /images/${p.id}.webp ${p.width}w`}
                sizes="(max-width: 760px) 88vw, 45vw"
                alt={p.alt}
                width={p.width}
                height={p.height}
                loading="lazy"
              />
              <span className="gallery-zoom" aria-hidden="true">
                <Plus size={23} />
              </span>
              <span className="image-type">INŠPIRÁCIA / {p.category}</span>
            </a>
            <figcaption>
              <span>
                <small>{String(i + 1).padStart(2, '0')} / </small>
                {p.title}
              </span>
              <ArrowUpRight size={16} />
            </figcaption>
          </figure>
        ))}
      </div>
      {visible.length === 0 && (
        <p className="empty-gallery">
          Fotografie v tejto kategórii pripravujeme.
        </p>
      )}
      <Dialog
        open={!!photo}
        onOpenChange={(open) => {
          if (!open) setCurrent(null);
        }}
      >
        <DialogContent
          className="lightbox"
          showCloseButton={false}
          finalFocus={origin}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') {
              e.preventDefault();
              step(-1);
            }
            if (e.key === 'ArrowRight') {
              e.preventDefault();
              step(1);
            }
          }}
        >
          <div className="lightbox-top">
            <span aria-live="polite">
              {String(index + 1).padStart(2, '0')} /{' '}
              {String(visible.length).padStart(2, '0')}
            </span>
            <DialogClose
              className="icon-button"
              aria-label="Zatvoriť fotografiu"
            >
              <span>Zatvoriť</span>
              <X size={25} />
            </DialogClose>
          </div>
          {photo && (
            <>
              <div
                className="lightbox-stage"
                onTouchStart={(e) => {
                  touch.current = {
                    x: e.touches[0].clientX,
                    y: e.touches[0].clientY,
                  };
                }}
                onTouchEnd={(e) => {
                  if (!touch.current) return;
                  const x = e.changedTouches[0].clientX - touch.current.x;
                  const y = e.changedTouches[0].clientY - touch.current.y;
                  if (Math.abs(x) > 50 && Math.abs(x) > Math.abs(y) * 1.2)
                    step(x < 0 ? 1 : -1);
                  touch.current = null;
                }}
              >
                <button
                  className="icon-button previous"
                  aria-label="Predchádzajúca fotografia"
                  onClick={() => step(-1)}
                >
                  <ArrowLeft size={26} />
                </button>
                {failed ? (
                  <output className="photo-error">
                    Fotografiu sa nepodarilo načítať.
                    <button
                      className="text-link"
                      onClick={() => setFailed(false)}
                    >
                      Skúsiť znova
                    </button>
                  </output>
                ) : (
                  <img
                    key={photo.id}
                    src={`/images/${photo.id}.webp`}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    onError={() => setFailed(true)}
                  />
                )}
                <button
                  className="icon-button next"
                  aria-label="Nasledujúca fotografia"
                  onClick={() => step(1)}
                >
                  <ArrowRight size={26} />
                </button>
              </div>
              <div className="lightbox-bottom">
                <div>
                  <DialogTitle className="lightbox-title">
                    {photo.title}
                  </DialogTitle>
                  <DialogDescription className="lightbox-description">
                    {photo.category} · Ilustračná fotografia, nie práca salónu.
                  </DialogDescription>
                </div>
                <a
                  href={photo.source}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Foto: {photo.photographer} / Unsplash ↗
                </a>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
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
