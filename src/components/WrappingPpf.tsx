import { Check, Car, Truck, Shield, PaintBucket, Clock, X } from 'lucide-react';
import { motion } from 'framer-motion';
import OptimizedImg from './OptimizedImg';
import { useState } from 'react';

const colantareImages: string[] = [
  '/Images/colantari/IMG_5988.webp',
  '/Images/colantari/IMG_5991.webp',
  '/Images/colantari/IMG_6014.webp',
  '/Images/colantari/IMG_6018.webp',
  '/Images/colantari/IMG_6031.webp',
];

const ppfImages: string[] = [
  '/Images/ppf/IMG_6697.webp',
  '/Images/ppf/IMG_5250.webp',
  '/Images/ppf/IMG_6699.webp',
  '/Images/ppf/IMG_5245.webp',
  '/Images/ppf/IMG_6696.webp',
];

export default function WrappingPpf() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Colantare Auto & <span className="text-blue-500">PPF</span>
          </h1>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-6">
            Dacă ești în căutarea unor servicii profesionale de colantare auto în Galați sau folie de protecție PPF, Vlad Detailing îți oferă soluții complete pentru schimbarea aspectului mașinii sau pentru protejarea vopselei originale.
          </p>
          <p className="text-gray-500 max-w-2xl mx-auto italic">
            Programările se confirmă doar după achitarea unui avans de 50% din valoarea serviciilor alese.
          </p>
        </div>
        
        {/* Sectiunea Colantare Auto */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-8">
            <PaintBucket className="w-8 h-8 text-blue-500" />
            <h2 className="text-3xl font-bold">Colantare Auto</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Serviciul de colantare auto în Galați este ideal pentru cei care doresc să schimbe culoarea mașinii fără revopsire. Prin aplicarea unei folii speciale peste vopseaua originală, autoturismul poate primi un aspect complet nou și personalizat.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                La Vlad Detailing Galați, procesul de colantare este realizat cu atenție pentru a obține un rezultat curat, uniform și durabil.
              </p>
              
              <h3 className="text-xl font-semibold mb-4 text-blue-400">Avantajele colantării auto:</h3>
              <ul className="space-y-3 mb-8">
                {[
                  'Schimbarea culorii mașinii fără revopsire',
                  'Protecția vopselei originale împotriva zgârieturilor și pietricelelor',
                  'Posibilitatea de a reveni oricând la culoarea originală',
                  'Timp de execuție rapid (aproximativ 3–5 zile)',
                  'Cost mai accesibil comparativ cu o vopsire completă',
                  'Posibilitatea de a înlocui doar elementele afectate'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-gray-900/40 p-8 rounded-2xl border border-gray-800">
              <h3 className="text-2xl font-bold mb-6 text-center text-blue-400">Prețuri Orientative</h3>
              <p className="text-gray-400 text-sm text-center mb-8">
                Prețul final se stabilește după verificarea mașinii și alegerea culorii sau a finisajului.
              </p>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-black/40 rounded-xl border border-white/5">
                  <div className="flex items-center gap-3">
                    <Car className="w-5 h-5 text-gray-400" />
                    <span className="font-semibold">Hatchback</span>
                  </div>
                  <span className="text-xl font-bold text-blue-400">~ 7000 RON</span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-black/40 rounded-xl border border-white/5">
                  <div className="flex items-center gap-3">
                    <Car className="w-5 h-5 text-gray-400" />
                    <span className="font-semibold">Coupe / Sedan / Break</span>
                  </div>
                  <span className="text-xl font-bold text-blue-400">de la 8000 RON</span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-black/40 rounded-xl border border-white/5">
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-gray-400" />
                    <span className="font-semibold">SUV</span>
                  </div>
                  <span className="text-xl font-bold text-blue-400">de la 9000 RON</span>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-center gap-2 text-yellow-500 bg-yellow-500/10 p-3 rounded-lg text-sm">
                <Clock className="w-4 h-4" />
                <span>Durată execuție: 3 - 5 zile</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sectiunea Folie PPF */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-8">
            <Shield className="w-8 h-8 text-green-500" />
            <h2 className="text-3xl font-bold">Folie de Protecție PPF</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="order-2 lg:order-1 bg-gray-900/40 p-8 rounded-2xl border border-gray-800">
              <h3 className="text-2xl font-bold mb-6 text-center text-green-400">Pachete & Prețuri</h3>
              
              <div className="space-y-8">
                <div>
                  <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    Înfoliere Frontală (Zone expuse)
                  </h4>
                  <p className="text-gray-400 text-sm mb-4 pl-4">
                    Include: capotă, bară față, aripi față, oglinzi
                  </p>
                  <div className="space-y-2 pl-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-300">Mașini mici</span>
                      <span className="font-bold text-green-400">de la 5000 RON</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-300">SUV</span>
                      <span className="font-bold text-green-400">~ 8000 RON</span>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-gray-800"></div>

                <div>
                  <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    Înfoliere Completă PPF
                  </h4>
                  <div className="space-y-3 pl-4">
                    <div className="flex justify-between items-center p-3 bg-black/40 rounded-lg border border-white/5">
                      <span className="text-gray-300">Hatchback</span>
                      <span className="font-bold text-green-400">de la 15000 RON</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-black/40 rounded-lg border border-white/5">
                      <span className="text-gray-300">Coupe / Sedan / Break</span>
                      <span className="font-bold text-green-400">de la 17500 RON</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-black/40 rounded-lg border border-white/5">
                      <span className="text-gray-300">SUV</span>
                      <span className="font-bold text-green-400">de la 19000 RON</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-px bg-gray-800 my-6"></div>

              <div>
                <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  Folie Protecție Parbriz (Exterior)
                </h4>
                <div className="space-y-3 pl-4">
                  <div className="flex justify-between items-center p-3 bg-black/40 rounded-lg border border-white/5">
                    <div>
                      <span className="text-gray-300 block">Orice tip de autoturism</span>
                      <span className="text-xs text-gray-500">Durată de viață: 1 an</span>
                    </div>
                    <span className="font-bold text-green-400">1.200 RON</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20 text-center">
                <p className="text-yellow-400 text-sm">
                  * Prețul final pentru pachetele PPF se stabilește după verificarea fizică a mașinii.
                </p>
              </div>
              
              <div className="mt-8 flex items-center justify-center gap-2 text-yellow-500 bg-yellow-500/10 p-3 rounded-lg text-sm">
                <Clock className="w-4 h-4" />
                <span>Durată execuție: 3 - 5 zile</span>
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-8">
              <p className="text-gray-300 mb-6 leading-relaxed">
                Dacă îți dorești să păstrezi culoarea originală a mașinii, folia de protecție PPF este una dintre cele mai eficiente metode de protecție a caroseriei.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Serviciul de înfoliere cu folie de protecție PPF în Galați oferit de Vlad Detailing ajută la prevenirea deteriorării vopselei cauzate de pietricele, zgârieturi sau alți factori externi.
              </p>
              
              <h3 className="text-xl font-semibold mb-4 text-green-400">Beneficiile foliei PPF:</h3>
              <ul className="space-y-3 mb-8">
                {[
                  'Protejează vopseaua împotriva pietricelelor și zgârieturilor',
                  'Menține aspectul original al mașinii pentru mai mult timp',
                  'Respinge apa și murdăria (efect hidrofob)',
                  'Zgârieturile fine pot dispărea în contact cu căldura (self-healing)',
                  'Ajută la păstrarea valorii mașinii în timp'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Gallery Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Portofoliu <span className="text-blue-500">Lucrări</span>
          </h2>
          
          <div className="space-y-12">
            <div>
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <PaintBucket className="w-5 h-5 text-blue-500" />
                Colantări Auto
              </h3>
              {colantareImages.length > 0 ? (
                <div className="flex md:grid md:grid-cols-5 overflow-x-auto md:overflow-visible flex-nowrap md:flex-none gap-3 md:gap-4 -mx-6 px-6 md:mx-0 md:px-0 snap-x snap-mandatory">
                  {colantareImages.map((src, index) => (
                    <div 
                      key={index}
                      onClick={() => setSelectedImage(src)}
                      className="flex-none w-44 md:w-auto aspect-square bg-gray-900/50 rounded-xl border border-gray-800 flex items-center justify-center group hover:border-blue-500/50 transition-colors cursor-pointer overflow-hidden relative snap-start"
                    >
                      <OptimizedImg
                        src={src}
                        alt={`Lucrare colantare ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                        decoding="async"
                        sizes="(max-width: 640px) 44vw, 192px"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8 bg-gray-900/30 rounded-xl border border-gray-800 border-dashed">
                  <p>Imaginile cu lucrări de colantare vor fi adăugate în curând.</p>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-500" />
                Protecție PPF
              </h3>
              {ppfImages.length > 0 ? (
                <div className="flex md:grid md:grid-cols-5 overflow-x-auto md:overflow-visible flex-nowrap md:flex-none gap-3 md:gap-4 -mx-6 px-6 md:mx-0 md:px-0 snap-x snap-mandatory">
                  {ppfImages.map((src, index) => (
                    <div 
                      key={index}
                      onClick={() => setSelectedImage(src)}
                      className="flex-none w-44 md:w-auto aspect-square bg-gray-900/50 rounded-xl border border-gray-800 flex items-center justify-center group hover:border-green-500/50 transition-colors cursor-pointer overflow-hidden relative snap-start"
                    >
                      <OptimizedImg
                        src={src}
                        alt={`Lucrare PPF ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                        decoding="async"
                        sizes="(max-width: 640px) 44vw, 192px"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8 bg-gray-900/30 rounded-xl border border-gray-800 border-dashed">
                  <p>Imaginile cu lucrări PPF vor fi adăugate în curând.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 p-10 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-3xl border border-blue-500/20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-500/5 blur-3xl"></div>
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-4">Vrei o schimbare sau protecție pentru mașina ta?</h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Te așteptăm la atelier pentru o evaluare gratuită și stabilirea detaliilor. 
              Fie că alegi colantare sau PPF, rezultatul va fi spectaculos.
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

        {/* SEO Keywords (Hidden visually but present in DOM structure if needed, or displayed discreetly) */}
        <div className="mt-24 pt-12 border-t border-gray-900">
          <p className="text-sm text-gray-600 text-center mb-4">Servicii disponibile:</p>
          <div className="flex flex-nowrap overflow-x-auto gap-3 text-xs text-gray-700 -mx-6 px-6 md:mx-0 md:px-0 snap-x">
            {[
              'Colantare auto Galați', 'Folie protecție PPF Galați', 'Înfoliere auto Galați',
              'Protecție vopsea auto', 'Colantare mașină', 'Folie protecție caroserie',
              'Detailing auto Galați', 'Folie PPF auto', 'Schimbare culoare mașină'
            ].map((tag, i) => (
              <span key={i} className="flex-none whitespace-nowrap bg-gray-900 px-3 py-1 rounded-full border border-gray-800 snap-start">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <img 
            src={selectedImage} 
            alt="Preview" 
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            loading="eager"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
