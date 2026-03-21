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
    src: '/Images/Fotografii-interior/IMG_6922.PNG',
    alt: 'Detailing interior - rezultat 1',
    category: 'detailing-interior'
  },
  {
    src: '/Images/Fotografii-interior/IMG_6925.PNG',
    alt: 'Detailing interior - rezultat 2',
    category: 'detailing-interior'
  },
  {
    src: '/Images/Fotografii-interior/IMG_6928.PNG',
    alt: 'Detailing interior - rezultat 3',
    category: 'detailing-interior'
  },
  {
    src: '/Images/Fotografii-interior/IMG_6929.PNG',
    alt: 'Detailing interior - rezultat 4',
    category: 'detailing-interior'
  },
  {
    src: '/Images/Fotografii-interior/IMG_6930.PNG',
    alt: 'Detailing interior - rezultat 5',
    category: 'detailing-interior'
  },
  {
    src: '/Images/Fotografii-interior/IMG_6931.PNG',
    alt: 'Detailing interior - rezultat 6',
    category: 'detailing-interior'
  },
  {
    src: '/Images/ppf/IMG_5245.png',
    alt: 'PPF - lucrare 1',
    category: 'wrapping-ppf'
  },
  {
    src: '/Images/ppf/IMG_5250.png',
    alt: 'PPF - lucrare 2',
    category: 'wrapping-ppf'
  },
  {
    src: '/Images/ppf/IMG_6696.png',
    alt: 'PPF - lucrare 3',
    category: 'wrapping-ppf'
  },
  {
    src: '/Images/ppf/IMG_6697.png',
    alt: 'PPF - lucrare 4',
    category: 'wrapping-ppf'
  },
  {
    src: '/Images/ppf/IMG_6699.png',
    alt: 'PPF - lucrare 5',
    category: 'wrapping-ppf'
  },
  {
    src: '/Images/colantari/IMG_5988.png',
    alt: 'Wrapping - lucrare 1',
    category: 'wrapping-ppf'
  },
  {
    src: '/Images/colantari/IMG_5991.png',
    alt: 'Wrapping - lucrare 2',
    category: 'wrapping-ppf'
  },
  {
    src: '/Images/colantari/IMG_6014.png',
    alt: 'Wrapping - lucrare 3',
    category: 'wrapping-ppf'
  },
  {
    src: '/Images/colantari/IMG_6018.png',
    alt: 'Wrapping - lucrare 4',
    category: 'wrapping-ppf'
  },
  {
    src: '/Images/colantari/IMG_6031.png',
    alt: 'Wrapping - lucrare 5',
    category: 'wrapping-ppf'
  },
  {
    src: '/Images/folie-solara-geamuri/IMG_6977.PNG',
    alt: 'Folie solară - lucrare 1',
    category: 'folie-solara'
  },
  {
    src: '/Images/folie-solara-geamuri/IMG_6978.PNG',
    alt: 'Folie solară - lucrare 2',
    category: 'folie-solara'
  },
  {
    src: '/Images/folie-solara-geamuri/IMG_6979.PNG',
    alt: 'Folie solară - lucrare 3',
    category: 'folie-solara'
  },
  {
    src: '/Images/folie-solara-geamuri/IMG_6980.PNG',
    alt: 'Folie solară - lucrare 4',
    category: 'folie-solara'
  },
  {
    src: '/Images/folie-solara-geamuri/IMG_6981.PNG',
    alt: 'Folie solară - lucrare 5',
    category: 'folie-solara'
  },
  {
    src: '/Images/folie-solara-geamuri/IMG_6982.PNG',
    alt: 'Folie solară - lucrare 6',
    category: 'folie-solara'
  },
  {
    src: '/Images/folie-solara-geamuri/IMG_6984.PNG',
    alt: 'Folie solară - lucrare 7',
    category: 'folie-solara'
  },
  {
    src: '/Images/folie-solara-geamuri/IMG_6985.PNG',
    alt: 'Folie solară - lucrare 8',
    category: 'folie-solara'
  },
  {
    src: '/Images/folie-solara-geamuri/IMG_6986.PNG',
    alt: 'Folie solară - lucrare 9',
    category: 'folie-solara'
  },
  {
    src: '/Images/folie-solara-geamuri/IMG_6987.PNG',
    alt: 'Folie solară - lucrare 10',
    category: 'folie-solara'
  },
  {
    src: '/Images/folie-solara-geamuri/IMG_6988.PNG',
    alt: 'Folie solară - lucrare 11',
    category: 'folie-solara'
  },
  {
    src: '/Images/Polish-faruri/IMG_6990.jpg',
    alt: 'Polish faruri - înainte',
    category: 'polish-faruri'
  },
  {
    src: '/Images/Polish-faruri/IMG_6991.jpg',
    alt: 'Polish faruri - după',
    category: 'polish-faruri'
  },
  {
    src: '/Revopsire-piele/IMG_7013.PNG',
    alt: 'Revopsire piele - lucrare 1',
    category: 'revopsire-piele'
  },
  {
    src: '/Revopsire-piele/IMG_7014.PNG',
    alt: 'Revopsire piele - lucrare 2',
    category: 'revopsire-piele'
  },
  {
    src: '/Revopsire-piele/IMG_7015.PNG',
    alt: 'Revopsire piele - lucrare 3',
    category: 'revopsire-piele'
  },
  {
    src: '/Revopsire-piele/IMG_7016.PNG',
    alt: 'Revopsire piele - lucrare 4',
    category: 'revopsire-piele'
  },
  {
    src: '/Retapitari/IMG_7020.PNG',
    alt: 'Retapițări - lucrare 1',
    category: 'retapitari'
  },
  {
    src: '/Retapitari/IMG_7022.PNG',
    alt: 'Retapițări - lucrare 2',
    category: 'retapitari'
  },
  {
    src: '/Retapitari/IMG_7024.PNG',
    alt: 'Retapițări - lucrare 3',
    category: 'retapitari'
  },
  {
    src: '/Retapitari/IMG_7026.PNG',
    alt: 'Retapițări - lucrare 4',
    category: 'retapitari'
  },
  {
    src: '/Retapitari/IMG_7028.PNG',
    alt: 'Retapițări - lucrare 5',
    category: 'retapitari'
  },
  {
    src: '/Retapitari/IMG_7029.PNG',
    alt: 'Retapițări - lucrare 6',
    category: 'retapitari'
  },
  {
    src: '/Images/before-after/01-before.png',
    alt: 'Before/After - interior înainte',
    category: 'before-after'
  },
  {
    src: '/Images/before-after/01-after.png',
    alt: 'Before/After - interior după',
    category: 'before-after'
  },
  {
    src: '/Images/before-after/02-before.png',
    alt: 'Before/After - exterior înainte',
    category: 'before-after'
  },
  {
    src: '/Images/before-after/02-after.png',
    alt: 'Before/After - exterior după',
    category: 'before-after'
  },
  {
    src: '/Images/before-after/03-before.png?v=5',
    alt: 'Before/After - jante înainte',
    category: 'before-after'
  },
  {
    src: '/Images/before-after/03-after.png?v=5',
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
