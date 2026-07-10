import type { Product } from '../types';
import { formatPrice } from '../data/menu';
import { useStore } from '../context/StoreContext';
import { HeartIcon, LeafIcon, PlusIcon } from './Icons';
import { asset } from '../utils/assets';

export function ProductCard({ product }: { product: Product }) {
  const { favorites, toggleFavorite, addToCart } = useStore();
  const favorite = favorites.includes(product.id);
  return (
    <article className="product-card">
      <div className="product-card__image">
        <img src={asset('images/menu-still-life.webp')} style={{ objectPosition: product.imagePosition }} alt={`Apresentação editorial de ${product.name}`} loading="lazy" width="600" height="600" />
        {product.featured && <span className="product-badge">Escolha da casa</span>}
        <button className={`favorite-button ${favorite ? 'is-favorite' : ''}`} onClick={() => toggleFavorite(product.id)} aria-pressed={favorite} aria-label={favorite ? `Remover ${product.name} dos favoritos` : `Favoritar ${product.name}`}>
          <HeartIcon filled={favorite} />
        </button>
      </div>
      <div className="product-card__body">
        <div className="product-card__heading"><div><span className="eyebrow">{product.category}</span><h3>{product.name}</h3></div><strong>{formatPrice(product.price)}</strong></div>
        <p>{product.description}</p>
        <dl className="product-meta">
          <div><dt>Ingredientes</dt><dd>{product.ingredients.join(', ')}</dd></div>
          <div><dt>Alergênicos</dt><dd>{product.allergens.length ? product.allergens.join(', ') : 'Não contém os principais alergênicos declarados'}</dd></div>
        </dl>
        <div className="product-card__footer">
          <div className="diet-tags">
            {product.vegan && <span><LeafIcon />Vegano</span>}
            {!product.vegan && product.vegetarian && <span><LeafIcon />Vegetariano</span>}
          </div>
          <button className="add-button" onClick={() => addToCart(product.id)} aria-label={`Adicionar ${product.name} ao carrinho`}><PlusIcon />Adicionar</button>
        </div>
      </div>
    </article>
  );
}
