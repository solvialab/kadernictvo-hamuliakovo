# Kaderníctvo Hamuliakovo

Slovenský responzívny web pre komorný salón na Scilovej 5 v Hamuliakove. Cormorant Garamond + Manrope, slonovinová, takmer čierna a vínová.

## Údaje a fotografie

- `lib/salon.ts`: názov, adresa, PSČ, telefón `+421944402476`, zobrazované číslo `0944 402 476` a dodaný Facebook profil. Messenger zostáva prázdny, preto sa používa „Otvoriť Facebook“.
- `components/contact-action.tsx`: spoločné kontaktné akcie vrátane `tel:` a odkazu na navigáciu. Nie je tu rezervačný systém ani automatické potvrdenie rezervácie.
- `lib/gallery.ts`: sedem reálnych koláží dodaných salónom. Kategórie bez obsahu sa nezobrazujú. Koláže sa zobrazujú celé, bez orezania jednotlivých panelov.
- `public/images/salon-*`: optimalizované reálne fotografie. Pôvodné súbory v `fotky/` zostávajú nedotknuté a nie sú súčasťou publikovaného balíka.
- `docs/salon-photo-sources.json`: presné prepojenie pôvodných súborov a optimalizovaných obrázkov. Dve súhrnné koláže sa nepoužívajú, pretože opakujú zábery z vybraných koláží.
- Reálny interiér je v sekcii O nás. Hero a detail pri filozofii ostávajú jasne označené ilustračné fotografie; podklady neobsahovali vhodné samostatné portréty ani ruky pri práci. Pôvodné ImageGen prompty sú v `docs/image-prompts.json`.

## Na doplnenie

Otváracie hodiny a overené ceny/služby sú v `lib/salon.ts`. Presne dva profilové placeholdery v `app/page.tsx` čakajú na skutočné portréty, mená, špecializácie a predstavenia kaderníčok. Žiadne dodané zábery nezobrazujú tím.

Samostatné `beforeAfterPairs` sú prázdne. Jedna dodaná koláž s vlastným označením Pred/Po sa zobrazuje celá v galérii. Nevytvárajú sa umelé páry z nesúvisiacich záberov.

Metadáta sú v `app/layout.tsx`. Súkromný návrh má stále `noindex`.

## Interakcie a opravy

`components/gallery.tsx`: lightbox s číslovaním, filtrovaním, šípkami, Escape, dotykovým posunom, podporou pinch-zoom a návratom fokusu. Pri jednej fotografii sa prepínanie deaktivuje. Pri chybe načítania je dostupné opakovanie načítania aj priamy odkaz. Upravené kliknutie (Ctrl/Cmd) zachová bežné správanie odkazu.

Opravená hlavná chyba polohy: Tailwind 4 nastavuje samostatnú vlastnosť `translate: -50% -50%`, ktorú samotné `transform: none` neruší. Celoplošný lightbox teraz ruší oba posuny. Rozloženie používa tri stabilné riadky a fotka rešpektuje dostupnú šírku aj výšku vrátane orientácie mobilu na šírku.

Mobilné menu a spodná lišta používajú prístupné primitíva a safe-area. Lišta je pri otvorenom modale skrytá. Menu sa používa aj na úzkych tabletoch, aby sa nový názov nebil s navigáciou. Úvodná animácia trvá 1,4 sekundy, prehrá sa raz v relácii a pri obmedzenom pohybe sa preskočí. Základný obsah a priame odkazy na fotografie fungujú aj bez JavaScriptu.

## Vývoj a kontrola

`pnpm install`, `pnpm dev`, `pnpm build`.

Kontrola vlastného kódu: `pnpm exec tsc --noEmit` a `pnpm exec oxlint app lib/salon.ts lib/gallery.ts components/contact-action.tsx components/salon-interactive.tsx components/gallery.tsx`.

Celý `pnpm lint` zahŕňa aj pôvodné diagnostiky v nepoužívaných generovaných komponentoch knižnice; tieto komponenty neboli pri oprave upravované. Rozsah kontroly používateľského rozhrania je uvedený v `docs/QA.md`.
