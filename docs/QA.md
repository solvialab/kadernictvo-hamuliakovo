# Kontrola 7. 9. 2026

## Reprodukovaná a opravená chyba

Na pôvodnej publikácii bolo pri šírke 319 px okno lightboxu posunuté na x=-152, y=-396,8. Vypočítané `translate` bolo `-50% -50%`, aj keď `transform` bolo `none`. Fotografia a zatváranie boli mimo obrazovky.

Po oprave je okno na x=0, y=0. Sedem fotografií bolo otvorených a prejdených v cykle: každá sa načítala, mala správny názov a počítadlo a okno bolo v hraniciach viewportu.

## Overené v prehliadači

- Celý cyklus sedem fotografií, návrat z poslednej na prvú a z prvej na poslednú.
- Šípky klávesnice, Escape, cyklus Tab/Shift+Tab v modale a návrat fokusu na pôvodný náhľad.
- Filter s jednou fotografiou: počet 01, oba prepínače deaktivované.
- Celé koláže bez orezania; detaily zostávajú aj v originálnom označení Pred/Po.
- Mobilný lightbox na výšku aj na šírku 844 × 390: fotka, názov a zatvorenie ostávajú v dostupnom priestore.
- Mobilné menu, prechod na Kontakt a opätovné zobrazenie spodnej lišty po zatvorení.
- Bez vodorovného pretekania na mobilných, tabletových a desktopových šírkach; tím stále obsahuje presne dva profilové placeholdery.
- Všetky telefonické odkazy smerujú na `tel:+421944402476`, Facebook na dodaný profil a navigácia obsahuje úplnú adresu s PSČ. Externý hovor ani správa neboli odoslané.
- Skutočný chybový stav bol vyvolaný dočasným zneprístupnením optimalizovanej fotografie v lokálnom náhľade. Zobrazilo sa „Skúsiť znova“. Po okamžitom vrátení súboru opakovanie úspešne načítalo fotografiu. Originály ani publikovaná verzia tým neboli dotknuté.

## Hranice kontroly

Dotykové posúvanie, viacdotykové zrušenie gesta a obmedzený pohyb majú implementovanú obsluhu; fyzické zariadenia iOS/Android neboli k dispozícii. Neznáme údaje salónu neboli vymyslené. Úvodný portrét a detail zostávajú označené ilustrácie.
