import { RemoveFromCartButton } from '../styles/CartStyles';
import { useMutation } from '@apollo/client';
import { REMOVE_FROM_CART_MUTATION } from '../graphql/mutations';

const update = (cache, payload) => {
  cache.evict(cache.identify(payload.data.deleteCartItem));
};

const RemoveFromCart = ({ id }) => {
  const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION, {
    variables: { id },
    // refetchQueries:// is a solution for updating cart items withour refresh
    update,
    /* !!! Ask Iulian if the mothod below is beneficial */
    // with optimistic response update function will run much faster
    // optimisticResponse: {
    //   deleteCartItem: {
    //     __typename: 'CartItem',
    //     id,
    //   },
    // },
  });
  return (
    <RemoveFromCartButton
      type="RemoveFromCartButton"
      title="Remove item from cart"
      disabled={loading}
      onClick={removeFromCart}
    >
      &times;
    </RemoveFromCartButton>
  );
};

export default RemoveFromCart;
