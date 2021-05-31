import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/client";
import Form from "../styles/Form";
import DisplayError from "../components/ErrorMessage";
import { useForm } from "../customHooks/Form";
import { useRouter } from "next/router";

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      description
      price
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      id: $id
      data: { name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
    }
  }
`;

const UpdateProduct = ({ id }) => {
  const router = useRouter();
  // 1.We need to get the existing product
  const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  });

  // 2.We need to get the mutation for updating the product

  const [
    updateProduct,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_PRODUCT_MUTATION);

  // 3.We need some state for the form inputs

  const { inputs, handleChange, resetForm, clearForm } = useForm(data?.Product);

  // 4.We need the form to handle the updates

  if (loading) return <p>Loading ...</p>;

  return (
    <Form
      onSubmit={async (e) => {
        // todo:handle submit
        e.preventDefault();
        const res = await updateProduct({
          variables: {
            id,
            name: inputs.name,
            description: inputs.description,
            price: inputs.price,
          },
        });

        router.push(`/product/${res.data.updateProduct.id}`);
      }}
    >
      <DisplayError error={error || updateError} />
      <fieldset disabled={updateLoading} aria-busy={updateLoading}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="price">
          Price
          <input
            type="number"
            name="price"
            id="price"
            placeholder="Price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            name="description"
            id="description"
            placeholder="Description"
            value={inputs.description}
            onChange={handleChange}
          ></textarea>
        </label>
        <button type="submit">Update Product</button>
      </fieldset>
    </Form>
  );
};

export default UpdateProduct;
