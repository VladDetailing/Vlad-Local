import type React from 'react';
import { createPortal } from 'react-dom';

type SocialDockProps = {
  inline?: boolean;
};

function SocialDockContent({ inline = false }: SocialDockProps): React.ReactElement {
  const containerClassName = inline
    ? 'flex items-center justify-end gap-2'
    : 'fixed top-6 right-6 z-[1000] flex items-center gap-2';
  const buttonClassName = inline
    ? 'bg-black/70 hover:bg-black text-white p-2 md:p-3 rounded-full shadow-xl border border-blue-500/30 transition-transform hover:scale-105'
    : 'bg-black/70 hover:bg-black text-white p-3 rounded-full shadow-xl border border-blue-500/30 transition-transform hover:scale-105';
  const iconClassName = inline ? 'w-5 h-5 md:w-7 md:h-7' : 'w-6 h-6';

  return (
    <div className={containerClassName}>
      <a
        href="https://www.tiktok.com/@vlad.detailing"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="TikTok Vlad Detailing"
        className={buttonClassName}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className={iconClassName} aria-hidden="true">
          <path d="M33.2 17.5c-2.3-1.2-4.1-3.2-4.9-5.6h-3.6v16.5c0 3.1-2.5 5.6-5.6 5.6-3.1 0-5.6-2.5-5.6-5.6 0-3.1 2.5-5.6 5.6-5.6.5 0 1 .1 1.5.2v3.8c-.4-.1-.8-.2-1.3-.2-1.9 0-3.4 1.5-3.4 3.4 0 1.9 1.5 3.4 3.4 3.4s3.4-1.5 3.4-3.4V11.9h4c.7 2.4 2.4 4.4 4.7 5.5 1 .5 2.2.8 3.4.9v3.7c-1.8-.1-3.5-.6-5.1-1.5z" fill="#25F4EE" />
          <path d="M33.2 17.5c-2.3-1.2-4.1-3.2-4.9-5.6h-3.6v5.4c1.9 1.5 4.2 2.4 6.7 2.5v3.7c-1.8-.1-3.5-.6-5.1-1.5-1.2-.7-2.3-1.6-3.3-2.6v7.6c0 3.1-2.5 5.6-5.6 5.6-3.1 0-5.6-2.5-5.6-5.6 0-3.1 2.5-5.6 5.6-5.6.5 0 1 .1 1.5.2v3.8c-.4-.1-.8-.2-1.3-.2-1.9 0-3.4 1.5-3.4 3.4 0 1.9 1.5 3.4 3.4 3.4s3.4-1.5 3.4-3.4V11.9h4c.7 2.4 2.4 4.4 4.7 5.5 1 .5 2.2.8 3.4.9v3.7c-1.8-.1-3.5-.6-5.1-1.5z" fill="#FE2C55" opacity="0.8" />
          <path d="M24.7 11.9h3.6c.8 2.4 2.6 4.4 4.9 5.6 1.6.9 3.3 1.4 5.1 1.5v-3.7c-1.2-.1-2.4-.4-3.4-.9-2.3-1.1-4-3.2-4.7-5.5h-5.5 v16.6c0 3.5-2.9 6.4-6.4 6.4-3.5 0-6.4-2.9-6.4-6.4 0-3.5 2.9-6.4 6.4-6.4 .7 0 1.3.1 2 .3v-2.9c-.7-.2 -1.3-.3 -2-.3 -5.1 0 -9.2 4.1 -9.2 9.2 0 5.1 4.1 9.2 9.2 9.2 5.1 0 9.2 -4.1 9.2 -9.2 V11.9z" fill="#FFFFFF" opacity="0.9" />
        </svg>
      </a>
      <a
        href="https://www.facebook.com/profile.php?id=61566873808017"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook Vlad Detailing"
        className={buttonClassName}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className={iconClassName} aria-hidden="true">
          <path d="M24 3c11.6 0 21 9.4 21 21s-9.4 21-21 21S3 35.6 3 24 12.4 3 24 3z" fill="#0866FF" />
          <path d="M26 17h4v-4h-4c-3.3 0-6 2.7-6 6v4h-4v4h4v10h4V27h4l1-4h-5v-3c0-1.7 1.3-3 3-3z" fill="#fff" />
        </svg>
      </a>
      <a
        href="https://www.instagram.com/vlad_detailing/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram Vlad Detailing"
        className={buttonClassName}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className={iconClassName} aria-hidden="true">
          <defs>
            <linearGradient id="ig" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F58529" />
              <stop offset="50%" stopColor="#DD2A7B" />
              <stop offset="100%" stopColor="#8134AF" />
            </linearGradient>
          </defs>
          <rect x="6" y="6" width="36" height="36" rx="10" fill="url(#ig)" />
          <circle cx="24" cy="24" r="9" fill="#fff" opacity="0.85" />
          <circle cx="24" cy="24" r="6" fill="#000" opacity="0.2" />
          <circle cx="33" cy="15" r="2.5" fill="#fff" opacity="0.9" />
        </svg>
      </a>
    </div>
  );
}

export default function SocialDock({ inline = false }: SocialDockProps): React.ReactElement | null {
  if (inline) return <SocialDockContent inline />;
  if (typeof document === 'undefined') return null;
  return createPortal(<SocialDockContent />, document.body);
}
