import { Check, Shield, Sun, Clock, FileText, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useRef } from 'react';

// Aici vei putea adăuga imaginile tale ulterior
const folieImages: string[] = [
  '/Images/folie-solara-geamuri/IMG_6988.PNG',
  '/Images/folie-solara-geamuri/IMG_6978.PNG',
  '/Images/folie-solara-geamuri/IMG_6979.PNG',
  '/Images/folie-solara-geamuri/IMG_6980.PNG',
  '/Images/folie-solara-geamuri/IMG_6981.PNG',
  '/Images/folie-solara-geamuri/IMG_6982.PNG',
  '/Images/folie-solara-geamuri/IMG_6984.PNG',
  '/Images/folie-solara-geamuri/IMG_6985.PNG',
  '/Images/folie-solara-geamuri/IMG_6986.PNG',
  '/Images/folie-solara-geamuri/IMG_6987.PNG',
  '/Images/folie-solara-geamuri/IMG_6977.PNG',
];

export default function FolieSolara() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300; // Adjust scroll amount as needed
      const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Folie Solară <span className="text-blue-500">Omologată RAR</span>
          </h1>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-6">
            Confort termic, intimitate și protecție UV cu folii auto profesionale marca Global.
            Montaj autorizat RAR, fără demontarea fețelor de uși.
          </p>
        </div>
        
        {/* Sectiunea Detalii si Beneficii */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <Sun className="w-8 h-8 text-yellow-500" />
                <h2 className="text-3xl font-bold">De ce să alegi foliile noastre?</h2>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                La Vlad Detailing Galați folosim exclusiv folii auto marca <strong>Global</strong>, recunoscute pentru calitatea superioară și durabilitatea în timp. Oferim o garanție de minim 10 ani pentru toate lucrările executate.
              </p>

              <div className="flex items-center gap-5 bg-black/30 border border-white/10 rounded-xl px-5 py-4 mb-8 max-w-xl">
                <img
                  src="/Images/folie-solara-geamuri/logo%20global.png.webp"
                  alt="Global - logo folie solară"
                  className="h-14 md:h-16 w-auto object-contain flex-shrink-0"
                  loading="lazy"
                  decoding="async"
                />
                <div className="leading-tight">
                  <div className="font-bold text-white">Folie Global</div>
                  <div className="text-sm text-gray-400">Folie premium pentru geamuri</div>
                </div>
              </div>
              
              <div className="bg-blue-900/20 p-6 rounded-xl border border-blue-500/30 mb-8">
                <h3 className="text-xl font-bold text-blue-400 mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Avantajele noastre:
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Fără demontare:</strong> Aplicăm folia fără a demonta fețele de uși sau alte elemente ale mașinii, eliminând riscul de a rupe cleme sau de a crea daune.</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Autorizație RAR:</strong> Eliberăm certificat de conformitate și garanție valabil la nivel național.</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Garanție extinsă:</strong> Minim 10 ani garanție pentru decolorare, dezlipire sau apariția bulelor.</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gray-900/40 p-8 rounded-2xl border border-gray-800">
              <h3 className="text-2xl font-bold mb-6 text-center text-blue-400">Prețuri Montaj Folie</h3>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center p-5 bg-black/40 rounded-xl border border-white/5 transition-colors hover:border-blue-500/30">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-500/10 p-3 rounded-lg">
                      <FileText className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <span className="font-bold text-lg block">Geamuri Spate + Lunetă</span>
                      <span className="text-sm text-gray-400">Autorizat RAR</span>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-blue-400">450 RON</span>
                </div>
                
                <div className="flex justify-between items-center p-5 bg-black/40 rounded-xl border border-white/5 transition-colors hover:border-blue-500/30">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-500/10 p-3 rounded-lg">
                      <FileText className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <span className="font-bold text-lg block">Geamuri Față</span>
                      <span className="text-sm text-gray-400">Autorizat RAR (transparență legală)</span>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-blue-400">250 RON</span>
                </div>

                <div className="flex justify-between items-center p-5 bg-black/40 rounded-xl border border-white/5 transition-colors hover:border-blue-500/30">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-500/10 p-3 rounded-lg">
                      <FileText className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <span className="font-bold text-lg block">Folie Parbriz (pe interior)</span>
                      <span className="text-sm text-gray-400">Protecție termică și UV superioară</span>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-blue-400">500 RON</span>
                </div>
              </div>
              
              <div className="mt-8 flex items-center justify-center gap-2 text-yellow-500 bg-yellow-500/10 p-3 rounded-lg text-sm">
                <Clock className="w-4 h-4" />
                <span>Durată execuție: 4 - 6 ore</span>
              </div>
              
              <p className="mt-6 text-xs text-gray-500 text-center">
                * Prețurile includ materialele (folie Global) și manopera.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Gallery Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Portofoliu <span className="text-blue-500">Lucrări</span>
          </h2>
          
          {folieImages.length > 0 ? (
            <div className="relative group">
              <button 
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              
              <div 
                ref={scrollContainerRef}
                className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {folieImages.map((src, index) => (
                  <div 
                    key={index}
                    onClick={() => setSelectedImage(src)}
                    className="flex-shrink-0 w-64 h-64 bg-gray-900/50 rounded-xl border border-gray-800 flex items-center justify-center group/item hover:border-blue-500/50 transition-colors cursor-pointer overflow-hidden relative snap-center"
                  >
                    <img 
                      src={src} 
                      alt={`Lucrare folie auto ${index + 1}`} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/20 transition-colors duration-300" />
                  </div>
                ))}
              </div>

              <button 
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12 bg-gray-900/30 rounded-xl border border-gray-800 border-dashed">
              <p>Imaginile cu lucrări de foliere vor fi adăugate în curând.</p>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="mt-20 p-10 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-3xl border border-blue-500/20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-500/5 blur-3xl"></div>
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-4">Vrei confort și protecție pentru mașina ta?</h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Programează-te acum pentru montaj folie auto autorizată RAR. 
              Calitate garantată și montaj profesional fără demontare.
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

        {/* SEO Keywords */}
        <div className="mt-24 pt-12 border-t border-gray-900">
          <p className="text-sm text-gray-600 text-center mb-4">Servicii disponibile:</p>
          <div className="flex flex-wrap justify-center gap-3 text-xs text-gray-700">
            {[
              'Folie auto Galați', 'Folie omologată RAR', 'Folie Global Galați',
              'Montaj folie auto', 'Folie geamuri spate', 'Folie geamuri față', 'Folie parbriz',
              'Folie protecție solară', 'Folie auto fără demontare'
            ].map((tag, i) => (
              <span key={i} className="bg-gray-900 px-3 py-1 rounded-full border border-gray-800">
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
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
