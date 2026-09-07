/** Public assets also work when the static site is hosted below a URL path. */
export function assetUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${path}`;
}
