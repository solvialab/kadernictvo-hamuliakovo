/* oxlint-disable next/no-img-element -- Images are pre-optimized local WebP with reserved dimensions. */
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { salon, services } from '@/lib/salon';
import {
  Header,
  Motion,
  Gallery,
  MobileContactBar,
  BeforeAfter,
} from '@/components/salon-interactive';
import { ContactAction } from '@/components/contact-action';
import './salon.css';

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#obsah">
        Preskočiť na obsah
      </a>
      <Header />
      <Motion />
      <main id="obsah" tabIndex={-1}>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-eyebrow eyebrow">
            <span>KADERNÍCTVO · {salon.city}</span>
            <span>OSOBNE. PRECÍZNE. PO VAŠOM.</span>
          </div>
          <div className="hero-layout">
            <div className="hero-copy">
              <h1 id="hero-title">
                Vlasy, ktoré
                <br />
                sú vaším
                <br />
                <em>podpisom.</em>
              </h1>
              <div className="hero-bottom">
                <p>
                  Strih, farba a chvíľa pre seba.
                  <br />V komornom salóne, kde začíname
                  <br className="desktop-break" /> tým, že vás počúvame.
                </p>
                <ContactAction kind="phone" className="button" hero />
                {!salon.phone && (
                  <small className="contact-note">Telefón: [DOPLNIŤ]</small>
                )}
                <a className="text-link" href="#galeria">
                  Pozrieť našu prácu <ArrowDown size={15} />
                </a>
              </div>
            </div>
            <figure className="hero-photo">
              <img
                src="/images/hero.webp"
                alt="Ilustračný módny portrét ženy s vlnitým gaštanovým mikádom"
                width="1024"
                height="1536"
                srcSet="/images/hero-small.webp 533w, /images/hero.webp 1024w"
                sizes="(max-width:760px) 73vw, 49vw"
                fetchPriority="high"
              />
              <figcaption>
                01 — ŠTÚDIA POHYBU <span>ILUSTRAČNÁ FOTOGRAFIA</span>
              </figcaption>
            </figure>
            <div className="hero-margin">KRÁSA V PRIRODZENOSTI</div>
          </div>
          <div className="hero-foot">
            <span>Dve kreslá. Dve kaderníčky. Priestor pre vás.</span>
            <a href="#filozofia">
              SPOZNAJTE NÁS <ArrowDown size={15} />
            </a>
          </div>
        </section>
        <section id="filozofia" className="philosophy section">
          <div className="section-label">
            <span>01 / FILOZOFIA</span>
            <span>MALÝ SALÓN, OSOBNÝ PRÍSTUP</span>
          </div>
          <div className="philosophy-grid">
            <figure className="detail-photo">
              <img
                src="/images/detail.webp"
                alt="Ilustračný detail rúk pri úprave vlnitých vlasov"
                loading="lazy"
                width="1024"
                height="1536"
              />
              <figcaption>
                V DETAILOCH JE ROZDIEL. / ILUSTRAČNÁ FOTOGRAFIA
              </figcaption>
            </figure>
            <div>
              <h2>
                Najprv vás spoznať.
                <br />
                Potom vziať do rúk
                <br />
                <em>vaše vlasy.</em>
              </h2>
              <p className="large-copy">
                Dobrý účes sa začína rozhovorom. O tom, čo sa vám páči, ako
                žijete a koľko času chcete svojim vlasom venovať.
              </p>
              <p>
                V našom salóne sú dve kreslá a dve kaderníčky. Je tu priestor na
                osobnú konzultáciu aj pokojný čas pre seba. Spoločne hľadáme
                strih a farbu, v ktorých sa budete cítiť prirodzene.
              </p>
              <a className="text-link" href="#o-nas">
                Kto sa o vás postará <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </section>
        <section id="sluzby" className="services section">
          <div className="section-label">
            <span>02 / SLUŽBY A CENY</span>
            <span>OD KONZULTÁCIE PO POSLEDNÝ DETAIL</span>
          </div>
          <div className="section-intro">
            <h2>
              Malá zmena.
              <br />
              <em>Alebo nová kapitola.</em>
            </h2>
            <p>
              Pre vlasy, ktoré sa dobre nosia.
              <br />
              Konkrétnu podobu služby dohodneme
              <br />
              počas osobnej konzultácie.
            </p>
          </div>
          <p className="draft-note">
            NÁVRH PONUKY · Služby a ceny čakajú na potvrdenie salónom.
          </p>
          <div className="service-list">
            {services.map((s, i) => (
              <article className="service-row" key={s.name}>
                <span className="service-number">0{i + 1}</span>
                <h3>{s.name}</h3>
                <p>{s.description}</p>
                <span className="price">
                  {s.price ?? '[CENA NA DOPLNENIE]'}
                </span>
                <ArrowUpRight className="service-arrow" size={23} />
              </article>
            ))}
          </div>
          <div className="service-footer">
            <p>
              Neviete, ktorú službu vybrať?
              <br />
              <strong>Zavolajte nám a poradíme vám.</strong>
            </p>
            <a className="text-link" href="#kontakt">
              Dohodnime si konzultáciu <ArrowUpRight size={18} />
            </a>
          </div>
        </section>
        <section id="galeria" className="gallery section">
          <div className="section-label">
            <span>03 / GALÉRIA</span>
            <span>STRIH · FARBA · TEXTÚRA</span>
          </div>
          <div className="section-intro">
            <h2>
              Vlasy v hlavnej
              <br />
              <em>úlohe.</em>
            </h2>
            <p>
              Skutočné účesy z nášho salónu.
              <br />
              Farby, strihy a detaily, ktoré
              <br />
              hovoria za našu prácu.
            </p>
          </div>
          <p className="draft-note">
            NAŠA PRÁCA · Fotografie z Kaderníctva Hamuliakovo.
          </p>
          <Gallery />
          <BeforeAfter />
        </section>
        <section id="o-nas" className="team section">
          <div className="section-label">
            <span>04 / O NÁS</span>
            <span>DVE KADERNÍČKY. JEDEN OSOBNÝ PRÍSTUP.</span>
          </div>
          <h2>
            Dve kreslá.
            <br />
            <em>Priestor byť sebou.</em>
          </h2>
          <div className="team-grid">
            {[1, 2].map((n) => (
              <article className="team-profile" key={n}>
                <div className="portrait-placeholder">
                  <span className="portrait-number" aria-hidden="true">
                    0{n}
                  </span>
                  <span>
                    [FOTOGRAFIA KADERNÍČKY {n}]
                    <small>PRIESTOR PRE SKUTOČNÝ PORTRÉT</small>
                  </span>
                </div>
                <div className="profile-heading">
                  <h3>[MENO KADERNÍČKY {n}]</h3>
                  <span>0{n}</span>
                </div>
                <p className="specialization">[ŠPECIALIZÁCIA]</p>
                <p>[PREDSTAVENIE]</p>
              </article>
            ))}
          </div>
          <figure className="interior">
            <img
              src="/images/salon-interier.webp"
              srcSet="/images/salon-interier-small.webp 720w, /images/salon-interier.webp 1670w"
              sizes="(max-width:760px) 88vw, 60vw"
              alt="Interiér Kaderníctva Hamuliakovo s dvoma pracoviskami, okrúhlymi zrkadlami a drevenými lamelami."
              loading="lazy"
              width="1670"
              height="2048"
            />
            <figcaption>
              <span>MALÝ PRIESTOR. ČAS PRE VÁS.</span>
              <span>NÁŠ SALÓN · SCILOVÁ 5, HAMULIAKOVO</span>
            </figcaption>
          </figure>
        </section>
        <section id="kontakt" className="contact">
          <div className="section-label">
            <span>05 / KONTAKT A OBJEDNANIE</span>
            <span>TEŠÍME SA NA VÁS</span>
          </div>
          <div className="contact-top">
            <h2>
              Dohodnime si
              <br />
              <em>váš termín.</em>
            </h2>
            <div>
              <p>
                Zavolajte nám alebo nám napíšte na Facebooku. Spoločne nájdeme
                termín, ktorý vám vyhovuje.
              </p>
              <div className="contact-actions">
                <ContactAction kind="phone" className="button light" />
                <ContactAction kind="facebook" className="text-link" />
              </div>
              <p className="contact-explanation">
                {(!salon.phone || !salon.facebook) &&
                  'Chýbajúce kontaktné údaje doplníme. '}
                Termín si dohodnete počas hovoru alebo v správach.
              </p>
            </div>
          </div>
          <div className="contact-details">
            <div>
              <h3>ZAVOLAJTE NÁM</h3>
              <p>
                {salon.phone ? (
                  <a className="phone-number" href={`tel:${salon.phone}`}>
                    {salon.phoneDisplay || salon.phone}
                  </a>
                ) : (
                  '[TELEFÓN]'
                )}
              </p>
              {!salon.phone && <small>Na doplnenie</small>}
            </div>
            <div>
              <h3>NÁJDETE NÁS</h3>
              <p>
                {salon.address || '[ADRESA]'}
                <br />
                {salon.postalCode} {salon.city}
                <br />
                Slovensko
              </p>
              <ContactAction kind="map" className="text-link" />
              {!salon.address && <small>Adresa na doplnenie</small>}
            </div>
            <div>
              <h3>KEDY SME TU</h3>
              <p className="hours">{salon.hours || '[OTVÁRACIE HODINY]'}</p>
              {!salon.hours && <small>Na doplnenie</small>}
            </div>
            <div>
              <h3>NAPÍŠTE NÁM</h3>
              <p>
                {salon.facebook ? (
                  <a
                    href={salon.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Facebook salónu ↗
                  </a>
                ) : (
                  '[FACEBOOK URL]'
                )}
              </p>
              {!salon.facebook && <small>Na doplnenie</small>}
            </div>
          </div>
          <footer>
            <a className="brand" href="#obsah">
              <span>{salon.name}</span>
              <small>KADERNÍCKY ATELIÉR</small>
            </a>
            <p>S citom pre každý prameň.</p>
            <ContactAction kind="facebook" className="text-link" />
          </footer>
        </section>
      </main>
      <MobileContactBar />
    </>
  );
}
