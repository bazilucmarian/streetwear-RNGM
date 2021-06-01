import DisplayError from '../components/ErrorMessage';
import { useQuery } from '@apollo/client';
import { SINGLE_PRODUCT_QUERY } from '../graphql/queries';
import Head from 'next/head';
import { ProductStyles } from '../styles/SingleProductPageStyle';

const DisplaySingleProduct = ({ id }) => {
  const { data, loading, error } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  });
  if (loading) return <p>Loading ... </p>;
  if (error) return <DisplayError error={error} />;

  return (
    <ProductStyles>
      <Head>
        <title>Streetwear | {data.Product.name}</title>
      </Head>
      <img
        src={data.Product.photo.image.publicUrlTransformed}
        alt={data.Product.name}
      />
      <div className="details">
        <h2>{data.Product.name}</h2>
        <p>{data.Product.description}</p>
      </div>
    </ProductStyles>
  );
};

export default DisplaySingleProduct;
