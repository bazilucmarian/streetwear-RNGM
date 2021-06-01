import { useMutation } from '@apollo/client';
import { ADD_TO_CART_MUTATION } from '../graphql/mutations';
import { CURRENT_USER_QUERY } from '../graphql/queries';
import { useContext } from 'react';
import { LocalStateContext } from '../context/cartState';

const AddToCart = ({ id }) => {
  const { toggleCart } = useContext(LocalStateContext);
  const [addToCart, { data, loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: { id },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const handleAddToCart = async () => {
    await addToCart();
    toggleCart();
  };

  return (
    <button type="button" disabled={loading} onClick={handleAddToCart}>
      Add{loading && 'ing'} To Cart 🛒
    </button>
  );
};

export default AddToCart;
