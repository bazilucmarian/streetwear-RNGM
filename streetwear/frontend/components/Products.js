import { useQuery } from '@apollo/client';
import { ALL_PRODUCTS_QUERY } from '../graphql/queries';
import { perPage } from '../config';
import { ProductsListStyles } from '../styles/ProductsStyles';
import Product from './Product';

const Products = ({ page }) => {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: {
      skip: page * perPage - perPage,
      first: perPage,
    },
  });
  if (loading) return <p>Loading ... </p>;
  if (error) return <p>Error:{error.message}</p>;
  return (
    <div>
      <ProductsListStyles>
        {data?.allProducts?.map((product) => (
          <Product product={product} key={product.id} />
        ))}
      </ProductsListStyles>
    </div>
  );
};

export default Products;
