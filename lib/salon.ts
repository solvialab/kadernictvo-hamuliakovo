// Doplňte len overené údaje. Telefón v medzinárodnom formáte, napr. +421…
export const salon: {
  name: string;
  city: string;
  address: string | null;
  phone: string | null;
  facebook: string | null;
  messenger: string | null;
  hours: string | null;
} = {
  name: '[Názov salónu]',
  city: '[MESTO]',
  address: null,
  phone: null,
  facebook: null,
  messenger: null,
  hours: null,
};
export const services: {
  name: string;
  description: string;
  price: string | null;
}[] = [
  {
    name: 'Strih a styling',
    description: 'Tvar, ktorý rešpektuje vaše vlasy aj váš každodenný rytmus.',
    price: null,
  },
  {
    name: 'Farbenie',
    description:
      'Jemné osvieženie alebo výrazná zmena. Odtieň vyberieme spolu.',
    price: null,
  },
  {
    name: 'Balayage a melír',
    description: 'Svetlo, hĺbka a prirodzené prechody vo vlasoch.',
    price: null,
  },
  {
    name: 'Regenerácia a starostlivosť',
    description: 'Starostlivosť podľa toho, čo vaše vlasy práve potrebujú.',
    price: null,
  },
  {
    name: 'Spoločenské účesy',
    description: 'Premyslený účes na chvíle, na ktorých vám záleží.',
    price: null,
  },
];
