import Hero from './components/Hero';
import Story from './components/Story';
import Services from './components/Services';
import Problem from './components/Problem';
import WhyUs from './components/WhyUs';
import Process from './components/Process';
import DetailingInterior from './components/DetailingInterior';
import DetailingExterior from './components/DetailingExterior';
import SocialProof from './components/SocialProof';
import FinalCTA from './components/FinalCTA';
import SocialDock from './components/SocialDock';
import WrappingPpf from './components/WrappingPpf';
import FolieSolara from './components/FolieSolara';
import PolishFaruri from './components/PolishFaruri';
import RevopsirePiele from './components/RevopsirePiele';
import Retapitari from './components/Retapitari';
import ContactPage from './components/ContactPage';
import TermsConditionsPage from './components/TermsConditionsPage';
import ChatbotWidget from './components/ChatbotWidget';
import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

type PageKey =
  | 'acasa'
  | 'despre-noi'
  | 'galerie'
  | 'servicii'
  | 'evaluare'
  | 'contact'
  | 'termeni-conditii'
  | 'detailing-interior'
  | 'detailing-exterior'
  | 'servicii-wrapping-ppf'
  | 'servicii-folie-solara-geamuri'
  | 'servicii-polish-faruri'
  | 'servicii-revopsire-piele'
  | 'servicii-retapitari';

const menuItems: Array<{ key: PageKey; label: string }> = [
  { key: 'acasa', label: 'ACASĂ' },
  { key: 'despre-noi', label: 'DESPRE NOI' },
  { key: 'galerie', label: 'GALERIE' },
  { key: 'servicii', label: 'SERVICII' },
  { key: 'contact', label: 'CONTACT' }
];

const serviceSubmenu = [
  { label: 'Detailing interior', targetId: 'detailing-interior' },
  { label: 'Detailing exterior', targetId: 'detailing-exterior' },
  { label: 'Wrapping / PPF', targetId: 'servicii-wrapping-ppf' },
  { label: 'Folie solară geamuri', targetId: 'servicii-folie-solara-geamuri' },
  { label: 'Polish faruri', targetId: 'servicii-polish-faruri' },
  { label: 'Revopsire piele', targetId: 'servicii-revopsire-piele' },
  { label: 'Retapițări', targetId: 'servicii-retapitari' }
];

const pageMeta: Record<PageKey, { title: string; description: string }> = {
  acasa: {
    title: 'Vlad Detailing | Detailing Auto Galați - Polish, Ceramică, PPF',
    description:
      'Vlad Detailing Galați: detailing interior/exterior, polish, protecție ceramică, PPF, wrapping, folie solară omologată RAR, retapițări și revopsire piele.'
  },
  'despre-noi': {
    title: 'Despre Noi | Vlad Detailing Galați',
    description:
      'Povestea Vlad Detailing din Galați: experiență, standarde premium și atenție la detalii pentru rezultate impecabile.'
  },
  galerie: {
    title: 'Galerie Lucrări | Vlad Detailing Galați',
    description:
      'Galerie cu lucrări Vlad Detailing: rezultate înainte/după, detailing interior/exterior, PPF, wrapping, folie solară și restaurări.'
  },
  servicii: {
    title: 'Servicii | Vlad Detailing Galați',
    description:
      'Servicii Vlad Detailing Galați: detailing interior/exterior, polish, protecție ceramică, PPF, wrapping, folie solară omologată RAR, retapițări, revopsire piele.'
  },
  evaluare: {
    title: 'Cere Evaluare Gratuită | Vlad Detailing Galați',
    description:
      'Cere o evaluare gratuită pentru detailing auto în Galați. Spune-ne ce ai nevoie și îți recomandăm soluția potrivită.'
  },
  contact: {
    title: 'Contact | Vlad Detailing Galați',
    description:
      'Contact Vlad Detailing Galați: telefon, email, locație, program și navigație Google Maps/Waze.'
  },
  'termeni-conditii': {
    title: 'Termeni & Condiții | Vlad Detailing',
    description:
      'Termeni și condiții, politica de confidențialitate, protecția datelor personale și politica cookie pentru vladdetailing.ro.'
  },
  'detailing-interior': {
    title: 'Detailing Interior Galați | Vlad Detailing',
    description:
      'Detailing interior în Galați: curățare și igienizare completă, curățare tapițerie/piele, ozonizare și pachete premium.'
  },
  'detailing-exterior': {
    title: 'Detailing Exterior Galați | Vlad Detailing',
    description:
      'Detailing exterior în Galați: polish 1-3 etape, corecție zgârieturi, decontaminare, protecție ceramică și tratamente hidrofobe.'
  },
  'servicii-wrapping-ppf': {
    title: 'Wrapping / PPF Galați | Vlad Detailing',
    description:
      'Wrapping și PPF în Galați: colantare auto, folie protecție caroserie, protecție vopsea și schimbare culoare cu finisaj premium.'
  },
  'servicii-folie-solara-geamuri': {
    title: 'Folie Solară Omologată RAR Galați | Vlad Detailing',
    description:
      'Montaj folie solară auto omologată RAR în Galați: protecție UV, confort termic, intimitate și folii premium Global.'
  },
  'servicii-polish-faruri': {
    title: 'Polish Faruri Galați | Vlad Detailing',
    description:
      'Polish faruri în Galați: restaurare claritate, recondiționare faruri matuite și protecție ceramică/PPF pentru durabilitate.'
  },
  'servicii-revopsire-piele': {
    title: 'Revopsire Piele Auto Galați | Vlad Detailing',
    description:
      'Revopsire piele auto în Galați: restaurare volan, scaune și banchete, recondiționare piele și refacere culori cu finisaj premium.'
  },
  'servicii-retapitari': {
    title: 'Retapițări Auto Galați | Vlad Detailing',
    description:
      'Retapițări auto în Galați: plafon, fețe uși, scaune, volan, alcantara și materiale premium pentru un interior ca nou.'
  }
};


