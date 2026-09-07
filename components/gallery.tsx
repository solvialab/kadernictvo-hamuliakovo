/* oxlint-disable next/no-img-element -- Pre-optimized local WebP assets, full-size originals and exact responsive widths. */
/* oxlint-disable react/react-compiler -- Client readiness enables filters without hiding server-rendered gallery content. */
'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowLeft, ArrowRight, X, Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { galleryPhotos, type GalleryPhoto } from '@/lib/gallery';
import { salon } from '@/lib/salon';

function LightboxPhoto({ photo }: { photo: GalleryPhoto }) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'failed'>(
    'loading',
  );
  const [attempt, setAttempt] = useState(0);
  const src = `/images/${photo.id}.webp${attempt ? `?retry=${attempt}` : ''}`;
  return (
    <div className="lightbox-image-area" aria-busy={status === 'loading'}>
      {status === 'loading' && (
        <output className="photo-loading">Načítava sa fotografia…</output>
      )}
      {status === 'failed' ? (
        <output className="photo-error">
          Fotografiu sa nepodarilo načítať.
          <button
            type="button"
            className="text-link"
            onClick={() => {
              setAttempt((a) => a + 1);
              setStatus('loading');
            }}
          >
            Skúsiť znova
          </button>
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            Otvoriť fotografiu samostatne <ArrowUpRight size={16} />
          </a>
        </output>
      ) : (
        <img
          src={src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          draggable={false}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('failed')}
        />
      )}
    </div>
  );
}

export function Gallery() {
  const [filter, setFilter] = useState('Všetko');
  const [current, setCurrent] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const origin = useRef<HTMLAnchorElement | null>(null);
  const closeButton = useRef<HTMLButtonElement | null>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const grid = useRef<HTMLDivElement | null>(null);
  useEffect(() => setReady(true), []);
  const categories = [
    'Všetko',
    ...['Strihy', 'Farby', 'Balayage', 'Styling'].filter((c) =>
      galleryPhotos.some((p) => p.category === c),
    ),
  ];
  const visible = galleryPhotos.filter(
    (p) => filter === 'Všetko' || p.category === filter,
  );
  const index = visible.findIndex((p) => p.id === current);
  const photo = visible[index];
  const canStep = visible.length > 1;
  const step = (direction: number) => {
    if (!canStep) return;
    setCurrent((id) => {
      const position = visible.findIndex((p) => p.id === id);
      return visible[(position + direction + visible.length) % visible.length]
        .id;
    });
  };
  useEffect(() => {
    if (!ready || !('IntersectionObserver' in window)) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const animations: Animation[] = [];
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (!reduced.matches && typeof entry.target.animate === 'function')
            animations.push(
              entry.target.animate(
                [
                  { opacity: 0.35, transform: 'translateY(16px)' },
                  { opacity: 1, transform: 'translateY(0)' },
                ],
                { duration: 500, easing: 'ease-out' },
              ),
            );
          observer.unobserve(entry.target);
        }),
      { threshold: 0.08 },
    );
    grid.current
      ?.querySelectorAll('figure')
      .forEach((el) => observer.observe(el));
    const reduce = () => {
      if (reduced.matches)
        animations.forEach((animation) => animation.cancel());
    };
    reduced.addEventListener('change', reduce);
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      reduced.removeEventListener('change', reduce);
    };
  }, [ready, filter]);

  return (
    <>
      <div className="gallery-tools">
        <fieldset
          className="gallery-filters"
          aria-label="Filtrovať galériu"
          hidden={!ready}
        >
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              aria-pressed={filter === category}
              onClick={() => setFilter(category)}
            >
              {category}
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
        {visible.map((item, i) => (
          <figure key={item.id}>
            <a
              href={`/images/${item.id}.webp`}
              onClick={(event) => {
                if (
                  event.button !== 0 ||
                  event.ctrlKey ||
                  event.metaKey ||
                  event.shiftKey ||
                  event.altKey
                )
                  return;
                event.preventDefault();
                origin.current = event.currentTarget;
                setCurrent(item.id);
                setOpen(true);
              }}
              aria-label={`Otvoriť fotografiu: ${item.title}`}
            >
              <img
                src={`/images/${item.id}-small.webp`}
                srcSet={`/images/${item.id}-small.webp ${item.thumbnailWidth}w, /images/${item.id}.webp ${item.width}w`}
                sizes="(max-width:760px) 88vw, 44vw"
                alt={item.alt}
                width={item.width}
                height={item.height}
                loading="lazy"
              />
              <span className="gallery-zoom" aria-hidden="true">
                <Plus size={23} />
              </span>
            </a>
            <figcaption>
              <span>
                <small>{String(i + 1).padStart(2, '0')} / </small>
                {item.title}
              </span>
              <ArrowUpRight size={16} />
            </figcaption>
            <p className="gallery-category">
              {item.comparison ? 'PRED A PO' : item.category}
            </p>
          </figure>
        ))}
      </div>
      {visible.length === 0 && (
        <p className="empty-gallery">
          Fotografie v tejto kategórii pripravujeme.
        </p>
      )}
      <Dialog open={open && !!photo} onOpenChange={setOpen}>
        <DialogContent
          className="lightbox"
          showCloseButton={false}
          initialFocus={closeButton}
          finalFocus={origin}
          onKeyDown={(event) => {
            if (event.altKey || event.ctrlKey || event.metaKey) return;
            if (event.key === 'ArrowLeft') {
              event.preventDefault();
              step(-1);
            }
            if (event.key === 'ArrowRight') {
              event.preventDefault();
              step(1);
            }
          }}
        >
          <div className="lightbox-top">
            <span aria-live="polite" aria-atomic="true">
              {String(index + 1).padStart(2, '0')} /{' '}
              {String(visible.length).padStart(2, '0')}
            </span>
            <DialogClose
              ref={closeButton}
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
                onTouchStart={(event) => {
                  if (
                    event.touches.length !== 1 ||
                    (event.target as HTMLElement).closest('button, a')
                  ) {
                    touch.current = null;
                    return;
                  }
                  touch.current = {
                    x: event.touches[0].clientX,
                    y: event.touches[0].clientY,
                  };
                }}
                onTouchMove={(event) => {
                  if (event.touches.length !== 1) touch.current = null;
                }}
                onTouchCancel={() => {
                  touch.current = null;
                }}
                onTouchEnd={(event) => {
                  const start = touch.current;
                  touch.current = null;
                  if (
                    !start ||
                    event.touches.length ||
                    !event.changedTouches.length
                  )
                    return;
                  const x = event.changedTouches[0].clientX - start.x;
                  const y = event.changedTouches[0].clientY - start.y;
                  if (Math.abs(x) > 50 && Math.abs(x) > Math.abs(y) * 1.2)
                    step(x < 0 ? 1 : -1);
                }}
              >
                <button
                  type="button"
                  className="icon-button previous"
                  aria-label="Predchádzajúca fotografia"
                  disabled={!canStep}
                  onClick={() => step(-1)}
                >
                  <ArrowLeft size={26} />
                </button>
                <LightboxPhoto key={photo.id} photo={photo} />
                <button
                  type="button"
                  className="icon-button next"
                  aria-label="Nasledujúca fotografia"
                  disabled={!canStep}
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
                    {photo.comparison ? 'Pred a po' : photo.category} · Práca
                    nášho salónu.
                  </DialogDescription>
                </div>
                <span className="lightbox-credit">{salon.name}</span>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
