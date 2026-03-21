import { Palette, Shield, Armchair, CircleDashed, Sofa } from 'lucide-react';
import { motion } from 'framer-motion';

const galleryImages = ['/Revopsire-piele/IMG_7015.webp', '/Revopsire-piele/IMG_7016.webp'];
const gallerySlots = [...galleryImages];

export default function RevopsirePiele() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Revopsire <span className="text-amber-600">Piele</span>
          </h1>
          <div className="w-24 h-1 bg-amber-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-6">
            Restaurare profesională pentru interiorul mașinii tale, folosind tehnici și produse premium.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20"
        >
          <div className="space-y-8">
            <div className="bg-gray-900/40 p-8 rounded-2xl border border-gray-800">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Palette className="w-6 h-6 text-amber-500" />
                Proces Profesional
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Restaurarea de piele la noi se face în mod profesional cu produse de calitate <span className="text-amber-500 font-semibold">Made in Italy</span>.
                Respectăm cu strictețe procesul tehnologic original de fabrică pentru a asigura durabilitate și un aspect impecabil.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-black/40 rounded-xl border border-white/5">
                  <div className="bg-amber-900/20 p-2 rounded-lg">
                    <span className="text-amber-500 font-bold text-xl">1</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Primer (Grund)</h4>
                    <p className="text-sm text-gray-400">Aplicare strat de bază pentru aderență maximă.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-black/40 rounded-xl border border-white/5">
                  <div className="bg-amber-900/20 p-2 rounded-lg">
                    <span className="text-amber-500 font-bold text-xl">2</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Vopsea Dedicată</h4>
                    <p className="text-sm text-gray-400">Pigmenți de înaltă calitate pentru o culoare uniformă și rezistentă.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-black/40 rounded-xl border border-white/5">
                  <div className="bg-amber-900/20 p-2 rounded-lg">
                    <span className="text-amber-500 font-bold text-xl">3</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Lac Protector</h4>
                    <p className="text-sm text-gray-400">Sigilare finală pentru protecție la uzură și raze UV, exact ca în fabrică.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-amber-900/10 p-6 rounded-xl border border-amber-500/20">
              <h4 className="text-lg font-bold text-amber-500 mb-2 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Garanția Calității
              </h4>
              <p className="text-gray-400 text-sm">
                Folosim exclusiv produse italienești de top, recunoscute în industria de pielărie pentru durabilitatea și finisajul lor superior.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-gray-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              
              <h3 className="text-2xl font-bold mb-8 text-center relative z-10">Lista de Prețuri</h3>
              
              <div className="space-y-6 relative z-10">
                {/* Volan */}
                <div className="flex justify-between items-center p-5 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-amber-500/50 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="bg-gray-900 p-3 rounded-lg group-hover:bg-amber-900/20 transition-colors">
                      <CircleDashed className="w-6 h-6 text-gray-400 group-hover:text-amber-500 transition-colors" />
                    </div>
                    <div>
                      <span className="font-bold text-lg block">Revopsire Volan</span>
                      <span className="text-sm text-gray-400">Restaurare completă piele</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500 block">de la</span>
                    <span className="text-2xl font-bold text-amber-500">350 RON</span>
                  </div>
                </div>

                {/* Scaun */}
                <div className="flex justify-between items-center p-5 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-amber-500/50 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="bg-gray-900 p-3 rounded-lg group-hover:bg-amber-900/20 transition-colors">
                      <Armchair className="w-6 h-6 text-gray-400 group-hover:text-amber-500 transition-colors" />
                    </div>
                    <div>
                      <span className="font-bold text-lg block">Revopsire Scaun</span>
                      <span className="text-sm text-gray-400">Sezut + Spătar + Aripioare</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500 block">de la</span>
                    <span className="text-2xl font-bold text-amber-500">950 RON</span>
                  </div>
                </div>

                {/* Aripioara Scaun */}
                <div className="flex justify-between items-center p-5 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-amber-500/50 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="bg-gray-900 p-3 rounded-lg group-hover:bg-amber-900/20 transition-colors">
                      <Armchair className="w-6 h-6 text-gray-400 group-hover:text-amber-500 transition-colors" />
                    </div>
                    <div>
                      <span className="font-bold text-lg block">Revopsire Aripioară Scaun</span>
                      <span className="text-sm text-gray-400">Restaurare locală</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500 block">de la</span>
                    <span className="text-2xl font-bold text-amber-500">200 RON</span>
                  </div>
                </div>

                {/* Bancheta */}
                <div className="flex justify-between items-center p-5 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-amber-500/50 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="bg-gray-900 p-3 rounded-lg group-hover:bg-amber-900/20 transition-colors">
                      <Sofa className="w-6 h-6 text-gray-400 group-hover:text-amber-500 transition-colors" />
                    </div>
                    <div>
                      <span className="font-bold text-lg block">Revopsire Banchetă</span>
                      <span className="text-sm text-gray-400">Completă</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500 block">de la</span>
                    <span className="text-2xl font-bold text-amber-500">1.500 RON</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-gray-400 text-sm">
                  * Prețurile pot varia în funcție de complexitatea deteriorării și a culorii.
                </p>
              </div>
            </div>

          </div>
        </motion.div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Rezultate <span className="text-amber-600">Înainte/După</span>
          </h2>

          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4">
            {gallerySlots.map((src, index) =>
              src ? (
                <div
                  key={src}
                  className="relative aspect-[4/5] bg-gray-800 rounded-lg overflow-hidden border border-amber-500/30 shadow-lg shadow-amber-500/10"
                >
                  <img
                    src={src}
                    alt={`Revopsire piele rezultat ${index + 1}`}
                    className={`w-full h-full object-cover object-center ${index === 1 ? 'scale-[1.15]' : ''}`}
                    loading="lazy"
                  />
                </div>
              ) : (
                <div
                  key={`placeholder-${index}`}
                  className="relative aspect-[4/5] bg-gray-900/30 rounded-lg overflow-hidden border border-amber-500/20 border-dashed flex items-center justify-center"
                >
                  <span className="text-gray-500 text-sm">Adaugă poză</span>
                </div>
              )
            )}
          </div>
        </div>

        <div className="mt-20 p-10 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-3xl border border-blue-500/20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-500/5 blur-3xl"></div>
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-4">Vrei să refaci pielea ca nouă?</h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Trimite o cerere pentru evaluare gratuită sau sună-ne pentru detalii despre culori și finisaj.
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
              'Revopsire piele auto Galați',
              'Recondiționare piele auto',
              'Reparare piele auto',
              'Vopsire volan piele',
              'Vopsire scaun piele',
              'Restaurare interior piele',
              'Schimbare culoare piele auto',
              'Întreținere piele auto',
              'Detailing interior Galați',
              'Servicii piele auto premium'
            ].map((tag, i) => (
              <span key={i} className="bg-gray-900 px-3 py-1 rounded-full border border-gray-800">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
