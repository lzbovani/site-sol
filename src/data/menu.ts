import type { Category, Product } from '../types';

export const categories: Array<'Todos' | Category> = [
  'Todos', 'Cafés', 'Chás e matchas', 'Geladas', 'Doces japoneses', 'Pratos leves', 'Sazonais',
];

export const products: Product[] = [
  {
    id: 'espresso-kuro', name: 'Espresso Kuro', category: 'Cafés', price: 9,
    description: 'Curto, achocolatado e preciso, servido em cerâmica de queima escura.',
    ingredients: ['Café arábica brasileiro'], allergens: [], vegan: true, featured: true, imagePosition: '12% 18%',
  },
  {
    id: 'coado-ma', name: 'Coado Ma', category: 'Cafés', price: 16,
    description: 'Microlote filtrado à mesa; doçura de rapadura, pera e final de cacau.',
    ingredients: ['Café arábica', 'Água filtrada'], allergens: [], vegan: true, imagePosition: '10% 16%',
  },
  {
    id: 'gohan-latte', name: 'Gohan Latte', category: 'Cafés', price: 19,
    description: 'Espresso, leite vaporizado e xarope artesanal de arroz tostado.',
    ingredients: ['Café', 'Leite', 'Arroz tostado'], allergens: ['Leite'], vegetarian: true, imagePosition: '35% 18%',
  },
  {
    id: 'matcha-neblina', name: 'Matcha Neblina', category: 'Chás e matchas', price: 22,
    description: 'Matcha cerimonial batido com leite e uma espuma leve, sem excessos.',
    ingredients: ['Matcha', 'Leite', 'Açúcar demerara'], allergens: ['Leite'], vegetarian: true, featured: true, imagePosition: '48% 17%',
  },
  {
    id: 'hojicha-ninho', name: 'Hojicha Ninho', category: 'Chás e matchas', price: 18,
    description: 'Chá verde torrado, notas de castanha e calor de fim de tarde.',
    ingredients: ['Hojicha', 'Água filtrada'], allergens: [], vegan: true, imagePosition: '17% 63%',
  },
  {
    id: 'genmaicha-casa', name: 'Genmaicha da Casa', category: 'Chás e matchas', price: 17,
    description: 'Chá verde com arroz tostado, servido em infusão de duas passagens.',
    ingredients: ['Chá verde', 'Arroz tostado'], allergens: [], vegan: true, imagePosition: '18% 62%',
  },
  {
    id: 'cold-brew-yuzu', name: 'Cold Brew Yuzu', category: 'Geladas', price: 21,
    description: 'Extração a frio por 16 horas, tônica seca e cordial cítrico da casa.',
    ingredients: ['Café', 'Tônica', 'Cordial cítrico'], allergens: [], vegan: true, featured: true, imagePosition: '90% 27%',
  },
  {
    id: 'matcha-tonic', name: 'Matcha Tônica', category: 'Geladas', price: 22,
    description: 'Matcha, tônica botânica e limão-cravo; brilhante e refrescante.',
    ingredients: ['Matcha', 'Tônica', 'Limão-cravo'], allergens: [], vegan: true, imagePosition: '87% 24%',
  },
  {
    id: 'ameixa-soda', name: 'Soda Ameixa & Shiso', category: 'Geladas', price: 19,
    description: 'Soda da casa com ameixa, shiso e uma acidez delicada.',
    ingredients: ['Ameixa', 'Shiso', 'Água gaseificada'], allergens: [], vegan: true, imagePosition: '89% 28%',
  },
  {
    id: 'mochi-kurogoma', name: 'Mochi Kurogoma', category: 'Doces japoneses', price: 17,
    description: 'Mochi macio recheado com creme de gergelim preto, feito diariamente.',
    ingredients: ['Arroz glutinoso', 'Gergelim preto', 'Açúcar'], allergens: ['Gergelim'], vegan: true, featured: true, imagePosition: '83% 84%',
  },
  {
    id: 'bolo-matcha-pera', name: 'Bolo Matcha & Pera', category: 'Doces japoneses', price: 24,
    description: 'Entremet de matcha, pera fresca e crocante de castanha-do-pará.',
    ingredients: ['Matcha', 'Pera', 'Creme', 'Castanha-do-pará'], allergens: ['Leite', 'Ovos', 'Castanhas'], vegetarian: true, imagePosition: '53% 63%',
  },
  {
    id: 'dorayaki-mel', name: 'Dorayaki de Mel de Cacau', category: 'Doces japoneses', price: 19,
    description: 'Panquecas leves com pasta de feijão azuki e mel de cacau brasileiro.',
    ingredients: ['Farinha', 'Ovos', 'Azuki', 'Mel de cacau'], allergens: ['Glúten', 'Ovos'], vegetarian: true, imagePosition: '55% 62%',
  },
  {
    id: 'sando-cogumelos', name: 'Sando do Bosque', category: 'Pratos leves', price: 34,
    description: 'Pão macio, cogumelos tostados, missô suave e folhas crocantes.',
    ingredients: ['Pão de leite', 'Cogumelos', 'Missô', 'Folhas'], allergens: ['Glúten', 'Soja', 'Leite'], vegetarian: true, imagePosition: '64% 48%',
  },
  {
    id: 'onigiri-horta', name: 'Onigiri da Horta', category: 'Pratos leves', price: 28,
    description: 'Dupla de triângulos de arroz com legumes sazonais e gergelim.',
    ingredients: ['Arroz', 'Legumes', 'Nori', 'Gergelim'], allergens: ['Gergelim'], vegan: true, imagePosition: '71% 54%',
  },
  {
    id: 'tamago-toast', name: 'Tamago Toast', category: 'Pratos leves', price: 32,
    description: 'Ovos cremosos, pão tostado e conserva cítrica feita na casa.',
    ingredients: ['Ovos', 'Pão', 'Manteiga', 'Conserva cítrica'], allergens: ['Glúten', 'Ovos', 'Leite'], vegetarian: true, imagePosition: '59% 48%',
  },
  {
    id: 'ichigo-matcha', name: 'Ichigo Matcha', category: 'Sazonais', price: 26,
    description: 'Matcha gelado, morangos brasileiros e creme leve de baunilha.',
    ingredients: ['Matcha', 'Morango', 'Leite', 'Baunilha'], allergens: ['Leite'], vegetarian: true, imagePosition: '49% 20%',
  },
  {
    id: 'kuri-monaka', name: 'Monaka de Castanha', category: 'Sazonais', price: 21,
    description: 'Casquinha crocante recheada com castanha portuguesa e azuki.',
    ingredients: ['Arroz', 'Castanha portuguesa', 'Azuki'], allergens: ['Castanhas'], vegan: true, imagePosition: '77% 75%',
  },
  {
    id: 'latte-kinako', name: 'Latte Kinako', category: 'Sazonais', price: 20,
    description: 'Espresso com leite, soja tostada e um toque de açúcar mascavo.',
    ingredients: ['Café', 'Leite', 'Kinako', 'Açúcar mascavo'], allergens: ['Leite', 'Soja'], vegetarian: true, imagePosition: '34% 18%',
  },
];

export const formatPrice = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
