export type GallerySectionKey =
  | 'detailing-interior'
  | 'wrapping-ppf'
  | 'folie-solara'
  | 'polish-faruri'
  | 'revopsire-piele'
  | 'retapitari'
  | 'before-after';

export type GalleryImage = {
  src: string;
  alt: string;
  category: GallerySectionKey;
};

export const galleryImages: GalleryImage[] = [
  {
    src: '/Images/Fotografii-interior/IMG_6922.webp',
    alt: 'Detailing interior - rezultat 1',
    category: 'detailing-interior'
  },
  {
    src: '/Images/Fotografii-interior/IMG_6925.webp',
    alt: 'Detailing interior - rezultat 2',
    category: 'detailing-interior'
  },
  {
    src: '/Images/Fotografii-interior/IMG_6928.webp',
    alt: 'Detailing interior - rezultat 3',
    category: 'detailing-interior'
  },
  {
    src: '/Images/Fotografii-interior/IMG_6929.webp',
    alt: 'Detailing interior - rezultat 4',
    category: 'detailing-interior'
  },
  {
    src: '/Images/Fotografii-interior/IMG_6930.webp',
    alt: 'Detailing interior - rezultat 5',
    category: 'detailing-interior'
  },
  {
    src: '/Images/Fotografii-interior/IMG_6931.webp',
    alt: 'Detailing interior - rezultat 6',
    category: 'detailing-interior'
  },
  {
    src: '/Images/ppf/IMG_5245.webp',
    alt: 'PPF - lucrare 1',
    category: 'wrapping-ppf'
  },
  {
    src: '/Images/ppf/IMG_5250.webp',
    alt: 'PPF - lucrare 2',
    category: 'wrapping-ppf'
  },
  {
    src: '/Images/ppf/IMG_6696.webp',
    alt: 'PPF - lucrare 3',
    category: 'wrapping-ppf'
  },
  {
    src: '/Images/ppf/IMG_6697.webp',
    alt: 'PPF - lucrare 4',
    category: 'wrapping-ppf'
  },
  {
    src: '/Images/ppf/IMG_6699.webp',
    alt: 'PPF - lucrare 5',
    category: 'wrapping-ppf'
  },
  {
    src: '/Images/colantari/IMG_5988.webp',
    alt: 'Wrapping - lucrare 1',
    category: 'wrapping-ppf'
  },
  {
    src: '/Images/colantari/IMG_5991.webp',
    alt: 'Wrapping - lucrare 2',
    category: 'wrapping-ppf'
  },
  {
    src: '/Images/colantari/IMG_6014.webp',
    alt: 'Wrapping - lucrare 3',
    category: 'wrapping-ppf'
  },
  {
    src: '/Images/colantari/IMG_6018.webp',
    alt: 'Wrapping - lucrare 4',
    category: 'wrapping-ppf'
  },
  {
    src: '/Images/colantari/IMG_6031.webp',
    alt: 'Wrapping - lucrare 5',
    category: 'wrapping-ppf'
  },
  {
    src: '/Images/folie-solara-geamuri/IMG_6977.webp',
    alt: 'Folie solară - lucrare 1',
    category: 'folie-solara'
  },
  {
    src: '/Images/folie-solara-geamuri/IMG_6978.webp',
    alt: 'Folie solară - lucrare 2',
    category: 'folie-solara'
  },
  {
    src: '/Images/folie-solara-geamuri/IMG_6979.webp',
    alt: 'Folie solară - lucrare 3',
    category: 'folie-solara'
  },
  {
    src: '/Images/folie-solara-geamuri/IMG_6980.webp',
    alt: 'Folie solară - lucrare 4',
    category: 'folie-solara'
  },
  {
    src: '/Images/folie-solara-geamuri/IMG_6981.webp',
    alt: 'Folie solară - lucrare 5',
    category: 'folie-solara'
  },
  {
    src: '/Images/folie-solara-geamuri/IMG_6982.webp',
    alt: 'Folie solară - lucrare 6',
    category: 'folie-solara'
  },
  {
    src: '/Images/folie-solara-geamuri/IMG_6984.webp',
    alt: 'Folie solară - lucrare 7',
    category: 'folie-solara'
  },
  {
    src: '/Images/folie-solara-geamuri/IMG_6985.webp',
    alt: 'Folie solară - lucrare 8',
    category: 'folie-solara'
  },
  {
    src: '/Images/folie-solara-geamuri/IMG_6986.webp',
    alt: 'Folie solară - lucrare 9',
    category: 'folie-solara'
  },
  {
    src: '/Images/folie-solara-geamuri/IMG_6987.webp',
    alt: 'Folie solară - lucrare 10',
    category: 'folie-solara'
  },
  {
    src: '/Images/folie-solara-geamuri/IMG_6988.webp',
    alt: 'Folie solară - lucrare 11',
    category: 'folie-solara'
  },
  {
    src: '/Images/Polish-faruri/IMG_6990.webp',
    alt: 'Polish faruri - înainte',
    category: 'polish-faruri'
  },
  {
    src: '/Images/Polish-faruri/IMG_6991.webp',
    alt: 'Polish faruri - după',
    category: 'polish-faruri'
  },
  {
    src: '/Revopsire-piele/IMG_7013.webp',
    alt: 'Revopsire piele - lucrare 1',
    category: 'revopsire-piele'
  },
  {
    src: '/Revopsire-piele/IMG_7014.webp',
    alt: 'Revopsire piele - lucrare 2',
    category: 'revopsire-piele'
  },
  {
    src: '/Revopsire-piele/IMG_7015.webp',
    alt: 'Revopsire piele - lucrare 3',
    category: 'revopsire-piele'
  },
  {
    src: '/Revopsire-piele/IMG_7016.webp',
    alt: 'Revopsire piele - lucrare 4',
    category: 'revopsire-piele'
  },
  {
    src: '/Retapitari/IMG_7020.webp',
    alt: 'Retapițări - lucrare 1',
    category: 'retapitari'
  },
  {
    src: '/Retapitari/IMG_7022.webp',
    alt: 'Retapițări - lucrare 2',
    category: 'retapitari'
  },
  {
    src: '/Retapitari/IMG_7024.webp',
    alt: 'Retapițări - lucrare 3',
    category: 'retapitari'
  },
  {
    src: '/Retapitari/IMG_7026.webp',
    alt: 'Retapițări - lucrare 4',
    category: 'retapitari'
  },
  {
    src: '/Retapitari/IMG_7028.webp',
    alt: 'Retapițări - lucrare 5',
    category: 'retapitari'
  },
  {
    src: '/Retapitari/IMG_7029.webp',
    alt: 'Retapițări - lucrare 6',
    category: 'retapitari'
  },
  {
    src: '/Images/before-after/01-before.webp',
    alt: 'Before/After - interior înainte',
    category: 'before-after'
  },
  {
    src: '/Images/before-after/01-after.webp',
    alt: 'Before/After - interior după',
    category: 'before-after'
  },
  {
    src: '/Images/before-after/02-before.webp',
    alt: 'Before/After - exterior înainte',
    category: 'before-after'
  },
  {
    src: '/Images/before-after/02-after.webp',
    alt: 'Before/After - exterior după',
    category: 'before-after'
  },
  {
    src: '/Images/before-after/03-before.webp',
    alt: 'Before/After - jante înainte',
    category: 'before-after'
  },
  {
    src: '/Images/before-after/03-after.webp',
    alt: 'Before/After - jante după',
    category: 'before-after'
  }
];

export const galleryImageSrcs = galleryImages.map((i) => i.src);

export const gallerySections: Array<{ key: GallerySectionKey; title: string; subtitle: string }> = [
  {
    key: 'detailing-interior',
    title: 'Detailing interior',
    subtitle: 'Curățare, igienizare și rezultate premium.'
  },
  {
    key: 'wrapping-ppf',
    title: 'Wrapping / PPF',
    subtitle: 'Protecție și schimbare de look.'
  },
  {
    key: 'folie-solara',
    title: 'Folie solară',
    subtitle: 'Omologată RAR, montaj curat și fără compromisuri.'
  },
  {
    key: 'polish-faruri',
    title: 'Polish faruri',
    subtitle: 'Claritate și protecție pentru siguranță.'
  },
  {
    key: 'revopsire-piele',
    title: 'Revopsire piele',
    subtitle: 'Restaurare profesională a interiorului.'
  },
  {
    key: 'retapitari',
    title: 'Retapițări',
    subtitle: 'Materiale premium și finisaj atent.'
  },
  {
    key: 'before-after',
    title: 'Before / After',
    subtitle: 'Diferențe vizibile înainte și după.'
  }
];
