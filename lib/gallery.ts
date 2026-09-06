export type GalleryCategory = 'Strihy' | 'Farby' | 'Balayage' | 'Styling';
export type GalleryPhoto = {
  id: string;
  title: string;
  category: GalleryCategory;
  alt: string;
  width: number;
  height: number;
  source: string;
  photographer: string;
};
export const galleryPhotos: GalleryPhoto[] = [
  {
    id: 'bob',
    title: 'Čisté línie',
    category: 'Strihy',
    alt: 'Ilustračný portrét blond mikáda z profilu',
    width: 1061,
    height: 1600,
    source: 'https://unsplash.com/photos/ujh4vEL-v64',
    photographer: 'ola szkolda',
  },
  {
    id: 'natural-blonde',
    title: 'Prirodzený pohyb',
    category: 'Balayage',
    alt: 'Ilustračné medové vlny v pohybe, pohľad zozadu',
    width: 1200,
    height: 800,
    source: 'https://unsplash.com/photos/x6SW4ShgZWs',
    photographer: 'Tim Mossholder',
  },
  {
    id: 'red',
    title: 'Medené tóny',
    category: 'Farby',
    alt: 'Ilustračný detail medených vlasov v prirodzenom svetle',
    width: 1200,
    height: 800,
    source: 'https://unsplash.com/photos/FPDGV38N2mo',
    photographer: 'Allef Vinicius',
  },
  {
    id: 'balayage',
    title: 'Jemné presvetlenie',
    category: 'Balayage',
    alt: 'Ilustračné dlhé blond vlasy s jemnými farebnými prechodmi',
    width: 1067,
    height: 1600,
    source: 'https://unsplash.com/photos/W6cwaL7PMSw',
    photographer: 'Jessie Dee Dabrowski',
  },
  {
    id: 'bun',
    title: 'Umenie jednoduchosti',
    category: 'Styling',
    alt: 'Ilustračný hnedý drdol so svetlými prameňmi',
    width: 1200,
    height: 802,
    source: 'https://unsplash.com/photos/D_1tyuWWbeY',
    photographer: 'Kimia Zarifi',
  },
  {
    id: 'long',
    title: 'Dĺžka a lesk',
    category: 'Styling',
    alt: 'Ilustračné dlhé gaštanové vlasy s jednoduchým zopnutím',
    width: 1067,
    height: 1600,
    source: 'https://unsplash.com/photos/HF19cpvy-Dw',
    photographer: 'K8',
  },
];
// Pridajte iba overenú dvojicu toho istého účesu/klienta pred a po.
// Prázdne pole nezobrazuje sekciu ani prázdny priestor na stránke.
export const beforeAfterPairs: {
  id: string;
  before: string;
  after: string;
  alt: string;
  caption: string;
  verified: boolean;
}[] = [];
