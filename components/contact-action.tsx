import { salon } from '@/lib/salon';
import { ArrowUpRight, Phone, MessageCircle } from 'lucide-react';
export function contactUrl(kind: 'phone' | 'facebook' | 'map') {
  if (kind === 'phone')
    return salon.phone &&
      /^\+[1-9]\d{7,14}$/.test(salon.phone.replace(/\s/g, ''))
      ? `tel:${salon.phone.replace(/\s/g, '')}`
      : null;
  if (kind === 'map')
    return salon.address
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${salon.address}, ${salon.city}`)}`
      : null;
  const value = salon.messenger || salon.facebook;
  if (!value) return null;
  try {
    const u = new URL(value);
    return u.protocol === 'https:' &&
      /(^|\.)(facebook\.com|fb\.com|m\.me|messenger\.com)$/.test(u.hostname)
      ? u.href
      : null;
  } catch {
    return null;
  }
}
export function ContactAction({
  kind,
  className = '',
  hero = false,
  compact = false,
}: {
  kind: 'phone' | 'facebook' | 'map';
  className?: string;
  hero?: boolean;
  compact?: boolean;
}) {
  const href = contactUrl(kind);
  const label =
    kind === 'phone'
      ? compact
        ? 'Zavolať'
        : 'Zavolať do salónu'
      : kind === 'map'
        ? 'Navigovať do salónu'
        : compact
          ? 'Facebook'
          : salon.messenger
            ? 'Napísať na Facebooku'
            : 'Otvoriť Facebook';
  const icon = compact ? (
    kind === 'phone' ? (
      <Phone size={17} />
    ) : (
      <MessageCircle size={17} />
    )
  ) : (
    <ArrowUpRight size={18} />
  );
  if (href || hero)
    return (
      <a
        className={className}
        href={href || '#kontakt'}
        target={href && kind !== 'phone' ? '_blank' : undefined}
        rel={href && kind !== 'phone' ? 'noopener noreferrer' : undefined}
        aria-label={!href ? `${label} – kontakt na doplnenie` : undefined}
      >
        {compact && icon}
        {label}
        {!compact && icon}
      </a>
    );
  return (
    <span
      className={`${className} unavailable`}
      aria-disabled="true"
      title="Údaj čaká na doplnenie"
    >
      {compact && icon}
      {label}
      {!compact && icon}
    </span>
  );
}
