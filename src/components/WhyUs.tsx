import { Award, Shield, Eye, Wrench, MessageSquare, Warehouse } from 'lucide-react';

const reasons = [
  {
    icon: Award,
    text: 'Echipamente profesionale'
  },
  {
    icon: Warehouse,
    text: 'Atelier la standarde europene'
  },
  {
    icon: Shield,
    text: 'Materiale certificate cu garanție'
  },
  {
    icon: Eye,
    text: 'Atenție obsesivă la detalii'
  },
  {
    icon: Wrench,
    text: 'Fără compromisuri'
  },
  {
    icon: MessageSquare,
    text: 'Consultanță personalizată'
  }
];

export default function WhyUs() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Ce ne <span className="text-blue-400">diferențiază</span>
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="flex items-center gap-3 md:gap-6 p-3 md:p-6 bg-gradient-to-r from-blue-950/40 to-gray-900 rounded-xl border border-blue-500/30 hover:border-blue-500 transition-all hover:transform hover:-translate-y-1"
              >
                <div className="bg-blue-600 w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center flex-shrink-0">
                  <reason.icon className="w-4 h-4 md:w-7 md:h-7 text-white" />
                </div>
                <span className="text-sm sm:text-base md:text-xl leading-tight text-gray-200">{reason.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
