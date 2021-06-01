import { useQuery } from '@apollo/client';
import { ALL_PRODUCTS_QUERY } from '../graphql/queries';
import { perPage } from '../config';
import styled from 'styled-components';
import Product from './Product';

const ProductsListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

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
