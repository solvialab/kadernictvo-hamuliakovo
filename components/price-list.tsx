import { ArrowUpRight } from 'lucide-react';
import { hairPrices, nailPrices } from '@/lib/prices';

function PriceRows({ items }: { items: string[][] }) {
  return (
    <dl className="price-rows">
      {items.map(([name, price]) => (
        <div key={name}>
          <dt>{name}</dt>
          <dd>{price}</dd>
        </div>
      ))}
    </dl>
  );
}

export function PriceList() {
  return (
    <section
      id="cennik"
      className="pricing section"
      aria-labelledby="pricing-title"
    >
      <div className="section-label">
        <span>03 / CENNÍK</span>
        <span>VLASY & NECHTOVÝ DIZAJN</span>
      </div>
      <div className="section-intro">
        <h2 id="pricing-title">
          Starostlivosť.
          <br />
          <em>Do posledného detailu.</em>
        </h2>
        <p>
          Vyberte si chvíľu pre svoje vlasy
          <br /> alebo upravené nechty.
        </p>
      </div>
      <div className="price-columns">
        <div className="price-column">
          <div className="price-heading">
            <span>01</span>
            <h3>Vlasy</h3>
          </div>
          {hairPrices.map((group) => (
            <div className="price-group" key={group.title}>
              <h4>{group.title}</h4>
              <PriceRows items={group.items} />
              <p className="price-includes">{group.note}</p>
            </div>
          ))}
        </div>
        <div className="price-column">
          <div className="price-heading">
            <span>02</span>
            <h3>Nechty</h3>
          </div>
          <div className="price-group">
            <PriceRows items={nailPrices} />
          </div>
          <div className="price-booking">
            <p>Doprajte si čas pre seba.</p>
            <a className="button" href="#kontakt">
              Dohodnúť termín <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
