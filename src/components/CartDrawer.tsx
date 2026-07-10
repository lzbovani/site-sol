import { useEffect, useRef, useState } from 'react';
import { useStore } from '../context/StoreContext';
import { formatPrice, products } from '../data/menu';
import { CartIcon, CheckIcon, CloseIcon, MinusIcon, PlusIcon, TrashIcon } from './Icons';

export function CartDrawer() {
  const { cart, cartOpen, setCartOpen, updateQuantity, removeFromCart, clearCart, notify } = useStore();
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [finished, setFinished] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const items = cart.map((item) => ({ ...item, product: products.find((product) => product.id === item.productId)! })).filter((item) => item.product);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const fee = subtotal > 0 ? 4.9 : 0;
  const discountValue = subtotal * discount;
  const total = subtotal + fee - discountValue;

  useEffect(() => {
    if (!cartOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    document.body.classList.add('drawer-open');
    window.setTimeout(() => closeRef.current?.focus(), 50);
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') setCartOpen(false); };
    document.addEventListener('keydown', escape);
    return () => { document.body.classList.remove('drawer-open'); document.removeEventListener('keydown', escape); previous?.focus(); };
  }, [cartOpen, setCartOpen]);

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === 'RONROM10') {
      setDiscount(0.1); notify('Cupom RONROM10 aplicado.');
    } else {
      setDiscount(0); notify('Cupom não reconhecido. Tente RONROM10.', 'error');
    }
  };

  const checkout = () => {
    setFinished(true); clearCart(); setDiscount(0); setCoupon('');
  };

  if (!cartOpen) return null;
  return (
    <div className="drawer-layer" role="presentation">
      <button className="drawer-overlay" aria-label="Fechar carrinho" onClick={() => setCartOpen(false)} />
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <div className="drawer-header">
          <div><span className="eyebrow">Seu momento</span><h2 id="cart-title">Pedido</h2></div>
          <button ref={closeRef} className="icon-button" onClick={() => setCartOpen(false)} aria-label="Fechar carrinho"><CloseIcon /></button>
        </div>
        {finished ? (
          <div className="checkout-success">
            <span className="success-seal"><CheckIcon /></span>
            <span className="eyebrow">Demonstração concluída</span>
            <h3>Seu pedido encontrou um lugar à mesa.</h3>
            <p>Nenhum pagamento foi realizado. Em uma operação real, você seguiria agora para a confirmação segura.</p>
            <button className="button button--dark" onClick={() => { setFinished(false); setCartOpen(false); }}>Voltar ao café</button>
          </div>
        ) : items.length === 0 ? (
          <div className="cart-empty">
            <span className="empty-icon"><CartIcon /></span>
            <h3>A bandeja ainda está vazia</h3>
            <p>Escolha algo quente, fresco ou doce. Nós guardamos o pedido enquanto você passeia pelo menu.</p>
            <button className="button button--dark" onClick={() => { setCartOpen(false); document.querySelector('#cardapio')?.scrollIntoView({ behavior: 'smooth' }); }}>Conhecer o cardápio</button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map(({ product, quantity }) => (
                <article className="cart-item" key={product.id}>
                  <img src="/images/menu-still-life.webp" style={{ objectPosition: product.imagePosition }} alt="" width="96" height="96" />
                  <div className="cart-item__info"><h3>{product.name}</h3><span>{formatPrice(product.price)}</span>
                    <div className="quantity-control" aria-label={`Quantidade de ${product.name}`}>
                      <button onClick={() => updateQuantity(product.id, quantity - 1)} aria-label="Diminuir quantidade"><MinusIcon /></button>
                      <output aria-live="polite">{quantity}</output>
                      <button onClick={() => updateQuantity(product.id, quantity + 1)} aria-label="Aumentar quantidade"><PlusIcon /></button>
                    </div>
                  </div>
                  <button className="remove-button" onClick={() => removeFromCart(product.id)} aria-label={`Remover ${product.name}`}><TrashIcon /></button>
                </article>
              ))}
            </div>
            <div className="cart-summary">
              <div className="coupon-row"><label htmlFor="coupon">Cupom demonstrativo</label><div><input id="coupon" value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="RONROM10" /><button onClick={applyCoupon}>Aplicar</button></div></div>
              <dl className="totals">
                <div><dt>Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
                <div><dt>Taxa simulada</dt><dd>{formatPrice(fee)}</dd></div>
                {discount > 0 && <div className="discount"><dt>Desconto</dt><dd>− {formatPrice(discountValue)}</dd></div>}
                <div className="total"><dt>Total</dt><dd>{formatPrice(total)}</dd></div>
              </dl>
              <button className="button button--accent button--full" onClick={checkout}>Finalizar pedido demonstrativo</button>
              <p className="demo-note">Ambiente de demonstração. Nenhum pagamento ou dado financeiro será solicitado.</p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
