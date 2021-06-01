import { HeaderContainer, Logo } from '../styles/HeaderStyles';
import Link from 'next/link';
import Nav from './Nav';
import Cart from './Cart';
import Search from './Search';
import { useUser } from './User';

const Header = () => {
  const me = useUser();

  return (
    <HeaderContainer>
      <div className="bar">
        <Logo>
          <Link href="/">StreetWear</Link>
        </Logo>
        <Nav />
      </div>
      <div className="sub-bar">{me && <Search />}</div>
      <Cart />
    </HeaderContainer>
  );
};

export default Header;
