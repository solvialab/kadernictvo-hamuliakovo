# Kaderníctvo Hamuliakovo

Slovenský responzívny web pre komorný salón na Scilovej 5 v Hamuliakove. Cormorant Garamond + Manrope, slonovinová, takmer čierna a vínová.

## Údaje a fotografie

- `lib/salon.ts`: názov, adresa, PSČ, telefón `+421944402476`, zobrazované číslo `0944 402 476` a dodané profily na Facebooku aj Instagrame. Messenger zostáva prázdny, preto sa používa „Otvoriť Facebook“.
- `components/contact-action.tsx`: spoločné kontaktné akcie vrátane `tel:` a odkazu na navigáciu. Nie je tu rezervačný systém ani automatické potvrdenie rezervácie.
- `lib/gallery.ts`: sedem reálnych koláží dodaných salónom. Kategórie bez obsahu sa nezobrazujú. Koláže sa zobrazujú celé, bez orezania jednotlivých panelov.
- `public/images/salon-*`: optimalizované reálne fotografie. Pôvodné súbory v `fotky/` zostávajú nedotknuté a nie sú súčasťou publikovaného balíka.
- `docs/salon-photo-sources.json`: presné prepojenie pôvodných súborov a optimalizovaných obrázkov. Dve súhrnné koláže sa nepoužívajú, pretože opakujú zábery z vybraných koláží.
- Reálny interiér je v sekcii O nás. Hero a detail pri filozofii ostávajú jasne označené ilustračné fotografie; podklady neobsahovali vhodné samostatné portréty ani ruky pri práci. Pôvodné ImageGen prompty sú v `docs/image-prompts.json`.

## Na doplnenie

Otváracie hodiny sú v `lib/salon.ts`. Cenník v `lib/prices.ts` je prepísaný z dodaných fotografií vlasov a nechtov. Ceny sú dostupné priamo na stránke, bez duplicitných odkazov na fotografie cenníkov. Presne dva profilové placeholdery v `app/page.tsx` čakajú na skutočné portréty, mená, špecializácie a predstavenia kaderníčok. Žiadne dodané zábery nezobrazujú tím.

Samostatné `beforeAfterPairs` sú prázdne. Jedna dodaná koláž s vlastným označením Pred/Po sa zobrazuje celá v galérii. Nevytvárajú sa umelé páry z nesúvisiacich záberov.

Metadáta sú v `app/layout.tsx`. Súkromný návrh má stále `noindex`.

## Interakcie a opravy

`components/gallery.tsx`: lightbox s číslovaním, filtrovaním, šípkami, Escape, dotykovým posunom, podporou pinch-zoom a návratom fokusu. Pri jednej fotografii sa prepínanie deaktivuje. Pri chybe načítania je dostupné opakovanie načítania aj priamy odkaz. Upravené kliknutie (Ctrl/Cmd) zachová bežné správanie odkazu.

Opravená hlavná chyba polohy: Tailwind 4 nastavuje samostatnú vlastnosť `translate: -50% -50%`, ktorú samotné `transform: none` neruší. Celoplošný lightbox teraz ruší oba posuny. Rozloženie používa tri stabilné riadky a fotka rešpektuje dostupnú šírku aj výšku vrátane orientácie mobilu na šírku.

Mobilné menu a spodná lišta používajú prístupné primitíva a safe-area. Lišta je pri otvorenom modale skrytá. Menu sa používa aj na úzkych tabletoch, aby sa nový názov nebil s navigáciou. Úvodná animácia trvá 1,8 sekundy, prehrá sa raz v relácii a pri obmedzenom pohybe sa preskočí. Základný obsah a priame odkazy na fotografie fungujú aj bez JavaScriptu.

## Vývoj a kontrola

`pnpm install`, `pnpm dev`, `pnpm build`.

Kontrola vlastného kódu: `pnpm exec tsc --noEmit` a `pnpm exec oxlint app lib/salon.ts lib/gallery.ts components/contact-action.tsx components/salon-interactive.tsx components/gallery.tsx`.

Celý `pnpm lint` zahŕňa aj pôvodné diagnostiky v nepoužívaných generovaných komponentoch knižnice; tieto komponenty neboli pri oprave upravované. Rozsah kontroly používateľského rozhrania je uvedený v `docs/QA.md`.


## Logo, cenník a responzívne rozloženie

Pôvodné logo má presný CSS výrez bez zbytočných bielych okrajov. Celý znak s nápismi je v sekcii O nás a jeho biele pozadie splýva s podkladom stránky. Samostatný kruhový symbol sa používa v navigácii, mobilnom menu, úvode a päte; originálna kresba aj texty zostávajú zachované. Nová nepriehľadná navigácia má položku Cenník a mobilný panel do šírky 1100 px. Hlavný titulok už neprekrýva fotografiu. Päta obsahuje Instagram a odkaz Built by Solvia Lab s.r.o. s otvorením v novom okne.

Produkčný CSS optimalizátor zlučoval samostatné `translate`/`scale` s `transform`. Preto sú tri nulové transformácie lightboxu nastavené aj inline na mieste použitia dialógu. Overené na skutočnom statickom výstupe, nielen v režime dev.

## GitHub Pages

`pnpm run build:pages` vytvorí overený statický výstup v `dist/client`. Použite Node 22 LTS (lokálne overené 22.23.2); Node 24 na Windows po prerenderovaní spôsobil chybu libuv pri ukončení procesu.

Predvolené `PAGES_BASE_URL` je `https://solvialab.github.io/kadernictvo-hamuliakovo/`; možno ho zmeniť premennou prostredia. Bežný `pnpm build` naďalej zostavuje Sites Worker.

Export je zámerne samostatný: vinext beta.5 pri prerenderovaní nepripája frameworkový basePath, preto zostáva routing tejto jednej stránky na koreňovej ceste. Natívne odkazy používajú fragmenty, statické obrázky používajú `assetUrl`, JS/CSS majú absolútny assetPrefix. `scripts/finalize-pages.mjs` opravuje prefixy fontov a vyžaduje vyrenderovanú titulnú stránku, cenník a existujúce odkazované assety. Vytvára tiež `.nojekyll`.


Verejný repozitár: https://github.com/solvialab/kadernictvo-hamuliakovo

Workflow `.github/workflows/pages.yml` po zmene vetvy `main` zostaví a overí statický výstup a publikuje ho cez GitHub Pages. Pôvodný repozitár `solvialab/solvialab` zostáva súkromný; kópia zdroja je vo vetve `kadernictvo-hamuliakovo`.
