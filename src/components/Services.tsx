import { Sparkles, Paintbrush, Shield } from 'lucide-react';
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
    icon: Paintbrush,
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
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
            Servicii profesionale <span className="text-blue-400">complete</span>
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-10 md:mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-blue-950/40 to-gray-900 p-5 md:p-8 rounded-2xl border border-blue-500/30 hover:border-blue-500 transition-all hover:transform hover:scale-105"
            >
              <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                <div className="bg-blue-600 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center">
                  <service.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <h3
                  id={serviceTitleIds[service.title]}
                  className={`text-lg md:text-2xl font-bold text-blue-400 ${service.title === 'Protecție & Personalizare' ? 'md:whitespace-nowrap' : ''}`}
                >
                  {service.title}
                </h3>
              </div>
              <ul className="space-y-2 md:space-y-3">
                {service.items.map((item, idx) => (
                  <li key={idx} id={serviceItemIds[item]} className="flex items-start gap-2 md:gap-3">
                    <span className="text-blue-400 mt-1">•</span>
                    <span className="text-gray-300 text-sm md:text-base leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 md:mt-16">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-12">
            Before & After
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="relative aspect-[3/4] bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden border border-blue-500/30 md:border-2 group"
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
