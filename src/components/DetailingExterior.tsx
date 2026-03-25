import { Check, Car, Truck, Clock, X } from 'lucide-react';
import { useState } from 'react';
import OptimizedImg from './OptimizedImg';
import { detailingExteriorExampleImages as exampleImages, detailingExteriorPackages as packages } from './detailingExteriorData';

export default function DetailingExterior() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Detailing <span className="text-blue-500">Exterior</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Redă strălucirea mașinii tale și protejeaz-o împotriva factorilor externi.
            Soluții profesionale pentru un aspect impecabil.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div 
              key={index}
              className={`relative flex flex-col p-8 rounded-2xl border transition-all duration-300 hover:transform hover:-translate-y-2 ${
                pkg.premium
                  ? 'bg-gradient-to-b from-yellow-900/20 to-black border-yellow-500 shadow-[0_0_30px_rgba(234,179,8,0.15)]'
                  : pkg.highlight 
                    ? 'bg-gradient-to-b from-blue-900/20 to-black border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.15)]' 
                    : 'bg-gray-900/40 border-gray-800 hover:border-gray-700'
              }`}
            >
              {pkg.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                  Cel mai popular
                </div>
              )}

              {pkg.premium && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                  Premium
                </div>
              )}

              <div className="mb-8">
                <h3 className={`text-2xl font-bold mb-2 ${
                  pkg.premium ? 'text-yellow-400' : pkg.highlight ? 'text-blue-400' : 'text-white'
                }`}>
                  {pkg.title}
                </h3>
                <p className="text-gray-400 text-sm h-10 mb-4">
                  {pkg.description}
                </p>
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg w-fit ${
                  pkg.premium 
                    ? 'text-yellow-400 bg-yellow-500/10' 
                    : 'text-blue-400 bg-blue-500/10'
                }`}>
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-semibold">{pkg.duration}</span>
                </div>
              </div>

              <div className="space-y-4 mb-8 bg-black/20 p-4 rounded-xl border border-white/5">
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Car className="w-4 h-4" />
                    <span>Hatchback / Coupe</span>
                  </div>
                  <span className={`font-bold ${pkg.premium ? 'text-yellow-400' : 'text-blue-400'}`}>
                    {pkg.price.small}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Car className="w-4 h-4" />
                    <span>Sedan</span>
                  </div>
                  <span className={`font-bold ${pkg.premium ? 'text-yellow-400' : 'text-blue-400'}`}>
                    {pkg.price.medium}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Truck className="w-4 h-4" />
                    <span>SUV / Break</span>
                  </div>
                  <span className={`font-bold ${pkg.premium ? 'text-yellow-400' : 'text-blue-400'}`}>
                    {pkg.price.large}
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-300 text-sm">
                    <Check className={`w-5 h-5 flex-shrink-0 ${
                      pkg.premium ? 'text-yellow-500' : pkg.highlight ? 'text-blue-500' : 'text-gray-500'
                    }`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a 
                href={`https://wa.me/40771133128?text=${encodeURIComponent(`Buna ziua, as dori o programare pentru ${pkg.title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full py-4 rounded-xl text-center font-bold transition-all ${
                  pkg.premium
                    ? 'bg-yellow-600 hover:bg-yellow-700 text-black shadow-lg hover:shadow-yellow-500/25'
                    : pkg.highlight 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/25' 
                      : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                Programează acum
              </a>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Exemple <span className="text-blue-500">lucrari</span>
          </h2>
          
          {exampleImages.length > 0 ? (
            <div className="overflow-x-auto scroll-smooth">
              <div className="flex flex-nowrap gap-4 pb-2">
                {exampleImages.map((src, index) => (
                  <div
                    key={`${src}-${index}`}
                  onClick={() => setSelectedImage(src)}
                    className="flex-none w-40 sm:w-44 md:w-48 aspect-square bg-gray-900/50 rounded-xl border border-gray-800 flex items-center justify-center group hover:border-blue-500/50 transition-colors cursor-pointer overflow-hidden relative"
                  >
                    <OptimizedImg
                      src={src}
                      alt={`Exemplu lucrare exterior ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                      decoding="async"
                      sizes="(max-width: 640px) 45vw, 192px"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12 bg-gray-900/30 rounded-2xl border border-gray-800">
              <p>Imaginile vor fi disponibile în curând.</p>
            </div>
          )}
        </div>

        <div className="mt-20 p-10 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-3xl border border-blue-500/20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-500/5 blur-3xl"></div>
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-4">Nu ești sigur ce pachet să alegi?</h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Contactează-ne pentru o consultanță gratuită și te vom ajuta să alegi soluția potrivită pentru mașina ta.
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
        <div className="flex flex-nowrap overflow-x-auto gap-3 text-xs text-gray-700 -mx-6 px-6 md:mx-0 md:px-0 snap-x">
          {[
            'Detailing exterior Galați',
            'Polish auto Galați',
            'Corecție zgârieturi auto',
            'Polish 1 etapă',
            'Polish 2 etape',
            'Polish 3 etape',
            'Protecție ceramică auto Galați',
            'Ceramică auto cu garanție',
            'Decontaminare vopsea',
            'Tratament hidrofob geamuri',
            'Detailing jante'
          ].map((tag, i) => (
            <span key={i} className="flex-none whitespace-nowrap bg-gray-900 px-3 py-1 rounded-full border border-gray-800 snap-start">
              {tag}
            </span>
          ))}
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
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
