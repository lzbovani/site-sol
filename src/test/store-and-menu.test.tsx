import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StoreProvider } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { MenuSection } from '../components/MenuSection';
import { Toasts } from '../components/Toasts';
import { products } from '../data/menu';

beforeEach(() => localStorage.clear());

describe('cardápio e carrinho', () => {
  it('adiciona um produto e persiste no armazenamento local', async () => {
    const user = userEvent.setup();
    render(<StoreProvider><ProductCard product={products[0]} /><Toasts /></StoreProvider>);
    await user.click(screen.getByRole('button', { name: /adicionar espresso kuro/i }));
    expect(JSON.parse(localStorage.getItem('neko-cart') ?? '[]')).toEqual([{ productId: 'espresso-kuro', quantity: 1 }]);
    expect(screen.getByText('Item acolhido no seu pedido.')).toBeInTheDocument();
  });

  it('busca, filtra e mostra resultado coerente', async () => {
    const user = userEvent.setup();
    render(<StoreProvider><MenuSection /></StoreProvider>);
    await user.type(screen.getByRole('searchbox', { name: /buscar no cardápio/i }), 'mochi');
    expect(screen.getByRole('heading', { name: 'Mochi Kurogoma' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Espresso Kuro' })).not.toBeInTheDocument();
  });

  it('troca de categoria e revela mais produtos dinamicamente', async () => {
    const user = userEvent.setup();
    const { container } = render(<StoreProvider><MenuSection /></StoreProvider>);

    await user.click(screen.getByRole('button', { name: 'Chás e matchas' }));
    expect(screen.getByRole('heading', { name: 'Matcha Neblina' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Hojicha Ninho' })).toBeInTheDocument();
    expect(container.querySelectorAll('.product-card')).toHaveLength(3);
    expect(container.querySelector('.product-card.reveal-card')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Todos' }));
    await user.click(screen.getByRole('button', { name: 'Ver mais criações' }));
    expect(container.querySelectorAll('.product-card')).toHaveLength(12);
  });
});
