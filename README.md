# Kadernícky ateliér

Responzívny slovenský web podľa konceptu „editoriál módneho magazínu × intímny kadernícky ateliér“. Cormorant Garamond + Manrope, slonovinová, takmer čierna a vínová.

## Doplnenie skutočných údajov

- `lib/salon.ts`: názov, mesto, adresa, telefón v medzinárodnom formáte, Facebook, overený Messenger, otváracie hodiny a ceny služieb.
- `app/page.tsx`: presne dva profilové placeholdery pre kaderníčky; doplňte skutočné fotografie, mená, špecializácie a predstavenia.
- `lib/gallery.ts`: obsah galérie, kategórie, popisy a fotografické zdroje. Filtre bez obsahu sa nezobrazujú.
- `beforeAfterPairs` v tom istom súbore je prázdne. Zobrazia sa len zodpovedajúce reálne dvojice s `verified: true`.
- `public/images/`: lokálne optimalizované WebP. Pri výmene dodržte správne rozmery, alternatívne texty a zdrojové údaje. Odstráňte označenie ilustrácie až pri skutočných fotografiách salónu/práce.
- `app/layout.tsx`: titulok a popis; návrh má zámerne `noindex`. Pred verejným uvedením aktualizujte metadáta a indexovanie.

Neznáme kontakty sa nezamieňajú za falošné odkazy. Úvodné a mobilné akcie vedú na kontaktnú sekciu s označenými chýbajúcimi údajmi. Po doplnení správnych údajov používajú skutočné `tel:` a Facebook/Messenger odkazy. Nie je tu rezervačný formulár ani automatické potvrdenie rezervácie.

## Fotografie

Hero, detail a interiér sú ilustračné obrázky vytvorené zabudovaným ImageGen. Presné prompty: `docs/image-prompts.json`. Interiér obsahuje presne dve kreslá. Šesť odlišných fotografií galérie pochádza z Unsplash; odkazy a licenčné údaje: `docs/image-sources.json`. Autor fotografie je uvedený aj v lightboxe. Žiadna ilustračná fotografia sa neprezentuje ako skutočná zamestnankyňa alebo práca salónu.

## Ovládanie a prístupnosť

Galéria: filtrovanie, šípky, Escape, dotykové potiahnutie a návrat fokusu na zdrojovú fotografiu. Mobilné menu používa prístupný modal. Spodná lišta rešpektuje safe-area a počas otvorených modalov sa skryje.

Úvodná animácia trvá 1,4 sekundy, len raz v relácii; načítavanie galérie ju neblokuje. Pri `prefers-reduced-motion` sa preskočí. HTML obsah je serverovo vykreslený; bez JavaScriptu sa galéria otvára cez priame odkazy na obrázky a kontaktné kotvy zostávajú dostupné. Obsah nie je skrytý čakaním na animáciu.

## Vývoj

`pnpm install`, `pnpm dev`, `pnpm build`.

Kontrola vlastného kódu: `pnpm exec tsc --noEmit` a `pnpm exec oxlint app lib/salon.ts lib/gallery.ts components/contact-action.tsx components/salon-interactive.tsx`. Celý `pnpm lint` hlási aj existujúce upozornenia v generovaných komponentoch knižnice, ktoré sa tu nepoužívajú.
