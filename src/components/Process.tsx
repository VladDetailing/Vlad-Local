import { FileText, Calendar, BadgeCheck, Wrench } from 'lucide-react';

const steps = [
  {
    icon: FileText,
    number: '1',
    title: 'Trimite cererea online',
    description: 'Completezi formularul de pe pagină cu data dorită'
  },
  {
    icon: Calendar,
    number: '2',
    title: 'Evaluare la data selectată',
    description: 'Vii la atelier pentru evaluare și discuție detalii'
  },
  {
    icon: BadgeCheck,
    number: '3',
    title: 'Programare la fața locului',
    description: 'Stabilim pe loc dacă lucrarea e de durată'
  },
  {
    icon: Wrench,
    number: '4',
    title: 'Aduci mașina, lucrăm noi',
    description: 'Executăm lucrarea și livrăm la standard premium'
  }
];

export default function Process() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Cum <span className="text-blue-400">funcționează?</span>
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-400">Simplu. Rapid. Profesional.</p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-gradient-to-br from-blue-950/40 to-gray-900 p-8 rounded-2xl border border-blue-500/30 hover:border-blue-500 transition-all h-full flex flex-col">
                  <div className="relative mb-6">
                    <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center">
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-blue-500 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                      {step.number}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-blue-400">
                    {step.title}
                  </h3>

                  <p className="text-gray-400 flex-grow">
                    {step.description}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <div className="w-8 h-0.5 bg-blue-500"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <a
              href="#evaluare"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25"
            >
              Cere Evaluare Gratuită
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
