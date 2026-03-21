type Props = {
  src: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
  decoding?: 'async' | 'sync' | 'auto';
  sizes?: string;
  style?: React.CSSProperties;
  draggable?: boolean;
  disableOptimized?: boolean;
};

function buildSets(src: string, widths: number[]) {
  const i = src.lastIndexOf('.');
  const noExt = i >= 0 ? src.slice(0, i) : src;
  const rel = noExt.startsWith('/') ? noExt : `/${noExt}`;
  const base = `/optimized${rel}`;
  const avif = widths.map((w) => `${base}-w${w}.avif ${w}w`).join(', ');
  const webp = widths.map((w) => `${base}-w${w}.webp ${w}w`).join(', ');
  return { avif, webp };
}

import * as React from 'react';
import { ASSET_OVERRIDES } from './assetOverrides';

export default function OptimizedImg({ src, alt, className, loading = 'lazy', decoding = 'async', sizes, style, draggable, disableOptimized }: Props) {
  const baseSrc = src.split('?')[0];
  const override = ASSET_OVERRIDES[src] ?? ASSET_OVERRIDES[baseSrc];
  const effectiveSrc = override ?? src;
  const isRemote = /^https?:\/\//i.test(effectiveSrc) || effectiveSrc.startsWith('//') || effectiveSrc.startsWith('data:');
  const isWebpOrAvif = /\.(webp|avif)(\?|$)/i.test(effectiveSrc);
  const widths = [480, 768, 1080, 1440];
  const { avif, webp } = isRemote ? { avif: '', webp: '' } : buildSets(effectiveSrc, widths);
  const defaultSizes = sizes ?? '(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 16vw';
  const [fallback, setFallback] = React.useState(false);

  React.useEffect(() => {
    if (isRemote || disableOptimized || isWebpOrAvif) {
      setFallback(true);
      return;
    }
    let cancelled = false;
    const i = new Image();
    // Probăm cea mai mică variantă webp; dacă lipsește, revenim la fallback clasic
    const firstComma = webp.indexOf(',');
    const testSrc = firstComma >= 0 ? webp.slice(0, firstComma).split(' ')[0] : webp.split(' ')[0];
    i.onload = () => {
      if (!cancelled) setFallback(false);
    };
    i.onerror = () => {
      if (!cancelled) setFallback(true);
    };
    i.src = testSrc;
    return () => {
      cancelled = true;
    };
  }, [webp, isRemote, disableOptimized, isWebpOrAvif]);

  if (fallback) {
    return <img src={effectiveSrc} alt={alt} className={className} loading={loading} decoding={decoding} style={style} draggable={draggable} />;
  }

  return (
    <picture>
      <source type="image/avif" srcSet={avif} sizes={defaultSizes} />
      <source type="image/webp" srcSet={webp} sizes={defaultSizes} />
      <img src={effectiveSrc} alt={alt} className={className} loading={loading} decoding={decoding} style={style} draggable={draggable} />
    </picture>
  );
}
