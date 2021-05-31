import { useContext } from 'react';
import { LocalStateContext } from '../context/cartState';
import { CloseButtonCart } from '../styles/CartStyles';
import { CartStyles, TitleCart } from '../styles/CartStyles';
import calcTotalPrice from '../lib/calcTotalPrice';
import { formatMoney } from '../lib/formatMoney';
import CartItem from './CartItem';
import { useUser } from './User';
import Checkout from './Checkout';

const Cart = () => {
  const me = useUser();
  if (!me) return null;

  const { cartOpen, toggleCart } = useContext(LocalStateContext);

  return (
    <CartStyles open={cartOpen}>
      <header>
        <TitleCart>{me.name}`s Cart 🛒</TitleCart>
        <CloseButtonCart onClick={toggleCart}>✖</CloseButtonCart>
      </header>
      <ul>
        {me.cart.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(me.cart))}</p>
        <Checkout />
      </footer>
    </CartStyles>
  );
};

export default Cart;
