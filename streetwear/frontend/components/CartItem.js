import RemoveFromCart from './RemoveFromCart';
import { CartItemStyles } from '../styles/CartStyles';
import { formatMoney } from '../lib/formatMoney';

const CartItem = ({ cartItem }) => {
  const product = cartItem.product;

  return (
    <CartItemStyles>
      <img src={product.photo.image.publicUrlTransformed} alt={product.name} />
      <div>
        <h3>{product.name}</h3>
        <p>
          <strong>{formatMoney(product.price * cartItem.quantity)} </strong>-
          <em>
            {cartItem.quantity} &times; {formatMoney(product.price)} each
          </em>
        </p>
      </div>
      <RemoveFromCart id={cartItem.id} />
    </CartItemStyles>
  );
};

export default CartItem;
