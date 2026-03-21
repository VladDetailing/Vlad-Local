import { BadgeCheck, CircleDashed, Shield, Sofa, Truck, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';

const workshopImages: string[] = [
  '/Retapitari/IMG_7020.webp',
  '/Retapitari/IMG_7022.webp',
  '/Retapitari/IMG_7024.webp',
  '/Retapitari/IMG_7026.webp',
  '/Retapitari/IMG_7028.webp',
  '/Retapitari/IMG_7029.webp'
];

export default function Retapitari() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Retapițări <span className="text-blue-500">Auto</span>
          </h1>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Retapițări profesionale pentru plafon, stâlpi, volan și scaune, cu materiale premium și finisaje curate.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch mb-20"
        >
          <div className="space-y-8">
            <div className="bg-gray-900/40 p-8 rounded-2xl border border-gray-800">
              <h3 className="text-2xl font-bold mb-6">Transformă interiorul</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Plafon căzut, dezlipit sau pătat? Sau vrei doar o schimbare de look?
                <span className="text-blue-400 font-semibold"> Vlad Detailing</span> este alegerea potrivită.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Retapițăm cu <span className="text-blue-400 font-semibold">materiale premium din Italia</span>, în{' '}
                <span className="text-blue-400 font-semibold">textil</span> sau <span className="text-blue-400 font-semibold">alcantara</span>,
                cu finisaj curat și aspect premium.
              </p>
            </div>

            <div className="bg-gray-900/40 p-8 rounded-2xl border border-gray-800">
              <h3 className="text-2xl font-bold mb-6">Lucrări din atelier</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {(workshopImages.length > 0 ? workshopImages : Array.from({ length: 6 }, () => '')).map((src, index) =>
                  src ? (
                    <div
                      key={src}
                      className="relative aspect-square bg-gray-800 rounded-xl overflow-hidden border border-gray-700"
                    >
                      <img src={src} alt={`Lucrare retapițare ${index + 1}`} className="w-full h-full object-cover object-center" loading="lazy" decoding="async" />
                    </div>
                  ) : (
                    <div
                      key={`placeholder-${index}`}
                      className="relative aspect-square bg-gray-900/30 rounded-xl border border-gray-800 border-dashed flex items-center justify-center"
                    >
                      <span className="text-gray-500 text-sm">Adaugă poză</span>
                    </div>
                  )
                )}
              </div>

              <div className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-blue-600/15 border border-blue-500/30">
                    <div className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                      <BadgeCheck className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-white">Garanție pe lucrare</div>
                      <div className="text-sm text-gray-300">1 an</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="bg-white/10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Wrench className="w-5 h-5 text-blue-300" />
                    </div>
                    <div>
                      <div className="font-bold text-white">Demontaj și montaj</div>
                      <div className="text-sm text-gray-300">inclus</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="h-full flex flex-col">
            <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-gray-800 relative overflow-hidden h-full flex flex-col">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <h3 className="text-2xl font-bold mb-8 text-center relative z-10">Lista de Prețuri</h3>

              <div className="space-y-6 relative z-10 flex-1">
                <div className="flex justify-between items-center p-5 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="bg-gray-900 p-3 rounded-lg group-hover:bg-blue-900/20 transition-colors">
                      <CircleDashed className="w-6 h-6 text-gray-400 group-hover:text-blue-500 transition-colors" />
                    </div>
                    <div>
                      <span className="font-bold text-lg block">Retapițare Plafon</span>
                      <span className="text-sm text-gray-400">Material textil / alcantara • Durată: 1 zi</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500 block">de la</span>
                    <span className="text-2xl font-bold text-blue-400">700 RON</span>
                  </div>
                </div>

                <div className="flex justify-between items-center p-5 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="bg-gray-900 p-3 rounded-lg group-hover:bg-blue-900/20 transition-colors">
                      <Shield className="w-6 h-6 text-gray-400 group-hover:text-blue-500 transition-colors" />
                    </div>
                    <div>
                      <span className="font-bold text-lg block">Retapițare Stâlpi</span>
                      <span className="text-sm text-gray-400">preț per stâlp • Durată: 1 zi</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500 block">de la</span>
                    <span className="text-2xl font-bold text-blue-400">130 RON</span>
                  </div>
                </div>

                <div className="flex justify-between items-center p-5 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="bg-gray-900 p-3 rounded-lg group-hover:bg-blue-900/20 transition-colors">
                      <Shield className="w-6 h-6 text-gray-400 group-hover:text-blue-500 transition-colors" />
                    </div>
                    <div>
                      <span className="font-bold text-lg block">Retapițare Fețe de Uși</span>
                      <span className="text-sm text-gray-400">preț per față de ușă</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500 block">de la</span>
                    <span className="text-2xl font-bold text-blue-400">200 RON</span>
                  </div>
                </div>

                <div className="flex justify-between items-center p-5 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="bg-gray-900 p-3 rounded-lg group-hover:bg-blue-900/20 transition-colors">
                      <CircleDashed className="w-6 h-6 text-gray-400 group-hover:text-blue-500 transition-colors" />
                    </div>
                    <div>
                      <span className="font-bold text-lg block">Retapițare Volan</span>
                      <span className="text-sm text-gray-400">în funcție de model • Durată: 2–3 zile</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500 block">de la</span>
                    <span className="text-2xl font-bold text-blue-400">750 RON</span>
                  </div>
                </div>

                <div className="flex justify-between items-center p-5 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="bg-gray-900 p-3 rounded-lg group-hover:bg-blue-900/20 transition-colors">
                      <Sofa className="w-6 h-6 text-gray-400 group-hover:text-blue-500 transition-colors" />
                    </div>
                    <div>
                      <span className="font-bold text-lg block">Retapițare Scaune</span>
                      <span className="text-sm text-gray-400">parțial / total • Durată: depinde de complexitate</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500 block">preț</span>
                    <span className="text-2xl font-bold text-blue-400">la cerere</span>
                  </div>
                </div>

                <div className="flex justify-between items-center p-5 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="bg-gray-900 p-3 rounded-lg group-hover:bg-blue-900/20 transition-colors">
                      <Truck className="w-6 h-6 text-gray-400 group-hover:text-blue-500 transition-colors" />
                    </div>
                    <div>
                      <span className="font-bold text-lg block">Retapițare Camioane</span>
                      <span className="text-sm text-gray-400">Durată: 5–7 zile</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500 block">preț</span>
                    <span className="text-2xl font-bold text-blue-400">la cerere</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </motion.div>

        <div className="mt-20 p-10 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-3xl border border-blue-500/20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-500/5 blur-3xl"></div>
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-4">Vrei să refaci interiorul mașinii tale?</h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Trimite o cerere pentru evaluare gratuită sau sună-ne pentru detalii și recomandări.
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
      </div>

      <div className="mt-24 pt-12 border-t border-gray-900">
        <p className="text-sm text-gray-600 text-center mb-4">Servicii disponibile:</p>
        <div className="flex flex-wrap justify-center gap-3 text-xs text-gray-700">
          {[
            'Retapițare plafon auto Galați',
            'Retapițare fețe uși',
            'Retapițare volan',
            'Retapițare scaune auto',
            'Reparare tapițerie auto',
            'Recondiționare interior auto',
            'Alcantara auto',
            'Retapițări camioane',
            'Atelier retapițări Galați',
            'Detailing interior Galați'
          ].map((tag, i) => (
            <span key={i} className="bg-gray-900 px-3 py-1 rounded-full border border-gray-800">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
