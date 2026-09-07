/* oxlint-disable next/no-img-element -- The supplied logo is a local, fixed-size asset. */
import { salon } from '@/lib/salon';
import { assetUrl } from '@/lib/assets';

export function LogoMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <img src={assetUrl('/images/logo.png')} alt="" width="812" height="806" />
    </span>
  );
}

export function LogoLockup() {
  return (
    <span className="logo-lockup">
      <img
        src={assetUrl('/images/logo.png')}
        width="812"
        height="806"
        alt="Logo kaderníctva a nechtového dizajnu so ženskou tvárou, vlnitými vlasmi a nožnicami."
        loading="lazy"
      />
    </span>
  );
}

export function Brand() {
  return (
    <a
      className="brand salon-brand"
      href="#obsah"
      aria-label={`${salon.name} – úvod`}
    >
      <LogoMark />
      <span className="brand-name">
        <span>
          Kaderníctvo <span>Hamuliakovo</span>
        </span>
        <small>VLASY & NECHTOVÝ DIZAJN</small>
      </span>
    </a>
  );
}
