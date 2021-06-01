import { useMutation } from '@apollo/client';
import { CREATE_PRODUCT_MUTATION } from '../graphql/mutations';
import { ALL_PRODUCTS_QUERY } from '../graphql/queries';
import { useForm } from '../customHooks/Form';
import Form from '../styles/Form';
import DisplayError from '../components/ErrorMessage';
import { useRouter } from 'next/Router';

const CreateProduct = () => {
  const router = useRouter();

  const { inputs, handleChange, resetForm, clearForm } = useForm({
    name: 'Nice Shoes',
    price: '34234',
    description: 'These are the best shoes!',
    image: '',
  });

  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
      // awaitRefetchQueries: true,
    }
  );

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        // submit the input fields to the backend

        const res = await createProduct();
        clearForm();
        // Go to products page
        router.push(`/products/${res.data.createProduct.id}`);
      }}
    >
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="image">
          Name
          <input
            required
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
          />
        </label>

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
        <button type="submit">+ Add Product</button>
      </fieldset>
    </Form>
  );
};

export default CreateProduct;
