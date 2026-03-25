import { Phone, MapPin, Clock } from 'lucide-react';
import { useMemo, useState } from 'react';
import type React from 'react';
import { serviceCatalog, vehicleTypeLabels } from './serviceCatalogData';
import type { Price, ServiceCategory, ServiceItem, VehicleType } from './serviceCatalogData';

type FinalCTAProps = {
  title?: React.ReactNode;
  mode?: 'full' | 'formOnly';
};

function VehicleTypeIcon({ type }: { type: VehicleType }) {
  const baseProps = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className: 'w-4 h-4'
  };

  if (type === 'hatchback') {
    return (
      <svg {...baseProps} aria-hidden="true">
        <rect x="3" y="11" width="18" height="5" rx="1.5" />
        <path d="M7 11l2-3h4l4 3" />
        <circle cx="7.5" cy="16.5" r="1.5" />
        <circle cx="16.5" cy="16.5" r="1.5" />
      </svg>
    );
  }

  if (type === 'sedan') {
    return (
      <svg {...baseProps} aria-hidden="true">
        <rect x="3" y="11" width="18" height="5" rx="1.5" />
        <path d="M7 11l2-3h6l2 3" />
        <circle cx="7.5" cy="16.5" r="1.5" />
        <circle cx="16.5" cy="16.5" r="1.5" />
      </svg>
    );
  }

  return (
    <svg {...baseProps} aria-hidden="true">
      <rect x="3" y="10.5" width="18" height="5.5" rx="1.5" />
      <path d="M6.5 10.5l2-4h7l2 4" />
      <circle cx="7.5" cy="16.5" r="1.5" />
      <circle cx="16.5" cy="16.5" r="1.5" />
    </svg>
  );
}

type ServiceIndexEntry = {
  categoryId: string;
  categoryLabel: string;
  categoryMode: ServiceCategory['mode'];
  item: ServiceItem;
};

const serviceIndex: Record<string, ServiceIndexEntry> = serviceCatalog.reduce((acc, category) => {
  for (const item of category.items) {
    acc[item.id] = {
      categoryId: category.id,
      categoryLabel: category.label,
      categoryMode: category.mode,
      item
    };
  }
  return acc;
}, {} as Record<string, ServiceIndexEntry>);

function getPriceAmount(price: Price, vehicleType: VehicleType): number | null {
  if (price.kind === 'quote') return null;
  if (price.amountByVehicle && price.amountByVehicle[vehicleType] != null) return price.amountByVehicle[vehicleType] as number;
  return price.amount;
}

function formatPrice(price: Price, vehicleType: VehicleType): string {
  if (price.kind === 'quote') return 'la cerere';
  const amount = getPriceAmount(price, vehicleType);
  if (amount == null) return 'la cerere';
  if (price.kind === 'from') return `de la ${amount} RON`;
  return `${amount} RON`;
}

function formatPriceForQuantity(item: ServiceItem, vehicleType: VehicleType, quantity: number): string {
  if (item.price.kind === 'quote') return 'la cerere';
  const amount = getPriceAmount(item.price, vehicleType);
  if (amount == null) return 'la cerere';
  const total = amount * Math.max(1, quantity);
  if (item.price.kind === 'from') return `de la ${total} RON`;
  return `${total} RON`;
}

