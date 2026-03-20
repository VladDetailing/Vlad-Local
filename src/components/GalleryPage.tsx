import { ArrowLeft, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { galleryImages, gallerySections } from './galleryData';

export default function GalleryPage() {
  const [activeSrc, setActiveSrc] = useState<string | null>(null);

  const normalizedImages = useMemo(() => {
    const seen = new Set<string>();
    return galleryImages.filter((img) => {
      const key = img.src;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, []);

  const grouped = useMemo(() => {
    return gallerySections
      .map((section) => ({
        ...section,
        images: normalizedImages.filter((img) => img.category === section.key)
      }))
      .filter((section) => section.images.length > 0);
  }, [normalizedImages]);

  const orderedImages = useMemo(() => grouped.flatMap((s) => s.images), [grouped]);

  const activeIndex = useMemo(() => {
    if (!activeSrc) return -1;
    return orderedImages.findIndex((i) => i.src === activeSrc);
  }, [activeSrc, orderedImages]);

  const activeImage = activeIndex >= 0 ? orderedImages[activeIndex] : null;

  const setPrev = useCallback(() => {
    if (!orderedImages.length) return;
    if (activeIndex <= 0) setActiveSrc(orderedImages[orderedImages.length - 1]?.src ?? null);
    else setActiveSrc(orderedImages[activeIndex - 1]?.src ?? null);
  }, [activeIndex, orderedImages]);

  const setNext = useCallback(() => {
    if (!orderedImages.length) return;
    if (activeIndex < 0 || activeIndex >= orderedImages.length - 1) setActiveSrc(orderedImages[0]?.src ?? null);
    else setActiveSrc(orderedImages[activeIndex + 1]?.src ?? null);
  }, [activeIndex, orderedImages]);

  useEffect(() => {
    if (!activeSrc) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveSrc(null);
      if (e.key === 'ArrowLeft') setPrev();
      if (e.key === 'ArrowRight') setNext();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeSrc, setNext, setPrev]);

  useEffect(() => {
    const preloaded: HTMLImageElement[] = [];

    const preloadAll = () => {
      for (const img of normalizedImages) {
        const el = new Image();
        el.decoding = 'async';
        el.src = img.src;
        preloaded.push(el);
      }
    };

    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number; cancelIdleCallback?: (id: number) => void };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(preloadAll);
      return () => w.cancelIdleCallback?.(id);
    }

    const t = window.setTimeout(preloadAll, 0);
    return () => window.clearTimeout(t);
  }, [normalizedImages]);

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-24">
      <div className="container mx-auto px-6">
        <a
          href="#acasa"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Înapoi la Acasă
        </a>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Galerie <span className="text-blue-400">Lucrări</span>
          </h1>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
          <p className="text-lg text-gray-300 max-w-4xl mx-auto">
            Exemple reale din atelier: detailing interior/exterior, PPF, wrapping, folie solară, polish faruri, revopsire
            piele și retapițări.
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-16">
          {grouped.map((section) => (
            <div key={section.key}>
              <div className="mb-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
                <div className="text-center">
                  <h2 className="text-2xl md:text-3xl font-bold">{section.title}</h2>
                  <p className="text-sm text-gray-400 mt-1">{section.subtitle}</p>
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {section.images.map((img) => (
                  <button
                    key={img.src}
                    type="button"
                    onClick={() => setActiveSrc(img.src)}
                    className="aspect-square bg-gray-900/50 rounded-xl border border-gray-800 overflow-hidden hover:border-blue-500/50 transition-colors relative"
                    aria-label={img.alt}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover"
                      loading="eager"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/15 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 p-10 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-3xl border border-blue-500/20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-500/5 blur-3xl"></div>
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-4">Vrei o evaluare pentru mașina ta?</h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Trimite o cerere pentru evaluare gratuită sau sună-ne și îți recomandăm varianta potrivită.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#evaluare"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors shadow-lg shadow-white/10"
              >
                Cere evaluare gratuită
              </a>
              <a
                href="tel:0771133128"
                className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors shadow-lg shadow-green-500/20"
              >
                Sună-ne: 0771 133 128
              </a>
            </div>
          </div>
        </div>

        <div className="mt-24 pt-12 border-t border-gray-900">
          <p className="text-sm text-gray-600 text-center mb-4">Servicii disponibile:</p>
          <div className="flex flex-wrap justify-center gap-3 text-xs text-gray-700">
            {[
              'Galerie detailing auto Galați',
              'Portofoliu detailing interior',
              'Portofoliu detailing exterior',
              'Lucrări PPF Galați',
              'Lucrări wrapping Galați',
              'Lucrări folie solară omologată RAR',
              'Lucrări polish faruri',
              'Lucrări revopsire piele auto',
              'Lucrări retapițări auto',
              'Detailing auto înainte și după'
            ].map((tag, i) => (
              <span key={i} className="bg-gray-900 px-3 py-1 rounded-full border border-gray-800">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {activeImage && (
        <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4" onClick={() => setActiveSrc(null)}>
          <button
            type="button"
            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
            onClick={() => setActiveSrc(null)}
            aria-label="Închide"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            type="button"
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full border border-white/10 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setPrev();
            }}
            aria-label="Imaginea anterioară"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>

          <button
            type="button"
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full border border-white/10 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setNext();
            }}
            aria-label="Imaginea următoare"
          >
            <ChevronRight className="w-7 h-7" />
          </button>

          <img
            src={activeImage.src}
            alt={activeImage.alt}
            className="max-w-full max-h-[90vh] object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
