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

export const detailingInteriorExampleImages = [
  '/Images/Fotografii-interior/IMG_6922.webp',
  '/Images/Fotografii-interior/IMG_6925.webp',
  '/Images/Fotografii-interior/IMG_6928.webp',
  '/Images/Fotografii-interior/IMG_6929.webp',
  '/Images/Fotografii-interior/IMG_6930.webp',
  '/Images/Fotografii-interior/IMG_6931.webp'
];

export const detailingInteriorPackages: DetailingPackage[] = [
  {
    title: 'Pachet Interior Essence',
    description: 'Pachet standard pentru o curățare eficientă și rapidă.',
    duration: '1 - 1.5 Zile',
    price: {
      small: '500 RON',
      medium: '550 RON',
      large: '600 RON'
    },
    features: [
      'Aspirare Detaliată',
      'Curățare scaune și banchete',
      'Curățare bord, volan, plastice, consolă centrală, fețe de uși',
      'Curățare geamuri interior'
    ],
    highlight: false,
    premium: false
  },
  {
    title: 'Pachet Interior Deluxe',
    description: 'Echilibrul perfect între cost și rezultate detaliate.',
    duration: '2 Zile',
    price: {
      small: '600 RON',
      medium: '750 RON',
      large: '900 RON'
    },
    features: [
      'Aspirare Detaliată',
      'Curățare scaune și banchete',
      'Hidratare piele',
      'Curățare mochetă și capitonaje portbagaj',
      'Curățare bord, volan, plastice, consolă centrală, fețe de uși',
      'Curățare geamuri interior',
      'Tratament anti-uv plastice',
      'Curățare plafon și stâlpi',
      'Demontaj scaune (Opțional)'
    ],
    highlight: true,
    premium: false
  },
  {
    title: 'Pachet Interior Divino',
    description: 'Experiența supremă de detailing interior, fără compromisuri.',
    duration: '2 Zile',
    price: {
      small: '1000 RON',
      medium: '1300 RON',
      large: '1500 RON'
    },
    features: [
      'Demontare scaune și banchete',
      'Aspirare Detaliată',
      'Curățare scaune și banchete',
      'Curățare mochetă și capitonaje portbagaj',
      'Curățare bord, volan, plastice, consolă centrală, fețe de uși',
      'Curățare geamuri interior',
      'Curățare plafon și stâlpi',
      'Polish trimuri lucioase',
      'Tratament anti-uv plastice',
      'Aplicare protecție ceramică piele',
      'Tratament cu Ozon'
    ],
    highlight: false,
    premium: true
  }
];
