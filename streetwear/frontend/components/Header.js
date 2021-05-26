import styled from "styled-components";
import Link from "next/link";
import Nav from "./Nav";

const Logo = styled.h1`
  background-color: red;
  font-size: 4rem;
  margin-left: 2rem;
  transform: skew(-7deg);

  a {
    color: white;
    text-decoration: none;
    text-transform: uppercase;
    padding: 0.5rem 1rem;
  }
`;

const HeaderStyles = styled.header`
  .bar {
    border-bottom: 10px solid var(--black, black);
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid var(--black, black);
  }
`;

const Header = () => (
  <HeaderStyles>
    <div className="bar">
      <Logo>
        <Link href="/">StreetWear</Link>
      </Logo>
      <Nav />
    </div>
    <div className="sub-bar">
      <p>Search</p>
    </div>
  </HeaderStyles>
);

export default Header;