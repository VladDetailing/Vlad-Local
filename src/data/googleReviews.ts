export type GoogleReview = {
  name: string;
  rating: number;
  text: string;
  date?: string;
};

export const googleReviews: GoogleReview[] = [
  {
    name: 'George - Cosmin Mitu',
    rating: 5,
    text: 
    'Recomand! Super profi băieții! Nota 10',
  },
  {
    name: 'Roxy Adriana',
    rating: 5,
    text:
      'Dacă vrei să ai parte de profesionalism la ei găsești!Recomand 💯!',
  },
  {
    name: 'Danaila Laurentiu',
    rating: 5,
    text:
      'Sunt profesioniști. Se cunoaște ca lucrează cu produse profesionale. Țineți-o tot așa 👏.',

  },

   {
    name: 'Bogdan Honțaru',
    rating: 5,
    text:
      '10/10 recomand cu căldură!!!'
  },
  {
    name: 'Ghiorghiță Sandu',
    rating: 5,
    text: '',
   
  },
];
