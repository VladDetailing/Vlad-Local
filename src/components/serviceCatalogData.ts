export type VehicleType = 'hatchback' | 'sedan' | 'suv';

export type Price =
  | { kind: 'fixed'; amount: number; amountByVehicle?: Partial<Record<VehicleType, number>> }
  | { kind: 'from'; amount: number; amountByVehicle?: Partial<Record<VehicleType, number>> }
  | { kind: 'quote' };

export type ServiceItem = {
  id: string;
  label: string;
  description?: string;
  price: Price;
  quantity?: {
    min: number;
    max: number;
    step: number;
    default: number;
    unitLabel: string;
  };
};

export type ServiceCategory = {
  id: string;
  label: string;
  mode: 'single' | 'multi';
  items: ServiceItem[];
};

export const serviceCatalog: ServiceCategory[] = [
  {
    id: 'detailing-exterior',
    label: 'Detailing Exterior',
    mode: 'single',
    items: [
      {
        id: 'detailing-exterior-essence',
        label: 'Pachet Exterior Essence',
        description: '1 - 2 zile',
        price: { kind: 'fixed', amount: 0, amountByVehicle: { hatchback: 1000, sedan: 1200, suv: 1400 } }
      },
      {
        id: 'detailing-exterior-deluxe',
        label: 'Pachet Exterior Deluxe',
        description: '2 - 3 zile',
        price: { kind: 'fixed', amount: 0, amountByVehicle: { hatchback: 1700, sedan: 1850, suv: 2000 } }
      },
      {
        id: 'detailing-exterior-divino',
        label: 'Pachet Exterior Divino',
        description: '3 - 4 zile',
        price: { kind: 'fixed', amount: 0, amountByVehicle: { hatchback: 2750, sedan: 2900, suv: 3200 } }
      }
    ]
  },
  {
    id: 'detailing-interior',
    label: 'Detailing Interior',
    mode: 'single',
    items: [
      {
        id: 'detailing-interior-essence',
        label: 'Pachet Interior Essence',
        description: '1 - 1.5 zile',
        price: { kind: 'fixed', amount: 0, amountByVehicle: { hatchback: 500, sedan: 550, suv: 600 } }
      },
      {
        id: 'detailing-interior-deluxe',
        label: 'Pachet Interior Deluxe',
        description: '2 zile',
        price: { kind: 'fixed', amount: 0, amountByVehicle: { hatchback: 600, sedan: 750, suv: 900 } }
      },
      {
        id: 'detailing-interior-divino',
        label: 'Pachet Interior Divino',
        description: '2 zile',
        price: { kind: 'fixed', amount: 0, amountByVehicle: { hatchback: 1000, sedan: 1300, suv: 1500 } }
      }
    ]
  },
  {
    id: 'folie-solara',
    label: 'Folie Solară',
    mode: 'multi',
    items: [
      { id: 'folie-spate-luneta', label: 'Geamuri Spate + Lunetă', description: 'Autorizat RAR', price: { kind: 'fixed', amount: 450 } },
      { id: 'folie-fata', label: 'Geamuri Față', description: 'Autorizat RAR (transparență legală)', price: { kind: 'fixed', amount: 250 } },
      { id: 'folie-parbriz-interior', label: 'Folie Parbriz (pe interior)', description: 'Protecție termică și UV superioară', price: { kind: 'fixed', amount: 500 } }
    ]
  },
  {
    id: 'polish-faruri',
    label: 'Polish Faruri',
    mode: 'single',
    items: [
      { id: 'polish-faruri-set', label: 'Polish Faruri (Set)', description: 'Restaurare claritate + Protecție ceramică', price: { kind: 'fixed', amount: 250 } },
      { id: 'ppf-faruri', label: 'Protecție PPF Faruri', description: 'Folie de protecție transparentă', price: { kind: 'fixed', amount: 250 } },
      { id: 'pachet-faruri-complet', label: 'Pachet Complet (Polish + PPF)', description: 'Durată execuție: 4 ore', price: { kind: 'fixed', amount: 450 } }
    ]
  },
  {
    id: 'wrapping-ppf',
    label: 'Wrapping / PPF',
    mode: 'multi',
    items: [
      {
        id: 'wrapping-complet',
        label: 'Wrapping Complet',
        description: 'preț orientativ',
        price: { kind: 'from', amount: 0, amountByVehicle: { hatchback: 7000, sedan: 7500, suv: 8000 } }
      },
      {
        id: 'ppf-complet',
        label: 'Înfoliere Completă PPF',
        description: 'preț de la',
        price: { kind: 'from', amount: 0, amountByVehicle: { hatchback: 15000, sedan: 17500, suv: 19000 } }
      },
      { id: 'folie-parbriz-exterior', label: 'Folie Protecție Parbriz (Exterior)', description: 'Durată de viață: 1 an', price: { kind: 'fixed', amount: 1200 } }
    ]
  },
  {
    id: 'revopsire-piele',
    label: 'Revopsire Piele',
    mode: 'multi',
    items: [
      { id: 'revopsire-volan', label: 'Revopsire Volan', description: 'de la', price: { kind: 'from', amount: 350 } },
      { id: 'revopsire-scaun', label: 'Revopsire Scaun', description: 'de la', price: { kind: 'from', amount: 950 } },
      { id: 'revopsire-aripioara', label: 'Revopsire Aripioară Scaun', description: 'de la', price: { kind: 'from', amount: 200 } },
      { id: 'revopsire-bancheta', label: 'Revopsire Banchetă', description: 'de la', price: { kind: 'from', amount: 1500 } }
    ]
  },
  {
    id: 'retapitari',
    label: 'Retapițări',
    mode: 'multi',
    items: [
      { id: 'retapitare-plafon', label: 'Retapițare Plafon', description: 'de la • 1 zi', price: { kind: 'from', amount: 700 } },
      {
        id: 'retapitare-stalpi',
        label: 'Retapițare Stâlpi',
        description: 'per stâlp • 1 zi',
        price: { kind: 'from', amount: 130 },
        quantity: { min: 1, max: 12, step: 1, default: 2, unitLabel: 'stâlp' }
      },
      {
        id: 'retapitare-fete-usi',
        label: 'Retapițare Fețe de Uși',
        description: 'per față de ușă',
        price: { kind: 'from', amount: 200 },
        quantity: { min: 1, max: 6, step: 1, default: 2, unitLabel: 'față de ușă' }
      },
      { id: 'retapitare-volan', label: 'Retapițare Volan', description: 'de la • 2–3 zile', price: { kind: 'from', amount: 750 } },
      { id: 'retapitare-scaune', label: 'Retapițare Scaune', description: 'preț la cerere', price: { kind: 'quote' } },
      { id: 'retapitare-camioane', label: 'Retapițare Camioane', description: 'preț la cerere • 5–7 zile', price: { kind: 'quote' } }
    ]
  }
];

export const vehicleTypeLabels: Record<VehicleType, string> = {
  hatchback: 'Hatchback',
  sedan: 'Sedan',
  suv: 'SUV'
};

