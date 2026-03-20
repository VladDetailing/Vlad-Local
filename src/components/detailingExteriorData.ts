export type DetailingPackage = {
  title: string;
  description: string;
  duration: string;
  price: {
    small: string;
    medium: string;
    large: string;
  };
  features: string[];
  highlight: boolean;
  premium: boolean;
};

export const detailingExteriorExampleImages: string[] = [
  '/Polish/IMG_7122.PNG',
  '/Polish/IMG_7119.PNG',
  '/Polish/IMG_7121.PNG',
  '/Polish/IMG_7117.PNG',
  '/Polish/IMG_7123.PNG',
  '/Polish/IMG_7118.PNG',
  '/Polish/IMG_7120.PNG',
  '/Polish/IMG_7116.PNG'
];

export const detailingExteriorPackages: DetailingPackage[] = [
  {
    title: 'Pachet Exterior Essence',
    description: 'Reîmprospătare și protecție ceramică de bază.',
    duration: '1 - 2 Zile',
    price: {
      small: '1000 RON',
      medium: '1200 RON',
      large: '1400 RON'
    },
    features: [
      'Spălare și decontaminare chimică și mecanică',
      'Curățare jante',
      'Curățare geamuri',
      'Polish 1 pas (corecție zgârieturi 60-70%)',
      'Polish trimuri lucioase',
      'Aplicare dressing trimuri de plastic și anvelope',
      'Aplicare ceramică cu garanție 1 an'
    ],
    highlight: false,
    premium: false
  },
  {
    title: 'Pachet Exterior Deluxe',
    description: 'Corecție avansată și protecție ceramică superioară.',
    duration: '2 - 3 Zile',
    price: {
      small: '1700 RON',
      medium: '1850 RON',
      large: '2000 RON'
    },
    features: [
      'Spălare și decontaminare chimică și mecanică',
      'Curățare jante',
      'Curățare geamuri',
      'Polish 2 pași (corecție zgârieturi 70-85%)',
      'Polish trimuri lucioase',
      'Aplicare dressing trimuri de plastic și anvelope',
      'Aplicare ceramică cu garanție 2 ani'
    ],
    highlight: true,
    premium: false
  },
  {
    title: 'Pachet Exterior Divino',
    description: 'Perfecțiune absolută și protecție maximă pe termen lung.',
    duration: '3 - 4 Zile',
    price: {
      small: '2750 RON',
      medium: '2900 RON',
      large: '3200 RON'
    },
    features: [
      'Spălare și decontaminare chimică și mecanică',
      'Curățare jante',
      'Curățare geamuri',
      'Polish 3 pași (corecție zgârieturi 85-95%)',
      'Polish trimuri lucioase',
      'Aplicare dressing anvelope',
      'Aplicare ceramică cu garanție 3 ani în 2 straturi',
      'Aplicare tratament hidrofob geamuri',
      'Aplicare ceramică plastice exterioare'
    ],
    highlight: false,
    premium: true
  }
];