const LazyGalleryPage = lazy(() => import('./components/GalleryPage'));

function getPageFromHash(): PageKey {
  const hash = window.location.hash.replace('#', '') as PageKey;
  const validKeys: PageKey[] = [
    'acasa',
    'despre-noi',
    'galerie',
    'servicii',
    'evaluare',
    'contact',
    'termeni-conditii',
    'detailing-interior',
    'detailing-exterior',
    'servicii-wrapping-ppf',
    'servicii-folie-solara-geamuri',
    'servicii-polish-faruri',
    'servicii-revopsire-piele',
    'servicii-retapitari'
  ];
  return validKeys.includes(hash) ? hash : 'acasa';
}

function App() {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<PageKey>(getPageFromHash);
  const [headerOpacity, setHeaderOpacity] = useState(0);
  const [isServicesSubmenuOpen, setIsServicesSubmenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const servicesRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const meta = pageMeta[currentPage] ?? pageMeta.acasa;
    const baseUrl = 'https://www.vladdetailing.ro';
    const url = currentPage === 'acasa' ? `${baseUrl}/` : `${baseUrl}/#${currentPage}`;

    document.title = meta.title;

    const upsertMeta = (attr: 'name' | 'property', key: string, content: string) => {
      const selector = `meta[${attr}="${key}"]`;
      const existing = document.head.querySelector<HTMLMetaElement>(selector);
      if (existing) {
        existing.setAttribute('content', content);
        return;
      }
      const el = document.createElement('meta');
      el.setAttribute(attr, key);
      el.setAttribute('content', content);
      document.head.appendChild(el);
    };

    const upsertLink = (rel: string, href: string) => {
      const selector = `link[rel="${rel}"]`;
      const existing = document.head.querySelector<HTMLLinkElement>(selector);
      if (existing) {
        existing.setAttribute('href', href);
        return;
      }
      const el = document.createElement('link');
      el.setAttribute('rel', rel);
      el.setAttribute('href', href);
      document.head.appendChild(el);
    };

    upsertMeta('name', 'description', meta.description);
    upsertMeta('property', 'og:title', meta.title);
    upsertMeta('property', 'og:description', meta.description);
    upsertMeta('property', 'og:url', url);
    upsertMeta('name', 'twitter:title', meta.title);
    upsertMeta('name', 'twitter:description', meta.description);
    upsertLink('canonical', url);
  }, [currentPage]);

  useEffect(() => {
    const handleHashChange = () => setCurrentPage(getPageFromHash());
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const id = window.location.hash.replace('#', '').trim();
    if (!id) return;
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [currentPage]);

  

  useEffect(() => {
    if (currentPage === 'evaluare') return;
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [currentPage]);

  useEffect(() => {
    const handleScroll = () => {
      const progress = Math.min(window.scrollY / 180, 1);
      setHeaderOpacity(0.85 * progress);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (currentPage !== 'evaluare') return;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }, [currentPage]);

  useEffect(() => {
    const process = (imgEl: HTMLImageElement) => {
      const c = document.createElement('canvas');
      c.width = imgEl.naturalWidth;
      c.height = imgEl.naturalHeight;
      const ctx = c.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(imgEl, 0, 0);
      const d = ctx.getImageData(0, 0, c.width, c.height);
      let minX = c.width;
      let minY = c.height;
      let maxX = -1;
      let maxY = -1;
      for (let y = 0; y < c.height; y++) {
        for (let x = 0; x < c.width; x++) {
          const i = (y * c.width + x) * 4;
          const r = d.data[i];
          const g = d.data[i + 1];
          const b = d.data[i + 2];
          const isBlue = b > 120 && b - r > 20 && b - g > 20;
          if (!isBlue) {
            d.data[i + 3] = 0;
          } else {
            if (x < minX) minX = x;
            if (y < minY) minY = y;
            if (x > maxX) maxX = x;
            if (y > maxY) maxY = y;
          }
        }
      }
      ctx.putImageData(d, 0, 0);
      if (maxX >= 0) {
        const boxW = maxX - minX + 1;
        const boxH = maxY - minY + 1;
        const c2 = document.createElement('canvas');
        c2.width = boxW;
        c2.height = boxH;
        const ctx2 = c2.getContext('2d');
        if (!ctx2) return;
        ctx2.drawImage(c, minX, minY, boxW, boxH, 0, 0, boxW, boxH);
        setLogoUrl(c2.toDataURL('image/png'));
      } else {
        setLogoUrl(null);
      }
    };
    const tryLoad = (src: string, onFail: () => void) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = src;
      img.onload = () => process(img);
      img.onerror = onFail;
    };
    tryLoad('/Images/LOGO.webp', () => {
      tryLoad('/Images/LOGO.PNG', () => {
        setLogoUrl(null);
      });
    });
  }, []);

  const renderPage = () => {
    const homeContent = (
      <>
        <Hero />
        <Services />
        <Problem />
        <WhyUs />
        <Process />
        <SocialProof />
        <FinalCTA
          title={
            <>
              Mașina ta are nevoie de <span className="text-blue-400">noi</span>.
            </>
          }
        />
      </>
    );

    if (currentPage === 'acasa') {
      return homeContent;
    }

    if (currentPage === 'evaluare') {
      return <FinalCTA mode="formOnly" />;
    }

    if (currentPage === 'contact') {
      return <ContactPage />;
    }

    if (currentPage === 'termeni-conditii') {
      return <TermsConditionsPage />;
    }

    if (currentPage === 'despre-noi') {
      return (
        <div id="despre-noi">
          <Story />
          <WhyUs />
          <div className="py-16 text-center">
            <h3 className="text-2xl font-bold mb-6 text-white">Vrei o evaluare?</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#evaluare"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
              >
                Cere Evaluare Gratuită
              </a>
              <a
                href="tel:0771133128"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors backdrop-blur-sm"
              >
                Sună-ne: 0771 133 128
              </a>
            </div>
          </div>
        </div>
      );
    }

    if (currentPage === 'galerie') {
      return (
        <Suspense
          fallback={
            <div className="min-h-screen bg-black text-white pt-32 pb-24">
              <div className="container mx-auto px-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">Se încarcă galeria...</div>
                  <div className="mt-4 text-gray-400">Te rugăm așteaptă o secundă.</div>
                </div>
              </div>
            </div>
          }
        >
          <LazyGalleryPage />
        </Suspense>
      );
    }

    if (currentPage === 'servicii') {
      // Dacă utilizatorul ajunge pe pagina 'servicii', îl redirecționăm către 'detailing-interior'
      window.location.hash = 'detailing-interior';
      return <DetailingInterior />;
    }

    if (currentPage === 'detailing-interior') {
      return <DetailingInterior />;
    }

    if (currentPage === 'detailing-exterior') {
      return <DetailingExterior />;
    }

    if (currentPage === 'servicii-wrapping-ppf') {
      return <WrappingPpf />;
    }

    if (currentPage === 'servicii-folie-solara-geamuri') {
      return <FolieSolara />;
    }

    if (currentPage === 'servicii-polish-faruri') {
      return <PolishFaruri />;
    }

    if (currentPage === 'servicii-revopsire-piele') {
      return <RevopsirePiele />;
    }

    if (currentPage === 'servicii-retapitari') {
      return <Retapitari />;
    }

    return (
      <div id="contact">
        <FinalCTA />
      </div>
    );
  };

  useEffect(() => {
    if (!isServicesSubmenuOpen) return;
    const onDocClick = (e: MouseEvent) => {
      const el = servicesRef.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) {
        setIsServicesSubmenuOpen(false);
      }
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, [isServicesSubmenuOpen]);

  const effectiveHeaderOpacity = isServicesSubmenuOpen ? Math.max(headerOpacity, 0.9) : headerOpacity;
  const effectiveHeaderBlur = isServicesSubmenuOpen ? Math.max(headerOpacity * 8, 12) : headerOpacity * 8;

  return (
    <div className="relative min-h-screen bg-black">
      <header
        className="fixed top-0 left-0 right-0 z-[120] transition-[background-color,backdrop-filter] duration-150"
        style={{
          backgroundColor: `rgba(0, 0, 0, ${effectiveHeaderOpacity})`,
          backdropFilter: `blur(${effectiveHeaderBlur}px)`
        }}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="h-24 flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-0 min-w-0">
              <button
                type="button"
                aria-label="Deschide meniul"
                className="md:hidden inline-flex items-center justify-center bg-black/70 hover:bg-black text-white px-2 py-1.5 rounded-full shadow-xl border border-blue-500/30 transition-transform hover:scale-[1.02]"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </button>
              {logoUrl && (
                <a href="#acasa" aria-label="Acasă">
                  <img
                    src={logoUrl}
                    alt="Vlad Detailing Logo"
                    className="h-14 md:h-[5.5rem] w-auto object-contain max-w-[42vw]"
                  />
                </a>
              )}
            </div>
            <nav className="hidden md:block">
              <div className="max-w-full whitespace-nowrap px-1 no-scrollbar overflow-x-auto md:overflow-visible overflow-y-visible">
              <ul className="flex items-center justify-center gap-3 md:gap-7 lg:gap-10 text-[10px] md:text-sm font-semibold tracking-wide overflow-visible">
                {menuItems.map((item) =>
                  item.key === 'servicii' ? (
                    <li
                      key={item.key}
                      className="relative group"
                      ref={servicesRef}
                      onMouseEnter={() => setIsServicesSubmenuOpen(true)}
                      onMouseLeave={() => setIsServicesSubmenuOpen(false)}
                      onFocus={() => setIsServicesSubmenuOpen(true)}
                    >
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setIsServicesSubmenuOpen(!isServicesSubmenuOpen);
                        }}
                        aria-haspopup="true"
                        aria-expanded={isServicesSubmenuOpen}
                        className={`inline-flex items-center gap-1.5 transition-colors drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] bg-transparent border-none p-0 cursor-pointer ${
                          currentPage === item.key ? 'text-blue-400' : 'text-white hover:text-blue-300'
                        }`}
                      >
                        <span>{item.label}</span>
                        <span className="text-[9px] md:text-[11px] leading-none transition-transform group-hover:translate-y-[1px]">▼</span>
                      </button>
                      <div 
                        className={`absolute left-1/2 -translate-x-1/2 top-full pt-3 z-[999] transition-all duration-200
                          ${isServicesSubmenuOpen ? 'opacity-100 visible translate-y-0 pointer-events-auto' : 'opacity-0 invisible -translate-y-2 pointer-events-none'}
                          group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto
                        `}
                      >
                        <ul className="min-w-[260px] bg-black/90 backdrop-blur-md p-3 space-y-1 shadow-2xl text-center rounded-lg border border-white/10">
                          {serviceSubmenu.map((submenuItem) => (
                            <li key={submenuItem.targetId}>
                              <a
                                href={`#${submenuItem.targetId}`}
                                onClick={() => setIsServicesSubmenuOpen(false)}
                                className="block px-3 py-2 rounded-md text-sm text-gray-200 hover:text-blue-300 hover:bg-white/5 transition-colors uppercase tracking-wide"
                              >
                                {submenuItem.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  ) : (
                    <li key={item.key}>
                      <a
                        href={`#${item.key}`}
                        onMouseEnter={item.key === 'galerie' ? () => void import('./components/GalleryPage') : undefined}
                        onFocus={item.key === 'galerie' ? () => void import('./components/GalleryPage') : undefined}
                        className={`transition-colors drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] ${
                          currentPage === item.key ? 'text-blue-400' : 'text-white hover:text-blue-300'
                        }`}
                      >
                        {item.label}
                      </a>
                    </li>
                  )
                )}
              </ul>
              </div>
            </nav>
            <div className="flex items-center justify-end gap-2 md:gap-3 flex-shrink-0">
              <a
                href="tel:0771133128"
                className="inline-flex items-center justify-center bg-black/70 hover:bg-black text-white px-2 md:px-4 py-1.5 md:py-2 rounded-full shadow-xl border border-blue-500/30 font-semibold text-[10px] md:text-sm transition-transform hover:scale-[1.02] max-w-[36vw] md:max-w-none overflow-hidden whitespace-nowrap truncate"
              >
                0771 133 128
              </a>
              <SocialDock inline />
            </div>
          </div>
        </div>
      </header>
      <div
        className={`fixed inset-0 z-[130] bg-black/60 transition-opacity ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setMobileMenuOpen(false)}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-[140] w-72 max-w-[80%] bg-black/95 backdrop-blur-md border-r border-white/10 transform transition-transform ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="h-24 px-4 flex items-center justify-between border-b border-white/10">
          <div className="text-white font-bold tracking-wide">Meniu</div>
          <button
            type="button"
            aria-label="Închide meniul"
            className="inline-flex items-center justify-center p-2 rounded-lg border border-white/10 bg-white/10 text-white"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="p-3">
          <ul className="space-y-1">
            {menuItems.map((item) =>
              item.key === 'servicii' ? (
                <li key={item.key} className="mb-2">
                  <button
                    type="button"
                    onClick={() => setMobileServicesOpen((v) => !v)}
                    aria-expanded={mobileServicesOpen}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-md text-sm text-gray-200 uppercase tracking-wide hover:text-blue-300 hover:bg-white/5 transition-colors"
                  >
                    <span>SERVICII</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <ul
                    className={`pl-1 space-y-1 overflow-hidden transition-all ${
                      mobileServicesOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    {serviceSubmenu.map((submenuItem) => (
                      <li key={submenuItem.targetId}>
                        <a
                          href={`#${submenuItem.targetId}`}
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setMobileServicesOpen(false);
                          }}
                          className="block px-3 py-2 rounded-md text-sm text-gray-200 hover:text-blue-300 hover:bg-white/5 transition-colors uppercase tracking-wide"
                        >
                          {submenuItem.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.key}>
                  <a
                    href={`#${item.key}`}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setMobileServicesOpen(false);
                    }}
                    className="block px-3 py-2 rounded-md text-sm text-gray-200 hover:text-blue-300 hover:bg-white/5 transition-colors uppercase tracking-wide"
                  >
                    {item.label}
                  </a>
                </li>
              )
            )}
          </ul>
          <div className="mt-4 px-3">
            <a
              href="tel:0771133128"
              onClick={() => {
                setMobileMenuOpen(false);
                setMobileServicesOpen(false);
              }}
              className="inline-flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow border border-blue-500/30 font-semibold text-sm transition-colors"
            >
              0771 133 128
            </a>
          </div>
        </nav>
      </aside>

      {renderPage()}
      <ChatbotWidget />
      <footer className="py-8 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm md:text-base text-gray-300">
            <a href="#despre-noi" className="hover:text-blue-300 transition-colors">
              Despre Noi
            </a>
            <span className="text-gray-500">|</span>
            <a href="https://anpc.ro" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors">
              ANPC
            </a>
            <span className="text-gray-500">|</span>
            <a href="#termeni-conditii" className="hover:text-blue-300 transition-colors">
              Termeni & Condiții
            </a>
            <span className="text-gray-500">|</span>
            <a href="#contact" className="hover:text-blue-300 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
