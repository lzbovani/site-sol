import { useEffect, useState } from 'react';
import { Logo } from './Logo';
import { CartIcon, CloseIcon, MenuIcon } from './Icons';
import { useStore } from '../context/StoreContext';

const links = [
  ['Início', '#inicio'], ['Cardápio', '#cardapio'], ['Gatos', '#gatos'],
  ['Experiência', '#experiencia'], ['Sobre', '#sobre'], ['Contato', '#contato'],
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cart, setCartOpen } = useStore();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', close); return () => document.removeEventListener('keydown', close);
  }, []);

  return (
    <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
      <a className="header-logo" href="#inicio"><Logo /></a>
      <nav id="menu-mobile" className={`main-nav ${menuOpen ? 'main-nav--open' : ''}`} aria-label="Navegação principal">
        {links.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
        <a className="nav-reserve" href="#reservas" onClick={() => setMenuOpen(false)}>Reservar mesa</a>
      </nav>
      <div className="header-actions">
        <button className="icon-button cart-button" onClick={() => setCartOpen(true)} aria-label={`Abrir carrinho com ${count} ${count === 1 ? 'item' : 'itens'}`}>
          <CartIcon />{count > 0 && <span className="cart-count">{count}</span>}
        </button>
        <button className="icon-button menu-button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="menu-mobile" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}>
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
      {menuOpen && <button className="menu-backdrop" aria-label="Fechar menu" onClick={() => setMenuOpen(false)} />}
    </header>
  );
}
