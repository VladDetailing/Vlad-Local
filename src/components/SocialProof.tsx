import { Star, Quote, ChevronLeft, ChevronRight, BadgeCheck, Users, ShieldCheck } from 'lucide-react';
import { useRef } from 'react';
import { googleReviews } from '../data/googleReviews';

export default function SocialProof() {
  const total = googleReviews.length || 0;
  const sum = googleReviews.reduce((acc, r) => acc + (r.rating || 0), 0);
  const avg = total ? Math.round((sum / total) * 10) / 10 : 0;
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const reviews = [...googleReviews].reverse();
  return (
    <section className="py-24 bg-black text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ce spun <span className="text-blue-400">clienții noștri</span>
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>

          <div className="flex items-center justify-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-8 h-8 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <p className="text-xl text-gray-400">{avg.toFixed(1)} stele pe Google</p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <button
            type="button"
            aria-label="Derulează recenziile la stânga"
            onClick={() => scrollerRef.current?.scrollBy({ left: -320, behavior: 'smooth' })}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full border border-blue-500/30"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div ref={scrollerRef} className="relative z-0 overflow-x-auto scroll-smooth snap-x snap-mandatory">
            <div className="flex flex-nowrap gap-4 py-2">
              {reviews.map((rev, index) => (
                <div
                  key={index}
                  className="flex-none w-72 md:w-80 bg-gradient-to-br from-blue-950/40 to-gray-900 p-6 rounded-2xl border border-blue-500/30 relative snap-start"
                >
                  <Quote className="absolute top-6 right-6 w-12 h-12 text-blue-500/20" />

                  <div className="flex gap-1 mb-4">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <p className="text-gray-300 mb-6 leading-relaxed">
                    "{rev.text.trim().length ? rev.text : 'Recenzie fără text'}"
                  </p>

                  <div>
                    <p className="font-semibold text-white">{rev.name}</p>
                    {rev.date && <p className="text-sm text-blue-400">{rev.date}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            aria-label="Derulează recenziile la dreapta"
            onClick={() => scrollerRef.current?.scrollBy({ left: 320, behavior: 'smooth' })}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full border border-blue-500/30"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-16">
          <div className="bg-gradient-to-r from-blue-950/60 to-gray-900 px-8 py-8 rounded-2xl border border-blue-500/30">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex items-center gap-3">
                <Star className="w-7 h-7 fill-yellow-400 text-yellow-400" />
                <div>
                  <p className="text-white font-semibold">5.0 pe Google</p>
                  <p className="text-gray-400 text-sm">Rating mediu</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <BadgeCheck className="w-7 h-7 text-blue-400" />
                <div>
                  <p className="text-white font-semibold">Recenzii verificate</p>
                  <p className="text-gray-400 text-sm">Clienți reali</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-7 h-7 text-blue-400" />
                <div>
                  <p className="text-white font-semibold">100+ clienți</p>
                  <p className="text-gray-400 text-sm">Mulțumiți</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-7 h-7 text-blue-400" />
                <div>
                  <p className="text-white font-semibold">Garanție lucrări</p>
                  <p className="text-gray-400 text-sm">Calitate premium</p>
                </div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <a
                href="https://share.google/o2F2dAJmtjl9Auvjd"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 font-semibold"
              >
                Vezi toate recenziile pe Google
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
