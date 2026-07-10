import type { ResidentCat } from '../types';

export const cats: ResidentCat[] = [
  {
    id: 'sumi', name: 'Sumi', age: '5 anos', personality: 'Observadora e serena',
    story: 'Chegou por meio de uma protetora do bairro e escolheu a estante de livros como seu primeiro território seguro.',
    habits: 'Inspeciona a abertura da casa e dorme onde a luz desenha quadrados no chão.',
    preferences: 'Aprecia companhia silenciosa e carinhos apenas quando se aproxima primeiro.',
    status: 'Residente permanente', imagePosition: '0% center',
  },
  {
    id: 'mugi', name: 'Mugi', age: '7 anos', personality: 'Gentil e sociável',
    story: 'Foi adotado pela própria cafeteria após perder a família humana. Hoje é o anfitrião mais experiente da casa.',
    habits: 'Faz sua ronda entre as almofadas depois do almoço e sempre para perto do jardim.',
    preferences: 'Gosta de escovas macias e de pessoas sentadas no chão, sem movimentos bruscos.',
    status: 'Residente permanente', imagePosition: '50% center',
  },
  {
    id: 'yuki', name: 'Yuki', age: '2 anos', personality: 'Curiosa, com seus limites',
    story: 'Resgatada ainda filhote, cresceu com acompanhamento comportamental e ganhou confiança no próprio ritmo.',
    habits: 'Segue brinquedos de tecido e observa o preparo do chá do alto de uma passarela exclusiva.',
    preferences: 'Prefere brincadeiras com distância; colo e contenção nunca são permitidos.',
    status: 'Em adoção responsável', imagePosition: '100% center',
  },
];
