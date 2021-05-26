import Link from "next/Link";
import { NavList } from "../styles/NavStyles";

const Nav = () => {
  return (
    <NavList>
      <Link href="/products">Products</Link>
      <Link href="/sell">Sell</Link>
      <Link href="/orders">Orders</Link>
      <Link href="/account">Account</Link>
    </NavList>
  );
};

export default Nav;
