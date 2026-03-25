export default function AnpcBadge() {
  return (
    <a
      href="https://anpc.ro"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="ANPC"
      className="inline-block rounded-lg bg-black/40 hover:bg-black/60 backdrop-blur-sm border border-white/10 p-1"
    >
      <img
        src="/ANPC/sal-svg-banner.svg"
        alt="ANPC"
        className="h-8 md:h-12 w-auto"
      />
    </a>
  );
}
