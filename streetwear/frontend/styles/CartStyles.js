import styled from 'styled-components';

export const CartStyles = styled.div`
  padding: 20px;
  position: relative;
  background: white;
  position: fixed;
  height: 100%;
  top: 0;
  right: 0;
  width: 40%;
  min-width: 500px;
  bottom: 0;
  transform: translateX(100%);
  transition: all 0.3s;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
  z-index: 5;
  display: grid;
  grid-template-rows: auto 1fr auto;
  ${(props) => props.open && `transform: translateX(0);`};
  header {
    border-bottom: 5px solid var(--black);
    margin-bottom: 2rem;
    padding-bottom: 2rem;
  }
  footer {
    border-top: 10px double var(--black);
    margin-top: 2rem;
    padding-top: 2rem;
    /* display: grid;
  grid-template-columns: auto auto; */
    align-items: center;
    font-size: 3rem;
    font-weight: 900;
    p {
      margin: 0;
    }
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    overflow: scroll;
  }
`;

export const TitleCart = styled.h3`
  background: var(--red);
  color: white;
  display: inline-block;
  padding: 4px 5px;
  transform: skew(-3deg);
  margin: 0;
  font-size: 4rem;
  text-transform: uppercase;
  width: 100%;
  text-align: center;
`;

export const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightblue);
  display: grid;
  grid-template-columns: auto 1fr auto;

  img {
    margin-right: 1rem;
    max-width: 100%;
    width: 100px;
  }
  h3,
  p {
    margin: 0;
  }
`;

export const CloseButtonCart = styled.button`
  background: black;
  color: white;
  font-size: 3rem;
  border: 0;
  position: absolute;
  z-index: 2;
  right: 2rem;
  cursor: pointer;
  transform: skew(-3deg);
`;

export const CartCountStyle = styled.div`
  background: var(--red);
  color: white;
  border-radius: 50%;
  padding: 0.5rem;
  line-height: 2rem;
  min-width: 3rem;
  margin-left: 1rem;
  /* these 2 proprieties  are for count number to avoid increase the width when the number changed*/
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
`;

export const AnimationCountStyles = styled.span`
  position: relative;
  .count {
    display: block;
    position: relative;
    transition: transform 0.4s;
    backface-visibility: hidden;
  }
  .count-enter {
    transform: scale(4) rotateX(0.5turn);
  }
  .count-enter-active {
    transform: rotateX(0);
  }

  .count-exit {
    top: 0;
    position: absolute;
    transform: rotateX(0);
  }

  .count-exit-active {
    transform: scale(4) rotateX(0.5turn);
  }
`;

export const RemoveFromCartButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  font-weight: 800;
  margin-right: 1.5rem;
  transition: 0.2s;

  &:hover {
    color: var(--red);
    cursor: pointer;
  }
`;
