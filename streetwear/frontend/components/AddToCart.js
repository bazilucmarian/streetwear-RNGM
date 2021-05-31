import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';
import { useContext } from 'react';
import { LocalStateContext } from '../context/cartState';

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(productID: $id) {
      id
    }
  }
`;

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
