import { useMemo, useState } from 'react';
import { categories, products } from '../data/menu';
import { ProductCard } from './ProductCard';
import { HeartIcon, SearchIcon } from './Icons';
import { useStore } from '../context/StoreContext';
import type { Category } from '../types';

type Sort = 'destaques' | 'menor' | 'maior' | 'nome';

export function MenuSection() {
  const { favorites } = useStore();
  const [category, setCategory] = useState<'Todos' | Category>('Todos');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<Sort>('destaques');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [visible, setVisible] = useState(6);

  const filtered = useMemo(() => {
    const normalized = query.toLocaleLowerCase('pt-BR').trim();
    const result = products.filter((product) => {
      const inCategory = category === 'Todos' || product.category === category;
      const matches = !normalized || [product.name, product.description, product.category, ...product.ingredients].join(' ').toLocaleLowerCase('pt-BR').includes(normalized);
      return inCategory && matches && (!onlyFavorites || favorites.includes(product.id));
    });
    return [...result].sort((a, b) => {
      if (sort === 'menor') return a.price - b.price;
      if (sort === 'maior') return b.price - a.price;
      if (sort === 'nome') return a.name.localeCompare(b.name, 'pt-BR');
      return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
    });
  }, [category, query, sort, onlyFavorites, favorites]);

  const changeCategory = (next: 'Todos' | Category) => { setCategory(next); setVisible(6); };
  return (
    <section id="cardapio" className="section menu-section" aria-labelledby="menu-title">
      <div className="section-heading section-heading--split">
        <div><span className="eyebrow">Feito com intenção</span><h2 id="menu-title">Um cardápio para desacelerar.</h2></div>
        <p>Cafés brasileiros, chás de origem e receitas que aproximam técnicas japonesas de ingredientes locais — sem pressa, sem ruído.</p>
      </div>
      <div className="menu-toolbar">
        <div className="search-field"><SearchIcon /><label className="sr-only" htmlFor="menu-search">Buscar no cardápio</label><input id="menu-search" type="search" value={query} onChange={(e) => { setQuery(e.target.value); setVisible(18); }} placeholder="Buscar bebida, ingrediente ou prato" /></div>
        <div className="toolbar-actions">
          <button className={`favorites-filter ${onlyFavorites ? 'is-active' : ''}`} onClick={() => setOnlyFavorites((value) => !value)} aria-pressed={onlyFavorites}><HeartIcon filled={onlyFavorites} />Favoritos <span>{favorites.length}</span></button>
          <label className="sort-field">Ordenar <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}><option value="destaques">Destaques</option><option value="menor">Menor preço</option><option value="maior">Maior preço</option><option value="nome">Nome A–Z</option></select></label>
        </div>
      </div>
      <div className="category-tabs" role="group" aria-label="Filtrar por categoria">
        {categories.map((item) => <button key={item} className={category === item ? 'is-active' : ''} onClick={() => changeCategory(item)} aria-pressed={category === item}>{item}</button>)}
      </div>
      {filtered.length ? (
        <><div className="product-grid" aria-live="polite">{filtered.slice(0, visible).map((product) => <ProductCard key={product.id} product={product} />)}</div>
          {visible < filtered.length && <div className="center"><button className="button button--outline" onClick={() => setVisible((value) => value + 6)}>Ver mais criações</button></div>}
        </>
      ) : (
        <div className="no-results"><span aria-hidden="true">〰</span><h3>Nenhuma combinação por aqui.</h3><p>Tente outro termo ou abra os filtros novamente.</p><button className="text-button" onClick={() => { setQuery(''); setCategory('Todos'); setOnlyFavorites(false); }}>Limpar filtros</button></div>
      )}
    </section>
  );
}
