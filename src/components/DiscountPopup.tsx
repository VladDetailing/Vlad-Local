import { Gift, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const storageKey = 'vlad_discount_popup_dismissed_v1';

export default function DiscountPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const dismissed = window.localStorage.getItem(storageKey) === '1';
      if (!dismissed) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  const close = () => {
    setOpen(false);
    try {
      window.localStorage.setItem(storageKey, '1');
    } catch {
      return;
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Închide"
        className="absolute inset-0 bg-black/70"
        onClick={close}
      />
      <div className="relative w-full max-w-[520px] rounded-2xl border border-blue-500/30 bg-gradient-to-br from-gray-950 to-blue-950/70 p-6 shadow-2xl">
        <button
          type="button"
          aria-label="Închide"
          onClick={close}
          className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-200 hover:bg-white/10"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="text-center">
          <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-500/30 bg-blue-600/15">
            <Gift className="h-9 w-9 text-blue-300" />
          </div>
          <div className="text-xl md:text-2xl font-bold text-white leading-snug">
            Felicitări, ai primit un cod de reducere de{' '}
            <span className="text-3xl md:text-4xl font-extrabold text-blue-300">10%</span> pe toate serviciile din atelierul nostru.
          </div>
          <div className="mt-4 text-sm text-gray-300">Cod:</div>
          <div className="mt-2 inline-flex items-center justify-center rounded-xl border border-blue-500/40 bg-black/30 px-6 py-3 text-2xl md:text-3xl font-extrabold tracking-widest text-blue-300 tabular-nums">
            VLAD10
          </div>
          <div className="mt-4 text-xs md:text-sm text-gray-300">
            Codul se poate utiliza până pe <span className="font-semibold text-white">30.04.2026</span>.
          </div>
          <div className="mt-1 text-xs md:text-sm text-gray-300">
            Reducerea se va aplica direct în atelier.
          </div>
        </div>
      </div>
    </div>
  );
}
