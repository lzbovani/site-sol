import { useState } from 'react';
import { PlusIcon } from './Icons';

const items = [
  ['Posso pegar os gatos no colo?', 'Não. A contenção causa estresse e não faz parte da experiência. Se um gato quiser contato, ele se aproximará; nossa equipe ajuda você a ler esses sinais.'],
  ['Crianças podem visitar?', 'Sim, a partir de 8 anos e sempre acompanhadas. Antes da entrada, fazemos uma orientação breve e gentil sobre voz, movimento e limites.'],
  ['Como funcionam alergias alimentares?', 'Os principais alergênicos estão indicados no cardápio. A cozinha compartilha superfícies, por isso não garantimos ausência de traços. Converse com a equipe antes de pedir.'],
  ['Os gatos estão disponíveis para adoção?', 'Alguns podem estar em adoção responsável, sempre por processo conduzido por uma ONG parceira. Não há adoção por impulso ou retirada no mesmo dia.'],
  ['Preciso reservar?', 'Não é obrigatório, mas recomendamos nos fins de semana. As reservas demonstrativas deste site não são enviadas para nenhum sistema real.'],
];

export function Faq() {
  const [open, setOpen] = useState(0);
  return <div className="faq-list">{items.map(([question, answer], index) => <article className="faq-item" key={question}><h3><button onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index} aria-controls={`faq-${index}`}>{question}<PlusIcon /></button></h3><div id={`faq-${index}`} className="faq-answer" hidden={open !== index}><p>{answer}</p></div></article>)}</div>;
}
