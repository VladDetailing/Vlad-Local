import { CheckCircle2 } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950 text-white">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3752167/pexels-photo-3752167.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-20"></div>

      <div className="relative z-10 container mx-auto px-6 py-8">
        

        <div className="max-w-4xl mx-auto text-center pt-20">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Standard european.<br />
            <span className="text-blue-400">Pasiune românească.</span><br />
            Rezultate premium.
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
            Servicii complete de detailing și protecție auto în Galați<br />
            pentru mașini premium și daily cars care merită respect.
          </p>

          <div className="flex justify-center mb-12">
            <a
              href="#evaluare"
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border-2 border-blue-500 text-white px-10 py-5 rounded-lg text-lg font-semibold transition-all"
            >
              Cere evaluare gratuită!
            </a>
          </div>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center text-left md:text-center">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-blue-400 flex-shrink-0" />
              <span className="text-gray-300">Garanție pe lucrările efectuate</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-blue-400 flex-shrink-0" />
              <span className="text-gray-300">Materiale profesionale certificate</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-blue-400 flex-shrink-0" />
              <span className="text-gray-300">Experiență internațională</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
    </section>
  );
}
