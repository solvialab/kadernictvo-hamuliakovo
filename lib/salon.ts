// Doplňte len overené údaje. Telefón v medzinárodnom formáte, napr. +421…
export const salon: {
  name: string;
  city: string;
  address: string | null;
  phone: string | null;
  phoneDisplay: string | null;
  postalCode: string | null;
  facebook: string | null;
  instagram: string;
  messenger: string | null;
  hours: string | null;
} = {
  name: 'Kaderníctvo Hamuliakovo',
  city: 'Hamuliakovo',
  address: 'Scilová 5',
  postalCode: '900 43',
  phone: '+421944402476',
  phoneDisplay: '0944 402 476',
  facebook: 'https://www.facebook.com/profile.php?id=100086772062489',
  instagram: 'https://www.instagram.com/kadernictvohamuliakovo/',
  messenger: null,
  hours: null,
};
export const services = [
  {
    name: 'Strih a styling',
    description:
      'Dámske, pánske aj detské strihy. Tvar, ktorý vám prirodzene pristane.',
    price: 'od 8 €',
  },
  {
    name: 'Farbenie',
    description:
      'Osvieženie odtieňa aj výraznejšia zmena, vrátane strihu a úpravy.',
    price: 'od 40 €',
  },
  {
    name: 'Melír',
    description: 'Svetlé pramene pre odrasty alebo celú dĺžku vlasov.',
    price: 'od 55 €',
  },
  {
    name: 'Nechtový dizajn',
    description: 'Gélové nechty, gél lak, klasická aj japonská manikúra.',
    price: 'od 10 €',
  },
];
