import { useContext } from 'react';
import { LocalStateContext } from '../context/cartState';
import Link from 'next/Link';
import { NavList } from '../styles/NavStyles';
import SignOut from './SignOut';
import { useUser } from './User';
import CartCount from './CartCount';

const Nav = () => {
  {
    process.env.NEXT_PUBLIC_STRIPE_KEY;
  }
  const user = useUser();

  const { toggleCart } = useContext(LocalStateContext);

  const countItemsInCart = user?.cart?.reduce(
    (acc, cartItem) => acc + (cartItem.product ? cartItem.quantity : 0),
    0
  );

  return (
    <NavList>
      {user && (
        <>
          <Link href="/products">Products</Link>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
          <SignOut />
          <button type="button" onClick={toggleCart}>
            My Cart
            <CartCount count={countItemsInCart} />
          </button>
        </>
      )}

      {!user && <Link href="/signin">Create new account ! </Link>}
    </NavList>
  );
};

export default Nav;
