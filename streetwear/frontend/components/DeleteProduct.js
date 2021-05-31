import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

const update = (cache, payload) => {
  cache.evict(cache.identify(payload.data.deleteProduct));
};

const DeleteProduct = ({ id, children }) => {
  const [deleteProduct, { loading, error }] = useMutation(
    DELETE_PRODUCT_MUTATION,
    {
      variables: { id },
      update: update,
    }
  );

  return (
    <button
      type="button"
      disabled={loading}
      onClick={() => {
        if (confirm("Are You sure you want to delete this item ? ")) {
          // TODO : go and delete this item
          deleteProduct().catch((err) => alert(err.message));
        }
      }}
    >
      {children}
    </button>
  );
};

export default DeleteProduct;
