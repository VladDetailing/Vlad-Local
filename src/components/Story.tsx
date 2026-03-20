import { useEffect, useRef } from 'react';

export default function Story() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && videoRef.current) {
            videoRef.current.play().catch(() => {
              // Autoplay was prevented
              console.log('Autoplay prevented');
            });
          } else if (videoRef.current) {
            videoRef.current.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    const currentVideo = videoRef.current;
    return () => {
      if (currentVideo) {
        observer.unobserve(currentVideo);
      }
    };
  }, []);

  return (
    <>
      <section className="relative py-24 bg-black text-white overflow-hidden">
        <div className="absolute top-0 left-0 w-[55%] h-full hidden lg:block -translate-x-12">
          <video 
            ref={videoRef}
            className="w-full h-full object-cover opacity-80"
            muted
            playsInline
            loop
            poster="/Images/LOGO.PNG"
            src="/Videos/povestea-noastra.mp4"
          >
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gradient-to-l from-black via-black/20 to-transparent w-full" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 opacity-80" />
        </div>

        <div className="container mx-auto px-6 max-w-[1400px] relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="hidden lg:block"></div> {/* Spacer for video */}
            <div className="flex flex-col h-full justify-center lg:justify-start pt-6 lg:pt-0">
              <div className="mb-12 text-center max-w-lg mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 whitespace-nowrap">
                  Povestea <span className="text-blue-400">Vlad Detailing</span>
                </h2>
                <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
              </div>
              <div className="prose prose-lg prose-invert max-w-lg text-center mx-auto">
                <p className="text-xl text-gray-300 leading-relaxed mb-6">
                  Suntem doi băieți, amândoi pe nume Vlad, pasionați de mașini încă din copilărie.
                </p>
                <p className="text-xl text-gray-300 leading-relaxed mb-6">
                  Ne-am format profesional în <span className="text-blue-400 font-semibold">Italia</span>, unde am învățat standardele reale ale detailingului premium.
                </p>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Ne-am întors acasă, la <span className="text-blue-400 font-semibold">Galați</span>, ca să construim un atelier de nivel european.
                </p>
              </div>
            </div>
            
            {/* Mobile video version */}
            <div className="lg:hidden relative aspect-video rounded-xl overflow-hidden shadow-2xl border border-gray-800 bg-gray-900 mt-8">
              <video 
                className="w-full h-full object-cover"
                muted
                playsInline
                loop
                autoPlay
                src="/Videos/povestea-noastra.mp4"
              >
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      <div className="bg-black text-white py-6">
        <div className="container mx-auto px-6 max-w-[1400px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">100+</div>
              <div className="text-gray-400">Mașini transformate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">5+</div>
              <div className="text-gray-400">Ani experiență Italia</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">100%</div>
              <div className="text-gray-400">Clienți mulțumiți</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
