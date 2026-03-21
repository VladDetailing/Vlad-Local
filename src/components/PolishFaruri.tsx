import { Shield, Sparkles, AlertTriangle, Check, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PolishFaruri() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Polish <span className="text-blue-500">Faruri</span>
          </h1>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-6">
            Redă claritatea și vizibilitatea farurilor tale. Siguranță sporită și aspect impecabil.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20"
        >
          <div className="space-y-8">
            <div className="bg-gray-900/40 p-8 rounded-2xl border border-gray-800">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-yellow-500" />
                De ce să faci polish la faruri?
              </h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
                  <span>Farurile mătuite reduc vizibilitatea pe timp de noapte cu până la 70%.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
                  <span>Îmbunătățește aspectul general al mașinii (efect de întinerire).</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
                  <span>Este o cerință obligatorie pentru a trece ITP-ul cu brio.</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-8 rounded-2xl border border-blue-500/20">
              <h3 className="text-2xl font-bold mb-6 text-blue-400">Prețuri Servicii</h3>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center p-4 bg-black/40 rounded-xl border border-white/5">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-6 h-6 text-blue-400" />
                    <div>
                      <span className="font-bold text-lg block">Polish Faruri (Set)</span>
                      <span className="text-sm text-gray-400">Restaurare claritate + Protecție ceramică</span>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-blue-400">250 RON</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-black/40 rounded-xl border border-white/5">
                  <div className="flex items-center gap-3">
                    <Shield className="w-6 h-6 text-blue-400" />
                    <div>
                      <span className="font-bold text-lg block">Protecție PPF Faruri</span>
                      <span className="text-sm text-gray-400">Folie de protecție transparentă</span>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-blue-400">250 RON</span>
                </div>

                <div className="flex justify-between items-center px-4 pb-4 pt-8 bg-green-900/10 rounded-xl border border-green-500/20 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-green-500 text-black text-xs font-bold px-2 py-1 rounded-bl-lg">
                    OFERTĂ SPECIALĂ
                  </div>
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-6 h-6 text-green-400" />
                    <div>
                      <span className="font-bold text-lg block text-green-400">Pachet Complet</span>
                      <span className="text-sm text-gray-400">Polish Faruri + Folie PPF</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="block text-sm text-gray-400 line-through">500 RON</span>
                    <span className="text-2xl font-bold text-green-400">450 RON</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex items-center justify-center gap-2 text-gray-400 text-sm">
                <Clock className="w-4 h-4" />
                <span>Durată execuție: 4 ore</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-center mb-8">Rezultate <span className="text-blue-500">Before & After</span></h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="aspect-square bg-gray-800 rounded-xl overflow-hidden border border-gray-700 relative group">
                  <picture>
                    <source type="image/avif" srcSet="/optimized/Images/Polish-faruri/IMG_6990-w480.avif 480w, /optimized/Images/Polish-faruri/IMG_6990-w768.avif 768w, /optimized/Images/Polish-faruri/IMG_6990-w1080.avif 1080w, /optimized/Images/Polish-faruri/IMG_6990-w1440.avif 1440w" sizes="(max-width: 640px) 100vw, 33vw" />
                    <source type="image/webp" srcSet="/optimized/Images/Polish-faruri/IMG_6990-w480.webp 480w, /optimized/Images/Polish-faruri/IMG_6990-w768.webp 768w, /optimized/Images/Polish-faruri/IMG_6990-w1080.webp 1080w, /optimized/Images/Polish-faruri/IMG_6990-w1440.webp 1440w" sizes="(max-width: 640px) 100vw, 33vw" />
                    <img src="/Images/Polish-faruri/IMG_6990.jpg" alt="Faruri matuite inainte de polish" className="w-full h-full object-cover" loading="lazy" decoding="async" />
                  </picture>
                  <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">ÎNAINTE</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="aspect-square bg-gray-800 rounded-xl overflow-hidden border border-blue-500/30 relative group shadow-lg shadow-blue-500/10">
                  <picture>
                    <source type="image/avif" srcSet="/optimized/Images/Polish-faruri/IMG_6991-w480.avif 480w, /optimized/Images/Polish-faruri/IMG_6991-w768.avif 768w, /optimized/Images/Polish-faruri/IMG_6991-w1080.avif 1080w, /optimized/Images/Polish-faruri/IMG_6991-w1440.avif 1440w" sizes="(max-width: 640px) 100vw, 33vw" />
                    <source type="image/webp" srcSet="/optimized/Images/Polish-faruri/IMG_6991-w480.webp 480w, /optimized/Images/Polish-faruri/IMG_6991-w768.webp 768w, /optimized/Images/Polish-faruri/IMG_6991-w1080.webp 1080w, /optimized/Images/Polish-faruri/IMG_6991-w1440.webp 1440w" sizes="(max-width: 640px) 100vw, 33vw" />
                    <img src="/Images/Polish-faruri/IMG_6991.jpg" alt="Faruri restaurate dupa polish" className="w-full h-full object-cover" loading="lazy" decoding="async" />
                  </picture>
                  <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">DUPĂ</div>
                </div>
              </div>
            </div>
            
            <p className="text-center text-gray-400 text-sm mt-4">
              Diferența este clară. Vizibilitatea și siguranța ta sunt prioritare.
            </p>
          </div>
        </motion.div>

        <div className="mt-20 p-10 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-3xl border border-blue-500/20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-500/5 blur-3xl"></div>
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-4">Vrei faruri clare și sigure din nou?</h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Trimite o cerere pentru evaluare gratuită sau sună-ne pentru o programare rapidă.
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
              'Polish faruri Galați',
              'Restaurare faruri',
              'Recondiționare faruri',
              'Curățare faruri matuite',
              'Polish faruri preț',
              'Protecție ceramică faruri',
              'Folie PPF faruri',
              'Îmbunătățire vizibilitate',
              'Detailing auto Galați',
              'Programare polish faruri'
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
