import { CartCountStyle, AnimationCountStyles } from '../styles/CartStyles';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const CartCount = ({ count }) => {
  return (
    <AnimationCountStyles>
      <TransitionGroup>
        <CSSTransition
          unmountOnExit
          className="count"
          classNames="count"
          key={count}
          timeout={{ enter: 400, exit: 400 }}
        >
          <CartCountStyle>{count}</CartCountStyle>
        </CSSTransition>
      </TransitionGroup>
    </AnimationCountStyles>
  );
};

export default CartCount;
