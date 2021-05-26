import { useQuery } from "@apollo/client";
import ggl from "graphql-tag";
import styled from "styled-components";
import Product from "../components/SingleProduct";

const ALL_PRODUCTS_QUERY = ggl`
query ALL_PRODUCTS_QUERY{
  allProducts{
    id
    name
    description
    price
    photo{
      image{
        publicUrlTransformed
      }
    }
  }
}
`;

const ProductsListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

const Products = () => {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY);
  if (loading) return <p>Loading ... </p>;
  if (error) return <p>Error:{error.message}</p>;
  return (
    <div>
      <ProductsListStyles>
        {data.allProducts.map((product) => (
          <Product product={product} key={product.id} />
        ))}
      </ProductsListStyles>
    </div>
  );
};

export default Products;
