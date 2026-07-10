import { useState } from 'react';
import { cats } from '../data/cats';
import { ArrowIcon } from './Icons';
import { asset } from '../utils/assets';

export function CatsSection() {
  const [activeId, setActiveId] = useState(cats[0].id);
  const active = cats.find((cat) => cat.id === activeId) ?? cats[0];
  return (
    <section id="gatos" className="section cats-section" aria-labelledby="cats-title">
      <div className="section-heading section-heading--split">
        <div><span className="eyebrow">Moradores, não atrações</span><h2 id="cats-title">Conheça quem dá ritmo à casa.</h2></div>
        <p>A interação acontece sempre por escolha deles. Há passarelas exclusivas, áreas de descanso e pausas sem visitação ao longo do dia.</p>
      </div>
      <div className="cats-layout">
        <div className="cats-portrait">
          <img src={asset('images/gatos-residentes.webp')} alt={`Retrato de ${active.name}, gato residente da Neko no Ma`} style={{ objectPosition: active.imagePosition }} loading="lazy" width="900" height="650" />
          <div className="portrait-caption"><span>Agora você conhece</span><strong>{active.name}</strong></div>
        </div>
        <div className="cats-content">
          <div className="cat-tabs" role="tablist" aria-label="Gatos residentes">
            {cats.map((cat) => <button key={cat.id} role="tab" aria-selected={cat.id === active.id} aria-controls="cat-profile" onClick={() => setActiveId(cat.id)} className={cat.id === active.id ? 'is-active' : ''}><span>{cat.name}</span><small>{cat.personality}</small></button>)}
          </div>
          <article id="cat-profile" role="tabpanel" className="cat-profile" key={active.id}>
            <div className="cat-profile__header"><div><span className="eyebrow">{active.age}</span><h3>{active.name}</h3></div><span className={`status-pill ${active.status.includes('adoção') ? 'status-pill--adoption' : ''}`}>{active.status}</span></div>
            <p className="cat-story">{active.story}</p>
            <dl><div><dt>Seu ritual</dt><dd>{active.habits}</dd></div><div><dt>Como se aproximar</dt><dd>{active.preferences}</dd></div></dl>
            <a className="inline-link" href="#bem-estar">Ler nosso acordo de convivência <ArrowIcon /></a>
          </article>
        </div>
      </div>
      <div id="bem-estar" className="welfare-note">
        <span className="welfare-note__mark" aria-hidden="true">猫</span>
        <div><span className="eyebrow">O combinado da casa</span><h3>Bem-estar vem antes da fotografia.</h3><p>Não acorde, pegue no colo, alimente ou persiga os gatos. Fotos sem flash são bem-vindas quando não interrompem o descanso. Crianças permanecem acompanhadas.</p></div>
      </div>
    </section>
  );
}
