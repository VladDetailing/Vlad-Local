import { AlertCircle } from 'lucide-react';

const problems = [
  'Vopsea mată?',
  'Zgârieturi fine?',
  'Interior obosit?',
  'Plafonul căzut?',
  'Faruri îngălbenite?',
  'Valoare de revânzare scăzută?'
];

export default function Problem() {
  return (
    <section className="py-24 bg-black text-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Mașina ta spune ceva <span className="text-blue-400">despre tine.</span>
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-6 bg-gradient-to-r from-red-900/20 to-gray-900 border border-red-500/30 rounded-xl"
            >
              <AlertCircle className="w-8 h-8 text-red-400 flex-shrink-0" />
              <span className="text-xl text-gray-300">{problem}</span>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-blue-950 to-gray-900 p-10 rounded-2xl border-2 border-blue-500 text-center">
          <p className="text-2xl font-semibold text-white mb-4">
            La Vlad Detailing vă ajutăm să rezolvați aceste probleme <span className="text-blue-400">definitiv!</span>
          </p>
          <p className="text-lg text-gray-400">
            Cu experiență la standarde europene și materiale premium certificate
          </p>
        </div>
      </div>
    </section>
  );
}
