import { Sparkles, SprayCan, Shield } from 'lucide-react';
import BeforeAfterSlider from './BeforeAfterSlider';
 

const serviceTitleIds: Record<string, string> = {
  'Detailing Exterior': 'servicii-detailing-exterior',
  'Detailing Interior': 'servicii-detailing-interior'
};

const serviceItemIds: Record<string, string> = {
  'Revopsire piele': 'servicii-revopsire-piele',
  'Retapițări (Plafoane, fețe de uși, volane etc.)': 'servicii-retapitari',
  'PPF (folie protecție caroserie)': 'servicii-wrapping-ppf',
  'Wrapping complet/parțial': 'servicii-wrapping-ppf',
  'Folie solară geamuri': 'servicii-folie-solara-geamuri',
  'Polish faruri': 'servicii-polish-faruri'
};

const services = [
  {
    icon: Sparkles,
    title: 'Detailing Exterior',
    items: [
      'Polish 1 etapă (luciu și reîmprospătare)',
      'Polish 2 etape (corecție zgârieturi medii)',
      'Polish 3 etape (corecție avansată)',
      'Protecție ceramică cu certificat de garanție'
    ]
  },
  {
    icon: SprayCan,
    title: 'Detailing Interior',
    items: [
      'Curățare și igienizare completă',
      'Revopsire piele',
      'Retapițări (Plafoane, fețe de uși, volane etc.)'
    ]
  },
  {
    icon: Shield,
    title: 'Protecție & Personalizare',
    items: [
      'PPF (folie protecție caroserie)',
      'Wrapping complet/parțial',
      'Folie solară geamuri',
      'Polish faruri'
    ]
  }
];

export default function Services() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Servicii profesionale <span className="text-blue-400">complete</span>
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-blue-950/40 to-gray-900 p-8 rounded-2xl border border-blue-500/30 hover:border-blue-500 transition-all hover:transform hover:scale-105"
            >
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <service.icon className="w-8 h-8 text-white" />
              </div>
              <h3 id={serviceTitleIds[service.title]} className="text-2xl font-bold mb-6 text-blue-400">
                {service.title}
              </h3>
              <ul className="space-y-3">
                {service.items.map((item, idx) => (
                  <li key={idx} id={serviceItemIds[item]} className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1">•</span>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="text-3xl font-bold text-center mb-12">
            Before & After
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="relative aspect-[3/4] bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden border-2 border-blue-500/30 group"
              >
                {i === 1 ? (
                  <BeforeAfterSlider
                    beforeSrc="/Images/before-after/01-after.webp"
                    afterSrc="/Images/before-after/01-before.webp"
                    beforeAlt="Înainte - interior"
                    afterAlt="După - interior"
                    initialPercent={55}
                    beforeObjectPosition="50% 50%"
                    afterObjectPosition="50% 50%"
                    beforeScale={1.45}
                    afterScale={1.45}
                    beforeTranslateX={-60}
                    afterTranslateX={40}
                  />
                ) : i === 2 ? (
                  <BeforeAfterSlider
                    beforeSrc="/Images/before-after/02-after.webp"
                    afterSrc="/Images/before-after/02-before.webp"
                    beforeAlt="Înainte - exterior"
                    afterAlt="După - exterior"
                    initialPercent={50}
                    beforeObjectPosition="50% 50%"
                    afterObjectPosition="50% 50%"
                    beforeScale={1.3}
                    afterScale={1}
                    beforeRotation={10}
                  />
                ) : i === 3 ? (
                  <BeforeAfterSlider
                    beforeSrc="/Images/before-after/03-before.webp?v=1001"
                    afterSrc="/Images/before-after/03-after.webp?v=1001"
                    disableOptimized
                    beforeAlt="Înainte - jante"
                    afterAlt="După - jante"
                    initialPercent={50}
                    beforeObjectPosition="100% 50%"
                    afterObjectPosition="0% 50%"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-gray-500 text-lg">Before / After {i}</span>
                    </div>
                    <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
