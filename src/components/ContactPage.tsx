import { Clock, Mail, MapPin, Navigation, Phone } from 'lucide-react';

const phoneDisplay = '0771 133 128';
const phoneHref = 'tel:0771133128';
const email = 'detailingvlad@gmail.com';

const lat = 45.406798;
const lng = 27.9829933;

const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${lat},${lng}`)}`;
const wazeUrl = `https://waze.com/ul?ll=${encodeURIComponent(`${lat},${lng}`)}&navigate=yes`;
const googleMapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(`${lat},${lng}`)}&z=14&output=embed`;

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Contact <span className="text-blue-400">Vlad Detailing</span>
          </h1>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Telefon, email, locație și program. Poți deschide navigația direct în Google Maps sau Waze.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-8 items-start">
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-gray-900 to-blue-950/30 p-5 rounded-xl border border-blue-500/30">
                  <div className="flex items-center gap-3 mb-2">
                    <Phone className="w-5 h-5 text-blue-400" />
                    <div className="font-semibold">Telefon</div>
                  </div>
                  <a href={phoneHref} className="text-blue-400 hover:text-blue-300 font-bold text-lg">
                    {phoneDisplay}
                  </a>
                </div>

                <div className="bg-gradient-to-br from-gray-900 to-blue-950/30 p-5 rounded-xl border border-blue-500/30">
                  <div className="flex items-center gap-3 mb-2">
                    <Mail className="w-5 h-5 text-blue-400" />
                    <div className="font-semibold">Email</div>
                  </div>
                  <a href={`mailto:${email}`} className="text-blue-400 hover:text-blue-300 font-semibold whitespace-nowrap">
                    {email}
                  </a>
                </div>

                <div className="bg-gradient-to-br from-gray-900 to-blue-950/30 p-5 rounded-xl border border-blue-500/30">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="w-5 h-5 text-blue-400" />
                    <div className="font-semibold">Locație</div>
                  </div>
                  <div className="text-gray-200 font-semibold">Galați</div>
                  <div className="text-sm text-gray-400">Strada Brăilei 253A</div>
                </div>

                <div className="bg-gradient-to-br from-gray-900 to-blue-950/30 p-5 rounded-xl border border-blue-500/30">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-5 h-5 text-blue-400" />
                    <div className="font-semibold">Program</div>
                  </div>
                  <div className="text-gray-200 text-sm grid grid-cols-[3.25rem_1fr] gap-x-2 gap-y-0.5">
                    <div className="font-semibold text-white">L-V:</div>
                    <div>08:30 - 12:30</div>
                    <div />
                    <div>13:30 - 17:30</div>
                    <div className="font-semibold text-white">S:</div>
                    <div>08:30 - 12:00</div>
                  </div>
                </div>

                <div className="sm:col-span-2 flex flex-col sm:flex-row gap-3 justify-center mt-2">
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
                  >
                    <Navigation className="w-5 h-5" />
                    Google Maps
                  </a>
                  <a
                    href={wazeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/10"
                  >
                    <Navigation className="w-5 h-5" />
                    Waze
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-blue-950/40 p-4 rounded-2xl border border-blue-500/30">
              <div className="rounded-xl overflow-hidden border border-white/10">
                <iframe
                  title="Vlad Detailing - Google Maps"
                  src={googleMapsEmbedUrl}
                  className="w-full h-[300px] lg:h-[360px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#evaluare"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors shadow-lg shadow-white/10"
            >
              Cere evaluare gratuită
            </a>
            <a
              href={phoneHref}
              className="inline-flex items-center justify-center px-6 py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/10"
            >
              Sună-ne: {phoneDisplay}
            </a>
          </div>

          <div className="mt-10 text-center text-xs md:text-sm text-gray-400">
            Vlad Detailing SRL <span className="mx-2 text-gray-600">|</span> CUI: 51891367{' '}
            <span className="mx-2 text-gray-600">|</span> Nr. Reg. Com.: J2025039145005{' '}
            <span className="mx-2 text-gray-600">|</span> Sediu: Strada Brailei 253A, Galati
          </div>
        </div>
      </div>
    </div>
  );
}
