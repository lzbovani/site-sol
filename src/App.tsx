import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { MenuSection } from './components/MenuSection';
import { CatsSection } from './components/CatsSection';
import { ReservationSection } from './components/ReservationSection';
import { CartDrawer } from './components/CartDrawer';
import { Toasts } from './components/Toasts';
import { Faq } from './components/Faq';
import { ArrowIcon, CheckIcon, LeafIcon } from './components/Icons';
import { Logo } from './components/Logo';
import { formatPrice, products } from './data/menu';
import { useStore } from './context/StoreContext';
import { asset } from './utils/assets';
import './styles.css';

const pillars = [
  { number: '01', title: 'Chegar sem pressa', text: 'Luz baixa, música discreta e mesas com espaço. A cidade fica do lado de fora.' },
  { number: '02', title: 'Escolher um ritual', text: 'Café coado à mesa, matcha batido à mão ou algo fresco preparado na hora.' },
  { number: '03', title: 'Dividir o silêncio', text: 'Os gatos escolhem a distância. Você observa, respira e deixa o encontro acontecer.' },
];

export default function App() {
  const { addToCart } = useStore();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    document.querySelectorAll('.section-heading, .reveal, .reveal-card').forEach((element) => observer.observe(element));
    const scroll = () => setShowTop(window.scrollY > 700);
    window.addEventListener('scroll', scroll, { passive: true }); scroll();
    return () => { observer.disconnect(); window.removeEventListener('scroll', scroll); };
  }, []);

  const featured = products.filter((product) => product.featured).slice(0, 3);
  return (
    <>
      <Header />
      <main id="conteudo">
        <section id="inicio" className="hero" aria-labelledby="hero-title">
          <img className="hero__image" src={asset('images/hero-cafe.webp')} alt="Interior acolhedor da cafeteria Neko no Ma com madeira, luminárias de papel, jardim e um gato descansando" width="1920" height="1280" fetchPriority="high" />
          <div className="hero__veil" />
          <div className="hero__content">
            <span className="hero-kicker"><i aria-hidden="true" /> Cafés, chás e encontros tranquilos</span>
            <h1 id="hero-title">Existe um intervalo<br />entre a cidade e <em>você.</em></h1>
            <p>Uma cafeteria intimista onde o café brasileiro encontra a delicadeza das casas de chá — e os gatos ditam o ritmo.</p>
            <div className="hero__actions"><a className="button button--cream" href="#reservas">Reservar meu intervalo <ArrowIcon /></a><a className="text-link" href="#cardapio">Explorar o cardápio</a></div>
          </div>
          <div className="hero__aside"><span>São Paulo · Vila Mariana</span><span>Ter–dom · 10h–20h</span><span>Dados fictícios demonstrativos</span></div>
          <a className="scroll-cue" href="#manifesto"><span>Descer</span><i aria-hidden="true" /></a>
        </section>

        <section id="manifesto" className="manifesto section">
          <div className="manifesto__mark" aria-hidden="true"><span>間</span><small>MA</small></div>
          <div className="manifesto__copy reveal"><span className="eyebrow">O espaço entre as coisas</span><h2>Neko no Ma nasceu para devolver alguns minutos ao seu dia.</h2><p>“Ma” é o intervalo que dá sentido ao que está ao redor. Aqui, ele aparece entre um gole e outro, no calor da cerâmica entre as mãos e na confiança de um gato que decide ficar perto.</p><a className="inline-link" href="#sobre">Conheça nossa história <ArrowIcon /></a></div>
          <blockquote className="manifesto__quote reveal"><p>“Não prometemos fuga da cidade. Criamos uma pausa suficientemente bonita para você voltar a ela diferente.”</p><cite>— Emi e Caio, fundadores fictícios</cite></blockquote>
        </section>

        <section className="section featured-section" aria-labelledby="featured-title">
          <div className="section-heading section-heading--split"><div><span className="eyebrow">Da casa</span><h2 id="featured-title">Três começos possíveis.</h2></div><a className="inline-link" href="#cardapio">Ver cardápio completo <ArrowIcon /></a></div>
          <div className="featured-grid">
            {featured.map((product, index) => <article className="featured-card reveal-card" key={product.id}><div className="featured-card__image"><img src={asset('images/menu-still-life.webp')} alt={`Apresentação de ${product.name}`} style={{ objectPosition: product.imagePosition }} loading="lazy" width="600" height="650" /><span>0{index + 1}</span></div><div><span className="eyebrow">{product.category}</span><h3>{product.name}</h3><p>{product.description}</p><footer><strong>{formatPrice(product.price)}</strong><button onClick={() => addToCart(product.id)}>Adicionar <ArrowIcon /><span className="sr-only"> {product.name} ao carrinho</span></button></footer></div></article>)}
          </div>
        </section>

        <MenuSection />

        <section id="experiencia" className="experience-section" aria-labelledby="experience-title">
          <div className="experience-visual reveal"><img src={asset('images/ritual-jardim.webp')} alt="Cerâmicas artesanais e utensílios de chá diante de um jardim interno em dia de chuva" loading="lazy" width="900" height="1200" /><span className="vertical-note">madeira · papel · cerâmica · tempo</span></div>
          <div className="experience-content"><span className="eyebrow">A experiência Neko no Ma</span><h2 id="experience-title">Cada detalhe reduz um pouco o volume do mundo.</h2><p className="lead">Do som da água ao toque irregular das xícaras, a casa foi desenhada para a atenção voltar ao presente.</p><div className="pillar-list">{pillars.map((pillar) => <article key={pillar.number} className="reveal"><span>{pillar.number}</span><div><h3>{pillar.title}</h3><p>{pillar.text}</p></div></article>)}</div><a className="button button--cream" href="#reservas">Quero viver essa pausa <ArrowIcon /></a></div>
        </section>

        <CatsSection />

        <section className="section gallery-section" aria-labelledby="gallery-title">
          <div className="section-heading section-heading--split"><div><span className="eyebrow">Cantos da casa</span><h2 id="gallery-title">Uma atmosfera que se revela devagar.</h2></div><p>Imagens originais criadas para esta demonstração, unidas pela mesma luz, matéria e silêncio.</p></div>
          <div className="gallery-grid">
            <figure className="gallery-a reveal"><img src={asset('images/hero-cafe.webp')} alt="Luminária de papel e banco de madeira no salão" loading="lazy" /><figcaption>Salão principal · luz de fim de tarde</figcaption></figure>
            <figure className="gallery-b reveal"><img src={asset('images/menu-still-life.webp')} alt="Bebidas e doces artesanais sobre papel e madeira" loading="lazy" /><figcaption>Rituais servidos em cerâmica</figcaption></figure>
            <figure className="gallery-c reveal"><img src={asset('images/ritual-jardim.webp')} alt="Utensílios de chá junto ao jardim chuvoso" loading="lazy" /><figcaption>Jardim interno · dias de chuva</figcaption></figure>
          </div>
        </section>

        <section className="testimonials-section" aria-labelledby="testimonials-title">
          <div className="section-heading section-heading--center"><span className="eyebrow">Relatos demonstrativos</span><h2 id="testimonials-title">O que ficou depois da visita.</h2><p>Depoimentos fictícios criados exclusivamente para apresentar o design desta experiência.</p></div>
          <div className="testimonials-grid"><blockquote><div className="stars" aria-label="5 de 5 estrelas">★★★★★</div><p>“É raro um lugar temático saber ser tão contido. O café é excelente e ninguém força a interação com os gatos.”</p><cite><strong>Marina A.</strong> visita fictícia · designer</cite></blockquote><blockquote><div className="stars" aria-label="5 de 5 estrelas">★★★★★</div><p>“Vim pelo matcha, fiquei pela luz do jardim. Saí com aquela sensação boa de ter feito menos e aproveitado mais.”</p><cite><strong>Rafael M.</strong> visita fictícia · professor</cite></blockquote><blockquote><div className="stars" aria-label="5 de 5 estrelas">★★★★★</div><p>“A orientação sobre os gatos é cuidadosa e clara. Yuki só observou de longe — e isso também foi parte do encanto.”</p><cite><strong>Bianca T.</strong> visita fictícia · veterinária</cite></blockquote></div>
        </section>

        <ReservationSection />

        <section id="sobre" className="section about-section" aria-labelledby="about-title">
          <div className="about-story"><span className="eyebrow">Nossa história fictícia</span><h2 id="about-title">Uma casa brasileira inspirada pela atenção japonesa.</h2><p>Emi Sato, ceramista paulistana, e Caio Nunes, barista e voluntário em proteção animal, imaginaram a Neko no Ma depois de perceberem como as pessoas buscavam lugares que não exigissem desempenho.</p><p>A inspiração em casas de chá aparece no cuidado com o gesto, na honestidade dos materiais e na valorização do intervalo — nunca como cenário ou fantasia. Os cafés são brasileiros, a cozinha conversa com produtores locais e toda referência cultural é tratada com estudo, colaboração e contexto.</p><div className="signature">Emi + Caio <small>fundadores fictícios · 2026</small></div></div>
          <div className="values-grid"><article><LeafIcon /><h3>Bem-estar integral</h3><p>Veterinária parceira, enriquecimento ambiental, áreas exclusivas e rotina de descanso para cada gato.</p></article><article><span aria-hidden="true">循</span><h3>Menos desperdício</h3><p>Compostagem, água filtrada da casa, fornecedores próximos e embalagens retornáveis quando possível.</p></article><article><span aria-hidden="true">手</span><h3>Feito por mãos</h3><p>Cerâmicas de pequenos ateliês, receitas em lotes curtos e madeira de origem rastreada.</p></article><article><CheckIcon /><h3>Respeito no repertório</h3><p>Referências contextualizadas, sem fantasia cultural, com escuta contínua da comunidade nipo-brasileira.</p></article></div>
        </section>

        <section id="contato" className="contact-section" aria-labelledby="contact-title">
          <div className="contact-card"><span className="eyebrow">Visite a casa</span><h2 id="contact-title">Seu intervalo começa aqui.</h2><p>Dados abaixo são fictícios e fazem parte desta demonstração.</p><div className="contact-grid"><div><span>Endereço</span><p>Rua das Camélias, 172<br />Vila Mariana · São Paulo — SP</p><a href="https://maps.google.com/?q=Vila+Mariana+Sao+Paulo" target="_blank" rel="noreferrer">Abrir referência no mapa <ArrowIcon /></a></div><div><span>Horários</span><p>Terça a sexta · 11h–20h<br />Sábado e domingo · 10h–20h<br />Segunda · descanso da casa</p></div><div><span>Contato</span><p><a href="tel:+551130303172">(11) 3030-3172</a><br /><a href="mailto:ola@nekonoma.demo">ola@nekonoma.demo</a><br />@nekonoma.cafe · perfil fictício</p></div></div></div>
          <div className="map-placeholder" role="img" aria-label="Mapa ilustrativo fictício mostrando a Neko no Ma perto de uma praça e da estação Vila Mariana"><div className="map-lines" /><div className="map-park">Praça<br />das Camélias</div><div className="map-pin"><Logo compact /><span>Neko no Ma</span></div><span className="map-station">● Estação Vila Mariana</span><span className="map-label">Mapa ilustrativo · não representa localização real</span></div>
        </section>

        <section className="section faq-section" aria-labelledby="faq-title"><div><span className="eyebrow">Antes de vir</span><h2 id="faq-title">Perguntas que cuidam da experiência.</h2><p>Se algo não estiver aqui, fale com a equipe. A conversa também faz parte do acolhimento.</p></div><Faq /></section>
      </main>

      <footer className="site-footer"><div className="footer-top"><Logo /><p>Um refúgio urbano fictício para café, chá e convivência respeitosa com gatos.</p><a className="button button--cream" href="#reservas">Reservar uma mesa</a></div><div className="footer-bottom"><span>© 2026 Neko no Ma · projeto demonstrativo</span><nav aria-label="Navegação do rodapé"><a href="#cardapio">Cardápio</a><a href="#gatos">Gatos</a><a href="#sobre">Sobre</a><a href="#contato">Contato</a></nav><span>Feito com cuidado, sem pagamentos reais.</span></div></footer>
      <button className={`back-to-top ${showTop ? 'is-visible' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Voltar ao topo"><ArrowIcon /></button>
      <CartDrawer /><Toasts />
    </>
  );
}
