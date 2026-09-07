export type GalleryCategory = 'Strihy' | 'Farby' | 'Balayage' | 'Styling';
export type GalleryPhoto = {
  id: string;
  title: string;
  category: GalleryCategory;
  alt: string;
  width: number;
  height: number;
  thumbnailWidth: number;
  comparison?: boolean;
};
// Originálne koláže dodané salónom. V náhľade aj lightboxe ostávajú celé.
// Kategórie pomenúvajú viditeľný výsledok; nepotvrdené techniky nepripisujeme.
export const galleryPhotos: GalleryPhoto[] = [
  {
    id: 'salon-medene-tony',
    title: 'Medené tóny',
    category: 'Farby',
    alt: 'Koláž dvoch záberov vlasov po plecia v červenohnedom a medenom odtieni.',
    width: 2048,
    height: 2048,
    thumbnailWidth: 720,
  },
  {
    id: 'salon-svetle-pramene',
    title: 'Svetlé pramene',
    category: 'Farby',
    alt: 'Dva pohľady na dlhé rovné vlasy so svetlými prameňmi a tmavšími tónmi.',
    width: 1600,
    height: 1600,
    thumbnailWidth: 720,
  },
  {
    id: 'salon-medena-premena',
    title: 'Premena do medených tónov',
    category: 'Farby',
    alt: 'Koláž pred a po úprave: zvlnené svetlejšie vlasy a dva pohľady na hladký medenohnedý účes.',
    width: 1600,
    height: 1600,
    thumbnailWidth: 720,
    comparison: true,
  },
  {
    id: 'salon-medene-vlny',
    title: 'Kratší strih, medené vlny',
    category: 'Strihy',
    alt: 'Koláž svetlohnedých vlasov po plecia a troch pohľadov na kratší medený účes s vlnami.',
    width: 960,
    height: 960,
    thumbnailWidth: 720,
  },
  {
    id: 'salon-svetle-a-tmave',
    title: 'Svetlý a tmavý odtieň',
    category: 'Farby',
    alt: 'Dvojica zadných pohľadov na dlhé hladké vlasy vo veľmi tmavom a svetlom odtieni.',
    width: 2048,
    height: 2048,
    thumbnailWidth: 720,
  },
  {
    id: 'salon-dlhe-tmave',
    title: 'Dĺžka a lesk',
    category: 'Styling',
    alt: 'Tri pohľady na veľmi dlhé tmavé rovné vlasy s hladkým povrchom.',
    width: 1600,
    height: 1600,
    thumbnailWidth: 720,
  },
  {
    id: 'salon-pramene-a-vlny',
    title: 'Svetlé pramene a vlny',
    category: 'Styling',
    alt: 'Koláž hnedých vlasov a dvoch pohľadov na účes so svetlými prameňmi a zvlnenými koncami.',
    width: 2048,
    height: 2048,
    thumbnailWidth: 720,
  },
];
// Overená koláž pred/po sa zobrazuje celá v galérii, bez duplikovania panelov.
// Samostatné porovnanie sa zobrazí až po doplnení overenej dvojice súborov.
export const beforeAfterPairs: {
  id: string;
  before: string;
  after: string;
  alt: string;
  caption: string;
  verified: boolean;
}[] = [];