export default function FinalCTA({ title, mode = 'full' }: FinalCTAProps) {
  const [date, setDate] = useState('');
  const [showCal, setShowCal] = useState(false);
  const [calMonth, setCalMonth] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [images, setImages] = useState<File[]>([]);
  const todayStr = new Date().toISOString().split('T')[0];
  const daysInMonth = useMemo(() => {
    const y = calMonth.getFullYear();
    const m = calMonth.getMonth();
    const first = new Date(y, m, 1);
    const startIdx = (first.getDay() + 6) % 7;
    const count = new Date(y, m + 1, 0).getDate();
    const arr: Array<{ label: string; value: string; disabled: boolean }> = [];
    for (let i = 0; i < startIdx; i++) {
      arr.push({ label: '', value: '', disabled: true });
    }
    for (let d = 1; d <= count; d++) {
      const ds = String(d).padStart(2, '0');
      const val = `${y}-${String(m + 1).padStart(2, '0')}-${ds}`;
      const wd = new Date(y, m, d).getDay();
      const isPast = val < todayStr;
      const isSunday = wd === 0;
      arr.push({ label: String(d), value: val, disabled: isPast || isSunday });
    }
    return arr;
  }, [calMonth, todayStr]);
  const slots = useMemo(() => {
    if (!date) return [];
    const d = new Date(`${date}T00:00:00`);
    const day = d.getDay();
    const ranges: Array<[number, number, number, number]> = [];
    if (day >= 1 && day <= 5) {
      ranges.push([8, 30, 12, 30], [13, 30, 17, 30]);
    } else if (day === 6) {
      ranges.push([8, 30, 12, 0]);
    } else {
      return [];
    }
    const out: string[] = [];
    for (const [sh, sm, eh, em] of ranges) {
      let h = sh;
      let m = sm;
      while (h < eh || (h === eh && m <= em)) {
        const hh = String(h).padStart(2, '0');
        const mm = String(m).padStart(2, '0');
        out.push(`${hh}:${mm}`);
        m += 30;
        if (m >= 60) {
          m -= 60;
          h += 1;
        }
      }
    }
    return out;
  }, [date]);
  const [vehicleType, setVehicleType] = useState<VehicleType>('hatchback');
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<string>(serviceCatalog[0]?.id ?? '');
  const [showEstimateDetails, setShowEstimateDetails] = useState(false);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const getQuantity = (serviceId: string) => {
    const q = quantities[serviceId];
    if (q != null) return q;
    const def = serviceIndex[serviceId]?.item.quantity?.default;
    return def ?? 1;
  };

  const selectedCountByCategory = useMemo(() => {
    const out: Record<string, number> = {};
    for (const serviceId of selectedServiceIds) {
      const categoryId = serviceIndex[serviceId]?.categoryId;
      if (!categoryId) continue;
      out[categoryId] = (out[categoryId] ?? 0) + 1;
    }
    return out;
  }, [selectedServiceIds]);

  const activeCategory = useMemo(() => {
    return serviceCatalog.find((c) => c.id === activeCategoryId) ?? serviceCatalog[0] ?? null;
  }, [activeCategoryId]);

  const estimate = useMemo(() => {
    const entries = selectedServiceIds.map((id) => serviceIndex[id]).filter(Boolean);
    const names = entries.map((e) => {
      const qty = quantities[e.item.id] ?? e.item.quantity?.default ?? 1;
      if (e.item.quantity && qty > 1) return `${e.item.label} x${qty}`;
      return e.item.label;
    });
    let total = 0;
    let hasQuote = false;
    let hasFrom = false;
    for (const entry of entries) {
      if (entry.item.price.kind === 'quote') {
        hasQuote = true;
        continue;
      }
      if (entry.item.price.kind === 'from') hasFrom = true;
      const amount = getPriceAmount(entry.item.price, vehicleType);
      if (amount != null) {
        const qty = entry.item.quantity ? (quantities[entry.item.id] ?? entry.item.quantity.default ?? 1) : 1;
        total += amount * qty;
      }
    }
    let text = 'Selectează servicii';
    if (entries.length) {
      if (hasQuote && total === 0) text = 'la cerere';
      else if (hasQuote) text = `de la ${total} RON + la cerere`;
      else if (hasFrom) text = `de la ${total} RON`;
      else text = `${total} RON`;
    }
    return { total, hasQuote, hasFrom, text, names };
  }, [quantities, selectedServiceIds, vehicleType]);

  const toggleService = (serviceId: string) => {
    const entry = serviceIndex[serviceId];
    if (!entry) return;
    setSelectedServiceIds((prev) => {
      const isSelected = prev.includes(serviceId);
      if (isSelected) {
        setQuantities((qPrev) => {
          const next: Record<string, number> = { ...qPrev };
          delete next[serviceId];
          return next;
        });
        return prev.filter((id) => id !== serviceId);
      }

      if (entry.categoryMode === 'single') {
        const removed = prev.filter((id) => serviceIndex[id]?.categoryId === entry.categoryId);
        setQuantities((qPrev) => {
          const next: Record<string, number> = { ...qPrev };
          for (const rid of removed) delete next[rid];
          if (entry.item.quantity && next[serviceId] == null) next[serviceId] = entry.item.quantity.default;
          return next;
        });
        const cleared = prev.filter((id) => serviceIndex[id]?.categoryId !== entry.categoryId);
        return [...cleared, serviceId];
      }

      setQuantities((qPrev) => {
        if (!entry.item.quantity) return qPrev;
        if (qPrev[serviceId] != null) return qPrev;
        return { ...qPrev, [serviceId]: entry.item.quantity.default };
      });
      return [...prev, serviceId];
    });
    setActiveCategoryId((current) => current || entry.categoryId);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const notes = String(data.get('notes') || '').trim();
    const pickedDate = String(data.get('date') || '').trim();
    const time = String(data.get('time') || '').trim();
    const servicesText = estimate.names.length ? estimate.names.join(', ') : '-';
    const textParts = [
      `Salut!`,
      name ? `Nume: ${name}` : null,
      email ? `Email: ${email}` : null,
      `Tip caroserie: ${vehicleTypeLabels[vehicleType]}`,
      `Servicii: ${servicesText}`,
      `Estimare: ${estimate.text}`,
      `Data dorită: ${pickedDate || '-'}`,
      `Ora dorită: ${time || '-'}`,
      notes ? `Detalii: ${notes}` : null
    ].filter(Boolean);
    const text = textParts.join(' | ');
    const nav = navigator as Navigator & {
      canShare?: (data: { files?: File[]; text?: string; title?: string }) => boolean;
      share?: (data: { files?: File[]; text?: string; title?: string }) => Promise<void>;
    };
    if (images.length && nav.canShare && nav.canShare({ files: images })) {
      if (nav.share) {
        void nav.share({ files: images, text, title: 'Vlad Detailing' });
      }
      return;
    }
    const url = `https://wa.me/40771133128?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };
  return (
    <section
      id={mode === 'formOnly' ? 'evaluare' : 'contact'}
      className={
        mode === 'formOnly'
          ? 'scroll-mt-28 min-h-screen bg-black text-white pt-32 pb-24'
          : 'py-16 bg-gradient-to-br from-blue-950 to-black text-white'
      }
    >
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {mode === 'formOnly' ? null : (
            <>
              <div className="text-center mb-10">
                <h2 className="text-5xl md:text-6xl font-bold mb-6">
                  {title ?? (
                    <>
                      Programează-ți mașina <span className="text-blue-400">acum.</span>
                    </>
                  )}
                </h2>
                <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
                <p className="text-xl text-gray-300 mb-4">
                  Transformă aspectul mașinii tale la standard premium
                </p>
                <p className="text-blue-400 font-semibold text-lg">
                  Locuri limitate săptămânal pentru lucrări premium.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-gradient-to-br from-gray-900 to-blue-950/30 p-5 rounded-xl border border-blue-500/30 text-center">
                  <Phone className="w-9 h-9 text-blue-400 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Telefon</h3>
                  <a href="tel:+40771133128" className="text-blue-400 hover:text-blue-300 text-lg">
                    +40 771 133 128
                  </a>
                </div>

                <div className="bg-gradient-to-br from-gray-900 to-blue-950/30 p-5 rounded-xl border border-blue-500/30 text-center">
                  <MapPin className="w-9 h-9 text-blue-400 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Locație</h3>
                  <a
                    href="https://www.google.com/maps/dir//Vlad+Detailing+SRL,+Strada+Brăilei+253A,+Tirighina,+800402+Galați,+România/@45.6599795,12.2048719,15z/data=!3m1!4b1!4m8!4m7!1m0!1m5!1m1!1s0x40b6dfafd630bdb3:0x2eabe8f3210d0748!2m2!1d27.9829933!2d45.406798?entry=ttu&g_ep=EgoyMDI2MDMwMi4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Galați, România
                  </a>
                </div>

                <div className="bg-gradient-to-br from-gray-900 to-blue-950/30 p-5 rounded-xl border border-blue-500/30 text-center">
                  <Clock className="w-9 h-9 text-blue-400 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Program</h3>
                  <div className="text-gray-300 text-sm grid grid-cols-[3.25rem_1fr] gap-x-2 gap-y-0.5 text-left w-fit mx-auto">
                    <div className="font-semibold text-white">L-V:</div>
                    <div className="text-center tabular-nums">08:30 - 12:30</div>
                    <div />
                    <div className="text-center tabular-nums">13:30 - 17:30</div>
                    <div className="font-semibold text-white">S:</div>
                    <div className="text-center tabular-nums">08:30 - 12:00</div>
                  </div>
                </div>
              </div>
            </>
          )}

          <div
            id={mode === 'formOnly' ? undefined : 'evaluare'}
            className={`${mode === 'formOnly' ? '' : 'scroll-mt-28 '}bg-gradient-to-br from-gray-900 to-blue-950/40 p-6 rounded-2xl border-2 border-blue-500/50`}
          >
            <h3 className="text-2xl font-bold mb-4 text-center">Solicită o evaluare gratuită</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nume</label>
                  <input
                    name="name"
                    type="text"
                    placeholder="Numele tău"
                    className="w-full px-4 py-2.5 rounded-lg bg-black/50 border border-blue-500/30 focus:border-blue-500 focus:outline-none text-white placeholder-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email (opțional)</label>
                  <input
                    name="email"
                    type="email"
                    placeholder="email@exemplu.ro"
                    className="w-full px-4 py-2.5 rounded-lg bg-black/50 border border-blue-500/30 focus:border-blue-500 focus:outline-none text-white placeholder-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Data dorită</label>
                  <div className="relative">
                    <input type="hidden" name="date" value={date} />
                    <button
                      type="button"
                      onClick={() => setShowCal((s) => !s)}
                      className="w-full h-11 px-4 py-2.5 rounded-lg bg-black/50 border border-blue-500/30 focus:border-blue-500 focus:outline-none text-white text-left"
                    >
                      {date || 'Selectează data'}
                    </button>
                    {showCal && (
                      <div className="absolute z-50 mt-2 w-80 bg-black/90 border border-blue-500/40 rounded-xl p-4 shadow-xl">
                        <div className="flex items-center justify-between mb-3">
                          <button
                            type="button"
                            onClick={() =>
                              setCalMonth((cm) => new Date(cm.getFullYear(), cm.getMonth() - 1, 1))
                            }
                            className="px-3 py-1 rounded-md bg-blue-600 text-white"
                          >
                            ‹
                          </button>
                          <div className="text-white font-semibold">
                            {calMonth.toLocaleString('ro-RO', { month: 'long', year: 'numeric' })}
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              setCalMonth((cm) => new Date(cm.getFullYear(), cm.getMonth() + 1, 1))
                            }
                            className="px-3 py-1 rounded-md bg-blue-600 text-white"
                          >
                            ›
                          </button>
                        </div>
                        <div className="grid grid-cols-7 gap-2 text-center text-gray-300 text-sm mb-2">
                          <div>Lu</div>
                          <div>Ma</div>
                          <div>Mi</div>
                          <div>Jo</div>
                          <div>Vi</div>
                          <div>Sâ</div>
                          <div>Du</div>
                        </div>
                        <div className="grid grid-cols-7 gap-2">
                          {daysInMonth.map((d, idx) => (
                            <button
                              key={idx}
                              type="button"
                              disabled={d.disabled || !d.value}
                              onClick={() => {
                                if (!d.value || d.disabled) return;
                                setDate(d.value);
                                setShowCal(false);
                              }}
                              className={`h-10 rounded-md ${
                                !d.value
                                  ? 'opacity-0'
                                  : d.disabled
                                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                                  : d.value === date
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-900 text-gray-200 hover:bg-blue-700 hover:text-white'
                              }`}
                            >
                              {d.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Ora dorită</label>
                  <select
                    name="time"
                    disabled={!slots.length}
                    className="w-full h-11 px-4 py-2.5 rounded-lg bg-black/50 border border-blue-500/30 focus:border-blue-500 focus:outline-none text-white"
                  >
                    <option value="">{slots.length ? 'Selectează ora' : 'Selectează întâi data'}</option>
                    {slots.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium mb-2">Tip caroserie</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['hatchback', 'sedan', 'suv'] as VehicleType[]).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setVehicleType(t)}
                      className={`h-9 rounded-lg border transition-colors font-semibold inline-flex items-center justify-center gap-1.5 text-xs ${
                        vehicleType === t
                          ? 'bg-blue-600 text-white border-blue-500'
                          : 'bg-black/50 text-gray-200 border-blue-500/30 hover:border-blue-500/60'
                      }`}
                    >
                      <VehicleTypeIcon type={t} />
                      {vehicleTypeLabels[t]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium mb-2">Servicii (selecție multiplă)</label>
                <div className="flex flex-wrap gap-1.5">
                  {serviceCatalog.map((category) => {
                    const isActive = activeCategory?.id === category.id;
                    const count = selectedCountByCategory[category.id] ?? 0;
                    return (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => setActiveCategoryId(category.id)}
                        className={`h-8 px-2 rounded-lg border whitespace-nowrap inline-flex items-center gap-1.5 transition-colors text-xs ${
                          isActive
                            ? 'bg-blue-600 text-white border-blue-500'
                            : 'bg-black/40 text-gray-200 border-white/10 hover:border-blue-500/60'
                        }`}
                      >
                        <span className="font-semibold leading-none">{category.label}</span>
                        {count ? (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-red-600 text-white shadow-md shadow-red-500/30 border border-red-400/30 leading-none">
                            {count}
                          </span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>

                {activeCategory ? (
                  <div className="mt-3 bg-black/30 border border-white/5 rounded-xl p-3">
                    <div className="text-xs text-gray-400 mb-2">
                      {activeCategory.mode === 'single' ? 'Alege un pachet' : 'Poți alege mai multe servicii'}
                    </div>
                    <div
                      className={`space-y-2 ${
                        activeCategory.id === 'retapitari' ? '' : 'max-h-60 overflow-y-auto pr-1'
                      }`}
                    >
                      {activeCategory.items.map((item) => {
                        const checked = selectedServiceIds.includes(item.id);
                        const qty = item.quantity ? getQuantity(item.id) : 1;
                        return (
                          <label
                            key={item.id}
                            className="flex items-start justify-between gap-4 p-2 rounded-lg bg-black/40 border border-white/5 cursor-pointer"
                          >
                            <div className="flex items-start gap-3">
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => toggleService(item.id)}
                                className="mt-1 w-4 h-4 accent-blue-500"
                              />
                              <div>
                                <div className="font-medium text-white leading-snug">{item.label}</div>
                                {item.description ? <div className="text-xs text-gray-400">{item.description}</div> : null}
                                {checked && item.quantity ? (
                                  <div className="mt-2 inline-flex items-center gap-2 text-xs text-gray-300">
                                    <span className="text-gray-400">Cantitate:</span>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setQuantities((prev) => {
                                          const current = prev[item.id] ?? item.quantity?.default ?? 1;
                                          const next = Math.max(item.quantity!.min, current - item.quantity!.step);
                                          return { ...prev, [item.id]: next };
                                        });
                                      }}
                                      className="h-6 w-6 rounded-md bg-white/10 hover:bg-white/15 border border-white/10"
                                    >
                                      −
                                    </button>
                                    <span className="min-w-6 text-center font-semibold">{qty}</span>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setQuantities((prev) => {
                                          const current = prev[item.id] ?? item.quantity?.default ?? 1;
                                          const next = Math.min(item.quantity!.max, current + item.quantity!.step);
                                          return { ...prev, [item.id]: next };
                                        });
                                      }}
                                      className="h-6 w-6 rounded-md bg-white/10 hover:bg-white/15 border border-white/10"
                                    >
                                      +
                                    </button>
                                    <span className="text-gray-400">{item.quantity.unitLabel}</span>
                                  </div>
                                ) : null}
                              </div>
                            </div>
                            <div className="text-right text-sm font-bold text-blue-400">
                              {item.quantity ? formatPriceForQuantity(item, vehicleType, qty) : formatPrice(item.price, vehicleType)}
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ) : null}

                <div className="mt-3 p-3 rounded-xl bg-blue-600/10 border border-blue-500/20">
                  <div className="flex items-center justify-between gap-4">
                    <div className="font-semibold text-white">Estimare</div>
                    <div className="text-lg font-bold text-blue-400">{estimate.text}</div>
                  </div>
                  {estimate.names.length ? (
                    <div className="mt-2 text-sm text-gray-300">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          {estimate.names.length <= 3
                            ? estimate.names.join(', ')
                            : `${estimate.names.length} servicii selectate`}
                        </div>
                        {estimate.names.length > 3 ? (
                          <button
                            type="button"
                            onClick={() => setShowEstimateDetails((s) => !s)}
                            className="text-blue-300 hover:text-blue-200 text-xs font-semibold"
                          >
                            {showEstimateDetails ? 'Ascunde' : 'Vezi'}
                          </button>
                        ) : null}
                      </div>
                      {showEstimateDetails ? (
                        <div className="mt-2 text-xs text-gray-300">
                          {estimate.names.join(', ')}
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                  <div className="mt-2 text-xs text-gray-400">
                    Estimarea este orientativă. Prețul final se stabilește după evaluarea fizică la atelier sau pe baza pozelor.
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Detalii (opțional)</label>
                <textarea
                  name="notes"
                  rows={2}
                  placeholder="Ex: menționează starea interiorului/exteriorului sau alte detalii"
                  className="w-full px-4 py-2.5 rounded-lg bg-black/50 border border-blue-500/30 focus:border-blue-500 focus:outline-none text-white placeholder-gray-500 resize-none"
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Poze (opțional)</label>
                <input
                  name="photos"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) =>
                    setImages(
                      e.target.files
                        ? Array.from(e.target.files)
                            .filter((f) => f.type.startsWith('image/'))
                            .slice(0, 10)
                        : []
                    )
                  }
                  className="w-full px-4 py-2.5 rounded-lg bg-black/50 border border-blue-500/30 focus:border-blue-500 focus:outline-none text-white"
                />
                {images.length > 0 && (
                  <div className="mt-3 flex gap-2 overflow-x-auto">
                    {images.map((file, idx) => (
                      <img
                        key={idx}
                        src={URL.createObjectURL(file)}
                        alt="previzualizare"
                        className="h-16 w-24 object-cover rounded-md border border-blue-500/30 flex-shrink-0"
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-7 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-6 h-6"
                    fill="none"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="11" fill="#25D366" />
                    <path
                      fill="#FFFFFF"
                      d="M16.6 14.4c-.2-.1-1.2-.6-1.4-.7-.2-.1-.3-.1-.5.1l-.7.8c-.1.1-.3.1-.4 0-.2-.1-1.1-.4-2.1-1.3-.8-.7-1.3-1.6-1.4-1.9-.1-.2 0-.3.1-.4l.6-.7c.1-.1.2-.3.1-.5-.1-.2-.6-1.4-.7-1.6-.2-.4-.4-.3-.5-.3h-.4c-.1 0-.4 0-.6.2-.2.2-.9.8-.9 2 0 1.1.8 2.1.9 2.2.1.1 1.6 2.5 3.9 3.5.4.2.8.3 1.1.5.5.2.9.2 1.2.1.4-.1 1.2-.5 1.4-.9.1-.3.1-.6 0-.7-.1-.1-.3-.2-.5-.3z"
                    />
                    <circle cx="12" cy="12" r="11" stroke="#FFFFFF" strokeWidth="0.75" fill="none" />
                  </svg>
                  Trimite cerere pe WhatsApp
                </button>
                <a
                  href="tel:0771133128"
                  className="bg-white/10 hover:bg-white/20 text-white px-7 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center"
                >
                  Sună-ne: 0771 133 128
                </a>
              </div>
            </form>
          </div>

          {mode === 'formOnly' ? null : (
            <div className="mt-12 text-center text-gray-400">
              <p className="text-sm">
                © 2024 Vlad Detailing. Atelier de protecție și restaurare estetică auto la Standard european.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
